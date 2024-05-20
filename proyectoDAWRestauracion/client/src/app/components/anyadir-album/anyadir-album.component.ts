import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { GLOBAL } from '../../service/global';
import { Artista } from '../../models/artista';
import { FormsModule } from '@angular/forms';
import { ArtistaServicio } from '../../service/artista.servicio';
import { Album } from '../../models/album';
import { AlbumServicio } from '../../service/album.servicio';


@Component({
  selector: 'app-anyadir-album',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [
    UsuarioServicio,
    ArtistaServicio,
    AlbumServicio
  ],
  templateUrl: './anyadir-album.component.html',
  styleUrl: './anyadir-album.component.css'
})
export class AnyadirAlbumComponent implements OnInit{
  public title:any;
  // public artista:any;
  public album:Album;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;
  public rellenar:any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _artistaServicio:ArtistaServicio,
    private _albumService:AlbumServicio
  ){
    this.title='Añadir album';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.album=new Album('','',2024,'','');
  }

  ngOnInit() {
    console.log('Añadir album componente: cargado'); 
  }

// Insertar album
  onSubmit(){
    if(this.album.titulo=='' || this.album.descripcion=='' || this.album.anyo==null){
      this.rellenar='Tienes que rellenar todos los campos';
   }else{
    this._route.params.forEach((params:Params)=>{
      let artist_id=params['artista'];
      this.album.artista=artist_id

      this._albumService.addAlbum(this.token,this.album).subscribe(
        (response:any)=>{
       
          if(!response.album){
            this.alertMessage='Error en el servidor';
          }else{
            this.alertMessage='El album se ha creado correctamente';
            this.album=response.album;
            this._router.navigate(['/actualizarAlbum',response.album._id]);
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
    });
  
  }
  }
  
}
