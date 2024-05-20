import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http"; 
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Usuario } from "../models/usuario";


@Injectable()
export class UsuarioServicio{
    public url:string;
    public identity:any;
    public token:any;

    constructor(private _http:HttpClient){
        this.url=GLOBAL.url;
    }

    // Comprobar login usuario bbdd
    signup(user_login: any, gethash:any=null){
        if(gethash!=null){
           user_login.gethash=gethash;
        }
        let params=JSON.stringify(user_login);
        let headers= new HttpHeaders({'Content-Type':'application/json'});

        return this._http.post(this.url+'login',params,{headers:headers}).pipe(map(res=>res));
    }

    // Recoger datos sesion
    getIdentity(){
        let identifi=localStorage.getItem('identity');

        if(identifi!='undefined'){
            this.identity=identifi;
        }else{
            this.identity=null;
        }

        return this.identity
    }

    // Recoger token
    getToken(){
        let tokn=localStorage.getItem('token');

        if(tokn!='undefined'){
            this.token=tokn;
        }else{
            this.token=null;
        }

        return this.token;  
    }

    // Registrar usuario
    registrer(usuario_r:any){
        let params=JSON.stringify(usuario_r);
        let headers= new HttpHeaders({'Content-Type':'application/json'});
    
        return this._http.post(this.url+'registro',params,{headers:headers}).pipe(map(res=>res));
    }

    // Mostrar usuarios
    getUsuarios(token:any){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.get(this.url+'mostrarUsuarios',{headers:headers})
                .pipe(map(res=>res));
    }

  
    // Actualizar usuario
    updateUser(user_update:any){
        let params=JSON.stringify(user_update);
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        });
    
        return this._http.put(this.url+'update-user/'+user_update._id,params,{headers:headers}).pipe(map(res=>res));
    }

      // Actualizar rol usuario
    updateRol(user_update:any){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        });
    
        return this._http.put(this.url+'update-rol/'+user_update,{},{headers:headers}).pipe(map(res=>res));
    }

    // Actualizar contraseña
    updatePassword(user_update:any){
        let params=JSON.stringify(user_update);
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()
        });

        console.log('servicio usuario '+params)
    
        return this._http.put(this.url+'update-password/'+user_update._id,params,{headers:headers}).pipe(map(res=>res));
    }


    // Eliminar usuario
    deleteUser(token:any,id:string){
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.delete(this.url+'usuario/'+id,{headers:headers}).pipe(map(res=>res));
    }
}