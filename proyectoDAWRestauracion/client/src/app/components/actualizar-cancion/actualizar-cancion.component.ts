import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { GLOBAL } from '../../service/global';
import { Cancion } from '../../models/cancion';
import { FormsModule } from '@angular/forms';
import { CancionServicio } from '../../service/cancion.servicio';
import { UploadServicio } from '../../service/upload.servicio';


@Component({
  selector: 'app-actualizar-cancion',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers:[
    UsuarioServicio,
    CancionServicio,
    UploadServicio
  ],
  templateUrl: './actualizar-cancion.component.html',
  styleUrl: './actualizar-cancion.component.css'
})
export class ActualizarCancionComponent implements OnInit {
  public title:any;
  public cancion:Cancion;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;
  public filesToUpload:any;
  public rellenar:any;
  public fileRegex: RegExp = /\.mp3$|\.mp4$/i;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _uploadService:UploadServicio,
    private _userService:UsuarioServicio,
    private _cancionService:CancionServicio
  ){
    this.title='Actualizar canción';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.cancion=new Cancion(1,'','','','');
   
  }

  ngOnInit() {
    console.log('Actualizar cancion componente: cargado');

    // Sacar la cancion a editar
    this.getSong();
  }

  // Datos cancion
  getSong(){
    this._route.params.forEach((params:Params)=>{
      let id=params['id'];

      this._cancionService.getCancion(this.token,id).subscribe(
        (response:any)=>{
          if (!response.song) {
            this._router.navigate(['/']);
          } else {
            this.cancion=response.song;
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
      );
    });
  }


// Insertar album

    onSubmit(){
      if(this.cancion.numero==null || this.cancion.nombre=='' || this.cancion.duracion==''){
        this.rellenar='Tienes que rellenar todos los campos';
        return; // Agregar un return para salir de la función si faltan campos
      }
  
      if (!this.filesToUpload || this.filesToUpload.length === 0) {
        this.alertMessage = 'Debes seleccionar un archivo para subir.';
        return; // Salir de la función si no hay archivos seleccionados
      }
  
      let validFile = false;
      for (let i = 0; i < this.filesToUpload.length; i++) {
        const file = this.filesToUpload[i];
        if (this.fileRegex.test(file.name)) {
          validFile = true;
          break;
        }
      }
  
      if (!validFile) {
        this.alertMessage = 'Ninguno de los archivos seleccionados tiene una extensión válida (.mp3 o .mp4).';
        return; // Salir de la función si ningún archivo cumple con la extensión requerida
      }
  
      this._route.params.forEach((params:Params)=>{
        let id=params['id'];
  
        this._cancionService.updateCancion(this.token,id,this.cancion).subscribe(
          (response:any)=>{
            if(!response.songs){
              this.alertMessage='Error en el servidor';
            }else{
              this.alertMessage='La canción se ha actualizado correctamente';
              // Subir fichero de audio
              this._uploadService.makeFileRequest(this.url+'subir-fichero-audio/'+id,[],this.filesToUpload,this.token,'ficheroMP3')
                .then((result)=>{
                  this._router.navigate(['/album',response.songs.album])
                },
                (error)=>{
                  console.log(error)
                });
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
  
  


  // Ficheros seleccionados
  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }
}
