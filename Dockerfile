FROM node:22.11.0-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
COPY . .
CMD ["node", "dist/index.js"]