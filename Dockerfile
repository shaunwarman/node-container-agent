FROM node:6

WORKDIR /var/www/node-agent/

RUN npm install node-container-agent

COPY node_modules /var/www/node-agent/

CMD ["./node_modules/node-container-agent/bin/nca.js"]
