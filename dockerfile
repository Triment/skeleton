FROM node:16 AS Node
COPY . /web
WORKDIR /web
RUN npm i 
ENTRYPOINT ["npm"]
CMD ["run", "dev"]