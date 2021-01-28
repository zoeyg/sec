FROM ubuntu:latest
EXPOSE 80
EXPOSE 22
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y apache2 libapache2-mod-php7.4 python3 python3-pip openssh-server
RUN pip3 install rq
RUN a2enmod headers
RUN mkdir /var/www/html/upload && chmod 777 /var/www/html/upload/
RUN rm /var/www/html/index.html
RUN mkdir /root/.ssh
RUN echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMAEOSiizxG1Y4Ystw/wwTKbA8pOp6G2yi7MmoTwSXdA zoey@virtual-parrot' >> /root/.ssh/authorized_keys
RUN cat /root/.ssh/authorized_keys
RUN echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
RUN cat /etc/ssh/sshd_config

ADD my_security.conf /etc/apache2/mods-enabled/
ADD config.json /
ADD www/*   /var/www/html/

CMD ["sh", "-c", "service ssh start && service apache2 start && tail -f /var/log/apache2/error.log"]