FROM nginx:alpine

# Temporäre Verzeichnisse für Nginx anlegen und Rechte setzen
RUN mkdir -p /var/cache/nginx/client_temp \
    && mkdir -p /run \
    && chown -R 1001:1001 /var/cache/nginx /run

COPY default.conf /etc/nginx/conf.d/default.conf

# COPY out/ /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
