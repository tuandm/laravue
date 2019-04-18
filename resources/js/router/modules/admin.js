/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const adminRoutes = {
  path: '/administrator',
  component: Layout,
  redirect: '/administrator/users',
  name: 'Administrator',
  meta: {
    title: 'administrator',
    icon: 'admin',
  },
  children: [
    {
      path: 'users/create',
      component: () => import('@/views/users/Create'),
      name: 'CreateUser',
      meta: { title: 'createUser', icon: 'create-user', noCache: true },
      hidden: true,
    },
    {
      path: 'users/edit/:id(\\d+)',
      component: () => import('@/views/users/Edit'),
      name: 'EditUser',
      meta: { title: 'editUser', noCache: true },
      hidden: true,
    },
    {
      path: 'users',
      component: () => import('@/views/users/List'),
      name: 'UserList',
      meta: { title: 'users', icon: 'user' },
    },
    {
      path: 'articles/create',
      component: () => import('@/views/articles/Create'),
      name: 'CreateArticle',
      meta: { title: 'createArticle', icon: 'edit' },
      hidden: true,
    },
    {
      path: 'articles/edit/:id(\\d+)',
      component: () => import('@/views/articles/Edit'),
      name: 'EditArticle',
      meta: { title: 'editArticle', noCache: true },
      hidden: true,
    },
    {
      path: 'articles',
      component: () => import('@/views/articles/List'),
      name: 'ArticleList',
      meta: { title: 'articleList', icon: 'list' },
    },
  ],
};

export default adminRoutes;
