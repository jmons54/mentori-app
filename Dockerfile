# -------- Étape 1 : Build du serveur NestJS --------
FROM node:20 AS builder

WORKDIR /app

# Copier les fichiers de configuration globaux
COPY package*.json ./
COPY nx.json tsconfig*.json ./
COPY .eslintrc.json ./
COPY .eslintignore ./
COPY .prettierrc ./
COPY .prettierignore ./

# Copier uniquement les sources nécessaires au serveur
COPY server ./server
COPY client-api ./client-api

# Installer les dépendances
RUN npm install

# Build backend (NestJS uniquement)
RUN NX_DAEMON=false npx nx build server

# -------- Étape 2 : Image finale légère --------
FROM ubuntu:22.04

# Installer Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

WORKDIR /app

# Copier les builds
COPY --from=builder /app/dist/apps/server ./server
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# (Optionnel) Copier les fichiers d'environnement si requis
# COPY server/.env ./server/.env

# Exposer le port backend
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server/main.js"]
