FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install fontconfig-config fonts-dejavu-core libfontconfig1 libfreetype6 libjpeg-turbo8 libjpeg8
RUN apt-get install libkrb5-dev -y
RUN apt-get install nodejs npm -y
RUN ln `which nodejs` /usr/bin/node
RUN npm install dalek-cli -g
WORKDIR /usr/src/app

COPY ./package.json package.json
RUN npm install

COPY ./login_add_funds.js   login_add_funds.js