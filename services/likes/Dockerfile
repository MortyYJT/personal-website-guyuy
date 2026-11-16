FROM node:24.19.0-alpine
WORKDIR /app
# No npm dependencies or build toolchain are needed by the service.
COPY services/likes/*.ts ./
RUN mkdir /data && chown node:node /data
USER node
EXPOSE 3001
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s CMD node -e "fetch('http://127.0.0.1:3001/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "main.ts"]
