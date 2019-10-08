import { Form, Tabs } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { formatMessage } from 'umi-plugin-react/locale';
import { LARGE_LIMIT_TYPE, ORDINARY_LIMIT_TYPE } from '../data';

import OrdinaryTabPane from './components/ordinaryTabPane';
import { setCommonFun } from '@/utils/tools';

const { TabPane } = Tabs;

interface StateType {
  [propName: string]: any;
}

@setCommonFun
class Amount extends React.Component<StateType> {
  render(): ReactNode {
    return (
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        {/* 普通充值设置 */}
        <TabPane tab={formatMessage({ id: 'amount.tab-normal-set' })} key="1">
          <OrdinaryTabPane<> render={() => null} rechargeType={ORDINARY_LIMIT_TYPE} />
        </TabPane>
        {/* 大额充值设置 */}
        <TabPane tab={formatMessage({ id: 'amount.tab-large-set' })} key="2">
          <OrdinaryTabPane<> render={() => null} rechargeType={LARGE_LIMIT_TYPE} />
        </TabPane>
      </Tabs>
    );
  }
}

const AmountContainer = Form.create({ name: 'rechargeAmount' })(Amount);

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(AmountContainer),
);
