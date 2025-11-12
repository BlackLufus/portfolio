# Basis-Image
FROM node:20-alpine AS build

# Arbeitsverzeichnis
WORKDIR /app

# Dependencies installieren
COPY ./package*.json ./
RUN npm install

# Quellcode kopieren
COPY ./ .

# Next.js Build
RUN npm run build

# --- Production-Stage ---
FROM node:20-alpine

WORKDIR /app

# Nur notwendige Dateien kopieren
COPY --from=build /app ./

# Port öffnen
EXPOSE 3000

# Next.js Server starten
CMD ["npm", "start"]
