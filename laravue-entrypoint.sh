#!/bin/sh
composer install && php artisan passport:install
npm install && npm run dev

php artisan serve --host 0.0.0.0

