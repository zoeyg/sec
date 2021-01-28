#!/bin/bash

service mysql start

until mysql -uroot -e 'select 1'; do echo "waiting for mysql"; sleep 5; done

mysql -uroot -e "create database gotstacks"
cd ./db
mysql -uroot "gotstacks" < "setup.sql"
cd ..

node server.js

echo "setup done, running now"

tail -f /dev/null