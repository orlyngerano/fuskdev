FROM node:18-alpine AS builder

WORKDIR /usr/src/web

COPY public/ /usr/src/web/public
COPY src/ /usr/src/web/src
COPY package*.json /usr/src/web
COPY tsconfig.json /usr/src/web

#install dependencies
RUN npm install

#create production build
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

# use DOLLAR env to avoid variable conflict of nginx conf
ENV DOLLAR $

# env passed from compose
ARG APIURL
ENV APIURL $APIURL

# nginx config
COPY ./nginx/nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
# replace env variables in nginx conf
RUN  /bin/sh -c "envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf"

# Copy the built React app to Nginx's web server directory
COPY --from=builder /usr/src/web/build /usr/share/nginx/html

# start nginx
CMD ["nginx", "-g", "daemon off;"]