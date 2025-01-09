# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем git, чтобы клонировать репозитории
RUN apt-get update && apt-get install -y git

# Клонируем бэкенд репозиторий из текущего контекста
COPY . /app/backend/
WORKDIR /app/backend
RUN npm install
RUN npm run build

# Клонируем фронтенд репозитории из GitHub
RUN git clone https://github.com/Slipbang/albion-calculator-app-v1.git /app/frontend1
RUN git clone https://github.com/Slipbang/webdev-basics.git /app/frontend2

# Собираем frontend1
WORKDIR /app/frontend1
RUN npm install && npm run build

# Собираем frontend2
WORKDIR /app/frontend2
RUN npm install && npm run build:prod

# Создаём директорию для public_albionToolkit и копируем файлы из frontend1
RUN mkdir -p /app/backend/public_albionToolkit && cp -r /app/frontend1/build/* /app/backend/public_albionToolkit/

# Создаём директорию для public_webdevManual и копируем файлы из frontend2
RUN mkdir -p /app/backend/public_webdevManual && cp -r /app/frontend2/build/* /app/backend/public_webdevManual/

# Переходим обратно в бэкенд и запускаем его
WORKDIR /app/backend
CMD ["npm", "start"]

# Экспонируем порт для бэкенда
EXPOSE 10000
