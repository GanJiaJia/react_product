import { Form, Spin } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';

import { getColumns, ReportForm, TableFooter } from '../until';
import styles from '../style.less';
import { StateType } from '@/common-typings';
import Mtable from '@/components/Mtable';

// eslint-disable-next-line import/no-extraneous-dependencies

class Report extends React.Component<StateType> {
  public refMtable: any;

  public allExportPermission = 'new-finance-report-withdraw-all-export';

  public exportPermission = 'new-finance-report-withdraw-export';

  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getMerchantList();
    this.getFooterData();
  }

  public state = {
    effectParams: {},
  };

  public getMerchantList() {
    this.props.dispatch({
      type: 'report/merchantListEffect',
      payload: {},
    });
  }

  public getFooterData() {
    this.props.dispatch({
      type: 'report/withdrawReportFooterEffect',
      payload: this.state.effectParams,
    });
  }

  public handleDateChange(date: any, value: any) {
    this.setState({
      effectParams: {
        channelId: -1,
        date: value,
      },
    });
  }

  // 重置查询条件
  public resetForm() {
    this.props.form.resetFields();
    this.setState(
      {
        effectParams: {
          channelId: -1,
          date: undefined,
        },
      },
      () => {
        this.refMtable.bindEffects(() => {
          this.getFooterData();
        });
      },
    );
  }

  public render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { withdrawData, merchantList, withdrawTotal } = this.props.report;
    const { loading } = this.props;
    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={loading}>
          <ReportForm
            getFieldDecorator={getFieldDecorator}
            resetForm={this.resetForm}
            merchantList={merchantList}
            onDateChange={this.handleDateChange}
            handleSubmit={(e: React.SyntheticEvent) => {
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
                this.getFooterData();
              }
            }}
          />

          <Mtable
            columns={getColumns(this, '提现总额', '提现笔数', 'totalWithdrawAmount')}
            effectType="report/withdrawReportEffect"
            effectParams={this.state.effectParams}
            pageSize={20}
            dataSource={withdrawData}
            dispatch={this.props.dispatch}
            ref={(element: any) => {
              this.refMtable = element;
            }}
            footer={() => <TableFooter refMtable={this.refMtable} total={withdrawTotal} />}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedHistory = Form.create({ name: 'searchWithdraw' })(Report);

export default withRouter(
  connect(({ report, loading, global }: { report: any; loading: any; global: any }) => ({
    report,
    loading: loading.effects['report/withdrawReportEffect'],
    btns: global.btns,
  }))(WrappedHistory),
);
