FROM node:alpine

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .

ENV MONGODB_URL=mongodb+srv://oralpath:Oralpath123@cluster0.msq551o.mongodb.net/oralpathDB?retryWrites=true&w=majority
ENV NODE_ENV=production
ENV PORT=4000

RUN npm run build


CMD ["npm", "run", "start"]