FROM ubuntu:trusty

RUN apt-get update && apt-get -y install \
  curl \
  git \
  nano \
  rsync \
  wget

## Node.js setup
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install -y nodejs

## Chrome w/xvfb
# From https://github.com/dockerfile/chrome/blob/master/Dockerfile
#RUN \
#  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
#  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
#  apt-get update && \
#  apt-get install -y google-chrome-stable xvfb && \
#  npm install -y -g selenium --standalone && \
#  rm -rf /var/lib/apt/lists/*

RUN	apt-get install -y chromium;\
	apt-get install -y xvfb ;\
 	npm install -y -g selenium --standalone;\
 	npm install -y -g selenium-server-standalone-jar

RUN apt-get install -y default-jre;\
    apt-get install -y openjdk-7-jre

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg --unpack google-chrome-stable_current_amd64.deb && \
    apt-get install -f -y

#RUN apt-get install unzip;\
#    wget -N http://chromedriver.storage.googleapis.com/2.10/chromedriver_linux64.zip -P ~/Downloads;\
#    unzip ~/Downloads/chromedriver_linux64.zip -d ~/Downloads;\
#    chmod +777 ~/Downloads/chromedriver;\
#    mv -f ~/Downloads/chromedriver /usr/local/bin/chromedriver
#    ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver;\
#    ln -s /usr/local/share/chromedriver /usr/bin/chromedriver

# Set up Chromedriver Environment variables
ENV CHROMEDRIVER_VERSION 2.20
ENV CHROMEDRIVER_DIR /chromedriver
RUN mkdir $CHROMEDRIVER_DIR

# Download and install Chromedriver
#RUN wget -q --continue -P $CHROMEDRIVER_DIR "http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip"
#RUN unzip $CHROMEDRIVER_DIR/chromedriver* -d $CHROMEDRIVER_DIR

# Put Chromedriver into the PATH
ENV PATH $CHROMEDRIVER_DIR:$PATH

#RUN webdriver-manager update --standalone

## Nightwatch
RUN npm install -g nightwatch
RUN    mkdir /nightwatchjs

# We need wget to download the custom version of Firefox, xvfb to have a virtual screen and Firefox so all necessary libraries are installed.

RUN apt-get -y install firefox
RUN apt-get -y install wget xvfb firefox

# Setting the Firefox version and installation directory through environment variables.
ENV FIREFOX_VERSION 40.0
ENV FIREFOX_DIR $HOME/firefox
ENV FIREFOX_FILENAME $FIREFOX_DIR/firefox.tar.bz2

# Create the Firefox directory, download the custom Firefox version from Mozilla and untar it.
RUN mkdir $FIREFOX_DIR
RUN wget -q --continue --output-document $FIREFOX_FILENAME "https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/${FIREFOX_VERSION}/linux-x86_64/en-US/firefox-${FIREFOX_VERSION}.tar.bz2"
RUN tar -xaf "$FIREFOX_FILENAME" --strip-components=1 --directory "$FIREFOX_DIR"

# Setting the PATH so our customer Firefox version will be used first
ENV PATH $FIREFOX_DIR:$PATH

COPY nightwatch.json /nightwatchjs/nightwatch.json
COPY tests           /nightwatchjs/tests  
ADD env.rb           /features/support/env.rb

WORKDIR /nightwatchjs  
