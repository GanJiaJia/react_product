import { Button, Form, Input, Select } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;

class Common extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.$httpFindQuickConfig();
  }

  state = {
    disabled: true,
    sportRuleSign: false,
    funGameRuleSign: false,
    splitRuleSign: false,
    funGameRuleListData: [],
    sportRuleListData: [],
    splitRuleListData: [],
    selectFeeType: 'percent',
  };

  handleEdit = () => {
    this.setState({ disabled: false });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        this.formatParamsplitRuleList(values);
        this.formatParamFunGameRuleList(values);
        this.formatParamSportRuleList(values);
        await this.$httpSaveQuickConfig(values);
        this.setState({ disabled: true });
      }
    });
  };

  formatParamSportRuleList = (values: any) => {
    values.sportRuleList = [];
    const betAmountArr: any = [];
    const freeTimesArr: any = [];
    Object.keys(values).forEach((item: any, index: number) => {
      if (item.includes('betAmount')) {
        betAmountArr.push(values[item]);
        delete values[item];
      }
      if (item.includes('freeTimes')) {
        freeTimesArr.push(values[item]);
        delete values[item];
      }
    });
    betAmountArr.forEach((item: any, index: number) => {
      values.sportRuleList[index] = {};
    });
    betAmountArr.forEach((item: any, index: number) => {
      values.sportRuleList[index].betAmount = betAmountArr[index];
    });
    freeTimesArr.forEach((item: any, index: number) => {
      values.sportRuleList[index].freeTimes = freeTimesArr[index];
    });
  };

  formatParamFunGameRuleList = (values: any) => {
    values.funGameRuleList = [];
    const betAmountArr: any = [];
    const freeTimesArr: any = [];
    Object.keys(values).forEach((item: any, index: number) => {
      if (item.includes('betAmountg')) {
        betAmountArr.push(values[item]);
        delete values[item];
      }
      if (item.includes('freeTimesg')) {
        freeTimesArr.push(values[item]);
        delete values[item];
      }
    });
    betAmountArr.forEach((item: any, index: number) => {
      values.funGameRuleList[index] = {};
    });
    betAmountArr.forEach((item: any, index: number) => {
      values.funGameRuleList[index].betAmount = betAmountArr[index];
    });
    freeTimesArr.forEach((item: any, index: number) => {
      values.funGameRuleList[index].freeTimes = freeTimesArr[index];
    });
  };

  formatParamsplitRuleList = (values: any) => {
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
  };

  $httpFindQuickConfig = () => {
    this.props.dispatch({
      type: 'withdraw/findQuickConfig',
      payload: {},
    });
  };

  $httpSaveQuickConfig = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveQuickConfig',
      payload,
      fn: (res: any) => {
        this.$httpFindQuickConfig();
        if (res.code !== 1) {
          this.handleReset();
        }
      },
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      funGameRuleListData: [],
      sportRuleListData: [],
      splitRuleListData: [],
      sportRuleSign: false,
      funGameRuleSign: false,
      splitRuleSign: false,
    });
  };

  deleteSport = (index: number) => {
    const { sportRuleList } = this.props.withdraw.setting.findQuickConfigData;
    const { sportRuleListData, sportRuleSign } = this.state;
    const obj = {
      index,
      stateData: sportRuleListData,
      storeData: sportRuleList,
      sign: sportRuleSign,
      dataKey: 'sportRuleListData',
      signKey: 'sportRuleSign',
    };
    this.handleDelete(obj);
  };

  addSport = () => {
    const { sportRuleList } = this.props.withdraw.setting.findQuickConfigData;
    const { sportRuleListData, sportRuleSign } = this.state;
    const obj = {
      stateData: sportRuleListData,
      storeData: sportRuleList,
      sign: sportRuleSign,
      dataKey: 'sportRuleListData',
      signKey: 'sportRuleSign',
    };
    this.handleAdd(obj);
  };

  deleteFunGame = (index: number) => {
    const { funGameRuleList } = this.props.withdraw.setting.findQuickConfigData;
    const { funGameRuleListData, funGameRuleSign } = this.state;
    const obj = {
      index,
      stateData: funGameRuleListData,
      storeData: funGameRuleList,
      sign: funGameRuleSign,
      dataKey: 'funGameRuleListData',
      signKey: 'funGameRuleSign',
    };
    this.handleDelete(obj);
  };

  addFunGame = () => {
    const { funGameRuleList } = this.props.withdraw.setting.findQuickConfigData;
    const { funGameRuleListData, funGameRuleSign } = this.state;
    const obj = {
      stateData: funGameRuleListData,
      storeData: funGameRuleList,
      sign: funGameRuleSign,
      dataKey: 'funGameRuleListData',
      signKey: 'funGameRuleSign',
    };
    this.handleAdd(obj);
  };

  deleteSplit = (index: number) => {
    const { splitRuleList } = this.props.withdraw.setting.findQuickConfigData;
    const { splitRuleListData, splitRuleSign } = this.state;
    const obj = {
      index,
      stateData: splitRuleListData,
      storeData: splitRuleList,
      sign: splitRuleSign,
      dataKey: 'splitRuleListData',
      signKey: 'splitRuleSign',
    };
    this.handleDelete(obj);
  };

  addSplit = () => {
    const { splitRuleList } = this.props.withdraw.setting.findQuickConfigData;
    const { splitRuleListData, splitRuleSign } = this.state;
    const obj = {
      stateData: splitRuleListData,
      storeData: splitRuleList,
      sign: splitRuleSign,
      dataKey: 'splitRuleListData',
      signKey: 'splitRuleSign',
    };
    this.handleAdd(obj);
  };

  handleAdd = (obj: any) => {
    const { stateData, storeData, sign, dataKey, signKey } = obj;
    const copyStateData = JSON.parse(JSON.stringify(stateData));
    const copyStoreData = JSON.parse(JSON.stringify(storeData));
    const arr = sign ? copyStateData : copyStoreData;
    arr.push({});
    this.setState({ [dataKey]: arr, [signKey]: true });
  };

  handleDelete = (obj: any) => {
    const { index, stateData, storeData, sign, dataKey, signKey } = obj;
    const copyStateData = JSON.parse(JSON.stringify(stateData));
    const copyStoreData = JSON.parse(JSON.stringify(storeData));
    const arr = sign ? copyStateData : copyStoreData;
    delete arr[index];
    const filterArr = arr.filter(Boolean);
    this.setState({ [dataKey]: filterArr, [signKey]: true });
  };

  handleSelectFeeType = (value: any) => {
    this.setState({
      selectFeeType: value,
    });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      disabled,
      sportRuleSign,
      sportRuleListData,
      funGameRuleListData,
      splitRuleListData,
      funGameRuleSign,
      splitRuleSign,
      selectFeeType,
    } = this.state;
    const { findQuickConfigData } = this.props.withdraw.setting;
    const {
      freeTimes,
      feeType,
      fee,
      countLimit,
      minLimit,
      maxLimit,
      feeLimit,
      sportRuleList = [],
      funGameRuleList = [],
      splitRuleList = [],
    } = findQuickConfigData;
    const sportRuleListMap = sportRuleSign ? sportRuleListData : sportRuleList;
    const funGameRuleListMap = funGameRuleSign ? funGameRuleListData : funGameRuleList;
    const splitRuleListMap = splitRuleSign ? splitRuleListData : splitRuleList;

    // 编辑按钮生成函数
    const edit = () => {
      if (checkPermission(this.props.btns, 'new-finance-withdraw-large-setting-edit')) {
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
            <span className={styles.title}>大额提现设置</span>
            {disabled ? edit() : confirm()}
          </div>

          <div className={styles.main}>
            <Form.Item label="体育流水赠送设置：">
              <Button type="link" disabled={disabled} onClick={this.addSport}>
                添加
              </Button>
              <br />
              {sportRuleListMap.map((item: any, index: number) => (
                // eslint-disable-next-line
                <div key={index}>
                  <Form.Item label="周累计有效投注金额（自然周)：">
                    <Form.Item>
                      <Input disabled placeholder={'>'} style={{ width: 35 }} />
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator(`betAmount${index}`, {
                        rules: [{ required: true, message: '请输入金额' }],
                        initialValue: item.betAmount,
                      })(
                        <Input
                          disabled={disabled}
                          addonAfter="元"
                          style={{ width: 120 }}
                          min="0"
                          type="number"
                        />,
                      )}
                    </Form.Item>
                  </Form.Item>

                  <Form.Item label="赠送免费提现次数：">
                    {getFieldDecorator(`freeTimes${index}`, {
                      initialValue: item.freeTimes,
                    })(
                      <Input
                        disabled={disabled}
                        addonAfter="次"
                        style={{ width: 120 }}
                        min="0"
                        type="number"
                      />,
                    )}{' '}
                  </Form.Item>
                  <Button type="link" disabled={disabled} onClick={() => this.deleteSport(index)}>
                    删除
                  </Button>
                </div>
              ))}
            </Form.Item>
          </div>

          <div className={styles.main}>
            <Form.Item label="娱乐流水赠送设置：">
              <Button type="link" disabled={disabled} onClick={this.addFunGame}>
                添加
              </Button>
              <br />
              {funGameRuleListMap.map((item: any, index: number) => (
                // eslint-disable-next-line
                <div key={index}>
                  <span className={styles.red}>*</span>
                  <Form.Item label="周累计有效投注金额（自然周)：">
                    <Form.Item>
                      <Input disabled placeholder={'>'} style={{ width: 35 }} />
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator(`betAmountg${index}`, {
                        rules: [{ required: true, message: '请输入金额' }],
                        initialValue: item.betAmount,
                      })(
                        <Input
                          min="0"
                          type="number"
                          disabled={disabled}
                          addonAfter="元"
                          style={{ width: 120 }}
                          autoComplete="off"
                        />,
                      )}
                    </Form.Item>
                  </Form.Item>

                  <Form.Item label="赠送免费提现次数：">
                    {getFieldDecorator(`freeTimesg${index}`, {
                      initialValue: item.freeTimes,
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
                  <Button type="link" disabled={disabled} onClick={() => this.deleteFunGame(index)}>
                    删除
                  </Button>
                </div>
              ))}
            </Form.Item>
          </div>

          <div className={styles.main}>
            <Form.Item>
              {/* <Form.Item label="每日提现次数：">
                <Form.Item>
                  <Input disabled placeholder={'>'} style={{ width: 35 }} />
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('freeTimes', {
                    rules: [{ required: true }],
                    initialValue: freeTimes,
                  })(<Input disabled={disabled} />)}
                </Form.Item>
                <div className={styles.tipMessage}>注：每日=自然日</div>
              </Form.Item> */}
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

              {/* <Form.Item label="提现费率上限=">
                <Form.Item>
                  {getFieldDecorator('feeLimit', {
                    rules: [{ required: true }],
                    initialValue: feeLimit,
                  })(<Input disabled={disabled} addonAfter="元" style={{ width: 120 }} />)}{' '}
                </Form.Item>
                <div className={styles.tipMessage}>注：按单笔提现手续费设置上限</div>
              </Form.Item> */}
            </Form.Item>
          </div>

          <div className={styles.main}>
            <Form.Item label="每日提现次数上限：">
              <Form.Item>
                {getFieldDecorator('countLimit', {
                  rules: [{ required: true, message: '请输入次数上限' }],
                  initialValue: countLimit,
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
          </div>

          <div className={styles.main}>
            <Form.Item label="单笔提现限额设置：">
              <br />
              <Form.Item label="单笔最低限额：">
                {getFieldDecorator('minLimit', {
                  initialValue: minLimit,
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
              <Form.Item label="单笔最高限额：">
                {getFieldDecorator('maxLimit', {
                  rules: [{ required: true, message: '请输入最高金额' }],
                  initialValue: maxLimit,
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
            </Form.Item>
          </div>

          <div className={styles.main}>
            <Form.Item label="提现拆单设置：">
              <Button type="link" disabled={disabled} onClick={this.addSplit}>
                添加
              </Button>
              <br />
              {/* <Form.Item label="拆单剩余余额：">
                {getFieldDecorator('thirdBegi32nTime', {})(
                  <Input disabled={disabled} addonAfter="元" style={{ width: 150 }} />,
                )}{' '}
              </Form.Item>
              <br /> */}
              {splitRuleListMap.map((item: any, index: number) => (
                // eslint-disable-next-line
                <Form.Item key={index}>
                  <Form.Item label="提现金额区间：">
                    <Form.Item>
                      {getFieldDecorator(`minAmount${index}`, {
                        initialValue: item.minAmount,
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
                    })(
                      <Input
                        min="0"
                        type="number"
                        addonAfter="元"
                        disabled={disabled}
                        style={{ width: 150 }}
                        autoComplete="off"
                      />,
                    )}{' '}
                  </Form.Item>
                  <Form.Item label="随机值+-：">
                    {getFieldDecorator(`randomAmount${index}`, {
                      initialValue: item.randomAmount,
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

const C = Form.create({ name: 'searchWithdraw' })(Common);

export default connect(({ withdraw, global }: { withdraw: any; global: any }) => ({
  withdraw,
  btns: global.btns,
}))(C);
