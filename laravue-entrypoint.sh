#!/bin/sh
composer install && php artisan jwt:secret
yarn install && yarn run dev

php artisan serve --host 0.0.0.0

