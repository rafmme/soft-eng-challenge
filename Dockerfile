FROM node:14-alpine

LABEL maintainer="Timileyin Farayola: timileyin.farayola@gmail.com"

ENV PORT=3000

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
