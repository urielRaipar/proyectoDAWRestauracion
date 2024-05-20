import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders, HttpRequest } from "@angular/common/http"; 
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Artista } from "../models/artista";


@Injectable()
export class ArtistaServicio{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url=GLOBAL.url;
    }

    // Añadir artista
    addArtist(token:any,artista:Artista){
        let params=JSON.stringify(artista);
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.post(this.url+'artista',params,{headers:headers}).pipe(map(res=>res));
    }

    // Mostrar artistas por pagina
    getArtistas(token:any,page:any){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.get(this.url+'artistas/'+page,{headers:headers})
                .pipe(map(res=>res));
    }

    // Mostrar artista
    getArtista(token:any,id:string){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.get(this.url+'artista/'+id,{headers:headers})
                .pipe(map(res=>res));
    }

    // Actualizar artista
    editArtista(token:any,id:string,artista:Artista){
        let params=JSON.stringify(artista);
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.put(this.url+'artista/'+id,params,{headers:headers}).pipe(map(res=>res));
    }

    // Eliminar artista
    deleteArtista(token:any,id:string){
        let headers= new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.delete(this.url+'artista/'+id,{headers:headers})
                .pipe(map(res=>res));
    }
}