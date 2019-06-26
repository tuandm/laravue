/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const excelRoutes = {
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'Excel',
  meta: {
    title: 'excel',
    icon: 'excel',
    permissions: ['view menu excel'],
  },
  children: [
    {
      path: 'export-excel',
      component: () => import('@/views/excel/ExportExcel'),
      name: 'exportExcel',
      meta: { title: 'exportExcel' },
    },
    {
      path: 'export-selected-excel',
      component: () => import('@/views/excel/SelectExcel'),
      name: 'SelectExcel',
      meta: { title: 'selectExcel' },
    },
    {
      path: 'export-merge-header',
      component: () => import('@/views/excel/MergeHeader'),
      name: 'MergeHeader',
      meta: { title: 'mergeHeader' },
    },
    {
      path: 'upload-excel',
      component: () => import('@/views/excel/UploadExcel'),
      name: 'UploadExcel',
      meta: { title: 'uploadExcel' },
    },
  ],
};

export default excelRoutes;
