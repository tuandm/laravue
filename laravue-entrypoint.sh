#!/bin/sh
ENV_FILE=".env"
MYSQL_HOST=$(cat $ENV_FILE | grep "DB_HOST" | cut -d"=" -f2)
MYSQL_PORT=$(cat $ENV_FILE | grep "DB_PORT" | cut -d"=" -f2)

composer install

echo "Wait for MySQL to be ready"
while true;
do
  nc -z $MYSQL_HOST $MYSQL_PORT && break
  sleep 1
done

php artisan passport:install

npm install && npm run dev

php artisan serve --host 0.0.0.0

