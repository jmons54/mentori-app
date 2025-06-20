# -------- Étape 1 : Build NestJS (backend) --------
FROM node:20 AS builder

WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
COPY nx.json tsconfig*.json ./
COPY .eslintrc.json ./
COPY .eslintignore ./
COPY .prettierrc ./
COPY .prettierignore ./

# Copier uniquement le backend
COPY server ./server
COPY client-api ./client-api

# Installer les dépendances avec tolérance
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Build backend
RUN NX_DAEMON=false npx nx build server

# -------- Étape 2 : Image finale légère --------
FROM node:20-slim

WORKDIR /app

# Copier uniquement ce qui est nécessaire à l'exécution
COPY --from=builder /app/dist/server ./server
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Variables d'environnement si besoin
ENV NODE_ENV=production

# Exposer le port
EXPOSE 3000

# Démarrer l'app
CMD ["node", "server/main.js"]
