/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout';

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component',
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/Tinymce'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' },
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/Markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'markdown' },
    },
    {
      path: 'json-editor',
      component: () => import('@/views/components-demo/JsonEditor'),
      name: 'JsonEditorDemo',
      meta: { title: 'jsonEditor' },
    },
    {
      path: 'splitpane',
      component: () => import('@/views/components-demo/SplitPane'),
      name: 'SplitpaneDemo',
      meta: { title: 'splitPane' },
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/AvatarUpload'),
      name: 'AvatarUploadDemo',
      meta: { title: 'avatarUpload' },
    },
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/Dropzone'),
      name: 'DropzoneDemo',
      meta: { title: 'dropzone' },
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/Sticky'),
      name: 'StickyDemo',
      meta: { title: 'sticky' },
    },
    {
      path: 'count-to',
      component: () => import('@/views/components-demo/CountTo'),
      name: 'CountToDemo',
      meta: { title: 'countTo' },
    },
  ],
};

export default componentsRouter;
