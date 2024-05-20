import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { GLOBAL } from '../../service/global';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { ArtistaServicio } from '../../service/artista.servicio';
import { AlbumServicio } from '../../service/album.servicio';
import { Album } from '../../models/album';
import { Artista } from '../../models/artista';


@Component({
  selector: 'app-artista-detalle',
  standalone: true,
  imports: [
    RouterLink,
  ],
  providers: [
    UsuarioServicio,
    ArtistaServicio,
    AlbumServicio
  ],
  templateUrl: './artista-detalle.component.html',
  styleUrl: './artista-detalle.component.css'
})
export class ArtistaDetalleComponent implements OnInit{
  public artista:any;
  public albums:any;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;
  public confirmado:any;


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _artistService:ArtistaServicio,
    private _albumService:AlbumServicio
  ){
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
  }

  ngOnInit(){
    console.log('artista detalle: cargado');

    // Llamar al metodo del api para sacar un artista en base a su id getArtist
    this.getArtists();
  }


  // Mostrar listas de artistas
  getArtists(){
    this._route.params.forEach((params:Params)=>{
      let id=params['id'];
    
      this._artistService.getArtista(this.token,id).subscribe(
        (response:any)=>{
          if(!response.artist){
            this._router.navigate(['/']);
          }else{
            this.artista=response.artist;

            // Sacar los albums del artista
            console.log(response.artist._id)
            this._albumService.getAlbums(this.token,response.artist._id).subscribe(
              (response:any)=>{
                if (!response.albums) {
                    this.alertMessage='Este artista no tiene albums'
                } else {
                  this.albums=response.albums;
                }
              },
              (error)=>{
                let errorMessage=<any>error;

                if(errorMessage != null){
                  let body=JSON.parse(error.body);
                  this.alertMessage=body.message;
        
                  console.log(error)
                }  
              }
            )
          }
        },
        (error)=>{
          let errorMessage=<any>error;

          if(errorMessage != null){
            let body=JSON.parse(error.body);
            this.alertMessage=body.message;
  
            console.log(error)
          }  
        }
      )
    })
  }


  // Confirmar eliminacion
  onDeleteConfirm(id:any){
    this.confirmado=id;
  }

  // Eliminar
  onDeleteAlbum(id:any){
    this._albumService.deleteAlbum(this.token,id).subscribe(
      (response:any)=>{
        if (!response.album) {
          alert('Error en el servidor');
        }

        this.getArtists();
      },
      (error)=>{
        let errorMessage=<any>error;

        if(errorMessage != null){
          let body=JSON.parse(error.body);
          this.alertMessage=body.message;

          console.log(error)
        }  
      }
    )
  }

  // Cancelar eliminacion
  onCancelAlbum(){
   this.confirmado=null;
  }

}
