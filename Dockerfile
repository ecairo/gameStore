# Usa una imagen base con Node.js
FROM node:18-alpine as build

RUN apk add chromium
ENV CHROME_BIN=/usr/bin/chromium-browser

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json package-lock.json /app/

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente de la aplicación
COPY . /app

# Ejecuta las pruebas unitarias
RUN npm run test-headless

# Construye la aplicación Angular
RUN npm run build --prod

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 4200

# Inicia la aplicación cuando el contenedor se ejecute
CMD ["npm", "start"]