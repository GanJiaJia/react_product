export default {
  path: '/finance/report',
  name: 'report',
  icon: 'control',
  routes: [
    {
      path: '/finance/report/recharge',
      name: 'recharge',
      exact: true,
      component: './finance/report/recharge',
    },
    {
      path: '/finance/report/withdraw',
      name: 'withdraw',
      exact: true,
      component: './finance/report/withdraw',
    },
    {
      path: '/finance/report/transaction',
      name: 'transaction',
      exact: true,
      component: './finance/report/transaction',
    },
    {
      component: './404',
    },
  ],
};
