import { Modal, Checkbox, Form } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';

class AccountModal extends React.Component<StateType> {
  handleSubmit = (e: React.SyntheticEvent) => {
    const { handlAccountModalOk } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        handlAccountModalOk(values);
      }
    });
  };

  render() {
    const { show, showLoading, hide, defaltSelectData } = this.props;
    const { accountListData } = this.props.withdraw.orserSetting;
    const { getFieldDecorator } = this.props.form;

    const optionsMap = accountListData.list.map((item: any, index: number) => ({
      label: item.userName,
      value: item.id,
    }));
    return (
      <>
        <Modal
          destroyOnClose
          title="分单设置账户"
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          onOk={this.handleSubmit}
          confirmLoading={showLoading}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('accountIds', {
                // rules: [{ required: true, message: '备注不能为空' }],
                initialValue: [defaltSelectData[0].value],
              })(<Checkbox.Group options={optionsMap} />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

const C = Form.create()(AccountModal);
export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(C);
