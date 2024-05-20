import { Component,OnInit } from '@angular/core';
import { Cancion } from '../../models/cancion';
import { GLOBAL } from '../../service/global';
import { AlbumServicio } from '../../service/album.servicio';



@Component({
  selector: 'app-reproductor',
  standalone: true,
  imports: [],
  providers:[
    AlbumServicio
  ],
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent implements OnInit{
  public url:string;
  public cancion:any;

  constructor(
    private _albumService:AlbumServicio
  ){
    this.url=GLOBAL.url;
    this.cancion=new Cancion(1,'','','','');
  }

  ngOnInit(){
      console.log('Reproductor componente: cargado');
      
      let sesionR = localStorage.getItem('sound_song');

      if (sesionR !== null) {
          let cancionAux = JSON.parse(sesionR);
          this.cancion=cancionAux;
          console.log(this.cancion.album.artista.nombre)
          console.log('--------------->')

      console.log(this.cancion)
      }else{
          this.cancion=new Cancion(1,'','','','');
      }
     
  }



}
