# ! This Dockerfile will only run successfully as part of a Kubernetes cluster
# See k8s for helm charts, and skaffold.dev for dev setup

# * Dev stage
FROM node:16-alpine AS development

# We're including this here, so Skaffold knows it's a node.js build
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to /usr/src/app
# ! Currently Nx doesn't give us a lock file :(
COPY ./dist/apps/auth/package.json ./
# ! We need to manually set the main value in the package.json
# as it is currently set incorrectly within package.json
RUN sed -i 's/main\.js/apps\/auth\/main\.js/g' package.json

# Nx also doesn't currently include devDependencies in package.json
# When they do, this whole section (dev-nx) can be removed
RUN npm install && \
  npm install typescript @nestjs/cli @nestjs/schematics ts-node -g && \
  npm install tsconfig-paths ts-loader @types/node source-map-support \
  webpack-node-externals run-script-webpack-plugin webpack

COPY ./dist/apps/auth ./dist/apps/auth
COPY ./dist/libs ./dist/libs

COPY [ \
  "./tsconfig.base.json", \
  "./webpack-hmr.config.js", \
  "./apps/auth/nest-cli.json", \
  "./apps/auth/start.sh", \
  "./" \
  ]
COPY ./libs ./libs
COPY ./apps/auth ./apps/auth

# This is here in case you want to check what config is being used
# RUN tsc --showConfig --project ./apps/auth/tsconfig.build.json

RUN chmod +x start.sh
CMD [ "sh", "start.sh" ]

# * Production stage
FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package.json ./

# There is no need for --production flag, as NODE_ENV is set
RUN npm install

# Copy the pre-built files from local
COPY ./dist/apps/auth ./dist/apps/auth
COPY ./dist/libs ./dist/libs

# ! This needs to be tested, as to whether or not permissions are correct
COPY --from=development /usr/src/app/start.sh ./

CMD [ "sh", "start.sh" ]
