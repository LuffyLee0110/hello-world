import Layout from '@/views/layout/Layout'

const teamRouter = {
  path: '/team',
  component: Layout,
  redirect: 'noredirect',
  name: 'teammanager',
  meta: {
    title: 'teamManage',
    icon: 'peoples'
  },
  children: [
    {
      path: 'users',
      component: () => import('@/views/teammanage/users'),
      name: 'UserManager',
      meta: { title: 'users' }
    },
    {
      path: 'roles',
      component: () => import('@/views/teammanage/roles'),
      name: 'RoleManager',
      meta: { title: 'roles' }
    },
    {
      path: 'teaminfo',
      component: () => import('@/views/teammanage/teaminfo'),
      name: 'TeamInfo',
      meta: { title: 'teaminfo' }
    }
  ]
}

export default teamRouter
