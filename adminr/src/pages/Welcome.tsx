import React, { useEffect } from 'react';
import { Redirect } from 'umi';
import router from 'umi/router';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import NoPermisstion from '@/components/NoPermission';
import { isLogin } from '@/utils/auth';
import styles from './Welcome.less';
import { getRoutes } from '@/utils/resolvePermission';
import Avatar from '@/components/GlobalHeader/AvatarDropdown';
import { heartbeat } from '@/pages/login/service';

const Welcome = (props: any): React.ReactNode => {
  if (!isLogin()) {
    return <Redirect to="/user/login"></Redirect>;
  }

  heartbeat();

  let permissionList: any =
    props.permissionList.length > 0 ? props.permissionList : localStorage.getItem('permissionList');
  if (typeof permissionList === 'string') {
    permissionList = JSON.parse(permissionList);
  }
  if (!permissionList) {
    return <NoPermisstion />;
  }
  // 筛选出子系统路由权限
  const routers: any = getRoutes(permissionList);
  document.title = '后台管理系统';
  return routers.length > 0 ? (
    <div className={styles.wrapStyles}>
      <div>
        <Avatar />
      </div>
      <ul>
        {routers.map((ele: any) => {
          if (!ele) {
            return <NoPermisstion />;
          }
          return (
            <li key={ele.path}>
              <div className={styles.cont}>
                <div className={styles.left}>{<Icon type={ele.iconType} />}</div>
                <div className={styles.liRight}>
                  <h2>{ele.flagName}</h2>
                  <p>{ele.word}</p>
                </div>
              </div>
              {/* {ele.children ? <Link to={defaultRoute}> 进入 </Link> : <a>暂无权限进入</a>} */}
              {ele.children ? (
                <a
                  onClick={() => {
                    sessionStorage.setItem('SYSTEM_TYPE', ele.path);
                    router.push(`${ele.path}/navigation`);
                  }}
                >
                  进入
                </a>
              ) : (
                <a>暂无权限进入</a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <NoPermisstion />
  );
};

export default withRouter(
  connect(({ userLogin }: { userLogin: any }) => ({
    permissionList: userLogin.permissionList,
  }))(Welcome),
);
// export default Welcome;
