FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Limpiar contenido default de nginx
RUN rm -rf ./*

# Copiar build desde el contenedor de frontend
COPY --from=frontend-build /app/dist .

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
