import { Routes } from '@angular/router';
// import { RegistroComponent } from './components/registro/registro.component';
// Importaciones usuario
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
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
// Portada
import { PortadaComponent } from './components/portada/portada.component';
// Gestion
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';


export const routes: Routes = [
    // Ruta general
    {
        path:'',
        redirectTo:'portada',
        pathMatch:'full'
    },
    // Rutas usuarios
    {
        path: 'misDatos',
        component: ActualizarUsuarioComponent
    },
    // Rutas artista
    {
        path:'editarArtista/:id',
        component: ActualizarArtistaComponent
    },
    {
        path:'artists/:page',
        component: ListaArtistasComponent
    },
    {
        path:'anyadirArtista',
        component: AnyadirArtistaComponent
    },
    {
        path:'artista/:id',
        component:ArtistaDetalleComponent
    },
    // Rutas albunes
    {
        path:'crearAlbum/:artista',
        component:AnyadirAlbumComponent
    },
    {
        path:'actualizarAlbum/:id',
        component:ActualizarAlbumComponent
    },
    {
        path:'album/:id',
        component:AlbumDetalleComponent
    },
    {
        path:'albums/:page',
        component:ListaAlbumsComponent
    },
    // Rutas cancion
    {
        path:'anyadirCancion/:album',
        component:AnyadirCancionComponent
    },
    {   
        path:'actualizarCancion/:id',
        component:ActualizarCancionComponent
    },
    {
        path:'portada',
        component:PortadaComponent
    },
    // Gestion usuarios
    {
        path:'gestionU',
        component:GestionUsuariosComponent
    },
    // Rutas por defecto
    {
        path:'',
        component:PortadaComponent
    },
    {
        path:'**',
        component:PortadaComponent
    },
];
