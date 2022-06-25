FROM lmalinowska/devops-projekt-front as build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

