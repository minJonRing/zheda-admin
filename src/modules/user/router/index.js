import Layout from '@/layout'
export const route = {
  component: 'User',
  meta: {
    title: '专家团队',
    icon: 'education'
  },
  children: [
    {
      component: 'UserList',
      meta: {
        title: '专家团队'
      },
    },
    {
      component: 'UserAdd',
      hidden: true,
      meta: {
        title: '新增'
      },
    },
    {
      component: 'UserEdit',
      hidden: true,
      meta: {
        title: '编辑'
      },
    },
    {
      component: 'UserSee',
      hidden: true,
      meta: {
        title: '查看'
      },
    }
  ]
}

export const component = {
  User: {
    path: '/user',
    component: Layout,
  },
  UserList: {
    path: 'list',
    component: () => import('@/modules/user/views/list'),
  },
  UserAdd: {
    path: 'add',
    component: () => import('@/modules/user/views/add'),
  },
  UserEdit: {
    path: 'edit',
    component: () => import('@/modules/user/views/edit'),
  },
  UserSee: {
    path: 'see',
    component: () => import('@/modules/user/views/see'),
  }
}

export default {
  route,
  component
}