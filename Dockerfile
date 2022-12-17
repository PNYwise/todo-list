FROM node:14-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

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

CMD pm2-runtime start ecosystem.config.js
