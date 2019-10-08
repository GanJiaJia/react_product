import { Button, DatePicker, Select, Form, Icon, Input, Spin } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { setCommonFun } from '@/pages/finance/withdraw/utils';
import Mtable from '../components/Mtable';
import ExamineModal from './modal/ExamineModal';
import { getColumns } from './utils';
import styles from './style.less';

const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

const { RangePicker } = DatePicker;
@setCommonFun
class Withdraw extends React.PureComponent<StateType> {
  public refMtable: any;

  public columns: any = getColumns(this);

  state = {
    effectParams: {},
    isShowCheckModal: false,
  };

  modalTabData: any = '';

  constructor(props: any) {
    super(props);
    this.$httpAccountInuseData();
  }

  setFiltersParams = (filtes: any, sorter: any, cb: any) => {
    const withdrawStatus = filtes.withdrawStatus ? filtes.withdrawStatus[0] : null; // 订单状态
    const withdrawType = filtes.withdrawType ? filtes.withdrawType[0] : null; // 出款方式
    const userName = filtes.username ? filtes.username[0] : null; // 账户名
    const merchant = filtes.merchant ? filtes.merchant[0] : null;
    this.setState(
      (preState: any) => ({
        effectParams: {
          ...preState.effectParams,
          withdrawStatus,
          withdrawType,
          userName,
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

  showCheckModal = async (rowData: any) => {
    await this.setState({ isShowCheckModal: true });
    this.modalTabData = rowData;
    await this.handleFresh();
  };

  // 获取出款商户列表
  $httpAccountInuseData = () => {
    this.props.dispatch({
      type: 'withdraw/merchantAccountInuse',
      payload: {},
    });
  };

  handleFresh = () => {
    this.props.dispatch({
      type: 'withdraw/withdrawStatusConfim',
      // 请求参数
      payload: { orderId: this.modalTabData.orderId },
    });
    // withdrawStatusConfim
  };

  modalHandleOk = async (values: any) => {
    const params = {
      ...values,
      orderId: this.modalTabData.orderId,
    };
    await this.props.dispatch({
      type: 'withdraw/approveReturn',
      // 请求参数
      payload: params,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
    await this.setState({ isShowCheckModal: false });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { effectParams, isShowCheckModal } = this.state;
    const { checkApprovalList } = this.props.withdraw.examine;
    const { accountInuseData } = this.props.withdraw.payment;
    const formatOverviewData = (data: any) =>
      data.map((item: any) => ({
        text: item.channelName,
        value: item.channelName,
      }));
    this.columns[6].filters = formatOverviewData(accountInuseData);
    this.columns[6].filterMultiple = false;

    const approvalStatusMap = [
      { key: '0', value: '待审核' },
      { key: '1', value: '审核通过' },
      { key: '2', value: '审核拒绝' },
    ];

    return (
      <div className={styles.rechargeWrap}>
        <ExamineModal
          modalTabData={this.modalTabData}
          modalHandleOk={this.modalHandleOk}
          title="提现操作审核"
          show={isShowCheckModal}
          showLoading={false}
          hide={() => this.setState({ isShowCheckModal: false })}
        />
        <Spin spinning={false}>
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
            <Form.Item label="审核记录">
              {getFieldDecorator('approvalStatus', {})(
                <Select style={{ width: 220 }} mode="multiple" placeholder="选择审核记录">
                  {approvalStatusMap.map((item: any) => (
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
            effectType="withdraw/getCheckApprovalList"
            effectParams={effectParams}
            dataSource={checkApprovalList}
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
}))(C);
