import Layout from '@/layout'
export const route = {
  component: 'Department',
  meta: {
    title: '内设处室',
    icon: 'education'
  },
  children: [
    {
      component: 'DepartmentIndex',
      meta: {
        title: '内设处室'
      },
    },
    {
      component: 'DepartmentAdd',
      meta: {
        title: '内设处室-添加'
      },
    },
    {
      component: 'DepartmentEdit',
      meta: {
        title: '内设处室-编辑'
      },
    },
  ]
}

export const component = {
  Department: {
    path: '/department',
    component: Layout,
  },
  DepartmentIndex: {
    path: 'list',
    component: () => import('@/modules/department/views/list'),
  },
  DepartmentAdd: {
    path: 'add',
    component: () => import('@/modules/department/views/add'),
  },
  DepartmentEdit: {
    path: 'edit',
    component: () => import('@/modules/department/views/edit'),
  },
}

export default {
  route,
  component
}