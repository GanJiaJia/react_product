import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;

class Edit extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.getRejectReasonList();
    // this.withdrawOverview();
    this.$httpSeperatorMerchantList();
  }

  state = {
    showRejectReason: false,
  };

  withdrawOverview = () =>
    this.props.dispatch({
      type: 'withdraw/withdrawOverview',
      payload: { channelId: -1 },
    });

  $httpSeperatorMerchantList = () =>
    this.props.dispatch({
      type: 'withdraw/seperatorMerchantList',
      payload: {},
    });

  $httpGetAccountBalance = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/getAccountBalance',
      payload,
    });
  };

  getRejectReasonList = () => {
    this.props.dispatch({
      type: 'withdraw/rejectReasonList',
      payload: {},
    });
  };

  handleSelect = (value: any) => {
    const params = { merchantId: value };
    this.$httpGetAccountBalance(params);
  };

  formfun = (status?: number) => {
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        const { handleDoSubmit } = this.props;
        // eslint-disable-next-line no-console
        const params: any = {};
        const paramsKeysArray = [
          'transferName',
          'status',
          'transferBankName',
          'merchantId',
          'rejectReason',
          'remark',
          'orderId',
        ];
        paramsKeysArray.forEach(item => {
          Object.keys(values).forEach(obj => {
            if (item === obj) {
              params[obj] = values[obj];
            }
          });
        });
        if (status === 1) {
          params.rejectReason = '';
        }
        params.status = status;
        handleDoSubmit(params);
      }
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    // const { handleDoSubmit } = this.props;
    e.preventDefault();
    this.setState({
      showRejectReason: false,
    });
    this.formfun(1);
  };

  handleReject = async (value: any) => {
    await this.setState({
      showRejectReason: true,
    });
    await this.formfun(2);
  };

  render() {
    const { show, showLoading, title, hide, data } = this.props;
    const {
      rejectReasonList,
      accountBalanceData,
      seperatorMerchantList,
    } = this.props.withdraw.payment;
    // const { withdrawOverviewData } = this.props.withdraw.orserSetting;
    const rejectReasonListMap = rejectReasonList.map((item: any) => ({
      key: item,
      value: item,
    }));
    const { getFieldDecorator } = this.props.form;
    const formatData = (arr: any) =>
      arr.map((item: any) => ({
        key: item.merchantId,
        value: item.displayName,
      }));
    const overviewDataMap = formatData(seperatorMerchantList);
    return (
      <>
        <Modal
          // destroyOnClose
          width={600}
          title={title}
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          confirmLoading={showLoading}
          footer={null}
        >
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <Form.Item label="订单号" style={{ display: 'none' }}>
              {getFieldDecorator('orderId', {
                initialValue: data && data.orderId,
              })(<Input disabled placeholder="请输入姓名" />)}
            </Form.Item>

            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                initialValue: data && data.name,
              })(<Input disabled placeholder="请输入姓名" />)}
            </Form.Item>

            <Form.Item label="银行名称">
              {getFieldDecorator('bankName', {
                initialValue: data && data.bankName,
              })(<Input disabled placeholder="请输入银行名称" />)}
            </Form.Item>

            <Form.Item label="银行卡号">
              {getFieldDecorator('cardNo', {
                initialValue: data && data.cardNo,
              })(<Input disabled placeholder="请输入银行卡号" />)}
            </Form.Item>

            <Form.Item label="开户行地址">
              {getFieldDecorator('address', {
                initialValue: data && data.address,
              })(<Input disabled placeholder="请输入开户行地址" />)}
            </Form.Item>

            <Form.Item label="提现确认金额">
              {getFieldDecorator('amount', {
                initialValue: data && data.amount,
              })(<Input disabled placeholder="请输入金额" />)}
            </Form.Item>

            {title === '三方手动出款' && (
              <div>
                <Form.Item label="出款支付商户">
                  {getFieldDecorator('merchantId', {})(
                    <Select placeholder="请选择支付商户" onChange={this.handleSelect}>
                      {overviewDataMap.map((item: any) => (
                        <Option key={item.key} value={item.key}>
                          {item.value}
                        </Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>

                <Form.Item label="余额">
                  <Input disabled placeholder={accountBalanceData} />
                </Form.Item>
              </div>
            )}

            {title === '人工出款' && !this.state.showRejectReason && (
              <div>
                <Form.Item label="出款卡姓名">
                  {getFieldDecorator('transferName', {
                    rules: [{ required: true, message: '请输入出款卡姓名' }],
                    normalize: (value: any) => value && value.toString().trim(),
                  })(<Input placeholder="请输入出款卡姓名" autoComplete="off" />)}
                </Form.Item>

                <Form.Item label="出款卡银行">
                  {getFieldDecorator('transferBankName', {
                    rules: [{ required: true, message: '请输入出款卡银行' }],
                    normalize: (value: any) => value && value.toString().trim(),
                  })(<Input placeholder="请输入出款卡银行" autoComplete="off" />)}
                </Form.Item>
              </div>
            )}

            {this.state.showRejectReason && (
              <Form.Item label="拒绝原因">
                {getFieldDecorator('rejectReason', {
                  rules: [{ required: true, message: '请选择拒绝原因' }],
                })(
                  <Select placeholder="请选择">
                    {rejectReasonListMap.map((item: any) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            )}

            <Form.Item label="备注：">
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入备注' }],
              })(<TextArea />)}
            </Form.Item>

            {title === '三方手动出款' && (
              <Form.Item className={styles.footerBtns}>
                <span>
                  <Button onClick={() => this.handleReject(0)}>拒绝出款</Button>
                </span>
                <span>
                  <Button type="primary" htmlType="submit" loading={false}>
                    确认出款
                  </Button>
                </span>
              </Form.Item>
            )}

            {title === '人工出款' && (
              <Form.Item className={styles.footerBtns}>
                <span>
                  <Button onClick={() => this.handleReject(0)}>拒绝出款</Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={false}
                    style={{ marginLeft: '20px' }}
                  >
                    确认出款
                  </Button>
                </span>
                <span>
                  <Button
                    onClick={() => {
                      hide();
                    }}
                  >
                    取消
                  </Button>
                </span>
              </Form.Item>
            )}
          </Form>
        </Modal>
      </>
    );
  }
}
const C = Form.create()(Edit);
export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(C);
