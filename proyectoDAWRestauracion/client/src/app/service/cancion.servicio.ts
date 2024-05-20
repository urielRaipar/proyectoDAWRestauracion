import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders, HttpRequest } from "@angular/common/http"; 
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Cancion } from "../models/cancion";



@Injectable()
export class CancionServicio{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url=GLOBAL.url;
    }

    // Añadir cancion
    addCancion(token:any,cancion:Cancion){
        let params =JSON.stringify(cancion);
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.post(this.url+'cancion',params,{headers:headers}).pipe(map(res=>res));
    }

    // Sacar una cacion de la bbdd
    getCancion(token:any,id:string){
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.get(this.url+'cancion/'+id,{headers:headers}).pipe(map(res=>res));
    }

    // Actualizar cancion
    updateCancion(token:any,id:string,cancion:Cancion){
        let params =JSON.stringify(cancion);
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.put(this.url+'cancion/'+id,params,{headers:headers}).pipe(map(res=>res));
    }


    //Mostrar canciones
    getCanciones(token:any,albumId=null){
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        if (albumId==null) {
            return this._http.get(this.url+'canciones/',{headers:headers}).pipe(map(res=>res));
        } else {
            return this._http.get(this.url+'canciones/'+albumId,{headers:headers}).pipe(map(res=>res));
        }
    }

    // Eleminar cancion
    deleteCancion(token:any,id:string){
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.delete(this.url+'cancion/'+id,{headers:headers}).pipe(map(res=>res));
    }
}