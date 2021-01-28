#!/usr/bin/env bash

# disable directory listing
chmod 1733 /dev/shm /tmp /var/tmp

service redis-server restart
service nginx restart
service ssh restart
rm -f /tmp/.X1-lock
Xvfb :1.0 &

# Start nginx
# service nginx restart

# Start workers
export DISPLAY=:1.0
sudo --set-home --user user strace -s 8192 -ff -eexecve node /home/user/app/worker.js &

# Start web server
sudo --set-home --user user node /home/user/app/server.js
