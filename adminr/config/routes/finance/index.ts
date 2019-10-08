import withdrawRoutes from './withdraw';
import fundRoutes from './fund';
import reportRoutes from './report';
import rechargeRoutes from './recharge';
import adjustRoutes from './adjust';

interface anyProps {
  [propName: string]: any;
}

let FinanceRoutes: anyProps;

FinanceRoutes = {
  path: '/finance',
  component: '../layouts/BasicLayout.tsx',
  Routes: ['src/pages/Authorized'],
  authority: ['admin', 'user'],
  flagName: '财务系统',
  word: '在中台产品那是一种内在的东西， 他们到达不了，也无法触及的，那是你的。',
  iconType: 'pie-chart',
  routes: [
    {
      path: '/finance/navigation',
      name: 'home',
      icon: 'home',
      component: './QueckNavigation',
      exact: true,
      children: [],
    },
    withdrawRoutes,
    rechargeRoutes,
    fundRoutes,
    adjustRoutes,
    reportRoutes,
    {
      component: './404',
    },
  ],
};
export default FinanceRoutes;
