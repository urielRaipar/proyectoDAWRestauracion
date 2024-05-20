const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { promisify } = require('util');
const hashAsync = promisify(bcrypt.hash);

const Album = require('./modelos/album');
const Artista = require('./modelos/artista');
const Cancion = require('./modelos/cancion');
const Usuario = require('./modelos/usuario');

// URL de conexión a la base de datos MongoDB
const url = 'mongodb://mongodb:27017/webapp_musica';

async function borrarYCrearBaseDeDatos() {
    try {
        // Conexión a la base de datos
        await mongoose.connect(url);
        console.log('Conectado a la base de datos');

        // Verificar si la base de datos existe
        const listaDeBasesDeDatos = await mongoose.connection.db.admin().listDatabases();
        const baseDeDatosExiste = listaDeBasesDeDatos.databases.some(db => db.name === 'webapp_musica');

        if (baseDeDatosExiste) {
            // Eliminar la base de datos existente
            await mongoose.connection.db.dropDatabase();
            console.log('Base de datos eliminada');
        } else {
            console.log('La base de datos no existe. No es necesario borrarla.');
        }

        // Crear y insertar los datos
        await crearYInsertar();
    } catch (error) {
        console.error('Error al borrar y crear la base de datos:', error);
    } finally {
        // Cerrar la conexión a la base de datos
        mongoose.connection.close();
    }
}


async function crearYInsertar() {
    try {
        // Conexión a la base de datos
        await mongoose.connect(url);
        console.log('Conectado a la base de datos');

        // Crear usuarios
        await insertarUsuarios();

        console.log('Usuarios insertados correctamente');

        // Crear artistas
        const artistasInsertados =await insertarArtistas();

        console.log('Artistas insertados correctamente');

        // Crear álbumes
        const albumsInsertados=await insertarAlbums(artistasInsertados);

        console.log('Álbumes insertados correctamente');

        // Crear canciones
        await insertarCanciones(albumsInsertados);

        console.log('Canciones insertadas correctamente');

        console.log('Todos los datos insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos:', error);
    } finally {
        // Cerrar la conexión a la base de datos
        mongoose.connection.close();
    }
}

async function insertarUsuarios() {
    try {
        const usuarios = [
            {
                nombre: 'Admin',
                apellidos: 'Admin',
                email: 'admin@admin.com',
                contrasenya: 'admin',
                rol: 'ROLE_ADMIN',
                imagen: 'coche.jpg'
            },
            {
                nombre: 'Luis',
                apellidos: 'Garcia Garcia',
                email: 'luis@garcia.com',
                contrasenya: 'luis',
                rol: 'ROLE_USER',
                imagen: 'pantera.jpg'
            },
            {
                nombre: 'Marisa',
                apellidos: 'Perez Perez',
                email: 'marisa@perez.com',
                contrasenya: 'marisa',
                rol: 'ROLE_USER',
                imagen: 'paisaje.jpg'
            }
        ];

        await Promise.all(usuarios.map(async (usuario) => {
            const hash = await hashAsync(usuario.contrasenya, null, null);
            usuario.contrasenya = hash;
        }));

        await Usuario.create(usuarios);
    } catch (error) {
        console.error('Error al insertar usuarios:', error);
    }
}

async function insertarArtistas() {
    try {
        const artistas = [
            {
                nombre: 'Metallica',
                descripcion: 'Banda estadounidense de thrash metal originaria de Los Ángeles',
                imagen: 'metallica.jpg'
            },
            {
                nombre: 'Black Sabbath',
                descripcion: ' Banda británica de heavy metal y hard rock formada en 1968 en Birmingham',
                imagen: 'black-sabbath.jpg'
            },
            {
                nombre: 'Fu Manchu',
                descripcion: 'Banda de stoner rock del sur de California',
                imagen: 'fuManchu.jpg'
            }
        ];

        const artistasInsertados = await Artista.create(artistas);
        return artistasInsertados;
    } catch (error) {
        console.error('Error al insertar artistas:', error);
    }
}


