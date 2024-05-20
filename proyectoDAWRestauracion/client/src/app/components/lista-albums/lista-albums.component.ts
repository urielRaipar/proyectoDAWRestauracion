import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params, RouterModule, RouterLink } from '@angular/router';
import { GLOBAL } from '../../service/global';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { AlbumServicio } from '../../service/album.servicio';
import { Album } from '../../models/album';


@Component({
  selector: 'app-lista-albums',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink
  ],
  providers:[
    UsuarioServicio,
    AlbumServicio
  ],
  templateUrl: './lista-albums.component.html',
  styleUrl: './lista-albums.component.css'
})
export class ListaAlbumsComponent implements OnInit{
  public titulo:any;
  public album_s:any;
  public identificacion;
  public token;
  public url;
  public next_page;
  public prev_page;
  public confirmado:any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _albumService:AlbumServicio
  ){
    this.titulo='Albums de la plataforma';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.next_page=1;
    this.prev_page=1;
  }


  ngOnInit(){
    console.log('Listas de albums componente: cargado');
    
    // Listado de albums
    this.getAlbums();
  }

  // Mostrar listas de albums
  getAlbums(){
    this._route.params.forEach((params:Params)=>{
      let page=+params['page'];
      if(!page){
        page=1;
      }else{
        this.next_page=page+1;
        this.prev_page=page-1;

        if(this.prev_page==0){
          this.prev_page=1;
        }
      }

      this._albumService.getAlbumsP(this.token,page).subscribe((response:any)=>{
          if(!response.albums){
            this._router.navigate(['/']);
          }else{
            this.album_s=response.albums;
          }
      },
      (error)=>{
        let errorMessage=<any>error;

        if(errorMessage != null){
          let body=JSON.parse(error.body);
          // this.alertMessage=body.message;

          console.log(error)
        }
      }
    )
    });
  }

  // Metodo confirmar
  onDeleteConfirm(id:any){
    this.confirmado=id;
  }

  // Metodo cancelar
  onCancelAlbum(){
    this.confirmado=null;
  }

  // Metodo eliminar
  onDeleteAlbum(id:any){
    this._albumService.deleteAlbum(this.token,id).subscribe(
      (response:any)=>{
        if(!response.album){
          alert('Error en el servidor');
        }
        this.getAlbums();
      },
      (error)=>{
        let errorMessage=<any>error;

        if(errorMessage != null){
          let body=JSON.parse(error._body);

          console.log(error);
        }
      }
    )
  }
}
