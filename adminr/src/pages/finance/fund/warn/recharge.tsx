import { Button, Form, Icon, List, Popconfirm, Spin } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import BaseComponent from '@/components/BaseComponent';
import { RechargeForm } from './until';
import { StateType } from '@/common-typings';
import { currency } from '@/utils/tools';
import { checkPermission } from '@/utils/resolvePermission';
import styles from './style.less';

const noBorderBottomStyle: StateType = {
  borderBottom: 'none',
};

const WARN_TYPE = {
  0: (
    <span className={styles.warnItemSpan}>
      {' '}
      三方账户金额 <strong className={styles.warnItemStrong}> {' < '} </strong>
    </span>
  ),
  1: (
    <span className={styles.warnItemSpan}>
      {' '}
      三方账户金额 <strong className={styles.warnItemStrong}> {' > '} </strong>
    </span>
  ),
};

class WarnRecharge extends BaseComponent {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.bindEffects();
  }

  public state = {};

  public bindEffects() {
    this.props.dispatch({
      type: 'fund/warnRechargeEffect',
      payload: {},
      fn: () => {
        this.props.form.resetFields();
      },
    });
  }

  public addEffect(params: any, cb: any) {
    this.props.dispatch({
      type: 'fund/addWarnRechargeEffect',
      payload: { ...params },
      fn: (res: any) => {
        if (cb) {
          cb(res);
        }
      },
    });
  }

  // 提交添加请求
  public handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.addEffect(values, () => {
          this.bindEffects();
        });
      }
    });
  }

  public handleDelete(id: any, cb: any) {
    this.props.dispatch({
      type: 'fund/deleteWarnRechargeEffect',
      payload: { id },
      fn: (res: any) => {
        if (cb) {
          cb(res);
        }
      },
    });
  }

  public render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { warnRechargeData } = this.props.fund;
    const { loading, userLogin, loadingRechargeAdd } = this.props;
    const { username } = userLogin ? userLogin.userInfo : { username: null };
    return (
      <div>
        <Spin spinning={loading}>
          <List
            className={styles.warnRechargeList}
            size="large"
            dataSource={warnRechargeData.list}
            renderItem={(item: any) => (
              <List.Item style={noBorderBottomStyle}>
                {WARN_TYPE[item.type]}
                <span className={styles.warnItemSpan}>{currency(item.amount)}</span>

                <Popconfirm
                  title="确认删除吗，亲 ？"
                  okText="确认"
                  cancelText="取消"
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  onConfirm={() => {
                    this.handleDelete(item.id, () => {
                      this.bindEffects();
                    });
                  }}
                >
                  <Button style={{ marginLeft: '20px' }}>删除</Button>
                </Popconfirm>

                {/* onClick={} */}
              </List.Item>
            )}
          />

          <div className={styles.warnRechargeFormWrap}>
            <h3>充值资金预警设置</h3>
            <div className={styles.warnRechargeForm}>
              <RechargeForm
                getFieldDecorator={getFieldDecorator}
                onSubmit={this.handleSubmit}
                username={username}
                loading={loadingRechargeAdd}
                showBtn={checkPermission(
                  this.props.btns,
                  'new-finance-manage-early-warning-manage-update',
                )}
              />
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

const WrappedWarn = Form.create({ name: 'warnRecharge' })(WarnRecharge);

export default withRouter(
  connect(
    ({
      fund,
      userLogin,
      loading,
      global,
    }: {
      fund: any;
      userLogin: any;
      loading: any;
      global: any;
    }) => ({
      fund,
      userLogin,
      loading: loading.effects['fund/warnRechargeEffect'],
      loadingRechargeAdd: loading.effects['fund/addWarnRechargeEffect'],
      btns: global.btns,
    }),
  )(WrappedWarn),
);
