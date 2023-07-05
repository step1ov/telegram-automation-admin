# BETALIFE Admin Panel

Клиентская часть панели управления системы администрирования приложения BETALIFE.
Разработан на базе фреймворка [Next.js](https://nextjs.org/).

## Перед установкой

В качестве бэкенда используется отдельный сервер на [Nest](https://github.com/nestjs/nest).
Для работы приложения необходимо указать эндпойтн сервера в файле окружения **.env.local** в переменной **NEXT_PUBLIC_API_SERVER_URL**
Пример файла с переменными окружения

```bash
NEXT_PUBLIC_API_SERVER_URL=https://betalife-admin-server.com
```

## Установка
Для установки пакетов перейдите в каталог проекта и выполните команду
```bash
$ yarn
```
либо
```bash
$ npm install
```

## Запуск и билд
Для запуска приложения в режиме отладки выполните команду
```bash
# development
# watch mode
$ yarn dev
```
либо
```bash
$ npm run dev
```
Для билда и запуска приложения вызовите
```bash
# production mode
$ yarn build
$ yarn start
```
либо
```bash
# production mode
$ npm run build
$ npm run start
```
