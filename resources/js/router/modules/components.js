/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const componentRoutes = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component',
    permissions: ['view menu components'],
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
      path: 'back-to-top',
      component: () => import('@/views/components-demo/BackToTop'),
      name: 'BackToTopDemo',
      meta: { title: 'backToTop' },
    },
    {
      path: 'count-to',
      component: () => import('@/views/components-demo/CountTo'),
      name: 'CountToDemo',
      meta: { title: 'countTo' },
    },
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/Mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: 'componentMixin' },
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/DragDialog'),
      name: 'DragDialogDemo',
      meta: { title: 'dragDialog' },
    },
    {
      path: 'drag-select',
      component: () => import('@/views/components-demo/DragSelect'),
      name: 'DragSelectDemo',
      meta: { title: 'dragSelect' },
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/components-demo/DndList'),
      name: 'DndListDemo',
      meta: { title: 'dndList' },
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/DragKanban'),
      name: 'DragKanbanDemo',
      meta: { title: 'dragKanban' },
    },
  ],
};

export default componentRoutes;
