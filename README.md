# Laravue

## Introduction
[Laravue](http://laravue.cipherpols.com) is a beautiful dashboard based on [Laravel](https://laravel.com/), [vue](https://github.com/vuejs/vue) and use the UI Toolkit [element](https://github.com/ElemeFE/element).

This Laravel-Vue project is inspired by the awesome [vue-element-admin](http://panjiachen.github.io/vue-element-admin) (many thanks to [PanJiaChen](https://github.com/PanJiaChen) for the great works). Newest development stack of Laravel/Vue such as i18n, Envoy, vue-router,.. will be applied into this project.

## Preparation
** [Node](http://nodejs.org/)

** [Git](https://git-scm.com/)

** [Laravel](https://laravel.com/)

The project is based on [ES2015+](http://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/zh-cn/), [vue-router](https://router.vuejs.org/zh-cn/), [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element).

## API
API will be served by Laravel. In this project, you need to run migration and data feeder to generate sample data for authentication/authorization, other APIs will be faked.

## Getting started
You have to check installation guide of Laravel (https://laravel.com/docs/5.7)

```bash
# Clone the project
git clone https://github.com/tuandm/laravue.git

# Composer
composer install

# Migration and DB seeder (after changing your .env)
php artisan migrate --seed

# install dependency
npm install

# develop
npm run dev
```

## Deployment and/or CI/CD
This project uses [Envoy](https://laravel.com/docs/5.7/envoy) for deployment, and [GitLab CI/CD](https://about.gitlab.com/product/continuous-integration/). Please check `Envoy.blade.php` and `.gitlab-ci.yml` for more detail.

## LICENSE
[MIT](https://github.com/tuandm/laravue/blob/master/LICENSE)

Copyright (c) 2019 Tuan Duong

[PanJiaChen's MIT LICENSE](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)
