FROM node:18.16.0
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build
CMD ["yarn", "start"]
