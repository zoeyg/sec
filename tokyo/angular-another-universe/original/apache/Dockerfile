FROM httpd:2.4

RUN echo "Include conf/app.conf" >> /usr/local/apache2/conf/httpd.conf
RUN sed -i \
        -e 's/^#\(LoadModule .*mod_proxy.so\)/\1/' \
        -e 's/^#\(LoadModule .*mod_proxy_http.so\)/\1/' \
        conf/httpd.conf

COPY app.conf /usr/local/apache2/conf/app.conf
