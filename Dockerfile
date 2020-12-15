# "docker": "node ./seed.js && node ./server/index.js"
#########
# What image do you want to start building on?
FROM node:14-alpine

# Make a folder in your image where your app's source code can live
RUN mkdir -p /src/app

# Tell your container where your app's source code will live
WORKDIR /src/app

# What source code do you what to copy, and where to put it?
COPY package*.json

# Does your app have any dependencies that should be installed?
RUN npm install

COPY . .

# What port will the container talk to the outside world with once created?
EXPOSE 8020

# How do you start your app?
CMD npm run production && npm run start