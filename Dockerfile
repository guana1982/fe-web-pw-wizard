# Fase di Build
FROM node:16 AS build
WORKDIR /fe-web-pw-wizard
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build


# Fase di Deploy
FROM nginx:alpine
COPY --from=build /fe-web-pw-wizard/dist /usr/share/nginx/html/web-pw-wizard



EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
