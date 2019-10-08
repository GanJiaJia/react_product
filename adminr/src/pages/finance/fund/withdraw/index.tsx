import React from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Third from './Third';
// eslint-disable-next-line import/no-extraneous-dependencies

const { TabPane } = Tabs;

function callback(key: any): void {}

const Withdraw = (props: any) => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab={<FormattedMessage id="finance.fund.withdraw.tab.title.third" />} key="1">
      <Third render={(prop: any) => null} />
    </TabPane>
  </Tabs>
);

export default withRouter(Withdraw);
