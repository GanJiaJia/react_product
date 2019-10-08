import React, { ReactNode } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import ThirdModal from './ThirdModal';
import { getThirdColumns, ThirdForm, selectClass } from './until';
import styles from './style.less';
import Mtable from '@/components/Mtable';
import { currency } from '@/utils/tools';
import BaseComponent from '@/components/BaseComponent';

interface StateType {
  [propName: string]: any;
}

class Withdraw extends BaseComponent {
  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.okSaveEdit = this.okSaveEdit.bind(this);
    this.setFiltersParams = this.setFiltersParams.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
    this.refreshBalance();
  }

  public state = {
    effectParams: {
      channelName: undefined,
      merchantCode: undefined,
    },
    showEditModal: false,
    rowData: {},
    balance: 0,
  };

  public refreshBalance(cb: any) {
    this.props.dispatch({
      // type: 'authority/jobEffect',
      type: 'fund/refreshWithdrawEffect',
      payload: {},
      fn: (res: any) => {
        this.setState({ balance: res.data }, () => {
          if (cb) {
            cb(res);
          }
        });
      },
    });
  }

  public setFiltersParams(filtes, sorter, cb) {
    const status = filtes.accountStatus ? filtes.accountStatus[0] : -1;
    this.setState(
      preState => ({
        effectParams: { ...preState.effectParams, status },
      }),
      () => {
        if (cb) {
          cb();
        }
      },
    );
  }

  // 获取银行卡列表
  public getBankList(rowData) {
    const { channelId } = this.state.rowData;
    const { dispatch } = this.props;
    dispatch({
      type: 'fund/withdrawThirdBankListEffect',
      payload: { channelId },
    });
  }

  // 重置查询条件
  public resetForm() {
    this.props.form.resetFields();
    this.setState({ effectParams: {} }, () => {
      this.refMtable.bindEffects();
    });
  }

  // 确认编辑
  public okSaveEdit(params: any, cb: function) {
    const { dispatch } = this.props;
    const { id } = this.state.rowData;
    dispatch({
      type: 'fund/editWithdrawThirdEffect',
      payload: { ...params, id },
      fn: (res: any) => {
        this.setState({ showEditModal: false });
        if (cb) {
          cb();
        }
        this.refMtable.bindEffects();
      },
    });
  }

  public render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { showEditModal, balance, rowData } = this.state;
    const { thirdData, thirdBankList } = this.props.fund;
    const { loading, loadingEdit, loadingRefresh } = this.props;
    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={loading}>
          <ThirdForm
            getFieldDecorator={getFieldDecorator}
            resetForm={this.resetForm}
            handleSubmit={(e: React.SyntheticEvent) => {
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
              }
            }}
          />

          <div className={styles.balanceWrap}>
            <span>
              <FormattedMessage id="finance.fund.recharge.text.amount.available" />：
              <i>{currency(balance)}</i>
            </span>
            <Button
              loading={loadingRefresh}
              onClick={() => {
                this.refreshBalance((res: any) => {
                  message.success('刷新成功');
                });
              }}
            >
              <FormattedMessage id="finance.fund.recharge.btn.refresh" />
            </Button>
          </div>

          <Mtable
            columns={getThirdColumns(this)}
            effectType="fund/withdrawThirdEffect"
            effectParams={this.state.effectParams}
            dataSource={thirdData}
            dispatch={this.props.dispatch}
            rowClassName={record => selectClass(record)}
            setFiltersParams={this.setFiltersParams}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />

          <ThirdModal<>
            rowData={rowData}
            show={showEditModal}
            showLoading={loadingEdit}
            hide={() => {
              this.setState({ showEditModal: false });
            }}
            handleOk={this.okSaveEdit}
            thirdBankList={thirdBankList}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedThird = Form.create({ name: 'searchWithdraw' })(Withdraw);

export default connect(
  ({ fund, loading, global }: { fund: any; loadingEdit: any; global: any }) => ({
    fund,
    loading: loading.effects['fund/withdrawThirdEffect'],
    loadingEdit: loading.effects['fund/editWithdrawThirdEffect'],
    loadingRefresh: loading.effects['fund/refreshWithdrawEffect'],
    btns: global.btns,
  }),
)(WrappedThird);
