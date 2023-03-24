# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=production
ENV PORT=8081

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "index.js" ]
