import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { GLOBAL } from '../../service/global';
import { Cancion } from '../../models/cancion';
import { FormsModule } from '@angular/forms';
import { CancionServicio } from '../../service/cancion.servicio';


@Component({
  selector: 'app-anyadir-cancion',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers:[
    UsuarioServicio,
    CancionServicio
  ],
  templateUrl: './anyadir-cancion.component.html',
  styleUrl: './anyadir-cancion.component.css'
})
export class AnyadirCancionComponent implements OnInit{
  public title:any;
  public cancion:Cancion;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;
  public rellenar:any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _cancionService:CancionServicio
  ){
    this.title='Añadir canción';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.cancion=new Cancion(1,'','','','');
   
  }

  ngOnInit() {
    console.log('Añadir cancion componente: cargado');
  }

// Insertar album
  onSubmit(){
    if(this.cancion.numero==null || this.cancion.nombre=='' || this.cancion.duracion==''){
      this.rellenar='Tienes que rellenar todos los campos';
   }else{
    this._route.params.forEach((params:Params)=>{
      let album_id=params['album'];
      this.cancion.album=album_id;

      this._cancionService.addCancion(this.token,this.cancion).subscribe(
        (response:any)=>{
          if(!response.song){
            this.alertMessage='Error en el servidor';
          }else{
            this.alertMessage='La canción se ha creado correctamente';
            this.cancion=response.song;
            this._router.navigate(['/actualizarCancion',response.song._id]);
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
