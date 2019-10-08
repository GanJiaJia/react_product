import { Button, Form, Icon, Input, Popconfirm, Select, Spin, Table, TimePicker } from 'antd';
import React, { ReactNode } from 'react';

import { connect } from 'dva';
import moment from 'moment';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

class SetTime extends React.Component<any> {
  state = {
    disabled: true,
  };

  constructor(props: any) {
    super(props);
    this.$httpFindTimingConfig();
  }

  handleEditTime = () => {
    this.setState({ disabled: false });
  };

  $httpFindTimingConfig = () => {
    this.props.dispatch({
      type: 'withdraw/findTimingConfig',
      payload: {},
    });
  };

  $httpSetOrserTime = (payload: any, fn?: Function) => {
    this.props.dispatch({
      type: 'withdraw/setOrserTime',
      payload,
      fn: (res: any) => {
        if (res.code === 1) {
          this.setState({ disabled: true });
        } else {
          this.handleResetTime();
        }
      },
    });
  };

  handleSubmitTime = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const beginTime = '2019-03-07 ';
        // eslint-disable-next-line
        const fun = (item: any) => beginTime + moment(values[item]._d).format('HH:mm:ss');
        const params = {
          firstBeginTime: fun('firstBeginTime'),
          firstEndTime: fun('firstEndTime'),
          secondBeginTime: fun('secondBeginTime'),
          secondEndTime: fun('secondEndTime'),
          thirdBeginTime: fun('thirdBeginTime'),
          thirdEndTime: fun('thirdEndTime'),
        };
        await this.$httpSetOrserTime(params);
        await this.$httpFindTimingConfig();
      }
    });
  };

  handleResetTime = () => {
    this.props.form.resetFields();
    this.$httpFindTimingConfig();
  };

  render(): ReactNode {
    const { timingConfig } = this.props.withdraw.orserSetting;
    if (Object.keys(timingConfig).length) {
      Object.keys(timingConfig).forEach((item: any, index: number) => {
        if (timingConfig[item].toString().length === 13) {
          timingConfig[item] = moment(timingConfig[item])
            .format('YY-MM-DD HH:mm:ss')
            .toString()
            .slice(9);
        }
      });
    }
    const { getFieldDecorator } = this.props.form;
    const { disabled } = this.state;
    const format = 'HH:mm:ss';

    // 编辑按钮生成函数
    const edit = () => {
      if (checkPermission(this.props.btns, 'new-finance-withdraw-separate-setting-edit')) {
        return (
          <Button type="primary" onClick={this.handleEditTime} style={{ marginTop: '7px' }}>
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
        <Button onClick={this.handleResetTime}>重置</Button>
      </span>
    );

    return (
      <>
        <Form
          layout="inline"
          onSubmit={this.handleSubmitTime}
          style={{ border: '1px solid #e6e5e6' }}
        >
          <div className={styles.header}>
            <span className={styles.title}>分单时间区间设置（精确到秒)</span>
            {disabled ? edit() : confirm()}
          </div>
          <div className={styles.main}>
            <Form.Item label="早班：">
              <Form.Item>
                {getFieldDecorator('firstBeginTime', {
                  rules: [{ required: true, message: '请选择早班开始时间' }],
                  initialValue: moment(timingConfig.firstBeginTime, format),
                })(<TimePicker disabled={disabled} allowClear format={format} />)}{' '}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('firstEndTime', {
                  rules: [{ required: true, message: '请选择早班结束时间' }],
                  initialValue: moment(timingConfig.firstEndTime, format),
                })(<TimePicker disabled={disabled} allowClear format={format} />)}
              </Form.Item>
            </Form.Item>

            <Form.Item label="中班：">
              <Form.Item>
                {getFieldDecorator('secondBeginTime', {
                  rules: [{ required: true, message: '请选择中班开始时间' }],
                  initialValue: moment(timingConfig.secondBeginTime, format),
                })(<TimePicker disabled={disabled} allowClear format={format} />)}{' '}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('secondEndTime', {
                  rules: [{ required: true, message: '请选择中班结束时间' }],
                  initialValue: moment(timingConfig.secondEndTime, format),
                })(<TimePicker disabled={disabled} allowClear format={format} />)}
              </Form.Item>
            </Form.Item>

            <Form.Item label="晚班：">
              <Form.Item>
                {getFieldDecorator('thirdBeginTime', {
                  rules: [{ required: true, message: '请选择晚班开始时间' }],
                  initialValue: moment(timingConfig.thirdBeginTime, format),
                })(<TimePicker disabled={disabled} allowClear format={format} />)}{' '}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('thirdEndTime', {
                  rules: [{ required: true, message: '请选择晚班结束时间' }],
                  initialValue: moment(timingConfig.thirdEndTime, format),
                })(<TimePicker disabled={disabled} allowClear format={format} />)}
              </Form.Item>
            </Form.Item>
          </div>
        </Form>
      </>
    );
  }
}

const C = Form.create({ name: 'searchWithdraw' })(SetTime);

export default connect(({ withdraw, global }: { withdraw: any; global: any }) => ({
  withdraw,
  btns: global.btns,
}))(C);
