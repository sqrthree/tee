FROM node:lts-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production --no-progress --silent --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
