import { Button, Form, Input, Modal, Select, InputNumber } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { StateType } from '@/common-typings';
import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;

class Edit extends React.Component<StateType> {
  handleSubmit = (e: React.SyntheticEvent) => {
    const { callback, rowData } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        // eslint-disable-next-line no-console
        values.id = rowData.id;
        callback(values);
      }
    });
  };

  render() {
    const { show, showLoading, title, hide, rowData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { levelListData } = this.props.withdraw.orserSetting;
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
          onOk={this.handleSubmit}
          confirmLoading={showLoading}
        >
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <Form.Item label="条件名称：">
              {getFieldDecorator('conditionName', {
                rules: [{ required: true, message: '请输入条件名称' }],
                initialValue: rowData.conditionName,
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="条件名称" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="出款方式：">
              {getFieldDecorator('withdrawType', {
                rules: [{ required: true, message: '请选择出款方式' }],
                initialValue: rowData.withdrawType,
              })(
                <Select placeholder="请选择出款方式">
                  <Option value={2}>手动出款</Option>
                  <Option value={0}>人工出款</Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="金额区间：">
              <Form.Item style={{ width: 120 }}>
                {getFieldDecorator('minAmount', {
                  rules: [{ required: true, message: '请输入最小金额' }],
                  initialValue: rowData.minAmount,
                  normalize: (value: any) => value && value.toString().trim(),
                })(
                  <Input addonAfter="元" type="number" placeholder="最小金额" autoComplete="off" />,
                )}
              </Form.Item>
              <Form.Item style={{ width: 120 }}>
                {getFieldDecorator('maxAmount', {
                  rules: [{ required: true, message: '请输入最大金额' }],
                  initialValue: rowData.maxAmount,
                  normalize: (value: any) => value && value.toString().trim(),
                })(
                  <Input addonAfter="元" type="number" placeholder="最大金额" autoComplete="off" />,
                )}
              </Form.Item>
            </Form.Item>

            <Form.Item label="层级类型：">
              {getFieldDecorator('levelId', {
                rules: [{ required: true, message: '请选择层级类型' }],
                initialValue: rowData.levelId ? rowData.levelId.split(',').map(Number) : [],
              })(
                <Select
                  placeholder="请选择层级类型"
                  mode="multiple"
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {levelListData.map((item: any, index: number) => (
                    <Option key={item.levelId} value={item.levelId}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="备注：">
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入备注' }],
                initialValue: rowData.remark,
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
