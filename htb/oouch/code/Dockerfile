FROM python:3.7-slim

RUN set -ex \
    && apt clean \
    && apt -y update
    
RUN set -ex \
    && apt -y install nginx \
    && apt -y install python3-dev \
    && apt -y install build-essential \
    && apt -y install default-libmysqlclient-dev \
    && apt -y install openssh-server \
    && apt -y install python3-dbus


RUN set -ex \
    && rm -f /etc/ssh/ssh_host_ecdsa_key /etc/ssh/ssh_host_rsa_key \
    && ssh-keygen -q -N "" -t dsa -f /etc/ssh/ssh_host_ecdsa_key \
    && ssh-keygen -q -N "" -t rsa -f /etc/ssh/ssh_host_rsa_key \
    && adduser --disabled-password --gecos "" qtc \
    && mkdir /home/qtc/.ssh \
    && chown -R qtc:qtc /home/qtc/.ssh \
    && chmod -R 700 /home/qtc/.ssh \
    && chsh -s /bin/bash qtc

RUN mkdir /code/
WORKDIR /code/
ADD . /code/

COPY authorized_keys /home/qtc/.ssh/authorized_keys
RUN chown qtc:qtc /home/qtc/.ssh/authorized_keys
RUN chmod 400 /home/qtc/.ssh/authorized_keys
COPY nginx.conf /etc/nginx

RUN set -ex \
    && pip install -r requirements.txt --src /usr/local/src


RUN chmod +x ./start.sh
CMD ["./start.sh"]
