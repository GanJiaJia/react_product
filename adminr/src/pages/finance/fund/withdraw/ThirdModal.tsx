import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';

import React from 'react';
import { StateType } from '@/common-typings';
import styles from './style.less';

const { Option } = Select;

class Edit extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handelSelectChange = this.handelSelectChange.bind(this);
  }

  public handleSubmit = (e: React.SyntheticEvent) => {
    const { handleOk, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        handleOk(values, () => {
          form.resetFields();
        });
      }
    });
  };

  public handelSelectChange(value: any, options: any) {
    this.props.form.setFieldsValue({
      bankName: options.props.children,
    });
  }

  render() {
    const { show, hide, showLoading, rowData, thirdBankList } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="编辑商户信息"
          okText="添加"
          visible={show}
          onCancel={() => {
            hide();
            this.props.form.resetFields();
          }}
          confirmLoading={showLoading}
          footer={null}
        >
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator('merchantId', {
                initialValue: rowData.merchantId,
              })(<Input hidden />)}
            </Form.Item>

            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator('bankId', {
                initialValue: rowData.bankId,
              })(<Input hidden />)}
            </Form.Item>

            <Form.Item label="银行名称：">
              {getFieldDecorator('bankName', {
                initialValue: rowData.bankName,
              })(
                <Select placeholder="请选择银行" onChange={this.handelSelectChange}>
                  {thirdBankList.map((ele: any, i: number) => (
                    <Option value={ele.bankName} key={ele.bankName}>
                      {ele.bankName}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="收款银行卡号：">
              {getFieldDecorator('bankCardNo', {
                initialValue: rowData.bankCardNo,
                normalize: (value: any) => value && value.trim(),
              })(<Input.Password allowClear placeholder="请输入收款银行卡号：" />)}
            </Form.Item>

            <Form.Item label="收款账户名称：">
              {getFieldDecorator('bankAccountName', {
                initialValue: rowData.bankAccountName,
                normalize: (value: any) => value && value.trim(),
              })(<Input.Password allowClear placeholder="请输入收款账户名称" />)}
            </Form.Item>

            <Form.Item label="开户支行名称：">
              {getFieldDecorator('bankBranchName', {
                initialValue: rowData.bankBranchName,
                normalize: (value: any) => value && value.trim(),
              })(<Input allowClear placeholder="请输入开户支行名称" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="单笔限额：">
              {getFieldDecorator('singleLimit', {
                // rules: [{ required: true, message: '请输入单笔限额' }],
                initialValue: rowData.singleLimit,
                // normalize: (value: any) => value && value.trim(),
              })(<InputNumber placeholder="请输入单笔限额" min={0} style={{ width: '275px' }} />)}
            </Form.Item>

            <Form.Item label="单日限额：">
              {getFieldDecorator('dailyLimit', {
                rules: [{ required: true, message: '请输入单日限额' }],
                initialValue: rowData.dailyLimit,
              })(<InputNumber placeholder="请输入单日限额" min={0} style={{ width: '275px' }} />)}
            </Form.Item>

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
                添加
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const Wrap = Form.create()(Edit);
export default Wrap;
