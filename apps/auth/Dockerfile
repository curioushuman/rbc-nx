# TODO
# [ ] update prod stage to work based on changes made to dev
# [ ] if you build in dev, then add another stage called builder or similar

FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY ./dist/apps/auth/package*.json ./

# This is required as the current package.json is built incorrectly by nx
RUN sed -i 's/main\.js/apps\/auth\/main\.js/g' package.json

# Nx also doesn't currently include devDependencies in package.json
# When they do, this whole section (dev-nx) can be removed
RUN npm install && \
  npm install typescript @nestjs/cli @nestjs/schematics ts-node -g && \
  npm install tsconfig-paths ts-loader @types/node source-map-support

COPY ./dist/apps ./dist/apps
COPY ./dist/libs ./dist/libs

COPY ["./tsconfig.base.json", "./apps/auth/nest-cli.json", "./apps/auth/start.sh", "./"]
COPY ./libs ./libs
COPY ./apps/auth ./apps/auth

# RUN tsc --showConfig --project ./apps/auth/tsconfig.build.json

# RUN nest build

RUN chmod +x start.sh
CMD [ "sh", "start.sh" ]

FROM curioushuman/rbc-base:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./dist/apps/auth/package*.json ./

# There is no need for --production flag, as NODE_ENV is set
RUN npm install

# * Leave trailing slash on source so everything is copied
COPY --from=development /usr/src/app/dist ./
COPY ./apps/auth/start.sh ./start.sh

CMD [ "sh", "start.sh" ]
