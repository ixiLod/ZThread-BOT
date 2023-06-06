FROM node:20-alpine

LABEL maintainer="ixiLod"

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]
