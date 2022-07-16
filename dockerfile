FROM node:16 AS Node
COPY . /web
WORKDIR /web
RUN yarn &&  yarn build
ENTRYPOINT ["yarn"]
CMD [ "start"]