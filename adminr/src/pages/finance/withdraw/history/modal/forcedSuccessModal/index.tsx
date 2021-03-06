import { Form, Input, Modal } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import styles from './style.less';

const { TextArea } = Input;

class Edit extends React.Component<StateType> {
  handleSubmit = (e: React.SyntheticEvent) => {
    const { callback } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
      if (!err) {
        await callback(values);
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
          title="强制成功"
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          onOk={this.handleSubmit}
          confirmLoading={showLoading}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <div className={styles.tipMessage}>确认强制成功吗？</div>
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
const C = Form.create()(Edit);
export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(C);
