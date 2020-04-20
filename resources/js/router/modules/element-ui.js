import Layout from '@/layout';

const elementUiRoutes = {
  path: '/element-ui',
  component: Layout,
  redirect: '/element-ui/form',
  name: 'Element UI',
  meta: {
    title: 'elementUi',
    icon: 'layout',
    permissions: ['view menu element ui'],
  },
  children: [
    {
      path: 'form',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: { title: 'form', icon: 'form' },
    },
    {
      path: 'icons',
      component: () => import('@/views/icons/index'),
      name: 'Icons',
      meta: { title: 'icons', icon: 'el-icon-info', noCache: true },
    },
    {
      path: 'tab',
      component: () => import('@/views/tab'),
      name: 'Tab',
      meta: { title: 'tab', icon: 'tab' },
    },
  ],
};

export default elementUiRoutes;
