import { Button, Form, Input, Spin, message } from 'antd';
import React, { ReactNode } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { AmountWrap, RechargeForm, getColumns, selectClass } from './until';

import BaseComponent from '@/components/BaseComponent';
import Edit from './Edit';
import Mtable from '@/components/Mtable';
import { StateType } from '@/common-typings';
import { currency } from '@/utils/tools';
import styles from './style.less';

class Recharge extends BaseComponent {
  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.okSaveEdit = this.okSaveEdit.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
    this.setFiltersParams = this.setFiltersParams.bind(this);
    this.refreshBalance();
  }

  public state = {
    showEditModal: false,
    effectParams: {
      channelName: undefined,
      merchantCode: undefined,
    },
    rowData: {},
    balance: 0,
    settlementFund: 0,
  };

  public setFiltersParams(filtes: any, sorter: any, cb: any) {
    const limitType = filtes.limitType ? filtes.limitType[0] : -1;
    const status = filtes.accountStatus ? filtes.accountStatus[0] : -1;
    this.setState(
      (preState: any) => ({
        effectParams: { ...preState.effectParams, limitType, status },
      }),
      () => {
        if (cb) {
          cb();
        }
      },
    );
  }

  // 确认编辑
  public okSaveEdit(params: any, cb) {
    const { dispatch } = this.props;
    const { id } = this.state.rowData;
    dispatch({
      type: 'fund/editRechargeDataEffect',
      payload: { ...params, id },
      fn: (res: any) => {
        this.setState({ showEditModal: false });
        this.refMtable.bindEffects();
        if (cb) {
          cb();
        }
      },
    });
  }

  // 重置查询条件
  public resetForm() {
    this.props.form.resetFields();
    this.setState({ effectParams: {} }, () => {
      this.refMtable.bindEffects();
    });
  }

  public refreshBalance(cb) {
    this.props.dispatch({
      // type: 'authority/jobEffect',
      type: 'fund/refreshBalanceEffect',
      payload: {},
      fn: (res: any) => {
        const { balance, settlementFund } = res.data;
        this.setState({ balance, settlementFund }, () => {
          if (cb) {
            cb(res);
          }
        });
      },
    });
  }

  public render(): ReactNode {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
    const { showEditModal, balance, settlementFund, rowData } = this.state;
    const { rechargeData } = this.props.fund;
    const { loading, loadingEdit, loadingRefresh } = this.props;
    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={loading}>
          <RechargeForm
            getFieldDecorator={getFieldDecorator}
            resetForm={this.resetForm}
            handleSubmit={(e: React.SyntheticEvent) => {
              // this.refMtable && this.refMtable.handleSubmit(e, this);;
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
              }
            }}
          />

          <AmountWrap
            balance={currency(balance)}
            settlementFund={currency(settlementFund)}
            loadingRefresh={loadingRefresh}
            refreshBalance={() => {
              this.refreshBalance((res: any) => {
                message.success('刷新成功');
              });
            }}
          />

          <Mtable
            columns={getColumns(this)}
            effectType="fund/rechargeDataEffect"
            effectParams={this.state.effectParams}
            dataSource={rechargeData}
            dispatch={this.props.dispatch}
            setFiltersParams={this.setFiltersParams}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />

          <Edit<>
            show={showEditModal}
            showLoading={loadingEdit}
            rowData={rowData}
            hide={() => {
              this.setState({ showEditModal: false });
            }}
            handleOk={this.okSaveEdit}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedRecharge = Form.create({ name: 'searchRecharge' })(Recharge);

export default withRouter(
  connect(({ fund, loading, global }: { fund: any; loading: any; global }) => ({
    fund,
    loading: loading.effects['fund/rechargeDataEffect'],
    loadingEdit: loading.effects['fund/editRechargeDataEffect'],
    loadingRefresh: loading.effects['fund/refreshBalanceEffect'],
    btns: global.btns,
  }))(WrappedRecharge),
);
