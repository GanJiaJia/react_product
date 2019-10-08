interface anyProps {
  [propName: string]: any;
}

let RiskRoutes: anyProps;

RiskRoutes = {
  path: '/risk',
  component: '../layouts/BasicLayout.tsx',
  Routes: ['src/pages/Authorized'],
  authority: ['admin', 'user'],
  flagName: '风控系统',
  word: '希望是一个好东西，也许是最好的，好东西是不会消亡的。',
  iconType: 'alert',
  routes: [
    {
      component: './404',
    },
  ],
};
export default RiskRoutes;
