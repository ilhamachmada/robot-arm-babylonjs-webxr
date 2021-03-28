FROM node:lts
RUN mkdir /tasandy
WORKDIR /tasandy
COPY package.json /tasandy
RUN npm install --save
COPY . /tasandy
CMD ["npm", "start"]
EXPOSE 8056