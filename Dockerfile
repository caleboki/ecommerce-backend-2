FROM node:18.18.2

WORKDIR /usr/src/app

# This will ensure that both npm and node commands are available in the container
CMD [ "bash" ]
