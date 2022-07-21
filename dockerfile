FROM node:16 AS Node
COPY . /web
WORKDIR /web
RUN yarn config set registry https://registry.npm.taobao.org/ && yarn &&  yarn build
ENTRYPOINT ["yarn"]
CMD [ "start"]