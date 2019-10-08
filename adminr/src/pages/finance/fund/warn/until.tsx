import { Button, Form, Input, InputNumber, Select } from 'antd';
import React from 'react';
import { StateType } from '@/common-typings';
import styles from './style.less';

const { Option } = Select;

const readOnlyStyle: StateType = {
  border: 'none',
  outline: 'none',
};

export const InformationForm = (props: any) => {
  const { onSubmit, getFieldDecorator } = props;
  return (
    <Form onSubmit={onSubmit} name="warnRecharge" layout="horizontal">
      <div className={styles.flexRow} style={{ paddingLeft: '67px' }}>
        <Form.Item label="创建人：" className={styles.flexRow}>
          {getFieldDecorator('bankCard', {
            initialValue: 'admin',
          })(<Input readOnly style={readOnlyStyle} className={styles.readOnlyStyle} />)}
        </Form.Item>
      </div>

      <div className={styles.flexRow}>
        <Form.Item label="银行卡账户金额：" className={styles.flexRow}>
          {getFieldDecorator('bankCardType', {
            rules: [{ required: true, message: '请输入网银登陆账号' }],
            initialValue: '1',
          })(
            <Select style={{ width: '120px' }}>
              <Option value="1">大于</Option>
              <Option value="2">小于</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item className={styles.flexRow}>
          {getFieldDecorator('bankCardAmount', {
            rules: [{ required: true, message: '请输入预警金额' }],
          })(<Input allowClear placeholder="请输入预警金额" style={{}} />)}
        </Form.Item>

        <Form.Item className={styles.flexRow}>
          {getFieldDecorator('accountType', {
            rules: [{ required: true, message: '请选择账户类型' }],
          })(
            <Select style={{ width: '200px' }} placeholder="账户类型">
              <Option value="1">内部存放卡</Option>
              <Option value="2">外部资金中转卡</Option>
              <Option value="3">提现卡</Option>
              <Option value="4">入库中转卡</Option>
            </Select>,
          )}
        </Form.Item>
      </div>

      <div className={styles.flexRow} style={{ paddingLeft: '15px' }}>
        <Form.Item className={styles.flexRow} label="三方账户金额：">
          {getFieldDecorator('thirdType', {
            rules: [{ required: true, message: '请输入网银登陆账号' }],
            initialValue: '1',
          })(
            <Select style={{ width: '120px' }}>
              <Option value="1">大于</Option>
              <Option value="2">小于</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item className={styles.flexRow}>
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: '请输入预警金额' }],
          })(<Input allowClear placeholder="请输入预警金额" style={{ width: '400px' }} />)}
        </Form.Item>
      </div>

      <Form.Item className={styles.footer}>
        <Button type="primary" htmlType="submit">
          {' '}
          添加{' '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export const RechargeForm = (props: any) => {
  const { onSubmit, getFieldDecorator, username, loading, showBtn } = props;
  return (
    <Form onSubmit={onSubmit} name="warnRecharge" layout="horizontal">
      <div className={styles.flexRow} style={{ paddingLeft: '67px' }}>
        <Form.Item label="创建人：" className={styles.flexRow}>
          {username}
        </Form.Item>
      </div>

      <div className={styles.flexRow} style={{ paddingLeft: '15px' }}>
        <Form.Item className={styles.flexRow} label="三方账户金额：">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请输入网银登陆账号' }],
            initialValue: '1',
          })(
            <Select style={{ width: '120px' }}>
              <Option value="1">大于</Option>
              <Option value="0">小于</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item className={styles.flexRow}>
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: '请输入预警金额' }],
          })(<InputNumber min={0} placeholder="请输入预警金额" style={{ width: '400px' }} />)}
        </Form.Item>
      </div>

      <Form.Item className={styles.footer}>
        {showBtn ? (
          <Button type="primary" htmlType="submit" loading={loading}>
            {' '}
            添加{' '}
          </Button>
        ) : null}
      </Form.Item>
    </Form>
  );
};
