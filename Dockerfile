# 1. Użyj obrazu bazowego Node.js
FROM node:18-alpine

# 2. Ustaw katalog roboczy w kontenerze
WORKDIR /app

# 3. Skopiuj package.json i package-lock.json (aby zainstalować zależności)
COPY package.json package-lock.json ./

# 4. Zainstaluj zależności aplikacji
RUN npm install

# 5. Skopiuj cały projekt do kontenera (w tym kod źródłowy)
COPY . .

# 6. Zbuduj aplikację (do produkcji)
RUN npm run build

# 7. Eksponuj port 3000, żeby aplikacja była dostępna na tym porcie
EXPOSE 3000

# 8. Uruchom aplikację w trybie produkcyjnym
CMD ["npm", "start"]
