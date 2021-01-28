#!/bin/sh

echo "Starting ssh"
service ssh restart

echo "starting php"
/etc/init.d/php7.3-fpm start && \

echo "starting nginx"
nginx -g 'daemon off;' &

echo "Starting terminal"
bash