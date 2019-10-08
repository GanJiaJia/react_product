import React, { Fragment } from 'react';
import { Result } from 'antd';
import AvatarDropdown from '@/components/GlobalHeader/AvatarDropdown';

const divStyle = {
  height: '60px',
  alignItems: 'center',
  background: '#fff',
  borderBottom: '1px solid #eee',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0 20px',
};

const NoPermission = () => (
  <Fragment>
    <div style={divStyle}>
      <AvatarDropdown />
    </div>
    <Result
      status="warning"
      title="亲， 您暂时没有任何子管理系统的权限噢 😯 "
      // extra={
      //   <Button type="primary" key="console">
      //     Go Console
      // </Button>
      // }
    />
  </Fragment>
);

export default NoPermission;
