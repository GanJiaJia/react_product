import { Button, Form, List, Spin } from 'antd';
import React, { ReactNode } from 'react';

import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { InformationForm } from './until';
import { StateType } from '@/common-typings';
import styles from './style.less';
// eslint-disable-next-line import/no-extraneous-dependencies

const noBorderBottomStyle: StateType = {
  borderBottom: 'none',
};

class WarnRecharge extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.bindEffects();
  }

  public state = {};

  public bindEffects() {
    this.props.dispatch({
      type: 'fund/warnRechargeEffect',
      // 请求参数
      payload: {},
    });
  }

  // 提交添加请求
  public handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.setState(values, () => {
          this.bindEffects();
        });
        console.log(values);
      }
    });
  }

  public render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { warnRechargeData } = this.props.fund;
    const { loading } = this.props;
    return (
      <div>
        <Spin spinning={loading}>
          <List
            className={styles.warnRechargeList}
            size="large"
            dataSource={warnRechargeData.list}
            renderItem={(item: ReactNode) => (
              <List.Item style={noBorderBottomStyle}>
                {item ? item.text : null}
                <Button>删除</Button>
              </List.Item>
            )}
          />

          <div className={styles.warnRechargeFormWrap}>
            <h3>充值资金预警设置</h3>
            <div className={styles.warnRechargeForm}>
              <InformationForm getFieldDecorator={getFieldDecorator} onSubmit={this.handleSubmit} />
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

const WrappedWarn = Form.create({ name: 'warnRecharge' })(WarnRecharge);

export default withRouter(
  connect(({ fund, loading }: { fund: any; loading: any }) => ({
    fund,
    loading: loading.effects['fund/warnRechargeEffect'],
  }))(WrappedWarn),
);
