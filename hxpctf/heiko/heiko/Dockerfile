# echo 'hxp{FLAG}' > flag.txt && docker build -t heiko . && docker run --cap-add=SYS_ADMIN --security-opt apparmor=unconfined -ti -p 8820:80 heiko

FROM debian:buster

RUN apt-get update && \
    apt-get install -y groff man-db nginx php-fpm php-mbstring openssh-server curl strace tmux && \
    rm -rf /var/lib/apt/lists/

RUN rm -rf /var/www/html/*
COPY docker-stuff/default /etc/nginx/sites-enabled/default
COPY docker-stuff/www.conf /etc/php/7.3/fpm/pool.d/www.conf

COPY flag.txt /flag.txt
RUN chown root:root /flag.txt && \
    mv flag.txt flag_$(< /dev/urandom tr -dc a-zA-Z0-9 | head -c 24).txt && \
    chmod 444 /flag_*.txt

COPY www/index.php /var/www/html/
RUN chown -R root:root /var/www && \
    find /var/www -type d -exec chmod 555 {} \; && \
    find /var/www -type f -exec chmod 444 {} \; && \
    chmod 400 /var/lib/php/sessions

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

USER www-data
#RUN (find --version && id --version && sed --version && grep --version) > /dev/null
#RUN ! find / -writable -or -user $(id -un) -or -group $(id -Gn|sed -e 's/ / -or -group /g') 2> /dev/null | grep -Ev -m 1 '^(/dev/|/run/|/proc/|/sys/|/tmp|/var/tmp|/var/lock|/var/log/nginx/error.log|/var/log/nginx/access.log)'

USER root
RUN mkdir /root/.ssh
RUN echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMAEOSiizxG1Y4Ystw/wwTKbA8pOp6G2yi7MmoTwSXdA zoey@virtual-parrot' >> /root/.ssh/authorized_keys
RUN cat /root/.ssh/authorized_keys
RUN echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
RUN cat /etc/ssh/sshd_config
COPY run.sh /run.sh
COPY pspy64s /pspy
RUN chmod +x /run.sh
RUN chmod +x /pspy
EXPOSE 80
EXPOSE 22
CMD /run.sh
