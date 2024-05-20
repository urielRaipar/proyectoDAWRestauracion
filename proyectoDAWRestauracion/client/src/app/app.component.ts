import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive, RouterModule,Router} from '@angular/router';
import { Usuario } from './models/usuario';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Importaciones usuario
import { UsuarioServicio } from './service/usuario.servicio';
import { RegistroComponent } from './components/registro/registro.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
// Importacion conexion api
import { GLOBAL } from './service/global';
// Importaciones artista
import { ListaArtistasComponent } from './components/lista-artistas/lista-artistas.component';
import { AnyadirArtistaComponent } from './components/anyadir-artista/anyadir-artista.component';
import { ActualizarArtistaComponent } from './components/actualizar-artista/actualizar-artista.component';
import { ArtistaDetalleComponent } from './components/artista-detalle/artista-detalle.component';
// Importaciones album
import { AnyadirAlbumComponent } from './components/anyadir-album/anyadir-album.component';
import { ActualizarAlbumComponent } from './components/actualizar-album/actualizar-album.component';
import { AlbumDetalleComponent } from './components/album-detalle/album-detalle.component';
import { ListaAlbumsComponent } from './components/lista-albums/lista-albums.component';
// Importaciones canciones
import { AnyadirCancionComponent } from './components/anyadir-cancion/anyadir-cancion.component';
import { ActualizarCancionComponent } from './components/actualizar-cancion/actualizar-cancion.component';
// Reproductor de musica
import { ReproductorComponent } from './components/reproductor/reproductor.component';
// Portada
import { PortadaComponent } from './components/portada/portada.component';
// Gestion
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    RegistroComponent,
    RouterLink,
    ActualizarUsuarioComponent,
    ListaArtistasComponent,
    RouterLinkActive,
    RouterModule,
    AnyadirArtistaComponent,
    ActualizarArtistaComponent,
    ArtistaDetalleComponent,
    AnyadirAlbumComponent,
    ActualizarAlbumComponent,
    AlbumDetalleComponent,
    AnyadirCancionComponent,
    ActualizarCancionComponent,
    ListaAlbumsComponent,
    ReproductorComponent,
    PortadaComponent,
    GestionUsuariosComponent
  ],
  providers: [
    UsuarioServicio
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  public title = 'Spotysmall';
  public usuario: Usuario;
  public identificacion: any;
  public token: any;
  public errorMessage: any;
  public url:any;

  constructor(
    private _usuarioServicio: UsuarioServicio,
    private _router:Router
  ) {
    this.usuario = new Usuario('', '', '', '', '', 'ROLE_USER', '');
    this.url=GLOBAL.url;
  }

  // Inicializar variables
  ngOnInit() {
    this.identificacion=JSON.parse(this._usuarioServicio.getIdentity());
    this.token=this._usuarioServicio.getToken();

    // console.log(this.identificacion)
    // console.log(this.token)
  }

  // Logearse
  public onSubmit() {

    // Conseguir datos del usuario identificado
    this._usuarioServicio.signup(this.usuario).subscribe((response: any) => {
      let identity = response.user;
      this.identificacion = identity;

      if (!this.identificacion._id) {
        alert("El usuario no está correctamente identificado");
      } else {
        // Crear elemento en el localstorage para tener al usuario en sesion
        localStorage.setItem('identity',JSON.stringify(this.identificacion));


          // Conseguir el token para enviarselo a cada peticion http
          this._usuarioServicio.signup(this.usuario,'true').subscribe((response: any) => {
            let tokenn = response.token;
            this.token = tokenn;

            if (this.token.length<=0) {
              alert("El token no se ha generado correctamente");
            } else {
              // Crear elemento en el localstorage para tener el token disponible
              localStorage.setItem('token',this.token);
              console.log(this.token);
              console.log(this.identificacion)
            }
          },
            (error) => {
              let errorMessage = <any>error;

              if (errorMessage != null) {
                this.errorMessage = error.error.message;
              }
            });
      }
    },
      (error) => {
        let errorMessage = <any>error;

        if (errorMessage != null) {
          this.errorMessage = error.error.message;
        }
      });
  }

  // Cerrar sesion(borrar sesion)
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    // Eliminacion global
    localStorage.clear();

    this.identificacion=null;
    this.token=null;

    location.reload();
  }


}
