interface anyProps {
  [propName: string]: any;
}

let ManageRoutes: anyProps;

ManageRoutes = {
  path: '/manage',
  component: '../layouts/BasicLayout.tsx',
  Routes: ['src/pages/Authorized'],
  authority: ['admin', 'user'],
  flagName: '用户管理系统',
  word: '那时候我只会想自己想要什么，从不想自己拥有什么',
  iconType: 'crown',
  routes: [
    {
      component: './404',
    },
  ],
};
export default ManageRoutes;
