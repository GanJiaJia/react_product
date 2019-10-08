export default {
  path: '/finance/withdraw',
  name: 'withdraw',
  icon: 'bank',
  routes: [
    {
      // 提现出款
      path: '/finance/withdraw/payment',
      name: 'payment',
      exact: true,
      component: './finance/withdraw/payment',
    },
    {
      // 提现审核
      path: '/finance/withdraw/examine',
      name: 'examine',
      exact: true,
      component: './finance/withdraw/examine',
    },
    {
      // 提现分单
      path: '/finance/withdraw/seperate',
      name: 'seperate',
      exact: true,
      component: './finance/withdraw/seperate',
    },
    {
      // 提现订单记录
      path: '/finance/withdraw/history',
      name: 'history',
      exact: true,
      component: './finance/withdraw/history',
    },
    {
      // 提现相关设置
      path: '/finance/withdraw/setting',
      name: 'setting',
      component: './finance/withdraw/setting',
    },
    {
      // 提现分单设置
      path: '/finance/withdraw/orserSetting',
      name: 'orserSetting',
      component: './finance/withdraw/orserSetting',
    },
    {
      // 三方商户设置
      path: '/finance/withdraw/third',
      name: 'third',
      exact: true,
      component: './finance/withdraw/third',
    },
    {
      component: './404',
    },
  ],
};
