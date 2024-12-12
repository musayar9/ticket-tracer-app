# 1. Aşama: Bağımlılıkları yükle ve build et
FROM node:21 AS builder

# Uygulamanın çalışacağı dizin
WORKDIR /app

# package.json ve yarn.lock dosyalarını kopyala
COPY package.json /package-lock.json ./

# Yarn bağımlılıklarını yükle
RUN npm install --frozen-lockfile

# Uygulama dosyalarını kopyala
COPY . .

# Production için build et
RUN npm build

# 2. Aşama: Production ortamı için minimal Node.js imajı
FROM node:21 AS runner

# Ortamı production olarak ayarla
ENV NODE_ENV=production

# Uygulamanın çalışacağı dizin
WORKDIR /app

# Gerekli dosyaları kopyala
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Uygulamanın dışa açacağı portu belirt
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
