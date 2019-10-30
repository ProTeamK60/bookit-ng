FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/bookit-ng /usr/share/nginx/html/
