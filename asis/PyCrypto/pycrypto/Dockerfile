FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive 
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data

RUN apt update
RUN apt install -y wget
RUN apt-get install -y gnupg2
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt update
RUN apt install -y google-chrome-stable
RUN apt install -yqq unzip curl
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

RUN apt install -y python python-pip
RUN pip install flask==1.1.2
RUN pip install markdown2==2.3.8
RUN pip install pycrypto
RUN pip install flask_csp
RUN pip install selenium
RUN apt install -y sqlite3 libsqlite3-dev
RUN pip install pysqlite3

RUN apt install -y apache2
RUN apt install -y libapache2-mod-wsgi
RUN a2enmod wsgi

RUN mkdir -p /app
WORKDIR /app
ADD ./web/* ./

RUN mkdir templates
RUN mv ./flag.html ./templates/
RUN mkdir logs
RUN touch ./logs/error.log
RUN touch ./logs/access.log
ADD ./env/000-default.conf /etc/apache2/sites-available/

RUN chmod o+w /app
RUN chown www-data: /app/user.db

EXPOSE 8080
