FROM node:alpine
WORKDIR /usr/app/src
COPY package* .
RUN npm install
COPY . .
EXPOSE 1337
CMD node index.js
