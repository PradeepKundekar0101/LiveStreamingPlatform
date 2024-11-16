FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get update && \
    apt-get install -y \
    nodejs \
    ffmpeg 
WORKDIR /home/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY src/ ./src/
CMD ["npm", "start"]