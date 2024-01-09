import Layout from '@/layout'

export const route = {
  component: 'Jurisdiction',
  meta: {
    title: '权限管理',
    icon: 'education'
  },
  children: [
    {
      component: 'JurisdictionMenu',
      meta: {
        title: '菜单管理'
      },
    },
    {
      component: 'JurisdictionAuthority',
      meta: {
        title: '角色管理'
      },
    },
    {
      component: 'JurisdictionUser',
      meta: {
        title: '用户管理'
      },
    },
  ]
}


export const component = {
  Jurisdiction: {
    path: '/jurisdiction',
    component: Layout,
  },
  JurisdictionMenu: {
    path: 'menu',
    component: () => import('@/modules/jurisdiction/views/menu/index'),
  },
  JurisdictionAuthority: {
    path: 'role',
    component: () => import('@/modules/jurisdiction/views/role/index'),
  },
  JurisdictionUser: {
    path: 'user',
    component: () => import('@/modules/jurisdiction/views/user/index'),
  },
}

export default {
  route,
  component
}