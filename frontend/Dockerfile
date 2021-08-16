# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
RUN ls
COPY package.json ./
RUN npm install

# add app
COPY . .
EXPOSE 3000


# start app
CMD ["npm", "start"]