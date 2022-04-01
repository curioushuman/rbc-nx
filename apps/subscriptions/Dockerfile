# ! This Dockerfile will only run successfully as part of a Kubernetes cluster
# See k8s for helm charts, and skaffold.dev for dev setup

# TODO
# [ ] update prod stage to work based on changes made to dev
# [ ] if you build in dev, then add another stage called builder or similar

## Dev stage
FROM node:16-alpine AS development

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to /usr/src/app
# ! Currently Nx doesn't give us a lock file :(
COPY ./dist/apps/subscriptions/package.json ./
# ! We need to manually set the main value in the package.json
# as it is currently set incorrectly within package.json
RUN sed -i 's/main\.js/apps\/subscriptions\/main\.js/g' package.json

# Nx also doesn't currently include devDependencies in package.json
# When they do, this whole section (dev-nx) can be removed
RUN npm install && \
  npm install typescript @nestjs/cli @nestjs/schematics ts-node -g && \
  npm install tsconfig-paths ts-loader @types/node source-map-support \
  webpack-node-externals run-script-webpack-plugin webpack

COPY ./dist/apps ./dist/apps
COPY ./dist/libs ./dist/libs

COPY [ \
  "./tsconfig.base.json", \
  "./webpack-hmr.config.js", \
  "./apps/subscriptions/nest-cli.json", \
  "./apps/subscriptions/start.sh", \
  "./" \
  ]
COPY ./libs ./libs
COPY ./apps/subscriptions ./apps/subscriptions

RUN tsc --showConfig --project ./apps/subscriptions/tsconfig.build.json

# RUN nest build

RUN chmod +x start.sh
CMD [ "sh", "start.sh" ]

FROM curioushuman/rbc-base:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./dist/apps/subscriptions/package*.json ./

# There is no need for --production flag, as NODE_ENV is set
RUN npm install

# * Leave trailing slash on source so everything is copied
COPY --from=development /usr/src/app/dist ./
COPY ./apps/subscriptions/start.sh ./start.sh

CMD [ "sh", "start.sh" ]
