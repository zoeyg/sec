FROM php:7.4-cli
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

RUN apt-get install -y sendmail libpng-dev

RUN apt-get install -y \
        zlib1g-dev 

RUN docker-php-ext-install mbstring

RUN docker-php-ext-install zip

RUN docker-php-ext-install gd

CMD [ "php", "./your-script.php" ]