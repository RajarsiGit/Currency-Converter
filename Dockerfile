# specify the node base image with your desired version node:<version>
FROM node:16

WORKDIR /usr/src/app

COPY package.json tsconfig.json ./

COPY public ./public

COPY src ./src

RUN npm install && npm install -g serve@12.0.0 && npm run build

# replace this with your application's default port
EXPOSE 5000

CMD [ "serve", "-s", "build" ]