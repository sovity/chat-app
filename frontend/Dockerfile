FROM node:20-alpine
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --chown=nextjs:nodejs .env.prod .env
COPY --chown=nextjs:nodejs public ./public
COPY --chown=nextjs:nodejs .next/standalone .
COPY --chown=nextjs:nodejs .next/static .next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD node server.js
