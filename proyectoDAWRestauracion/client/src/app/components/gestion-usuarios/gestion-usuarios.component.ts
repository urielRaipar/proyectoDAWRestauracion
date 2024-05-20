import { Component,ViewChild, ElementRef,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params, RouterModule, RouterLink } from '@angular/router';
import { GLOBAL } from '../../service/global';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [
    UsuarioServicio
  ],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit{
  public titulo:any;
  public usuarios:any;
  public identificacion;
  public token;
  public url;
  public usuarioSeleccionado:any;
  public alertMessage:any;
 

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UsuarioServicio,
  ){
    this.titulo='Gestion de usuarios';
    this.identificacion=JSON.parse(this._userService.getIdentity());
    this.token=this._userService.getToken();
    this.url=GLOBAL.url;
  }


  ngOnInit(){
    console.log('Gestion usuarios componente: cargado');
  
    // Listado de artistas
    this.getUsuarios()
  }

  getUsuarios(){
    this._userService.getUsuarios(this.token).subscribe((response:any)=>{
      if(!response.usurs){
        this._router.navigate(['/']);
      }else{
        this.usuarios=response.usurs;
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


  borrarU() {
    let id=this.usuarioSeleccionado;
    this._userService.deleteUser(this.token,id).subscribe(
      (response:any)=>{
        if (!response.usu) {
          this.alertMessage='Error en el servidor';
        } else {
          this.alertMessage='El usuario se ha borrado correctamente';
          setTimeout(()=>{
            this._router.navigate(['/']);
          },2000);
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
  }


  asignarAdmin(){
    let id=this.usuarioSeleccionado;
    this._userService.updateRol(id).subscribe(
      (response:any)=>{
        if (!response.user) {
          this.alertMessage='Error en el servidor';
        } else {
          this.alertMessage='Usuario asignado con rol administrador';
          setTimeout(()=>{
            this._router.navigate(['/']);
          },2000);
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
  }  
}

