import { Button, Form, Icon, Input, Popover } from 'antd';
import React, { Component } from 'react';

import QRCode from 'qrcode.react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { isLogin } from '@/utils/auth';
import styles from './style.less';

interface StateType {
  [propName: string]: any;
}
interface AccountAndPassword {
  username: string;
  password: string;
  code: string;
}
interface ErrObj {
  username?: object;
  password?: object;
}
export interface FormDataType {
  userName: string;
  password: string;
}

class LoginForm extends Component<StateType> {
  constructor(props: any) {
    super(props);
    if (isLogin()) {
      this.props.history.go(-1);
    }
  }

  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields((err: ErrObj, values: AccountAndPassword) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'userLogin/login',
          payload: {
            ...values,
          },
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting } = this.props;
    const { googleValidate } = this.props.userLogin;
    // 绑定谷歌验证码弹出框
    const content = (
      <div className={styles.content}>
        <p className={styles.codetitle}>请先打开您手机上的google Authenticator，扫描以下二维码</p>
        <QRCode value={googleValidate.data} size={200}></QRCode>
      </div>
    );

    return (
      <div className={styles.box}>
        <p className={styles.title}>后台管理系统</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="登录账号"
                className={styles.input}
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="登录密码"
                className={styles.input}
                allowClear
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Popover
              placement="rightBottom"
              content={content}
              visible={googleValidate.showBindInfo}
            >
              {getFieldDecorator('code', {
                rules: [{ required: false, message: '请输入验证码!' }],
              })(
                <Input
                  autoComplete="off"
                  prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="验证码"
                  className={styles.input}
                  allowClear
                />,
              )}
            </Popover>
          </Form.Item>
          <Form.Item>
            <Button loading={submitting} type="primary" htmlType="submit" className={styles.button}>
              登 陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const UserLogin = Form.create({ name: 'login' })(LoginForm);

export default withRouter(
  connect(({ userLogin, loading }: StateType) => ({
    userLogin,
    submitting: loading.effects['userLogin/login'],
  }))(UserLogin),
);
