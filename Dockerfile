FROM node:17-alpine
WORKDIR /app

COPY package*json /app



CMD ["npm" , "Start"]