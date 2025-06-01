FROM node:18-alpine     

WORKDIR /app             

COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev   

COPY . .

ENV PORT=3000
EXPOSE 3000              

CMD ["node", "backend/server.js"]