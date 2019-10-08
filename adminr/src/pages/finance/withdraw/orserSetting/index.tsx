import React from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import Account from './account';
import SplitOrder from './splitOrder';
import WithdrawSetting from './withdraw';

const { TabPane } = Tabs;

function callback(key: any): void {}

const Withdraw = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="提现分单设置" key="1">
      <SplitOrder />
    </TabPane>
    <TabPane tab="分单账户设置" key="2">
      <Account />
    </TabPane>
    <TabPane tab="自动提现设置" key="3">
      <WithdrawSetting />
    </TabPane>
  </Tabs>
);

export default withRouter(Withdraw);
