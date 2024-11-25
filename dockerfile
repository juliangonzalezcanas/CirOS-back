FROM node:latest AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

RUN mkdir -p /app/env && echo "$PRODUCTION" > /app/env/production.env

COPY . .

RUN npm run build

FROM node:latest AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY ./package*.json ./

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]
