# Imagen base
FROM node:18.15-alpine

# Carpeta de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero
COPY package*.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar el resto del proyecto
COPY . .

# Construir la app para producción
RUN npm run build

# Instalar servidor estático
RUN npm install -g serve

# Exponer puerto 5173
EXPOSE 5173

# Comando por defecto
CMD ["serve", "-s", "dist", "-l", "5173"]
