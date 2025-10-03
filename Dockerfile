# 1. Node.js image dan foydalanamiz
FROM node:18

# 2. App papkani yaratamiz
WORKDIR /app

# 3. package.json fayllarni nusxalaymiz
COPY package*.json ./

# 4. Kutubxonalarni o‘rnatamiz
RUN npm install

# 5. Barcha fayllarni container ichiga ko‘chiramiz
COPY . .

# 6. Ilovani ishga tushirish
CMD ["node", "index.js"]

# 7. Portni ochamiz
EXPOSE 3000
