#!/bin/bash
service ssh start
service nginx start
uwsgi --ini uwsgi.ini --chmod-sock=666
