FROM java:8

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

RUN    mkdir /app

COPY package.json 	/app/package.json
COPY protractor.conf.js /app/protractor.conf.js
COPY index              /app/index



RUN 	npm install -y -g protractor;\
    	apt-get update;\
        npm install -y -g phantomjs;\
        npm install -y -g selenium-server-standalone-jar 

RUN cd /app;\
    npm install

RUN webdriver-manager update

WORKDIR /app