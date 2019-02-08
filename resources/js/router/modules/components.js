/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/Tinymce'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/Markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'markdown' }
    },
    {
      path: 'json-editor',
      component: () => import('@/views/components-demo/JsonEditor'),
      name: 'JsonEditorDemo',
      meta: { title: 'jsonEditor' }
    },
  ]
}

export default componentsRouter
