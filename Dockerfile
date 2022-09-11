FROM node:16

COPY . /workspace
WORKDIR /workspace

RUN yarn run install && yarn run build
EXPOSE 1337
EXPOSE 3000
CMD [ "yarn", "run", "start"]