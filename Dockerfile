FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

#Bundle app source
COPY . .

ENV APP_NAME=todo-list
ENV APP_PORT=3030

ENV MYSQL_HOST=127.0.0.1
ENV MYSQL_PORT=3306
ENV MYSQL_DBNAME=todo-list
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=

EXPOSE ${APP_PORT}

CMD [ "node", "build/index.js" ]
