import { Button, Form, Input, Modal, Select } from 'antd';

import React from 'react';
import styles from '../style.less';

const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

class EditModal extends React.Component<StateType> {
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
        handleOk(values);
      }
    });
  };

  render() {
    const { show, hide, showLoading, rowData } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="编辑出款银行卡"
          okText="完成"
          visible={show}
          onCancel={() => {
            hide();
          }}
          confirmLoading={showLoading}
          footer={null}
        >
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <Form.Item label="银行名称：">
              {getFieldDecorator('bankName', {
                initialValue: rowData.merchantName,
                rules: [{ required: true, message: '请选择银行' }],
              })(
                <Select
                  placeholder="请选择银行"
                  // onChange={this.handleSelectChange}
                >
                  <Option value="1">中国银行</Option>
                  <Option value="2">农业银行</Option>
                  <Option value="3">建设银行</Option>
                  <Option value="4">中国银行</Option>
                  <Option value="5">农业银行</Option>
                  <Option value="6">建设银行</Option>
                  <Option value="7">中国银行</Option>
                  <Option value="8">农业银行</Option>
                  <Option value="9">建设银行</Option>
                  <Option value="10">中国银行</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="银行卡号：">
              {getFieldDecorator('bankNumber', {
                initialValue: rowData.merchantNumber,
                rules: [{ required: true, message: '请选择请输入银行卡号' }],
              })(<Input.Password allowClear placeholder="请输入银行卡号" />)}
            </Form.Item>

            <Form.Item label="收款账户名称：">
              {getFieldDecorator('nickname', {
                initialValue: rowData.username,
                rules: [{ required: true, message: '请输入收款账户名称' }],
              })(<Input.Password allowClear placeholder="请输入收款账户名称" />)}
            </Form.Item>

            <Form.Item label="开户支行名称：">
              {getFieldDecorator('bankNickname', {
                initialValue: rowData.merchantName,
              })(<Input allowClear placeholder="请输入开户支行名称" />)}
            </Form.Item>

            <Form.Item label="网银登陆账号：">
              {getFieldDecorator('username', {
                initialValue: rowData.username,
                rules: [{ required: true, message: '请输入网银登陆账号' }],
              })(<Input allowClear placeholder="请输入网银登陆账号" />)}
            </Form.Item>

            <Form.Item label="网银登陆密码：">
              {getFieldDecorator('password', {
                initialValue: rowData.dailyLimit,
                rules: [{ required: true, message: '请输入网银登陆密码' }],
              })(<Input allowClear placeholder="请输入网银登陆密码" />)}
            </Form.Item>

            <Form.Item label="服务器（电脑）编号：">
              {getFieldDecorator('computerNumber', {
                initialValue: rowData.computerNumber,
                rules: [{ required: true, message: '请输入服务器（电脑）编号' }],
              })(<Input allowClear placeholder="请输入服务器（电脑）编号" />)}
            </Form.Item>

            <Form.Item label="备注">
              {getFieldDecorator('mark', {
                initialValue: rowData.mark,
              })(<Input allowClear placeholder="备注信息" />)}
            </Form.Item>

            <Form.Item className={styles.editBtns}>
              <Button
                onClick={() => {
                  hide();
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
const Wrap = Form.create()(EditModal);
export default Wrap;
