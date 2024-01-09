export const localhost = [
    {
        component: 'User',
        name: '专家团队',
        meta: {
            title: '专家团队', icon: 'dashboard',
        },
        children: [
            {
                component: 'UserList',
                name: '专家团队',
                meta: {
                    title: '专家团队'
                },
            },
            {
                component: 'UserAdd',
                hidden: true
            },
            {
                component: 'UserEdit',
                hidden: true
            },
            {
                component: 'UserSee',
                hidden: true
            }
        ]
    },
    {
        component: 'Survey',
        meta: {
            title: '走进林勘', icon: 'dashboard',
        },
        children: [
            {
                component: 'SurveyIndex',
                meta: {
                    title: '走进林勘'
                },
            },
        ]
    },
    {
        component: 'Department',
        meta: {
            title: '内设处室', icon: 'dashboard',
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
                hidden: true,
                meta: {
                    title: '内设处室-添加'
                },
            },
            {
                component: 'DepartmentEdit',
                hidden: true,
                meta: {
                    title: '内设处室-编辑'
                },
            },
        ]
    }
]