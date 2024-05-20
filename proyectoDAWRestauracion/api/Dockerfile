# Usa una imagen base de Node.js
FROM node:latest AS nodejs

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del backend al contenedor
COPY . /app/

# Instalar nodemon
RUN npm install -g nodemon && \
chmod +x /usr/local/lib/node_modules/nodemon/bin/nodemon.js

# Instala las dependencias del backend
RUN npm install

# Ejecuta el script para crear la base de datos
# RUN node crearBBDD.js

# Expone el puerto en el que se ejecuta el servidor Node.js
EXPOSE 3000

# Comando para iniciar el servidor Node.js
# CMD ["node", "app.js"]
CMD ["npm", "start"]
