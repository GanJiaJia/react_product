import { Button, DatePicker, Form, Select, Input, Spin } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { setCommonFun, withdrawStatusMap } from '@/pages/finance/withdraw/utils';
import Mtable from '../components/Mtable';
import DetailsModal from './modal/detailsModal';
import ForcedSuccessModal from './modal/forcedSuccessModal';
import ReturnBalanceModal from './modal/returnBalanceModal';
import { getColumns } from './utils';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

const { RangePicker } = DatePicker;
@setCommonFun
class HistoryComponent extends React.Component<StateType> {
  public refMtable: any;

  public name = 'HistoryComponent';

  public tabRowData: any;

  public columns: any = [];

  constructor(props: any) {
    super(props);
    this.$httpAccountInuseData();
  }

  state = {
    isShowReturnBalanceModal: false,
    isShowForcedSuccessModal: false,
    isShowDetailsModal: false,
    detailsModalParams: {
      detailsModalTitle: '订单详情',
    },
    selectedRowKeys: [],
    effectParams: {
      startTime: moment('00:00:00', 'HH:mm:ss')
        .subtract(2, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment('23:59:59', 'HH:mm:ss')
        .subtract(0, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
    },
  };

  componentWillMount() {
    this.columns = getColumns(this);
  }

  $httpSaveForceSuccess = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveForceSuccess',
      payload,
    });
  };

  $httpSaveWithdrawReturn = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveWithdrawReturn',
      payload,
    });
  };

  showDetailsModal = (rowData: any) => {
    this.tabRowData = rowData;
    this.setState({ isShowDetailsModal: true });
  };

  saveForceSuccess = () => {
    this.setState({ isShowForcedSuccessModal: true });
  };

  forcedSuccessModalCallback = async (values: any) => {
    const orderId = this.state.selectedRowKeys.join();
    values.orderId = orderId;
    await this.$httpSaveForceSuccess(values);
    this.setState({
      isShowForcedSuccessModal: false,
    });
  };

  returnBalanceModalCallback = async (values: any) => {
    const orderId = this.state.selectedRowKeys.join();
    values.orderId = orderId;
    await this.$httpSaveWithdrawReturn(values);
    this.setState({
      isShowReturnBalanceModal: false,
    });
  };

  saveWithdrawReturn = () => {
    this.setState({
      isShowReturnBalanceModal: true,
    });
  };

  statusConfimBatch = () => {
    const orderId = this.state.selectedRowKeys.join();
    const payload = { orderId };
    this.props.dispatch({
      type: 'withdraw/statusConfimBatch',
      payload,
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
    const clientType = filtes.clientType ? filtes.clientType[0] : null;
    const merchant = filtes.merchant ? filtes.merchant[0] : null;
    const withdrawType = filtes.withdrawType ? filtes.withdrawType[0] : null;
    this.setState(
      (preState: any) => ({
        effectParams: { ...preState.effectParams, clientType, merchant, withdrawType },
      }),
      () => {
        if (cb) {
          cb();
        }
      },
    );
  };

  onSelectedRowKeysChange = (selectedRowKeys: any[]) => {
    this.setState({ selectedRowKeys });
  };

  showCheckModal = () => {};

  render(): ReactNode {
    const { loadingBtn } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {
      effectParams,
      selectedRowKeys,
      isShowDetailsModal,
      isShowForcedSuccessModal,
      isShowReturnBalanceModal,
    } = this.state;
    const { detailsModalTitle } = this.state.detailsModalParams;
    const { withdrawRecordData } = this.props.withdraw.history;
    const { statusConfimBatchData = [] } = this.props.withdraw.seperate;
    const { accountInuseData } = this.props.withdraw.payment;

    const dataList = withdrawRecordData.list;
    if (dataList.length && Array.isArray(statusConfimBatchData) && statusConfimBatchData.length) {
      dataList.forEach((item: any, index: number) => {
        statusConfimBatchData.forEach((obj: any, i: number) => {
          if (item.orderId === obj.orderId) {
            item = { ...item, ...obj };
          }
        });
      });
    }
    const formatOverviewData = (data: any) =>
      data.map((item: any) => ({
        text: item.channelName,
        value: item.channelName,
      }));
    this.columns[8].filters = formatOverviewData(accountInuseData);
    this.columns[8].filterMultiple = false;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    const formData = (obj: any) =>
      Object.keys(obj).map(key => ({
        key,
        value: obj[key],
      }));

    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={false}>
          <DetailsModal
            data={this.tabRowData}
            title={detailsModalTitle}
            show={isShowDetailsModal}
            showLoading={false}
            hide={() => this.setState({ isShowDetailsModal: false })}
          />
          <ForcedSuccessModal
            callback={this.forcedSuccessModalCallback}
            show={isShowForcedSuccessModal}
            showLoading={false}
            hide={() => this.setState({ isShowForcedSuccessModal: false })}
          />
          <ReturnBalanceModal
            callback={this.returnBalanceModalCallback}
            show={isShowReturnBalanceModal}
            showLoading={false}
            hide={() => this.setState({ isShowReturnBalanceModal: false })}
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
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                  }}
                />,
              )}
            </Form.Item>
            <Form.Item label="提现单号">
              {getFieldDecorator('orderId', {
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入提现单号" autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="用户账号">
              {getFieldDecorator('userName', {
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入账号" autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="订单状态">
              {getFieldDecorator('status', {})(
                <Select style={{ width: 220 }} placeholder="选择订单状态">
                  {formData(withdrawStatusMap).map((item: any) => (
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

          <div>
            {checkPermission(
              this.props.btns,
              'new-finance-withdraw-history-record-force-success',
            ) ? (
              <Button
                type="primary"
                disabled={!selectedRowKeys.length}
                onClick={this.saveForceSuccess}
                className={styles.headBtn}
              >
                强制成功
              </Button>
            ) : null}

            {checkPermission(
              this.props.btns,
              'new-finance-withdraw-history-record-back-balance',
            ) ? (
              <Button
                type="primary"
                disabled={!selectedRowKeys.length}
                onClick={this.saveWithdrawReturn}
                className={styles.headBtn}
              >
                退回余额
              </Button>
            ) : null}

            {checkPermission(
              this.props.btns,
              'new-finance-withdraw-history-record-verify-order-status',
            ) ? (
              <Button
                loading={loadingBtn}
                type="primary"
                disabled={!selectedRowKeys.length}
                onClick={this.statusConfimBatch}
                className={styles.headBtn}
              >
                验证订单状态
              </Button>
            ) : null}
          </div>

          <br />

          <Mtable
            rowSelection={rowSelection}
            pageSize={10}
            columns={this.columns}
            effectType="withdraw/getWithdrawRecordData"
            effectParams={effectParams}
            dataSource={withdrawRecordData}
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

const C = Form.create({ name: 'searchWithdraw' })(HistoryComponent);

export default connect(({ withdraw, global, loading }: any) => ({
  withdraw,
  btns: global.btns,
  loadingBtn: loading.effects['withdraw/statusConfimBatch'],
}))(C);
