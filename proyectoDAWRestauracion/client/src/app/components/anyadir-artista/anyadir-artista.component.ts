import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { GLOBAL } from '../../service/global';
import { Artista } from '../../models/artista';
import { FormsModule } from '@angular/forms';
import { ArtistaServicio } from '../../service/artista.servicio';


@Component({
  selector: 'app-anyadir-artista',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [
    UsuarioServicio,
    ArtistaServicio
  ],
  templateUrl: './anyadir-artista.component.html',
  styleUrl: './anyadir-artista.component.css'
})
export class AnyadirArtistaComponent implements OnInit{
  public titulo:any;
  public artista:Artista;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;
  public rellenar:any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _artistaServicio:ArtistaServicio
  ){
    this.titulo='Añadir artista';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.artista=new Artista('','','');
  }

  ngOnInit(){
    console.log('Añadir artista componente: cargado');
      
  }

  onSubmit(){
    if(this.artista.nombre=='' || this.artista.descripcion==''){
      this.rellenar='Tienes que rellenar todos los campos';
   }else{
    console.log(this.artista)
    this._artistaServicio.addArtist(this.token,this.artista).subscribe(
      (response:any)=>{
       
        if(!response.artist){
          this.alertMessage='Error en el servidor';
        }else{
          this.alertMessage='El artista se ha creado correctamente';
          this._router.navigate(['/editarArtista',response.artist._id]);
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
    );
  }
  }
}
