FROM node:23-slim AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build:docker && npm prune --omit=dev && ls -la dist/server/index.js dist/client/index.html

FROM nousresearch/hermes-agent:latest

USER root

RUN ARCH=$(dpkg --print-architecture) \
    && if [ "$ARCH" = "amd64" ]; then NODE_ARCH="x64"; else NODE_ARCH="$ARCH"; fi \
    && curl -fsSL "https://nodejs.org/dist/v23.11.0/node-v23.11.0-linux-${NODE_ARCH}.tar.gz" \
       -o /tmp/node.tar.gz \
    && tar -xzf /tmp/node.tar.gz -C /usr/local --strip-components=1 \
    && rm -f /tmp/node.tar.gz \
    && node --version

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

ENV NODE_ENV=production
ENV HOME=/home/agent
ENV HERMES_HOME=/home/agent/.hermes
ENV PATH=/opt/hermes/.venv/bin:$PATH

EXPOSE 6060

ENTRYPOINT ["node", "dist/server/index.js"]
CMD []
