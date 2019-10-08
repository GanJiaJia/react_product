import { Form, Spin } from 'antd';
import React, { Fragment, ReactNode } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { FundHistoryForm, getColumns } from './until';

import Mtable from '@/components/Mtable';
import styles from './style.less';
// import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

interface StateType {
  [propName: string]: any;
}

const selectTimeChange = (values: any, dates: any): void => {
  console.log(dates);
};

class FundHistory extends React.Component<StateType> {
  public refMtable: any;

  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
  }

  public state = {
    effectParams: {
      bankName: undefined,
      bankCard: undefined,
    },
  };

  // 重置查询条件
  public resetForm() {
    this.props.form.resetFields();
    this.setState(
      {
        effectParams: {
          bankName: undefined,
          bankCard: undefined,
        },
      },
      () => {
        // this.refMtable && this.refMtable.bindEffects();
        if (this.refMtable) {
          this.refMtable.bindEffects();
        }
      },
    );
  }

  public render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { historyData } = this.props.fund;
    const { loading } = this.props;
    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={loading}>
          <FundHistoryForm
            getFieldDecorator={getFieldDecorator}
            selectTimeChange={selectTimeChange}
            resetForm={this.resetForm}
            handleSubmit={(e: React.SyntheticEvent) => {
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
              }
            }}
          />

          <Mtable
            columns={getColumns(this)}
            effectType="fund/historyEffect"
            effectParams={this.state.effectParams}
            dataSource={historyData}
            dispatch={this.props.dispatch}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedHistory = Form.create({ name: 'searchRecharge' })(FundHistory);

export default withRouter(
  connect(({ fund, loading }: { fund: any; loading: any }) => ({
    fund,
    loading: loading.effects['fund/historyEffect'],
  }))(WrappedHistory),
);
