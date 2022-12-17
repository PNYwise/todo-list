FROM node:16-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /usr/src/app/build ./build

ENV APP_NAME=todo-list
ENV APP_PORT=3030

ENV MYSQL_HOST=127.0.0.1
ENV MYSQL_PORT=3306
ENV MYSQL_DBNAME=todo-list
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=

EXPOSE ${APP_PORT}

CMD [ "node", "build/index.js" ]
