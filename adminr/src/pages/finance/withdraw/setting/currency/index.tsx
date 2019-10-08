import { Button, Form, Radio, Input } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

class Currency extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.$httpFindRejectReason();
    this.$httpFindCommonConfig();
  }

  state = {
    addOrDeleteSign: false,
    disabled: true,
    rejectReasonData: [],
  };

  handleEdit = () => {
    this.setState({ disabled: false });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        // 通用设置的接口参数，格式整理
        const commonParamsArr = ['amountLimit', 'multiple', 'tipStatus'];
        const commonParams: any = {};
        Object.keys(values).forEach((item: any, index: number) => {
          commonParamsArr.forEach((obj: any, i: number) => {
            if (item === obj) {
              commonParams[obj] = values[item];
            }
          });
        });
        await this.$httpSaveCommonConfig(commonParams);
        // 拒绝理由的接口参数，格式整理
        const reasons: any = [];
        Object.keys(values).forEach((item: any, index: number) => {
          if (item.includes('reasons')) {
            reasons.push(values[item]);
          }
        });
        const rejectReasonParams = reasons.filter(Boolean).join();
        await this.$httpSaveRejectReason({ reasons: rejectReasonParams });
        this.setState({ disabled: true });
      }
    });
  };

  deleteRejectReason = (index: number) => {
    const { findRejectReasonData } = this.props.withdraw.setting;
    const { rejectReasonData, addOrDeleteSign } = this.state;
    const arr = addOrDeleteSign ? rejectReasonData : [...findRejectReasonData];
    delete arr[index];
    const filterArr = arr;
    this.setState({ rejectReasonData: filterArr, addOrDeleteSign: true });
  };

  addRejectReason = () => {
    const { findRejectReasonData } = this.props.withdraw.setting;
    const { rejectReasonData, addOrDeleteSign } = this.state;
    const arr = addOrDeleteSign ? rejectReasonData : [...findRejectReasonData];
    arr.push('');
    this.setState({ rejectReasonData: arr, addOrDeleteSign: true });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      rejectReasonData: [],
      addOrDeleteSign: false,
    });
  };

  $httpSaveCommonConfig = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveCommonConfig',
      payload,
      fn: (res: any) => {
        this.$httpFindCommonConfig();
        if (res.code !== 1) {
          this.handleReset();
        }
      },
    });
  };

  $httpSaveRejectReason = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/saveRejectReason',
      payload,
      fn: (res: any) => {
        this.$httpFindRejectReason();
        if (res.code !== 1) {
          this.handleReset();
        }
      },
    });
  };

  $httpFindRejectReason = () => {
    this.props.dispatch({
      type: 'withdraw/findRejectReason',
      payload: {},
    });
  };

  $httpFindCommonConfig = () => {
    this.props.dispatch({
      type: 'withdraw/findCommonConfig',
      payload: {},
    });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { disabled, rejectReasonData, addOrDeleteSign } = this.state;
    const { findRejectReasonData, findCommonConfigData } = this.props.withdraw.setting;
    const { amountLimit, multiple, tipStatus } = findCommonConfigData;
    const rejectReasonList = addOrDeleteSign ? rejectReasonData : findRejectReasonData;

    // 编辑按钮生成函数
    const edit = () => {
      if (checkPermission(this.props.btns, 'new-finance-withdraw-general-setting-edit')) {
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
            <span className={styles.title}>提现通用设置</span>
            {disabled ? edit() : confirm()}
          </div>
          <div className={styles.main}>
            <Form.Item>
              <Form.Item>
                <Form.Item label="提现流水倍数设置">
                  {getFieldDecorator('multiple', {
                    rules: [{ required: true, message: '请输入倍数' }],
                    initialValue: multiple,
                    normalize: (value: any) => value && value.toString().trim(),
                  })(
                    <Input
                      min="0"
                      type="number"
                      disabled={disabled}
                      style={{ width: 150 }}
                      autoComplete="off"
                      addonAfter="倍"
                    />,
                  )}{' '}
                </Form.Item>
                <div className={styles.tipMessage}>注：提现流水=充值金额*倍数</div>
              </Form.Item>

              <Form.Item label="每日提现金额上限">
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
                      style={{ width: 180 }}
                      autoComplete="off"
                    />,
                  )}{' '}
                </Form.Item>
                <div className={styles.tipMessage}>注：达到“提现金额”上限后，则无法进行提现</div>
              </Form.Item>
            </Form.Item>
          </div>
          <div className={styles.main}>
            <Form.Item label="提现说明开关">
              <Form.Item>
                {getFieldDecorator('tipStatus', {
                  rules: [{ required: true, message: '请选择开关状态' }],
                  initialValue: tipStatus,
                })(
                  <Radio.Group disabled={disabled}>
                    <Radio value="0">开启</Radio>
                    <Radio value="1">关闭</Radio>
                  </Radio.Group>,
                )}{' '}
              </Form.Item>
              <div className={styles.tipMessage}>
                注1：代理账户提现则不受“提现流水倍数”及“每天提现金额上限”限制
              </div>
            </Form.Item>
          </div>
          <div className={styles.main}>
            <Form.Item label="拒绝提现快捷理由设置：">
              <Button type="link" disabled={disabled} onClick={this.addRejectReason}>
                添加
              </Button>
              <br />
              {rejectReasonList.map((item: any, index: number) => (
                // eslint-disable-next-line
                <div key={index}>
                  <Form.Item>
                    {getFieldDecorator(`reasons${index + 1}`, {
                      initialValue: item,
                      normalize: (value: any) => value && value.toString().trim(),
                    })(
                      <Input disabled={disabled} style={{ width: 350 }} autoComplete="off" />,
                    )}{' '}
                  </Form.Item>
                  <Button
                    type="link"
                    disabled={disabled}
                    onClick={() => this.deleteRejectReason(index)}
                  >
                    删除
                  </Button>
                  <br />
                </div>
              ))}
            </Form.Item>
          </div>
        </Form>
      </>
    );
  }
}

const C = Form.create({ name: 'searchWithdraw' })(Currency);

export default connect(({ withdraw, global }: { withdraw: any; global: any }) => ({
  withdraw,
  btns: global.btns,
}))(C);
