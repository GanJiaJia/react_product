import { Button, Form, Input, Modal } from 'antd';

import React from 'react';
// import styles from './style.less';
import { connect } from 'dva';
import { StateType } from '@/common-typings';

const { TextArea } = Input;

class AddAccount extends React.Component<StateType> {
  handleSubmit = (e: React.SyntheticEvent) => {
    const { handleOk } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        handleOk(values);
      }
    });
  };

  render() {
    const { show, showLoading, title, hide } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {
      orserSetting: {
        validateAccountData: { exitAccount },
      },
    } = this.props.withdraw;
    return (
      <>
        <Modal
          destroyOnClose
          title={title}
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          confirmLoading={showLoading}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('users', {
                rules: [{ required: true, message: '用户名不能为空!' }],
              })(<TextArea rows={5} placeholder="请输入会员账户，多个账户请用，隔开" />)}
            </Form.Item>

            <div>
              {!!exitAccount.length && <span>检索到已存在的账户名：</span>}
              {!!exitAccount.length &&
                exitAccount.map((item: any, index: number) => (
                  // eslint-disable-next-line
                  <span key={index}>
                    <span style={{ color: 'red', textDecoration: 'underline' }}>{item}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </span>
                ))}
            </div>

            <Form.Item>
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
                确定
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
const C = Form.create()(AddAccount);

export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(C);
