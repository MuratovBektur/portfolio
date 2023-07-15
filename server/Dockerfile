FROM node:18

WORKDIR /app

# this is so that commands executed inside the  docker-container 
# do not change the owner of the folder on the host
ARG WWWGROUP=1000
ARG WWWUSER=1000

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]