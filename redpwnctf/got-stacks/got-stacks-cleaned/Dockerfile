FROM ubuntu:latest

RUN apt-get update
RUN apt-get -y install curl gnupg mysql-server mysql-client

RUN mkdir /var/run/mysqld
RUN find /var/lib/mysql -type f -exec touch {} \; 
RUN chown -R mysql:mysql /var/lib/mysql /var/run/mysqld
RUN echo "[mysqld]" >> /etc/mysql/my.cnf
RUN echo "secure_file_priv=\"/home/ctf\"" >> /etc/mysql/my.cnf

RUN curl -sL https://deb.nodesource.com/setup_13.x  | bash
RUN apt-get -y install nodejs

RUN mkdir -p /home/ctf/app
COPY ./flag.txt /home/ctf
COPY ./app /home/ctf/app
RUN chmod 777 /home/ctf/app/db

WORKDIR /home/ctf/app

RUN npm install

COPY ./runall.sh /home/ctf/app
RUN chmod +x runall.sh

ENTRYPOINT ["./runall.sh"]