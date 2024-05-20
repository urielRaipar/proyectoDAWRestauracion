import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { GLOBAL } from '../../service/global';
import { Artista } from '../../models/artista';
import { FormsModule } from '@angular/forms';
import { ArtistaServicio } from '../../service/artista.servicio';
import { UploadServicio } from '../../service/upload.servicio';


@Component({
  selector: 'app-actualizar-artista',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [
    UsuarioServicio,
    ArtistaServicio,
    UploadServicio
  ],
  templateUrl: './actualizar-artista.component.html',
  styleUrl: './actualizar-artista.component.css'
})
export class ActualizarArtistaComponent implements OnInit{
  public titulo:any;
  public artista:Artista;
  public identificacion;
  public token;
  public url;
  public alertMessage:any;
  public filesToUpload:any;
  public rellenar:any;
  public expresion=/\.(jpg|jpeg|png)$/i;


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
    private _artistaServicio:ArtistaServicio,
    private _uploadService:UploadServicio
  ){
    this.titulo='Actualizar artista';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
    this.artista=new Artista('','','');
  }

  ngOnInit(): void {
    console.log('Actualizar artista componente: cargado');
    // Llamar al metodo del api para sacar un artista wen base a su id getArtist
    this.getArtist();
  }

  getArtist(){
      this._route.params.forEach((params:Params)=>{
      let id=params['id'];
      this._artistaServicio.getArtista(this.token,id).subscribe(
        (response:any)=>{
          if(!response.artist){
            this._router.navigate(['']);
          }else{
            this.artista=response.artist;
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

  onSubmit(){
    if(this.artista.nombre=='' || this.artista.descripcion==''){
      this.rellenar='Tienes que rellenar todos los campos';
      return; // Agregar un return para salir de la función si faltan campos
   }

   if (!this.filesToUpload || this.filesToUpload.length === 0) {
     this.alertMessage = 'Debes seleccionar una imagen para subir.';
     return; // Salir de la función si no hay archivos seleccionados
   }

   let validFile = false;
   for (let i = 0; i < this.filesToUpload.length; i++) {
     const file = this.filesToUpload[i];
     if (this.expresion.test(file.name)) {
       validFile = true;
       break;
     }
   }

   if (!validFile) {
     this.alertMessage = 'Ninguno de los archivos seleccionados tiene una extensión válida (.jpg, .jpeg o .png).';
     return; // Salir de la función si ningún archivo cumple con la extensión requerida
   }

   this._route.params.forEach((params:Params)=>{
     let id=params['id'];

     this._artistaServicio.editArtista(this.token,id,this.artista).subscribe(
       (response:any)=>{
         if(!response.artist){
           this.alertMessage='Error en el servidor';
         }else{
           this.alertMessage='El artista se ha actualizado correctamente';
           // Subir la imagen del artista
           this._uploadService.makeFileRequest(this.url+'upload-image-artist/'+id,[],this.filesToUpload,this.token,'imagen')
             .then((result)=>{
               this._router.navigate(['/artista',response.artist._id])
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
     );
   });
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }
}
