import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params, RouterModule, RouterLink } from '@angular/router';
import { GLOBAL } from '../../service/global';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { Artista } from '../../models/artista';
import { ArtistaServicio } from '../../service/artista.servicio';



@Component({
  selector: 'app-lista-artistas',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink
  ],
  providers: [
    UsuarioServicio,
    ArtistaServicio
  ],
  templateUrl: './lista-artistas.component.html',
  styleUrl: './lista-artistas.component.css'
})

export class ListaArtistasComponent implements OnInit{
  public titulo:any;
  public artistas:any;
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
    private _artistService:ArtistaServicio
  ){
    this.titulo='Artistas de la plataforma';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.next_page=1;
    this.prev_page=1;

  }

  ngOnInit(){
      console.log('Listas de artistas componente: cargado');
    
      // Listado de artistas
      this.getArtists();
  }

  // Mostrar listas de artistas
  getArtists(){
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

      this._artistService.getArtistas(this.token,page).subscribe((response:any)=>{
          if(!response.artists){
            this._router.navigate(['/']);
          }else{
            this.artistas=response.artists;
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
  onCancelArtist(){
    this.confirmado=null;
  }

  // Metodo eliminar
  onDeleteArtist(id:any){
    this._artistService.deleteArtista(this.token,id).subscribe(
      (response:any)=>{
        if(!response.artist){
          alert('Error en el servidor');
        }
        this.getArtists();
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
