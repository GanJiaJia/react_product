export default {
  path: '/finance/fund',
  name: 'fund',
  icon: 'account-book',
  routes: [
    // {
    //   path: '/finance/fund/recharge',
    //   name: 'recharge',
    //   exact: true,
    //   component: './finance/fund/recharge',
    // },
    {
      path: '/finance/fund/withdraw',
      name: 'withdraw',
      exact: true,
      component: './finance/fund/withdraw',
    },
    // {
    //   path: '/finance/fund/information',
    //   name: 'asset',
    //   exact: true,
    //   component: './finance/fund/information',
    // },
    // {
    //   path: '/finance/fund/history',
    //   name: 'history',
    //   exact: true,
    //   component: './finance/fund/fundHistory',
    // },
    {
      path: '/finance/fund/warn',
      name: 'warn',
      exact: true,
      component: './finance/fund/warn',
    },
    {
      component: './404',
    },
  ],
};
