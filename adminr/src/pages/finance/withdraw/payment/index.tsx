import { Button, DatePicker, Form, Select, Input, Spin } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { setCommonFun } from '@/pages/finance/withdraw/utils';
import Mtable from '../components/Mtable';
import { getColumns1, getColumns2 } from './utils';
import styles from './style.less';
import PaymentOutModal from './modal/paymentOutModal';

const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

const { RangePicker } = DatePicker;
@setCommonFun
class PaymentComponent extends React.Component<StateType> {
  public refMtable: any;

  public name = 'PaymentComponent';

  public columns: any = [];

  public rowData: any;

  constructor(props: any) {
    super(props);
    this.withdrawBankList();
    this.$httpAccountInuseData();
  }

  state = {
    paymentOutModalTitle: '',
    isShowPaymentOutModal: false,
    tabHeaderSign: 1,
    effectParams: {
      startTime: moment('00:00:00', 'HH:mm:ss')
        .subtract(2, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment('23:59:59', 'HH:mm:ss')
        .subtract(0, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      transferStatus: 0,
    },
  };

  componentWillMount() {
    this.columns = getColumns1(this);
  }

  $httpManageApprove = (params: any) => {
    this.props.dispatch({
      type: 'withdraw/manageApprove',
      payload: params,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  // 根据出款记录状态选择表头
  handleSelectTabHeader = (effectParams: any) => {
    if (effectParams.transferStatus === '0') {
      this.columns = getColumns1(this);
      this.setState({ tabHeaderSign: 1 });
    }
    if (effectParams.transferStatus === '1') {
      this.columns = getColumns2(this);
      this.setState({ tabHeaderSign: 2 });
    }
  };

  // 获取银行卡列表
  withdrawBankList = () => {
    this.props.dispatch({
      type: 'withdraw/withdrawBankList',
      payload: {},
    });
  };

  // 获取出款商户列表
  $httpAccountInuseData = () => {
    this.props.dispatch({
      type: 'withdraw/merchantAccountInuse',
      payload: {},
    });
  };

  setFiltersParams = (filtes: any, sorter: any, cb: any) => {
    const withdrawType = filtes.withdrawType ? filtes.withdrawType[0] : null;
    const status = filtes.status ? filtes.status[0] : null;
    const bankUserName = filtes.name ? filtes.name[0] : null;
    const bankId = filtes.bankName ? filtes.bankName[0] : null;
    const merchant = filtes.merchant ? filtes.merchant[0] : null;
    this.setState(
      (preState: any) => ({
        effectParams: {
          ...preState.effectParams,
          withdrawType,
          status,
          bankUserName,
          bankId,
          merchant,
        },
      }),
      () => {
        if (cb) {
          cb();
        }
      },
    );
  };

  handlePaymentOutModalDoSubmit = (values: any) => {
    this.$httpManageApprove(values);
    this.setState({ isShowPaymentOutModal: false });
  };

  showPaymentOutModal = (rowData: any) => {
    this.rowData = rowData;
    let modalTitle;
    if (rowData.withdrawType === 0) {
      modalTitle = '人工出款';
    }
    if (rowData.withdrawType === 2) {
      modalTitle = '三方手动出款';
    }
    this.setState({
      paymentOutModalTitle: modalTitle,
      isShowPaymentOutModal: true,
    });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { effectParams, tabHeaderSign, isShowPaymentOutModal, paymentOutModalTitle } = this.state;
    const {
      withdrawTransferData,
      withdrawBankListData,
      accountInuseData,
    } = this.props.withdraw.payment;
    const formatBankListData = (data: any[]) =>
      data.map(item => ({
        text: item.bankName,
        value: item.bankId,
      }));
    const formatOverviewData = (data: any) =>
      data.map((item: any) => ({
        text: item.channelName,
        value: item.channelName,
      }));
    if (tabHeaderSign === 1) {
      this.columns[7].filters = formatBankListData(withdrawBankListData);
      this.columns[7].filterMultiple = false;
    }
    if (tabHeaderSign === 2) {
      this.columns[8].filters = formatBankListData(withdrawBankListData);
      this.columns[8].filterMultiple = false;
      this.columns[6].filters = formatOverviewData(accountInuseData);
      this.columns[6].filterMultiple = false;
    }

    const transferStatusMap = [{ key: '0', value: '待处理' }, { key: '1', value: '已处理' }];

    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={false}>
          <PaymentOutModal
            withdrawOverviewData={accountInuseData}
            data={this.rowData}
            title={paymentOutModalTitle}
            show={isShowPaymentOutModal}
            showLoading={false}
            handleDoSubmit={this.handlePaymentOutModalDoSubmit}
            hide={() => this.setState({ isShowPaymentOutModal: false })}
          />
          <Form
            layout="inline"
            onSubmit={(e: React.SyntheticEvent) => {
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
              }
            }}
            name="searchRecharge"
          >
            <Form.Item label="提现时间段">
              {getFieldDecorator('range-time-picker', {
                initialValue: [
                  moment('00:00:00', 'HH:mm:ss').subtract(2, 'days'),
                  moment('23:59:59', 'HH:mm:ss').subtract(0, 'days'),
                ],
              })(
                <RangePicker
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />,
              )}
            </Form.Item>
            <Form.Item label="账户名">
              {getFieldDecorator('userName', {
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input allowClear placeholder="请输入账户名" autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="提现单号">
              {getFieldDecorator('orderId', {
                normalize: (value: any) => value && value.toString().trim(),
              })(
                <Input
                  allowClear
                  type="userNumber"
                  placeholder="请输入提现单号"
                  autoComplete="off"
                />,
              )}
            </Form.Item>
            <Form.Item label="出款记录">
              {getFieldDecorator('transferStatus', {
                initialValue: '0',
              })(
                <Select style={{ width: 220 }} placeholder="选择出款记录">
                  {transferStatusMap.map((item: any) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item className={styles.rechargeBtns}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button onClick={this.resetForm}>重置</Button>
            </Form.Item>
          </Form>

          <br />

          <Mtable
            pageSize={10}
            columns={this.columns}
            effectType="withdraw/getWithdrawTransferData"
            effectParams={effectParams}
            dataSource={withdrawTransferData}
            dispatch={this.props.dispatch}
            setFiltersParams={this.setFiltersParams}
            setSubmitFormatParams={this.setSubmitFormatParams}
            scroll={{ x: 1530 }}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />
        </Spin>
      </div>
    );
  }
}

const C = Form.create({ name: 'searchWithdraw' })(PaymentComponent);

export default connect(({ withdraw, global }: any) => ({
  withdraw,
  btns: global.btns,
}))(C);
