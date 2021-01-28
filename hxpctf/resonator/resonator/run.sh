#!/bin/sh

/etc/init.d/php7.3-fpm start
nginx -g 'daemon off;' &
bash