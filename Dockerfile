FROM meteor/meteor-base:latest

WORKDIR /usr/src/app

COPY package.json ./
RUN meteor npm install

COPY . .