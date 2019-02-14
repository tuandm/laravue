/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Complex Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'drag-table',
      component: () => import('@/views/table/DragTable'),
      name: 'DragTable',
      meta: { title: 'dragTable' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/InlineEditTable'),
      name: 'InlineEditTable',
      meta: { title: 'inlineEditTable' }
    },
    {
      path: 'tree-table',
      component: () => import('@/views/table/TreeTable/TreeTable'),
      name: 'TreeTableDemo',
      meta: { title: 'treeTable' }
    },
    {
      path: 'custom-tree-table',
      component: () => import('@/views/table/TreeTable/CustomTreeTable'),
      name: 'CustomTreeTableDemo',
      meta: { title: 'customTreeTable' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/ComplexTable'),
      name: 'ComplexTable',
      meta: { title: 'complexTable' }
    },
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/DynamicTable/index'),
      name: 'DynamicTable',
      meta: { title: 'dynamicTable' }
    }
  ]
}
export default tableRouter
