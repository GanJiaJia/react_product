import { Form, Spin } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { getReportDetailColumns, ReportForm, TableFooter } from '../until';
import styles from '../style.less';
import { StateType } from '@/common-typings';
import Mtable from '@/components/Mtable';

class Report extends React.Component<StateType> {
  public refMtable: any;

  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getMerchantList();
    this.getFooterData();
  }

  public state = {
    effectParams: {
      channelId: -1,
      date: undefined,
    },
  };

  public getMerchantList() {
    this.props.dispatch({
      type: 'report/merchantListEffect',
      payload: {},
    });
  }

  public getFooterData() {
    this.props.dispatch({
      type: 'report/rechargeReportFooterEffect',
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
    const { rechargeData, merchantList, rechargeTotal } = this.props.report;
    const { loading } = this.props;
    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={loading}>

          <Mtable
            columns={getReportDetailColumns(this)}
            effectType="report/rechargeReportEffect"
            effectParams={this.state.effectParams}
            pageSize={20}
            dataSource={rechargeData}
            dispatch={this.props.dispatch}
            ref={(element: any) => {
              this.refMtable = element;
            }}
            footer={() => <TableFooter refMtable={this.refMtable} total={rechargeTotal} />}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedHistory = Form.create({ name: 'searchRecharge' })(Report);

export default withRouter(
  connect(({ report, loading, global }: { report: any; loading: any; global: any }) => ({
    report,
    loading: loading.effects['report/rechargeReportEffect'],
    btns: global.btns,
  }))(WrappedHistory),
);
