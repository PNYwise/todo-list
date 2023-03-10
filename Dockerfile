FROM node:current-alpine3.17

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

# Bundle app source
COPY . .
RUN ls -al -R

ENV APP_NAME=todo-list
ENV APP_PORT=3030
ENV NODE_ENV="production"

ENV MYSQL_HOST=127.0.0.1
ENV MYSQL_PORT=3306
ENV MYSQL_DBNAME=todo-list
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=

EXPOSE ${APP_PORT}

CMD node build/index.js
