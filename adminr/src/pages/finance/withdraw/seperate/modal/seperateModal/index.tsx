import { Button, Form, Input, Modal, Select, Radio, message } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import styles from './style.less';

const { Option } = Select;

class SeperateModal extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.withdrawAccountList({ work: 1, withdrawType: 0 });
  }

  state = {
    work: 1,
    withdrawType: 0,
  };

  handleSelectWork = async (value: any) => {
    await this.setState({ work: value });
    const { work, withdrawType } = this.state;
    const params = {
      work,
      withdrawType,
    };
    await this.withdrawAccountList(params);
  };

  withdrawAccountList = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/withdrawAccountList',
      payload,
    });
  };

  handleSelectWithdrawType = async (value: any) => {
    await this.setState({ withdrawType: value });
    const { work, withdrawType } = this.state;
    const params = {
      work,
      withdrawType,
    };
    await this.withdrawAccountList(params);
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { tipParams } = this.props;
    if (tipParams.total === tipParams.num) {
      message.warning('没有可分单的项');
    } else {
      this.formfun();
    }
  };

  formfun = () => {
    this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
      if (!err) {
        const { data, handleSeperateModalOk } = this.props;
        const params: any = {};
        params.accountId = values.accountId;
        params.orderIds = data.orderId;
        params.withdrawType = this.state.withdrawType;
        await handleSeperateModalOk(params);
        await this.withdrawAccountList({ work: 1, withdrawType: 0 });
      }
    });
  };

  render() {
    const { show, showLoading, title, hide, tipParams, data } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { withdrawAccountList = [] } = this.props.withdraw.seperate;
    const initValue =
      withdrawAccountList && withdrawAccountList.length ? withdrawAccountList[0].id : '';
    return (
      <>
        <Modal
          destroyOnClose
          width={600}
          title={title}
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          onOk={this.handleSubmit}
          confirmLoading={showLoading}
        >
          <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} onSubmit={this.handleSubmit}>
            {tipParams && (
              <div>
                共选择 {tipParams.total} 笔待分单的订单，其中 {tipParams.num} 笔尚未收回，剩余{' '}
                {tipParams.total - tipParams.num} 笔可分单
              </div>
            )}
            <br />

            <Form.Item label="分单给">
              <Select
                placeholder="班次"
                defaultValue="1"
                onChange={this.handleSelectWork}
                className={styles.formItem}
                style={{ width: 150 }}
              >
                <Option value="1">早班</Option>
                <Option value="2">中班</Option>
                <Option value="3">晚班</Option>
              </Select>

              <Select
                placeholder="出款方式"
                defaultValue="0"
                className={styles.formItem}
                style={{ width: 150 }}
                onChange={this.handleSelectWithdrawType}
              >
                <Option value="0">人工出款</Option>
                <Option value="2">三方手动出款</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('accountId', {
                initialValue: initValue || '',
              })(
                <Radio.Group>
                  {withdrawAccountList &&
                    withdrawAccountList.map((item: any, index: number) => (
                      <Radio key={item.id} className={styles.radioStyle} value={item.id}>
                        {`${item.userName} 已经分配了 ${item.withdrawCount} 笔提现单`}
                      </Radio>
                    ))}
                </Radio.Group>,
              )}
            </Form.Item>
            <div className={styles.tipMessage}>注：派单给的显示账户的是当前在线的账户</div>
          </Form>
        </Modal>
      </>
    );
  }
}
const C = Form.create()(SeperateModal);
export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(C);
