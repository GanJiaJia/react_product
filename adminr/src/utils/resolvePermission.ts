import React from 'react';
import { pageRoutes } from '../../config/routes';

// 解析出具体的子系统对应的路由
export const getRoutes = (permissionList: any) => {
  const mapRoutes: any = {};

  pageRoutes.forEach((ele: any) => {
    mapRoutes[ele.path] = ele;
  });

  const newRoutes: any = [];
  if (permissionList && permissionList.length >= 0) {
    for (let i = 0; i < permissionList.length; i += 1) {
      const hasRouter = mapRoutes[permissionList[i].keyword.trim()];
      if (hasRouter.path === permissionList[i].keyword.trim() && permissionList[i].children) {
        hasRouter.children = permissionList[i].children;
        newRoutes.push(hasRouter);
      }
    }
  }
  return newRoutes;
};

// 处理路由与权限的映射关系
export const saveRouteMap = (routers: any) => {
  const allRoutes = {};
  const allPathObj = {};

  const getAllkeyword = (ele: any) => {
    if (ele.keyword && !ele.type) {
      allPathObj[ele.keyword] = {
        path: ele.keyword,
        name: ele.name,
      };
    }

    if (ele.keyword && !ele.type) {
      allPathObj[ele.keyword].btns = [];
      if (ele.children && ele.children[0].type) {
        for (let i = 0; i < ele.children.length; i += 1) {
          allPathObj[ele.keyword].btns.push(ele.children[i].keyword);
        }
      }
    }

    if (!ele.children) {
      return allPathObj;
    }

    ele.children.map((item: any) => getAllkeyword(item));
    return allPathObj;
  };

  for (let i = 0; i < routers.length; i += 1) {
    allRoutes[routers[i].path] = getAllkeyword(routers[i]);
  }

  const PATH_NAME = window.location.pathname.split('/')[1];
  if (PATH_NAME) {
    return allRoutes[`/${PATH_NAME}`];
  }
  return allRoutes;
};

// 检查权限
export const checkPermission = (btns: any, btn: any) => {
  btns = btns instanceof Array ? btns : [];
  const res = btns.find((ele: any) => ele === btn);
  // console.log(res);
  return res;
};

// 作为便捷导航的导航路由
export const LAST_LEVEL_ROUTES = {
  // 财务最后一层菜单
  '/finance': {
    '/finance/withdraw/examine': '/finance/withdraw/examine',
    '/finance/withdraw/history': '/finance/withdraw/history',
    '/finance/withdraw/orserSetting': '/finance/withdraw/orserSetting',
    '/finance/withdraw/payment': '/finance/withdraw/payment',
    '/finance/withdraw/seperate': '/finance/withdraw/seperate',
    '/finance/withdraw/setting': '/finance/withdraw/setting',
    '/finance/withdraw/third': '/finance/withdraw/third',

    '/finance/recharge/amount': '/finance/recharge/amount',
    '/finance/recharge/logs': '/finance/recharge/logs',
    '/finance/recharge/merchant-application': '/finance/recharge/merchant-application',
    '/finance/recharge/merchant-rate': '/finance/recharge/merchant-rate',
    '/finance/recharge/merchant-set': '/finance/recharge/merchant-set',
    '/finance/recharge/repair': '/finance/recharge/repair',
    '/finance/recharge/review': '/finance/recharge/review',

    // '/finance/fund/information': '/finance/fund/information',
    // '/finance/fund/recharge': '/finance/fund/recharge',
    '/finance/fund/warn': '/finance/fund/warn',
    '/finance/fund/withdraw': '/finance/fund/withdraw',

    '/finance/adjust/Adjustment': '/finance/adjust/Adjustment',

    '/finance/report/recharge': '/finance/report/recharge',
    '/finance/report/withdraw': '/finance/report/withdraw',
    '/finance/report/transaction': '/finance/report/transaction',
  },
};

// 给不是菜单的页面路由执行保存btns权限的高阶函数
export function saveBtns(target: any): any {
  return class extends target {
    // 保存按钮权限
    public saveBtns() {
      let routesMap: any = this.props.routesMap
        ? this.props.routesMap
        : sessionStorage.getItem('routesMap');
      if (typeof routesMap === 'string') {
        routesMap = JSON.parse(routesMap);
      }
      this.props.dispatch({
        type: 'global/saveBtnsData',
        payload: routesMap[window.location.pathname].btns || [],
      });
    }
  };
}
