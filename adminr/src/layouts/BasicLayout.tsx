import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, useState, Fragment } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState, Dispatch } from '@/models/connect';
import { heartbeat } from '@/pages/login/service';
import { isAntDesignPro } from '@/utils/utils';
import { isLogin } from '@/utils/auth';
import NotFound from '@/pages/404';
import { getRoutes, saveRouteMap } from '@/utils/resolvePermission';
import logo from '../assets/logo.svg';
import { T_SYSTEM_TYPE } from '@/const/PerssionRouter';

interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
  [props: string]: any;
}

let timer;
if (isLogin()) {
  clearInterval(timer);
  timer = setInterval(() => heartbeat(), 60000);
} else {
  clearInterval(timer);
}

const footerRender: BasicLayoutProps['footerRender'] = _ => {
  if (!isAntDesignPro()) {
    return null;
  }
  return null;
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {

  const { dispatch, children, settings } = props;
  const systemType = sessionStorage.getItem('SYSTEM_TYPE');
  if (systemType) {
    settings.title = T_SYSTEM_TYPE[systemType].systemType;
  }

  let permissionList =
    props.permissionList.length > 0 ? props.permissionList : localStorage.getItem('permissionList');
  let newRouters: any = [];
  let routesMap: any = {};
  if (typeof permissionList === 'string') {
    permissionList = JSON.parse(permissionList);
  }
  newRouters = getRoutes(permissionList);
  routesMap = (newRouters && saveRouteMap(newRouters)) || {};
  const [urlPath, setUrlPath] = useState(window.location.pathname);
  const SYSTEM_TYPE = sessionStorage.getItem('SYSTEM_TYPE');
  // console.log(urlPath)
  useEffect(() => {
    if (dispatch) {
      // 获取权限数据 此处用回调获取权限数据比传props 更合适
      dispatch({
        type: 'userLogin/getPermissionListEffect',
        payload: {},
        fn: (data: any) => {
          // 为了传递页面初次加载时候的按钮权限数据给store
          newRouters = getRoutes(data);
          routesMap = (newRouters && saveRouteMap(newRouters)) || {};
          props.dispatch({
            type: 'global/saveBtnsData',
            payload: (routesMap[urlPath] && routesMap[urlPath].btns) || [],
          });
        },
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /** s
   * init variables
   */
  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
    const result = menuList.map((item: any) => {
      let localItem = {};
      // if (
      //   (routesMap[item.path] && routesMap[item.path].path) ||
      //   item.path === `${SYSTEM_TYPE}/navigation`
      // ) {
        const hasItem = {
          ...item,
          children: item.children ? menuDataRender(item.children) : [],
          btns: (routesMap[item.path] && routesMap[item.path].btns) || [],
        };
        localItem = { ...hasItem };
      // }
      return Authorized.check(item.authority, localItem, null) as MenuDataItem;
    });
    // console.log(result);
    return result;
  };

  // 将权限按钮存入store 权限菜单存入store
  const saveBtnsData = (path: any) => {
    setUrlPath(path);
    if (routesMap[path]) {
      props.dispatch({
        type: 'global/saveBtnsData',
        payload: routesMap[path].btns || [],
      });
      props.dispatch({
        type: 'global/saveRoutesMap',
        payload: routesMap,
      });
    }
    router.push(path);
  };

  const handleMenuCollapse = (payload: boolean): void =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });
  // loading = false;

  sessionStorage.setItem('routesMap', JSON.stringify(routesMap));

  return (
    <Fragment>
      {/* {routesMap[urlPath] || urlPath === `${SYSTEM_TYPE}/navigation` ?  */}
      { true ?
      (
        <ProLayout
          logo={logo}
          onCollapse={handleMenuCollapse}
          menuItemRender={(menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl) {
              return defaultDom;
            }
            return (
              <div
                onClick={() => {
                  saveBtnsData(menuItemProps.path);
                }}
                style={{ cursor: 'pointer' }}
              >
                {defaultDom}
              </div>
            );
            // return <Link to={menuItemProps.path}>{defaultDom}</Link>;
          }}
          breadcrumbRender={(routers = []) => [
            {
              path: '/',
              breadcrumbName: formatMessage({
                id: 'menu.home',
                defaultMessage: 'Home',
              }),
            },
            ...routers,
          ]}
          itemRender={(route, params, routes, paths) => {
            const first = routes.indexOf(route) === 0;
            return first ? (
              <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
            ) : (
              <span>{route.breadcrumbName}</span>
            );
          }}
          footerRender={footerRender}
          menuDataRender={menuDataRender}
          formatMessage={formatMessage}
          rightContentRender={rightProps => <RightContent {...rightProps} />}
          {...props}
          {...settings}
        >
          {children}
        </ProLayout>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default connect(({ global, settings, userLogin }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  permissionList: userLogin.permissionList,
}))(BasicLayout);
