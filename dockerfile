# Imagen base
FROM node:18.15-alpine

# Carpeta de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero
COPY package*.json ./

# Instalar dependencias con legacy peer deps (para compatibilidad)
RUN npm install --legacy-peer-deps

# Instalar versiones específicas de dependencias problemáticas
RUN npm install date-fns@2.30.0
RUN npm install react-router-dom@6.20.1
RUN npm install recharts@2.8.0
RUN npm install redux@4.2.1

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