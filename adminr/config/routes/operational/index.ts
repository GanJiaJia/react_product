interface anyProps {
  [propName: string]: any;
}

let OperationRoutes: anyProps;

OperationRoutes = {
  path: '/operational',
  component: '../layouts/BasicLayout.tsx',
  Routes: ['src/pages/Authorized'],
  authority: ['admin', 'user'],
  flagName: '运营系统',
  word: '生命就像一盒巧克力，结果往往出人意料。',
  iconType: 'credit-card',
  routes: [
    {
      component: './404',
    },
  ],
};
export default OperationRoutes;
