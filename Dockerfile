FROM nginx:alpine

WORKDIR /usr/share/nginx/html
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf

ADD artifact.tar.gz .
