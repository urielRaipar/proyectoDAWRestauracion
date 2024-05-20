# Usa una imagen base de Node.js
# FROM node:latest AS angular

# Establece el directorio de trabajo dentro del contenedor
# WORKDIR /app

# Copia los archivos de la aplicación Angular al contenedor
# COPY . /app/

# Instala las dependencias y compila la aplicación
# RUN npm install
# RUN npm run build

# Utiliza un servidor web simple para servir la aplicación Angular compilada
# FROM nginx:alpine
# COPY --from=angular /app/dist/client /usr/share/nginx/html


# Fase de construcción de Angular
FROM node:latest AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe) al directorio de trabajo del contenedor
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto Angular al directorio de trabajo del contenedor
COPY . .

# Construir la aplicación
RUN npm run build --prod

# Fase de producción de Nginx
FROM nginx:alpine

# Copiar el archivo de configuración de Nginx desde el directorio actual al directorio de configuración de Nginx en el contenedor
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos de Angular desde la fase de construcción al directorio de Nginx
COPY --from=build /app/dist/client/browser /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]


