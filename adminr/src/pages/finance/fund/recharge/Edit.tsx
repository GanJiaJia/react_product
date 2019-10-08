import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import React from 'react';
import styles from './style.less';

interface StateType {
  [propName: string]: any;
}

class Edit extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit(e: React.SyntheticEvent) {
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
  }

  render() {
    const { show, hide, showLoading, rowData } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          // finance.fund.recharge.modal.edit.title
          title={<FormattedMessage id="finance.fund.recharge.modal.edit.title" />}
          visible={show}
          width="700px"
          onCancel={() => {
            hide();
          }}
          confirmLoading={showLoading}
          footer={null}
        >
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('merchantId', {
                initialValue: rowData.merchantId,
              })(<Input hidden />)}
            </Form.Item>

            <Form.Item
              colon
              label={<FormattedMessage id="finance.fund.recharge.form.label.loginAccount" />}
            >
              {getFieldDecorator('backendAccount', {
                initialValue: rowData.backendAccount,
              })(
                <Input
                  allowClear
                  placeholder={formatMessage({
                    id: 'finance.fund.recharge.form.label.loginAccount.placeholder',
                  })}
                />,
              )}
            </Form.Item>

            <Form.Item
              colon
              label={<FormattedMessage id="finance.fund.recharge.form.label.loginPassword" />}
            >
              {getFieldDecorator('backendPassword', {
                initialValue: rowData.backendPassword,
              })(
                <Input.Password
                  allowClear
                  placeholder={formatMessage({
                    id: 'finance.fund.recharge.form.label.loginPassword.placeholder',
                  })}
                />,
              )}
            </Form.Item>

            <Form.Item
              colon
              label={<FormattedMessage id="finance.fund.recharge.form.label.paymentPassword" />}
            >
              {getFieldDecorator('paymentPassword', {
                initialValue: rowData.paymentPassword,
              })(
                <Input.Password
                  allowClear
                  placeholder={formatMessage({
                    id: 'finance.fund.recharge.form.label.paymentPassword.placeholder',
                  })}
                />,
              )}
            </Form.Item>

            <Form.Item
              colon
              label={<FormattedMessage id="finance.fund.recharge.form.label.uShieldPassword" />}
            >
              {getFieldDecorator('ushieldPassword', {
                initialValue: rowData.ushieldPassword,
              })(
                <Input
                  allowClear
                  placeholder={formatMessage({
                    id: 'finance.fund.recharge.form.label.uShieldPassword.placeholder',
                  })}
                />,
              )}
            </Form.Item>

            <Form.Item
              colon
              label={<FormattedMessage id="finance.fund.recharge.form.label.dailyDepositLimit" />}
            >
              {getFieldDecorator('dailyLimit', {
                rules: [
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="finance.fund.recharge.form.label.dailyDepositLimit.placeholder" />
                    ),
                  },
                ],
                initialValue: rowData.dailyLimit,
              })(
                <InputNumber
                  placeholder={formatMessage({
                    id: 'finance.fund.recharge.form.label.dailyDepositLimit.placeholder',
                  })}
                  style={{ width: '408px' }}
                />,
              )}
            </Form.Item>

            <Form.Item className={styles.editBtns}>
              <Button
                onClick={() => {
                  hide();
                }}
              >
                <FormattedMessage id="finance.fund.recharge.modal.edit.btns.cancel" />
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={showLoading}
                style={{ marginLeft: '20px' }}
              >
                <FormattedMessage id="finance.fund.recharge.modal.edit.btns.confirm" />
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
