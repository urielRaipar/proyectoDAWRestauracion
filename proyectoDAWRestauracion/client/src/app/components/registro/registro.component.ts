import { Component } from '@angular/core';
import { UsuarioServicio } from '../../service/usuario.servicio';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  public usuario_registro: Usuario;
  public alertRegister: any; 
  public rellenar:any;
  public alerta=false;
  public emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private _usuarioServicio: UsuarioServicio
  ) {
    this.usuario_registro = new Usuario('', '', '', '', '', 'ROLE_USER', '');
  }

 
// Registrar usuario
onSubmitRegister(){
  if(this.usuario_registro.nombre=='' || this.usuario_registro.apellidos=='' || this.usuario_registro.contrasenya==''
   ||  this.usuario_registro.email==''){
      this.rellenar='Tienes que rellenar todos los campos';
   }else if(this.emailRegex.test(this.usuario_registro.email)){
    this.rellenar=null;
      this._usuarioServicio.registrer(this.usuario_registro).subscribe((response:any)=>{
        let userAux=response.user;
        this.usuario_registro=userAux;

        if(!this.usuario_registro._id){
          this.alertRegister='Error al registrarse';
        }else{
          this.alertRegister='El registro se ha realizado correctamente';
          this.usuario_registro = new Usuario('', '', '', '', '', 'ROLE_USER', '');
          setTimeout(() => {
            location.href = 'http://localhost:80/';
          }, 2000);
        }
      },  
      (error)=>{
        let errorMessage = <any>error;

        if (errorMessage != null) {
          this.alertRegister = error.error.message;
        }
      }
    )
  }else{
    this.rellenar='El correo electronico no es valido';
  }
}


}
