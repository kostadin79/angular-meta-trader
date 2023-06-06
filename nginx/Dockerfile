FROM node:16.20.0 AS build-stage
WORKDIR /app
ARG WS_SOCKET_URL
ENV WS_SOCKET_URL $WS_SOCKET_URL
COPY . /app/
RUN npm run add-socket
RUN npm install
RUN npm run build

FROM nginx:alpine
ARG PUBLIC_URL
ENV PUBLIC_URL $PUBLIC_URL
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/dist/angular-meta-trader/browser/ .
RUN rm index.html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/nginx/custom.conf /etc/nginx/conf.d/custom.conf

RUN if [ "$PUBLIC_URL" = "" ] ; then rm /etc/nginx/conf.d/custom.conf; else rm /etc/nginx/conf.d/default.conf; fi

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
