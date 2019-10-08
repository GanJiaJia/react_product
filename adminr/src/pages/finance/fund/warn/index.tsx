import React from 'react';
import { Tabs } from 'antd';
import router from 'umi/router';
import { withRouter } from 'react-router-dom';
import Withdraw from './withdraw';
import Recharge from './recharge';
// import Information from './information';

const { TabPane } = Tabs;

const callback = (key: any): void => {
  router.push({
    pathname: '/finance/fund/warn',
    query: { id: key },
  });
};

const Warning = (props: any) => {
  const { id = '1' } = props.location.query;
  return (
    <Tabs defaultActiveKey={id} activeKey={id} onChange={callback}>
      {/* <TabPane tab="充值资金预警" key="1">
        <Recharge />
      </TabPane> */}
      <TabPane tab="提现资金预警" key="1">
        <Withdraw />
      </TabPane>
      {/* <TabPane tab="资管资金预警" key="2">
        <Information />
      </TabPane> */}
    </Tabs>
  );
};

export default withRouter(Warning);
