# 1. Aşama: Bağımlılıkları yükle ve build et
FROM node:21 AS builder

# Uygulamanın çalışacağı dizin
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package.json package-lock.json ./

# Bağımlılıkları yükle
RUN npm ci --only=production

# Uygulama dosyalarını kopyala
COPY . .

# Production için build et
RUN npm run build

# 2. Aşama: Production ortamı için minimal Node.js imajı
FROM node:21-slim AS runner

# Ortamı production olarak ayarla
ENV NODE_ENV=production

# Uygulamanın çalışacağı dizin
WORKDIR /app

# Gerekli dosyaları kopyala
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Uygulamanın dışa açacağı portu belirt
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
