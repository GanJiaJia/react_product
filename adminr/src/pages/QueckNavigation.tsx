import React, { useState } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './QueckNavigation.less';
import { GOOD_MORNING_WISH_WORD } from '@/const/wishWord';
import { T_SYSTEM_TYPE } from '@/const/PerssionRouter';
import { toTime } from '@/utils/tools';
import { LAST_LEVEL_ROUTES } from '@/utils/resolvePermission';

const avatar = require('../assets/avatar.gif');

const len = GOOD_MORNING_WISH_WORD.length;

const SYSTEM_TYPE: any = sessionStorage.getItem('SYSTEM_TYPE');
const ROUTES_ITEMS = LAST_LEVEL_ROUTES[SYSTEM_TYPE];

const Navagation = (props: any) => {
  // const [urlPath, setUrlPath] = useState(window.location.pathname);
  const navRoutes: any = [];
  let routesMap: any = props.routesMap ? props.routesMap : sessionStorage.getItem('routesMap');
  if (typeof routesMap === 'string') {
    routesMap = JSON.parse(routesMap);
  }

  // 将权限按钮存入store 权限菜单存入store
  const saveBtnsData = (path: any) => {
    // setUrlPath(path);
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

  Object.keys(ROUTES_ITEMS).forEach((ele: any) => {
    if (routesMap[ele] && routesMap[ele].path) {
      navRoutes.push(routesMap[ele]);
    }
  });

  const { userInfo } = props;
  return (
    <div className={styles.navigationWrap}>
      <div className={styles.navigation}>
        <div className={styles.navigationLeft}>
          <img src={avatar} alt="" />
          <div className={styles.navigationRightCont}>
            <h2>{GOOD_MORNING_WISH_WORD[Math.floor(Math.random() * len)]}</h2>
            <p>
              {' '}
              {userInfo.username} 值班 | seektop－{T_SYSTEM_TYPE[SYSTEM_TYPE].part} |
              {T_SYSTEM_TYPE[SYSTEM_TYPE].word}
            </p>
          </div>
        </div>
        <div className={styles.navigationRight}> 账号创建时间：{toTime(userInfo.createTime)} </div>
      </div>

      <h1>
        {/* <Link to="/" className={styles.blackColor}>
          首页
        </Link> */}
        <span className={styles.blackColor}>首页</span>
        <span> / </span>
        <span className={styles.blackColor}>便捷导航</span>
      </h1>

      <div className={styles.navWrap}>
        {navRoutes.map((ele: any) => (
          <a
            key={ele.path}
            onClick={() => {
              saveBtnsData(ele.path);
            }}
          >
            {' '}
            {ele.name}{' '}
          </a>
        ))}
      </div>
    </div>
  );
};

export default withRouter(
  connect(({ userLogin, global }: { userLogin: any; global: any }) => ({
    userInfo: userLogin.userInfo,
    btns: global.btns,
    routesMap: global.routesMap,
  }))(Navagation),
);
