import React from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import Common from './common';
import Proxy from './proxy';
import Currency from './currency';
import Big from './big';

const { TabPane } = Tabs;

function callback(key: any): void {}

const Setting = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="普通提现设置" key="1">
      <Common />
    </TabPane>
    <TabPane tab="大额提现设置" key="2">
      <Big />
    </TabPane>
    <TabPane tab="代理提现设置" key="3">
      <Proxy />
    </TabPane>
    <TabPane tab="提现通用设置" key="4">
      <Currency />
    </TabPane>
  </Tabs>
);

export default withRouter(Setting);
