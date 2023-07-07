# Etapa de build
FROM node:20.2.0 as builder

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

# Etapa final
FROM node:20.2.0

WORKDIR /app

COPY --from=builder /app .

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
