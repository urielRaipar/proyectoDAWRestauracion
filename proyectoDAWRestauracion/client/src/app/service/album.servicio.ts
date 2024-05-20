import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders, HttpRequest } from "@angular/common/http"; 
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Album } from "../models/album";


@Injectable()
export class AlbumServicio{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url=GLOBAL.url;
    }

    // Mostrar album
    getAlbum(token:any,id:string){
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.get(this.url+'album/'+id,{headers:headers}).pipe(map(res=>res));
    }

    // Mostar los albunes
    getAlbums(token:any,artistaId=null){
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        
        if (artistaId==null) {
            return this._http.get(this.url+'albums',{headers:headers}).pipe(map(res=>res));
        } else {
            return this._http.get(this.url+'albums/'+artistaId,{headers:headers}).pipe(map(res=>res));
        }
    }


     // Mostar los albunes por pagina
     getAlbumsP(token:any,page:any){
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });
        
        
        return this._http.get(this.url+'albumsP/'+page,{headers:headers}).pipe(map(res=>res));
    }

    // Añadir albums
    addAlbum(token:any,album:Album){
        let params =JSON.stringify(album);
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.post(this.url+'album',params,{headers:headers}).pipe(map(res=>res));
    }


    // Editar album
    editAlbum(token:any,id:string,album:Album){
        let params=JSON.stringify(album);
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.put(this.url+'album/'+id,params,{headers:headers}).pipe(map(res=>res));
    }

    // Eliminar album 
    deleteAlbum(token:any,id:string){
        let headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':token
        });

        return this._http.delete(this.url+'album/'+id,{headers:headers}).pipe(map(res=>res));
    }
}