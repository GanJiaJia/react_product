import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';

const { Option } = Select;
const { TextArea } = Input;

class Edit extends React.Component<StateType> {
  handleSubmit = (e: React.SyntheticEvent) => {
    const { callback, tabRowData } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        values.merchantId = tabRowData.merchantId;
        callback(values);
        // this.$httpAddMerchantAccount(values);
      }
    });
  };

  render() {
    const { show, showLoading, title, hide, tabRowData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { merchantData } = this.props.withdraw.third;
    const formatMerchantData = (data: any) =>
      data.map((item: any, index: number) => ({
        key: item.channelId,
        value: item.channelName,
      }));
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
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <Form.Item label="三方平台">
              {getFieldDecorator('channelId', {
                rules: [{ required: true, message: '选择三方平台' }],
                initialValue: tabRowData && tabRowData.channelId,
              })(
                <Select
                  placeholder="请选择三方平台"
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {formatMerchantData(merchantData).map((item: any) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="商户号">
              {getFieldDecorator('merchantCode', {
                rules: [{ required: true, message: '请输入商户号' }],
                initialValue: tabRowData && tabRowData.merchantCode,
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入商户号" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="公钥">
              {getFieldDecorator('publicKey', {
                rules: [{ required: true, message: '请输入公钥' }],
                initialValue: tabRowData && tabRowData.publicKey,
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入公钥" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="私钥">
              {getFieldDecorator('privateKey', {
                rules: [{ required: true, message: '请输入私钥' }],
                initialValue: tabRowData && tabRowData.privateKey,
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入私钥" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="请求URL">
              {getFieldDecorator('payUrl', {
                rules: [{ required: true, message: '请输入请求URL' }],
                initialValue: tabRowData && tabRowData.payUrl,
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入请求URL" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="接受URL">
              {getFieldDecorator('notifyUrl', {
                rules: [{ required: true, message: '请输入接受URL' }],
                initialValue: tabRowData && tabRowData.notifyUrl,
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入接受URL" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="备注：">
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入备注' }],
                initialValue: tabRowData && tabRowData.remark,
                normalize: (value: any) => value && value.toString().trim(),
              })(<TextArea />)}
            </Form.Item>

            <Form.Item label="当日出款上限">
              {getFieldDecorator('dailyLimit', {
                initialValue: tabRowData && tabRowData.dailyLimit,
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入当日出款上限" autoComplete="off" />)}
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
