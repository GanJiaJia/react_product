import { Button, Form, Input, Select } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;

class Common extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.$httpFindGeneralConfig();
  }

  state = {
    disabled: true,
    selectFeeType: 'percent', // 默认提现费率：百分比
  };

  $httpSaveGeneralConfig = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveGeneralConfig',
      payload,
      fn: async (res: any) => {
        await this.$httpFindGeneralConfig();
        if (res.code !== 1) {
          this.handleReset();
        }
      },
    });
  };

  $httpFindGeneralConfig = () => {
    this.props.dispatch({
      type: 'withdraw/findGeneralConfig',
      payload: {},
    });
  };

  handleSelectFeeType = (value: any) => {
    this.setState({
      selectFeeType: value,
    });
  };

  handleEdit = () => {
    this.setState({ disabled: false });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        await this.$httpSaveGeneralConfig(values);
        this.setState({ disabled: true });
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { disabled, selectFeeType } = this.state;
    const { findGeneralConfigData } = this.props.withdraw.setting;
    const {
      freeTimes,
      feeType,
      fee,
      minLimit,
      maxLimit,
      feeLimit,
      countLimit,
    } = findGeneralConfigData;

    // 编辑按钮生成函数

    const edit = () => {
      if (checkPermission(this.props.btns, 'new-finance-withdraw-setting-edit')) {
        return (
          <Button type="primary" onClick={this.handleEdit} style={{ marginTop: '7px' }}>
            编辑
          </Button>
        );
      }
      return null;
    };

    // 重置提交按钮生成函数
    const confirm = () => (
      <span>
        <Button type="primary" htmlType="submit" loading={false} style={{ marginRight: '10px' }}>
          确定
        </Button>
        <Button onClick={this.handleReset}>重置</Button>
      </span>
    );

    return (
      <>
        <Form layout="inline" onSubmit={this.handleSubmit} style={{ border: '1px solid #e6e5e6' }}>
          <div className={styles.header}>
            <span className={styles.title}>普通提现设置</span>
            {disabled ? edit() : confirm()}
          </div>
          <div className={styles.main}>
            <Form.Item>
              <span className={styles.red}>*</span>
              <Form.Item label="每日提现次数：">
                <Form.Item>
                  <Input disabled placeholder={'>'} style={{ width: 35 }} autoComplete="off" />
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('freeTimes', {
                    rules: [{ required: true, message: '请输入提现次数' }],
                    initialValue: freeTimes,
                    normalize: (value: any) => value && value.toString().trim(),
                  })(<Input disabled={disabled} type="number" autoComplete="off" min="0" />)}
                </Form.Item>
                <div className={styles.tipMessage}>注：每日=自然日</div>
              </Form.Item>
              <span className={styles.red}>*</span>
              <Form.Item label="提现费率=">
                <Form.Item>
                  {getFieldDecorator('feeType', {
                    rules: [{ required: true, message: '请输入提现费率' }],
                    initialValue: feeType,
                  })(
                    <Select
                      disabled={disabled}
                      style={{ width: 120 }}
                      placeholder="选择"
                      onChange={this.handleSelectFeeType}
                    >
                      <Option value="percent">百分比</Option>
                      <Option value="fix">固定金额</Option>
                    </Select>,
                  )}{' '}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('fee', {
                    rules: [{ required: true, message: '请输入手续费' }],
                    initialValue: fee,
                    normalize: (value: any) => value && value.toString().trim(),
                  })(
                    <Input
                      min="0"
                      max={selectFeeType === 'percent' ? '100' : undefined}
                      type="number"
                      disabled={disabled}
                      addonAfter="手续费"
                      style={{ width: 150 }}
                      autoComplete="off"
                    />,
                  )}
                </Form.Item>
                <div className={styles.tipMessage}>注：按单笔提现收取“百分比 or 固定金额</div>
              </Form.Item>
              <span className={styles.red}>*</span>
              <Form.Item label="提现费率上限=">
                <Form.Item>
                  {getFieldDecorator('feeLimit', {
                    rules: [{ required: true, message: '请输入金额' }],
                    initialValue: feeLimit,
                    normalize: (value: any) => value && value.toString().trim(),
                  })(
                    <Input
                      min="0"
                      type="number"
                      disabled={disabled}
                      addonAfter="元"
                      style={{ width: 120 }}
                      autoComplete="off"
                    />,
                  )}{' '}
                </Form.Item>
                <div className={styles.tipMessage}>注：按单笔提现手续费设置上限</div>
              </Form.Item>
            </Form.Item>
          </div>
          <div className={styles.main}>
            <Form.Item>
              <span className={styles.red}>*</span>
              <Form.Item label="每日提现次数上限：">
                <Form.Item>
                  {getFieldDecorator('countLimit', {
                    rules: [{ required: true, message: '请输入次数上限' }],
                    initialValue: countLimit,
                    normalize: (value: any) => value && value.toString().trim(),
                  })(
                    <Input
                      min="0"
                      type="number"
                      disabled={disabled}
                      addonAfter="次"
                      style={{ width: 120 }}
                      autoComplete="off"
                    />,
                  )}{' '}
                </Form.Item>
                <div className={styles.tipMessage}>
                  注1：达到”提现次数 or 提现金额“上限后，则无法进行提现;
                </div>
                <div className={styles.tipMessage}>
                  注2：每天提现次数上限“必须大于”每天免费提现次数“，否则保存失效;
                </div>
              </Form.Item>
            </Form.Item>
          </div>
          <div className={styles.main}>
            <Form.Item label="单笔提现限额设置：">
              <Form.Item label="单笔最低限额：">
                {getFieldDecorator('minLimit', {
                  rules: [{ required: true, message: '请输入金额' }],
                  initialValue: minLimit,
                  normalize: (value: any) => value && value.toString().trim(),
                })(
                  <Input
                    min="0"
                    type="number"
                    disabled={disabled}
                    addonAfter="元"
                    style={{ width: 150 }}
                    autoComplete="off"
                  />,
                )}{' '}
              </Form.Item>
              <Form.Item label="单笔最高限额：">
                {getFieldDecorator('maxLimit', {
                  rules: [{ required: true, message: '请输入金额' }],
                  initialValue: maxLimit,
                  normalize: (value: any) => value && value.toString().trim(),
                })(
                  <Input
                    min="0"
                    type="number"
                    disabled={disabled}
                    addonAfter="元"
                    style={{ width: 150 }}
                    autoComplete="off"
                  />,
                )}{' '}
              </Form.Item>
            </Form.Item>
          </div>
        </Form>
      </>
    );
  }
}

const C = Form.create({ name: 'searchWithdraw' })(Common);

export default connect(({ withdraw, global }: { withdraw: any; global: any }) => ({
  withdraw,
  btns: global.btns,
}))(C);
