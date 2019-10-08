export default {
  path: '/finance/adjust',
  name: 'adjust',
  icon: 'money-collect',
  routes: [
    {
      path: '/finance/adjust/Adjustment',
      name: 'adjustment',
      exact: true,
      component: './finance/adjust/adjustment',
    },
    {
      component: './404',
    },
  ],
};
