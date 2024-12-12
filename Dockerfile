# Base image olarak Node.js kullan
FROM node:21

# Uygulama dizinini oluştur ve çalışma dizini olarak ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamanın dışa açılacağı portu belirle
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
