import { Button, Form, Input, Modal, Select } from 'antd';
import React, { Fragment } from 'react';

import { StateType } from '@/common-typings';
import styles from '../style.less';

const { Option } = Select;

const bankCard = (getFieldDecorator: any) => (
  <Fragment>
    <Form.Item label="收款银行卡号：">
      {getFieldDecorator('bankCardNumber', {
        rules: [{ required: true, message: '请选择请输入收款卡号' }],
      })(<Input.Password allowClear placeholder="请输入银行卡号" />)}
    </Form.Item>

    <Form.Item label="收款人姓名：">
      {getFieldDecorator('payeeName', {
        rules: [{ required: true, message: '请选择收款人姓名' }],
      })(<Input allowClear placeholder="请输入收款账户名称" />)}
    </Form.Item>

    <Form.Item label="银行名称：">
      {getFieldDecorator('bankName', {
        rules: [{ required: true, message: '请输入银行名称' }],
      })(<Input allowClear placeholder="请输入网银登陆账号" />)}
    </Form.Item>

    <Form.Item label="开户支行名称：">
      {getFieldDecorator('branchName', {
        // rules: [{ required: true, message: '请输入网银登陆密码', }]
      })(<Input allowClear placeholder="请输入开户支行名称" />)}
    </Form.Item>

    <Form.Item label="备注：">
      {getFieldDecorator('mark', {})(<Input allowClear placeholder="备注信息" />)}
    </Form.Item>
  </Fragment>
);

const asset = (getFieldDecorator: any) => (
  <Fragment>
    <Form.Item label="资管卡类型：">
      {getFieldDecorator('assetType', {
        rules: [{ required: true, message: '请选择资管卡类型' }],
      })(
        <Select placeholder="请选择资管卡类型">
          <Option value="1">内部存放卡</Option>
          <Option value="2">外部存放卡</Option>
        </Select>,
      )}
    </Form.Item>

    <Form.Item label="账户名称：">
      {getFieldDecorator('username', {
        rules: [{ required: true, message: '请输入或选择账户名称' }],
      })(
        <Select placeholder="请输入或选择账户名称">
          <Option value="1">名称111</Option>
          <Option value="2">名称2222</Option>
        </Select>,
      )}
    </Form.Item>

    <Form.Item label="收款卡号：">
      {getFieldDecorator('bankNumber', {
        rules: [{ required: true, message: '请输入收款卡号' }],
      })(<Input allowClear placeholder="请输入收款卡号" />)}
    </Form.Item>

    <Form.Item label="银行名称：">
      {getFieldDecorator('bankName', {
        // rules: [{ required: true, message: '请输入银行名称' }],
      })(<Input allowClear placeholder="请输入网银登陆账号" />)}
    </Form.Item>

    <Form.Item label="开户支行名称：">
      {getFieldDecorator('branchName', {
        // rules: [{ required: true, message: '请输入网银登陆密码', }]
      })(<Input allowClear placeholder="请输入开户支行名称" />)}
    </Form.Item>

    <Form.Item label="备注">
      {getFieldDecorator('mark', {})(<Input allowClear placeholder="备注信息" />)}
    </Form.Item>
  </Fragment>
);

class TransferModal extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit = (e: React.SyntheticEvent) => {
    const { handleOk } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        // eslint-disable-next-line no-console
        handleOk(values, () => {
          this.props.form.resetFields();
        });
      }
    });
  };

  render() {
    const { show, hide, showLoading, slectChange, transferType } = this.props;
    const { getFieldDecorator } = this.props.form;
    const placeholder: string =
      transferType === '2' ? '可转账金额：50000.00' : '单笔限额0～100000.00';
    const transferTitle: string = transferType === '2' ? ' - 资管卡' : ' - 银行卡';
    return (
      <div className={styles.transferModal}>
        <Modal
          title={`转账操作${transferTitle}`}
          okText="确认转账"
          visible={show}
          onCancel={() => {
            hide();
            this.props.form.resetFields();
          }}
          confirmLoading={showLoading}
          footer={null}
        >
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <div className={styles.transferTitle}>
              <strong>中国银行</strong>
              <strong>622235446666333</strong>
              <strong>张三</strong>
            </div>

            <Form.Item label="转账金额：">
              {getFieldDecorator('transferAmount', {
                rules: [{ required: true, message: '请输入转账金额' }],
              })(<Input allowClear placeholder={placeholder} />)}
            </Form.Item>

            <Form.Item label="请选择转账类型">
              {getFieldDecorator('transferType', {
                rules: [{ required: true, message: '请选择银行' }],
              })(
                <Select placeholder="请选择转账类型" onChange={slectChange}>
                  <Option value="1">转入银行卡</Option>
                  <Option value="2">转入资管卡</Option>
                </Select>,
              )}
            </Form.Item>
            {transferType === '2' ? asset(getFieldDecorator) : bankCard(getFieldDecorator)}
            <Form.Item className={styles.editBtns}>
              <Button
                onClick={() => {
                  hide();
                  this.props.form.resetFields();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={showLoading}
                style={{ marginLeft: '20px' }}
              >
                确认转账
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const Wrap = Form.create()(TransferModal);
export default Wrap;
