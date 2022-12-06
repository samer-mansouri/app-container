FROM node:14

# Working Dir
WORKDIR /app

# Copy Package Json Files
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 5000

CMD ["npm", "start"]