FROM nginx:alpine

COPY ./utils/site.template /etc/nginx/conf.d/default.conf
COPY ./build /var/www/public
