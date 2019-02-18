import Layout from '@/views/layout/Layout'

const appManageRouter = {
  path: '/appManage',
  component: Layout,
  redirect: 'noredirect',
  name: 'appManage',
  meta: {
    title: 'appManage',
    icon: 'peoples'
  },
  children: [
    {
      path: 'customStyles',
      component: () => import('@/views/appmanage/releaseManage/customStyles'),
      name: 'CustomStyles',
      meta: { title: 'customStyles' }
    },
    {
      path: 'gatedLaunch',
      component: () => import('@/views/appmanage/releaseManage/gatedLaunch'),
      name: 'GatedLaunch',
      meta: { title: 'gatedLaunch' }
    },
    {
      path: 'appDetail',
      component: () => import('@/views/appmanage/AppDetail'),
      name: 'AppDetail',
      meta: { title: 'appDetail' }
    },
    {
      path: 'channelMgr',
      component: () => import('@/views/appmanage/channelMgr'),
      name: 'ChannelMgr',
      meta: { title: 'channelMgr' }
    },
    {
      path: 'appNew',
      component: () => import('@/views/appmanage/appNew'),
      name: 'AppNew',
      meta: { title: 'appNew' },
      hidden: true
    },
    {
      path: 'appNewAppstore',
      component: () => import('@/views/appmanage/appNewAppstore'),
      name: 'AppNewAppstore',
      meta: { title: 'appNewAppstore' },
      hidden: true
    },
    {
      path: 'appNewWin',
      component: () => import('@/views/appmanage/appNewWin'),
      name: 'AppNewWin',
      meta: { title: 'appNewWin' },
      hidden: true
    }
  ]
}

export default appManageRouter
