import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders, HttpRequest } from "@angular/common/http"; 
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Artista } from "../models/artista";


@Injectable()
export class UploadServicio{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url=GLOBAL.url;
    }

    makeFileRequest(url:any,params:Array<string>,files:Array<File>,token:string,name:string){
        
        return new Promise((resolve,reject)=>{
          let formData:any=new FormData();
          let xhr=new XMLHttpRequest();
    
          for(let i=0;i<files.length;i++){
            formData.append(name,files[i],files[i].name);
          }
    
          xhr.onreadystatechange=()=>{
            if(xhr.readyState==4){
              if(xhr.status==200){
                resolve(JSON.parse(xhr.response))
              }else{
                reject(xhr.response)
              }
            }
          }
          xhr.open('POST',url,true);
          xhr.setRequestHeader('Authorization',token);
          xhr.send(formData);
        });
      }


}