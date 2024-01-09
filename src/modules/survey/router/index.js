import Layout from '@/layout'
export const route = {
  component: 'Survey',
  meta: {
    title: '进入林勘',
    icon: 'education'
  },
  children: [
    {
      component: 'SurveyIndex',
      meta: {
        title: '进入林勘'
      },
    }
  ]
}

export const component = {
  Survey: {
    path: '/survey',
    component: Layout,
  },
  SurveyIndex: {
    path: 'index',
    component: () => import('@/modules/survey/views/index'),
  },
}

export default {
  route,
  component
}