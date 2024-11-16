FROM node:18-bullseye
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    curl \
    ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "start"]