// import { formatMessage } from 'umi-plugin-react/locale';
import React, { CSSProperties } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { ConnectProps, ConnectState } from '@/models/connect';
// import { Icon, Tooltip } from 'antd';

import Avatar from './AvatarDropdown';
// import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import Warn from './Warn';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const spanStyle: CSSProperties = {
  cursor: 'pointer',
  color: '#1890FF',
  fontSize: '15px',
  position: 'absolute',
  left: '100px',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;
  // const SYSTEM_TYPE = sessionStorage.getItem('SYSTEM_TYPE');
  // const QUICK_NAVIGATION = `${SYSTEM_TYPE}/navigation`;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <div className={className}>
      {/* {window.location.pathname !== QUICK_NAVIGATION ? (
        <Link to={QUICK_NAVIGATION} style={spanStyle}>
          便捷导航
        </Link>
      ) : (
        <span style={spanStyle}>便捷导航</span>
      )} */}
      <Link to="/" style={spanStyle}>
        子系统导航
      </Link>
      {/* <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder={formatMessage({
          id: 'component.globalHeader.search',
        })}
        dataSource={[
          formatMessage({
            id: 'component.globalHeader.search.example1',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example2',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example3',
          }),
        ]}
        onSearch={value => {
          console.log('input', value);
        }}
        onPressEnter={value => {
          console.log('enter', value);
        }}
      /> */}
      {/* <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip> */}
      <Warn />
      <Avatar />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings, fund }: { settings: any; fund: any }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);