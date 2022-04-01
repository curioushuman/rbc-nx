#!/bin/bash

# Double check Kafka
# DISABLED 2022-03-21 until new bus installed
# until node /usr/src/init/dist/src/index.js -c kafka
# do
#   echo 'Waiting for Kafka...\n'
#   sleep 2
# done

# start node based on ENV
if [ $NODE_ENV == "production" ]; then
  echo "Running in production..."
  node /usr/src/app/dist/subscriptions/main.js
else
  echo "Running in development..."
  # nest start --watch
  nest build --webpack --webpackPath webpack-hmr.config.js --path apps/subscriptions/tsconfig.build.json --watch
fi
