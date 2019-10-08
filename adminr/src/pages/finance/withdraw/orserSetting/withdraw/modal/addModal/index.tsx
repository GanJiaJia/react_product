import { Button, Form, Input, Modal, Select } from 'antd';

import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;

class Edit extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.getLevelList();
    this.withdrawOverview();
  }

  getLevelList = () =>
    this.props.dispatch({
      type: 'withdraw/getLevelList',
      payload: {},
    });

  withdrawOverview = () =>
    this.props.dispatch({
      type: 'withdraw/withdrawOverview',
      payload: { channelId: -1 },
    });

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
    const { levelListData, withdrawOverviewData } = this.props.withdraw.orserSetting;
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
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <Form.Item label="条件名称：">
              {getFieldDecorator('conditionName', {
                rules: [{ required: true, message: '请输入条件名称' }],
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input allowClear placeholder="请输入条件名称" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="三方出款商户：">
              {getFieldDecorator('merchantId', {
                rules: [{ required: true, message: '请选择三方出款商户' }],
              })(
                <Select
                  placeholder="请选择三方出款商户"
                  mode="multiple"
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {withdrawOverviewData.map((item: any) => (
                    <Option key={item.merchantId} value={item.merchantId}>
                      {item.merchantName}({item.merchantCode})
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="金额区间：">
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('minAmount', {
                  rules: [{ required: true, message: '请选择金额区间' }],
                  normalize: (value: any) => value && value.toString().trim(),
                })(
                  <Input
                    type="number"
                    suffix="元"
                    allowClear
                    placeholder="最小金额"
                    autoComplete="off"
                  />,
                )}
              </Form.Item>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('maxAmount', {
                  rules: [{ required: true, message: '请选择金额区间' }],
                  normalize: (value: any) => value && value.toString().trim(),
                })(
                  <Input
                    type="number"
                    suffix="元"
                    allowClear
                    placeholder="最大金额"
                    autoComplete="off"
                  />,
                )}
              </Form.Item>
            </Form.Item>

            <Form.Item label="层级类型：">
              {getFieldDecorator('levelId', {
                rules: [{ required: true, message: '请选择层级类型' }],
              })(
                <Select
                  placeholder="请选择层级类型"
                  mode="multiple"
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {levelListData.map((item: any) => (
                    <Option key={item.sortId} value={item.levelId}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="备注：">{getFieldDecorator('remark', {})(<TextArea />)}</Form.Item>

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
                确定
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
const Wrap = Form.create()(Edit);
export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(Wrap);