async function insertarAlbums(artistas) {
    try {
        const albums=[
            {
                titulo: 'Master of puppets',
                descripcion: 'Master of Puppets es el tercer álbum de estudio del grupo musical de thrash metal estadounidense Metallica',
                anyo: 1986,
                imagen: 'masterOfpuppets.jpg',
                artista: artistas[0]._id
            },
            {
                titulo: 'Black album',
                descripcion: 'Black album es el quinto álbum de estudio del grupo musical estadounidense de metal Metallica',
                anyo: 1991,
                imagen: 'blackAlbum.jpg',
                artista: artistas[0]._id
            },
            {
                titulo: 'Master of Reality',
                descripcion: 'Tercer álbum de estudio de la banda británica de heavy metal Black Sabbath',
                anyo: 1971,
                imagen: 'masterOfReality.jpg',
                artista: artistas[1]._id
            },
            {
                titulo: 'Never Say Die!',
                descripcion: 'Octavo álbum de estudio de la banda de heavy metal Black Sabbath',
                anyo: 1978,
                imagen: 'neverSayDie.jpg',
                artista: artistas[1]._id
            },
            {
                titulo: 'King of the Road',
                descripcion: 'Sexto álbum de estudio de la banda de rock fumeta de California Fu Manchu',
                anyo: 2000,
                imagen: 'kingOfTheRoad.jpg',
                artista: artistas[2]._id
            },
            {
                titulo: 'The Action Is Go',
                descripcion: 'Cuarto álbum de estudio de la banda de stoner rock estadounidense Fu Manchu',
                anyo: 1997,
                imagen: 'theActionIsGo.jpg',
                artista: artistas[2]._id
            },
        ];

        const albumsInsertados =await Album.create(albums);
        return albumsInsertados;
    } catch (error) {
        console.error('Error al insertar álbumes:', error);
    }
}

async function insertarCanciones(albums) {
    try {
        await Cancion.create([
            {
                numero: 4,
                nombre: 'Welcome Home (Sanitarium)',
                duracion: '6:25',
                ficheroMP3: 'welcomeHomeSanitarium.mp3',
                album: albums[0]._id
            },
            {
                numero: 5,
                nombre: 'Disposable Heroes',
                duracion: '8:16',
                ficheroMP3: 'disposableHeroes.mp3',
                album: albums[0]._id
            },
            {
                numero: 6,
                nombre: 'Don`t tread on me',
                duracion: '4:01',
                ficheroMP3: 'DontTreadOnMe.mp3',
                album: albums[1]._id
            },
            {
                numero: 2,
                nombre: 'Sad but true',
                duracion: '5:25',
                ficheroMP3: 'SadButTrue.mp3',
                album: albums[1]._id
            },
            {
                numero: 6,
                nombre: 'Lord of This World',
                duracion: '5:24',
                ficheroMP3: 'lordOfThisWorld.mp3',
                album: albums[2]._id
            },
            {
                numero: 1,
                nombre: 'Sweet Leaf',
                duracion: '5:05',
                ficheroMP3: 'sweetLeaf.mp3',
                album: albums[2]._id
            },
            {
                numero: 2,
                nombre: 'Johnny Blade',
                duracion: '6:28',
                ficheroMP3: 'johnnyBlade.mp3',
                album: albums[3]._id
            },
            {
                numero: 6,
                nombre: 'Air Dance',
                duracion: '5:15',
                ficheroMP3: 'airDance.mp3',
                album: albums[3]._id
            },
            {
                numero: 1,
                nombre: 'Hell on Wheels',
                duracion: '4:48',
                ficheroMP3: 'hellOnWheels.mp3',
                album: albums[4]._id
            },
            {
                numero: 3,
                nombre: 'Boogie Van',
                duracion: '4:17',
                ficheroMP3: 'boogieVan.mp3',
                album: albums[4]._id
            },
            {
                numero: 1,
                nombre: 'Evil Eye',
                duracion: '3:30',
                ficheroMP3: 'evilEye.mp3',
                album: albums[5]._id
            },
            {
                numero: 6,
                nombre: 'Anodizer',
                duracion: '4:26',
                ficheroMP3: 'anodizer.mp3',
                album: albums[5]._id
            },
            // Repetir para los demás álbumes y artistas
        ]);
    } catch (error) {
        console.error('Error al insertar canciones:', error);
    }
}

// Llamar a la función para crear e insertar los datos
borrarYCrearBaseDeDatos();
