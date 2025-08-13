# --- Etapa de construcción (build) ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias (para cache eficiente)
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copiar el resto de archivos y construir
COPY . .
RUN npm run build

# --- Etapa de producción (serve) ---
FROM nginx:alpine

# Configuración personalizada para SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Variables de entorno (opcional, si las necesitas en runtime)
ENV VITE_REACT_APP_BASE_URL=http://localhost:5191/api/

# Exponer puerto 80 (Nginx)
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]