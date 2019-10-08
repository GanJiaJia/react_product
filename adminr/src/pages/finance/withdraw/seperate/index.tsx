import { Button, DatePicker, Form, Select, Input, Spin, message } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { setCommonFun } from '@/pages/finance/withdraw/utils';
import Mtable from '../components/Mtable';
import { getColumns } from './utils';
import SeperateModal from './modal/seperateModal';
import RecoveryModal from './modal/recoveryModal';
import ForcedSuccessModal from './modal/forcedSuccessModal';
import ReturnBalanceModal from './modal/returnBalanceModal';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

const { RangePicker } = DatePicker;
@setCommonFun
class Withdraw extends React.Component<StateType> {
  public refMtable: any;

  state = {
    columns: getColumns(this),
    tipParams: {},
    recoveryModalRowData: {},
    rowData: {},
    recoveryModalTitle: '人工回收',
    detailsModalTitle: '人工分单',
    isShowForcedSuccessModal: false,
    isShowReturnBalanceModal: false,
    isShowRecoveryModal: false,
    isShowSeperateModal: false,
    selectedRowKeys: [],
    effectParams: {
      separateStatus: 1,
    },
  };

  $httpManageBatchSeperate = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/manageBatchSeperate',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpSaveForceSuccess = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveForceSuccess',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpSaveWithdrawReturn = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveWithdrawReturn',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  handleSeperateModalOk = (values: any) => {
    this.$httpManageBatchSeperate(values);
    this.setState({ isShowSeperateModal: false });
  };

  setFiltersParams = (filtes: any, sorter: any, cb: any) => {
    const userName = filtes.username ? filtes.username[0] : null;
    const userType = filtes.userType ? filtes.userType[0] : null;
    const withdrawType = filtes.withdrawType ? filtes.withdrawType[0] : null;
    const status = filtes.status ? filtes.status[0] : null;
    const seperator = filtes.seperator ? filtes.seperator[0] : null;
    this.setState(
      (preState: any) => ({
        effectParams: {
          ...preState.effectParams,
          userName,
          userType,
          withdrawType,
          status,
          seperator,
        },
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

  showReturnBalanceModal = () => {
    this.setState({
      isShowReturnBalanceModal: true,
    });
  };

  showForcedSuccessModal = () => {
    this.setState({
      isShowForcedSuccessModal: true,
    });
  };

  // 验证订单状态
  statusConfimBatch = () => {
    const orderId = this.state.selectedRowKeys.join();
    const payload = { orderId };
    this.props.dispatch({
      type: 'withdraw/statusConfimBatch',
      payload,
    });
  };

  // 回收请求接口
  batchRecycling = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/batchRecycling',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  // 回收操作弹窗确定按钮
  recoveryModalSubmit = async () => {
    const { recoveryModalRowData } = this.state;
    const orderIds = recoveryModalRowData.orderId;
    const payload = {
      orderIds,
    };
    await this.batchRecycling(payload);
    this.setState({
      isShowRecoveryModal: false,
    });
  };

  // 分单弹窗
  showSeperateModal = (rowData: any, type?: string) => {
    this.setState({
      rowData,
    });
    this.setState({ isShowSeperateModal: true });
    if (type === 'radio') {
      const total = 1;
      if (rowData.isSeparate) {
        this.setState({
          tipParams: {
            total,
            num: 1,
          },
        });
      } else {
        this.setState({
          tipParams: {
            total,
            num: 0,
          },
        });
      }
    }
  };

  // 回收弹窗
  showRecoveryModal = (rowData: any, type?: string) => {
    this.setState({
      recoveryModalRowData: rowData,
    });
    this.setState({ isShowRecoveryModal: true });
    if (type === 'radio') {
      const total = 1;
      let doingNum = 0;
      if (rowData.status === 11) {
        doingNum = 1;
      }
      if (!rowData.isSeparate) {
        this.setState({
          tipParams: {
            total,
            num: 1,
            doingNum,
          },
        });
      } else {
        this.setState({
          tipParams: {
            total,
            num: 0,
            doingNum,
          },
        });
      }
    }
  };

  // 批量分单弹窗
  showBatchSeperateModal = async () => {
    await this.setState({ isShowSeperateModal: true });
    const { selectedRowKeys } = this.state;
    await this.setState((preState: any) => ({
      rowData: {
        ...preState.rowData,
        orderId: selectedRowKeys.join(),
      },
    }));
    const { withdrawSeparateData } = this.props.withdraw.seperate;
    const tabList = withdrawSeparateData.list;
    const keysMap = selectedRowKeys;
    // const total = keysMap.length;
    const arr: any = [];
    keysMap.forEach((item: any, index: number) => {
      tabList.forEach((obj: any, i: number) => {
        if (obj.orderId === item) {
          arr.push(obj);
        }
      });
    });
    let num = 0;
    arr.forEach((item: any) => {
      if (item.isSeparate) {
        num += 1;
      }
    });
    this.setState({
      tipParams: {
        total: arr.length,
        num,
      },
    });
  };

  // 批量回收弹窗
  showBatchRecoveryModal = async () => {
    await this.setState({ isShowRecoveryModal: true });
    const { selectedRowKeys } = this.state;
    await this.setState((preState: any) => ({
      recoveryModalRowData: {
        ...preState.recoveryModalRowData,
        orderId: selectedRowKeys.join(),
      },
    }));
    const { withdrawSeparateData } = this.props.withdraw.seperate;
    const tabList = withdrawSeparateData.list;
    const keysMap = this.state.selectedRowKeys;
    // const total = keysMap.length;
    const arr: any = [];
    keysMap.forEach((item: any, index: number) => {
      tabList.forEach((obj: any, i: number) => {
        if (obj.orderId === item) {
          arr.push(obj);
        }
      });
    });
    let num = arr.length;
    let doingNum = 0;
    arr.forEach((item: any) => {
      if (item.isSeparate) {
        num -= 1;
      }
      if (item.state - 11 === 0) {
        doingNum += 1;
      }
    });
    this.setState({
      tipParams: {
        total: arr.length,
        num,
        doingNum,
      },
    });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      columns,
      effectParams,
      selectedRowKeys,
      detailsModalTitle,
      isShowSeperateModal,
      isShowRecoveryModal,
      recoveryModalTitle,
      isShowForcedSuccessModal,
      isShowReturnBalanceModal,
    } = this.state;
    const { loadingBtn } = this.props;
    const { withdrawSeparateData, statusConfimBatchData = [] } = this.props.withdraw.seperate;
    const dataList = withdrawSeparateData.list;
    if (dataList.length && Array.isArray(statusConfimBatchData) && statusConfimBatchData.length) {
      dataList.forEach((item: any, index: number) => {
        statusConfimBatchData.forEach((obj: any, i: number) => {
          if (item.orderId === obj.orderId) {
            item = { ...item, ...obj };
          }
        });
      });
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    const separateStatusMap = [
      { key: '', value: '全部' },
      { key: 0, value: '已分单' },
      { key: 1, value: '未分单' },
    ];

    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={false}>
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
          <SeperateModal
            handleSeperateModalOk={this.handleSeperateModalOk}
            tipParams={this.state.tipParams}
            data={this.state.rowData}
            title={detailsModalTitle}
            show={isShowSeperateModal}
            showLoading={false}
            hide={() => this.setState({ isShowSeperateModal: false })}
          />
          <RecoveryModal
            tipParams={this.state.tipParams}
            recoveryModalSubmit={this.recoveryModalSubmit}
            title={recoveryModalTitle}
            show={isShowRecoveryModal}
            showLoading={false}
            hide={() => this.setState({ isShowRecoveryModal: false })}
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
              {getFieldDecorator('range-time-picker')(
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
              })(
                <Input
                  allowClear
                  type="userNumber"
                  placeholder="请输入提现单号"
                  autoComplete="off"
                />,
              )}
            </Form.Item>
            <Form.Item label="分单状态">
              {getFieldDecorator('separateStatus', {
                initialValue: 1,
              })(
                <Select style={{ width: 220 }} placeholder="选择分单状态">
                  {separateStatusMap.map((item: any) => (
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

            <br />
            <br />

            <div>
              {checkPermission(this.props.btns, 'new-finance-withdraw-separate-recovery-batch') ? (
                <Button
                  type="primary"
                  disabled={!selectedRowKeys.length}
                  onClick={this.showBatchRecoveryModal}
                  className={styles.headBtn}
                >
                  批量回收
                </Button>
              ) : null}
              {checkPermission(this.props.btns, 'new-finance-withdraw-separate-do-batch') ? (
                <Button
                  type="primary"
                  disabled={!selectedRowKeys.length}
                  onClick={this.showBatchSeperateModal}
                  className={styles.headBtn}
                >
                  批量分单
                </Button>
              ) : null}
              {checkPermission(this.props.btns, 'new-finance-withdraw-separate-back-balance') ? (
                <Button
                  type="primary"
                  onClick={this.showReturnBalanceModal}
                  className={styles.headBtn}
                  disabled={!selectedRowKeys.length}
                >
                  退回余额
                </Button>
              ) : null}
              {checkPermission(this.props.btns, 'new-finance-withdraw-verify-order-status') ? (
                <Button
                  loading={loadingBtn}
                  type="primary"
                  className={styles.headBtn}
                  disabled={!selectedRowKeys.length}
                  onClick={this.statusConfimBatch}
                >
                  验证订单状态
                </Button>
              ) : null}
              {checkPermission(this.props.btns, 'new-finance-withdraw-separate-force-success') ? (
                <Button
                  type="primary"
                  onClick={this.showForcedSuccessModal}
                  className={styles.headBtn}
                  disabled={!selectedRowKeys.length}
                >
                  强制成功
                </Button>
              ) : null}
            </div>
          </Form>

          <br />

          <Mtable
            pageSize={10}
            columns={columns}
            rowSelection={rowSelection}
            effectType="withdraw/getWithdrawSeparateData"
            effectParams={effectParams}
            dataSource={withdrawSeparateData}
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

const C = Form.create({ name: 'searchWithdraw' })(Withdraw);

export default connect(({ withdraw, global, loading }: any) => ({
  withdraw,
  btns: global.btns,
  loadingBtn: loading.effects['withdraw/statusConfimBatch'],
}))(C);
