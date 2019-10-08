import { Button, Form, Icon, Input, Popconfirm, Select, Spin, Table, TimePicker } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;

class Proxy extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.$httpFindProxyConfig();
  }

  state = {
    splitRuleListData: [],
    addOrDeleteSign: false,
    disabled: true,
    selectFeeType: 'percent',
  };

  deleteSplit = (index: number) => {
    const { splitRuleList } = this.props.withdraw.setting.findProxyConfigData;
    const { splitRuleListData, addOrDeleteSign } = this.state;
    const copySplitRuleListData = JSON.parse(JSON.stringify(splitRuleListData));
    const copySplitRuleList = JSON.parse(JSON.stringify(splitRuleList));
    const arr = addOrDeleteSign ? copySplitRuleListData : copySplitRuleList;
    delete arr[index];
    const filterArr = arr.filter(Boolean);
    this.setState({ splitRuleListData: filterArr, addOrDeleteSign: true });
  };

  addSplit = () => {
    const { splitRuleList } = this.props.withdraw.setting.findProxyConfigData;
    const { splitRuleListData, addOrDeleteSign } = this.state;
    const copySplitRuleListData = JSON.parse(JSON.stringify(splitRuleListData));
    const copySplitRuleList = JSON.parse(JSON.stringify(splitRuleList));
    const arr = addOrDeleteSign ? copySplitRuleListData : copySplitRuleList;
    arr.push({});
    this.setState({ splitRuleListData: arr, addOrDeleteSign: true });
  };

  $httpFindProxyConfig = () => {
    this.props.dispatch({
      type: 'withdraw/findProxyConfig',
      payload: {},
    });
  };

  $httpSaveProxyConfig = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveProxyConfig',
      payload,
      fn: (res: any) => {
        this.$httpFindProxyConfig();
        if (res.code !== 1) {
          this.handleReset();
        }
      },
    });
  };

  handleEdit = () => {
    this.setState({ disabled: false });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        values.splitRuleList = [];
        const minAmountArr: any = [];
        const maxAmountArr: any = [];
        const randomAmountArr: any = [];
        const splitAmountArr: any = [];
        Object.keys(values).forEach((item: any, index: number) => {
          if (item.includes('minAmount')) {
            minAmountArr.push(values[item]);
            delete values[item];
          }
          if (item.includes('maxAmount')) {
            maxAmountArr.push(values[item]);
            delete values[item];
          }
          if (item.includes('randomAmount')) {
            randomAmountArr.push(values[item]);
            delete values[item];
          }
          if (item.includes('splitAmount')) {
            splitAmountArr.push(values[item]);
            delete values[item];
          }
        });
        minAmountArr.forEach((item: any, index: number) => {
          values.splitRuleList[index] = {};
        });
        minAmountArr.forEach((item: any, index: number) => {
          values.splitRuleList[index].minAmount = minAmountArr[index];
        });
        maxAmountArr.forEach((item: any, index: number) => {
          values.splitRuleList[index].maxAmount = maxAmountArr[index];
        });
        randomAmountArr.forEach((item: any, index: number) => {
          values.splitRuleList[index].randomAmount = randomAmountArr[index];
        });
        splitAmountArr.forEach((item: any, index: number) => {
          values.splitRuleList[index].splitAmount = splitAmountArr[index];
        });
        await this.$httpSaveProxyConfig(values);
        this.setState({ disabled: true });
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      splitRuleListData: [],
      addOrDeleteSign: false,
    });
  };

  handleSelectFeeType = (value: any) => {
    this.setState({
      selectFeeType: value,
    });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { disabled, addOrDeleteSign, splitRuleListData, selectFeeType } = this.state;
    const { findProxyConfigData } = this.props.withdraw.setting;
    const {
      countLimit,
      feeType,
      fee,
      amountLimit,
      minLimit,
      maxLimit,
      splitRuleList = [],
    } = findProxyConfigData;
    const splitRuleListMap = addOrDeleteSign ? splitRuleListData : splitRuleList;

    // 编辑按钮生成函数
    const edit = () => {
      if (checkPermission(this.props.btns, 'new-finance-withdraw-proxy-setting-edit')) {
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
            <span className={styles.title}>代理提现设置</span>
            {disabled ? edit() : confirm()}
          </div>
          <div className={styles.main}>
            <Form.Item label="每日提现次数：">
              <Form.Item>
                <Input disabled placeholder={'>'} style={{ width: 35 }} />
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('countLimit', {
                  rules: [{ required: true, message: '请输入提现次数' }],
                  initialValue: countLimit,
                })(<Input min="0" type="number" disabled={disabled} autoComplete="off" />)}
              </Form.Item>
              <div className={styles.tipMessage}>注：每日=自然日</div>
            </Form.Item>

            <Form.Item label="提现费率=">
              <Form.Item>
                {getFieldDecorator('feeType', {
                  rules: [{ required: true, message: '请输入费率' }],
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

            <Form.Item label="提现费率上限=">
              <Form.Item>
                {getFieldDecorator('amountLimit', {
                  rules: [{ required: true, message: '请输入金额' }],
                  initialValue: amountLimit,
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
          <div className={styles.main}>
            <Form.Item label="提现拆单设置：">
              <Button type="link" disabled={disabled} onClick={this.addSplit}>
                添加
              </Button>
              <br />
              {splitRuleListMap.map((item: any, index: number) => (
                // eslint-disable-next-line
                <Form.Item key={index}>
                  <Form.Item label="提现金额区间：">
                    <Form.Item>
                      {getFieldDecorator(`minAmount${index}`, {
                        initialValue: item.minAmount,
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
                    ～&nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Item>
                      {getFieldDecorator(`maxAmount${index}`, {
                        initialValue: item.maxAmount,
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
                  <Form.Item label="拆单金额：">
                    {getFieldDecorator(`splitAmount${index}`, {
                      initialValue: item.splitAmount,
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
                  <Form.Item label="随机值+-：">
                    {getFieldDecorator(`randomAmount${index}`, {
                      initialValue: item.randomAmount,
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
                  <Button type="link" disabled={disabled} onClick={() => this.deleteSplit(index)}>
                    删除
                  </Button>
                </Form.Item>
              ))}
            </Form.Item>
          </div>
        </Form>
      </>
    );
  }
}

const C = Form.create({ name: 'searchWithdraw' })(Proxy);

export default connect(({ withdraw, global }: { withdraw: any; global: any }) => ({
  withdraw,
  btns: global.btns,
}))(C);
