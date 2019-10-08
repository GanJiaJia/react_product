import FinaceRoutes from './finance';
import RiskRoutes from './risk';
import ManageRoutes from './manage';
import OperationRoutes from './operational';

// 此处不需要改动
export const AllRoutes: Array<any> = [
  {
    path: '/user/login',
    component: '../layouts/UserLayout.tsx',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/user/login',
        name: 'welcome',
        icon: 'smile',
        // component: './user/login',
        component: './login',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/',
    component: '../layouts/BlankLayout.tsx',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    exact: true,
    routes: [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
        exact: true,
      },
      {
        component: './404',
      },
    ],
  },

  {
    component: './404',
  },
];

// 此处倒入子系统路由后需要增加进来
export const pageRoutes = [RiskRoutes, OperationRoutes, ManageRoutes, FinaceRoutes];

// 此处不需要改动
export const Routers = [...pageRoutes, ...AllRoutes];
// console.log(Routers);
