export default {
  path: '/finance/recharge',
  name: 'recharge',
  icon: 'transaction',
  routes: [
    // 补单操作
    {
      path: '/finance/recharge/repair',
      name: 'repair',
      component: './finance/recharge/repair/index',
      exact: true,
    },
    // 补单审核
    {
      path: '/finance/recharge/review',
      name: 'review',
      component: './finance/recharge/review/index',
      exact: true,
    },
    // 充值记录
    {
      path: '/finance/recharge/logs',
      name: 'logs',
      component: './finance/recharge/logs/index',
      exact: true,
    },
    // 充值金额设置
    {
      path: '/finance/recharge/amount',
      name: 'amount',
      component: './finance/recharge/amount/index',
      exact: true,
      // routes: [
      //   // 普通金额设置
      //   {
      //     path: '/finance/recharge/amount/general',
      //     name: 'general',
      //     exact: true,
      //   },
      //   // 大额设置
      //   {
      //     path: '/finance/recharge/amount/large',
      //     name: 'large',
      //     exact: true,
      //   },
      // ],
    },
    // 三方商户设置
    {
      path: '/finance/recharge/merchant-set',
      name: 'merchant-set',
      component: './finance/recharge/merchantSet/index',
      exact: true,
    },
    // 三方商户应用
    {
      path: '/finance/recharge/merchant-application',
      name: 'merchant-application',
      component: './finance/recharge/merchantApplication/index',
      exact: true,
    },
    // 三方商户成功率
    {
      path: '/finance/recharge/merchant-rate',
      name: 'merchant-rate',
      component: './finance/recharge/merchantSuccessRate/index',
      exact: true,
    },
    {
      component: './404',
    },
  ],
};
