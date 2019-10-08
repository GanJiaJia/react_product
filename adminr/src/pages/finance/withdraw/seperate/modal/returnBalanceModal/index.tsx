import { Form, Input, Modal } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import styles from './style.less';

const { TextArea } = Input;

class ReturnBalanceModal extends React.Component<StateType> {
  handleSubmit = (e: React.SyntheticEvent) => {
    const { callback } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        callback(values);
      }
    });
  };

  render() {
    const { show, showLoading, hide } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Modal
          destroyOnClose
          width={600}
          title="提现退回"
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          onOk={this.handleSubmit}
          confirmLoading={showLoading}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <div className={styles.tipMessage}>
              退回之后，提现订单将改为失败，同时提现金额将退回到用户账户余额，确认退回吗？
            </div>
            <br />
            <Form.Item label="备注：">
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入备注' }],
              })(<TextArea />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
const C = Form.create()(ReturnBalanceModal);
export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(C);
