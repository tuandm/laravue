import Layout from '@/layout';

const permissionRoutes = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'permission',
    icon: 'lock',
    roles: ['admin', 'editor'], // you can set roles in root nav
  },
  children: [
    {
      path: 'page',
      component: () => import('@/views/permission/Page'),
      name: 'PagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'], // or you can only set roles in sub nav
      },
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/Directive'),
      name: 'DirectivePermission',
      meta: {
        title: 'directivePermission',
        // if do not set roles, means: this page does not require permission
      },
    },
  ],
};

export default permissionRoutes;
