import React, { CSSProperties } from 'react';

import { connect } from 'dva';
import router from 'umi/router';
import { notification } from 'antd';
import IconFont from '@/assets/fonts';
import { StateType } from '@/common-typings.d';
import styles from './index.less';
import { saveBtns } from '@/utils/resolvePermission';

const fontStyle: CSSProperties = {
  verticalAlign: 'middle',
  fontWeight: 'bold',
  fontSize: '28px',
};

@saveBtns // 处理不是菜单的路由跳转的保存按钮权限问题
class Warn extends React.Component<StateType, StateType> {
  public timer: any = null;

  constructor(props: any) {
    super(props);
    this.repeatFetch();
    // this.saveBtns = this.saveBtns;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  public bindEffect() {
    const { dispatch } = this.props;
    dispatch({
      type: 'amountWarn/checkIsWarnEffect',
      payload: {},
      fn: (data: any) => {
        const { rechargeHasHigh, rechargeHasLow, withdrawHasHigh, withdrawHasLow } = data;
        if (rechargeHasHigh) {
          notification.info({ message: '提示', description: '充值资金高额预警' });
        }
        if (rechargeHasLow) {
          notification.warn({ message: '提示', description: '充值资金低额预警' });
        }
        if (withdrawHasHigh) {
          notification.info({ message: '提示', description: '提现资金高额预警' });
        }
        if (withdrawHasLow) {
          notification.warn({ message: '提示', description: '提现资金低额预警' });
        }
      },
    });
  }

  public repeatFetch() {
    clearInterval(this.timer);
    if (!this.props.userInfo) {
      return;
    }
    this.bindEffect();
    this.timer = setInterval(() => {
      this.bindEffect();
    }, 60000);
  }

  render() {
    const { warnData } = this.props.amountWarn;
    const { rechargeHasHigh, rechargeHasLow, withdrawHasHigh, withdrawHasLow } = warnData;
    const RECHARGE_FLAG = rechargeHasHigh || rechargeHasLow;
    const WITHDRAW_FLAG = withdrawHasHigh || withdrawHasLow;
    if (!RECHARGE_FLAG && !WITHDRAW_FLAG) {
      return null;
    }
    return (
      <strong>
        {/* 充值 */}
        {/* {RECHARGE_FLAG ? (
          <span
            className={styles.warnIconWrap}
            onClick={() => {
              router.push({
                pathname: '/finance/fund/recharge',
              });
            }}
          >
            充值资金预警：
            {rechargeHasHigh ? (
              <IconFont type="icon-shandian" style={{ ...fontStyle, color: '#ff0d17' }} />
            ) : null}
            {rechargeHasLow ? (
              <IconFont type="icon-fy_ic_warnning" style={{ ...fontStyle }} />
            ) : null}
          </span>
        ) : null} */}

        {/* 提现 */}
        {WITHDRAW_FLAG ? (
          <span
            className={styles.warnIconWrap}
            onClick={() => {
              router.push({
                pathname: '/finance/fund/withdraw',
              });
              this.saveBtns();
            }}
          >
            提现资金预警：
            {withdrawHasHigh ? (
              <IconFont type="icon-shandian" style={{ ...fontStyle, color: '#ff0d17' }} />
            ) : null}
            {withdrawHasLow ? (
              <IconFont type="icon-fy_ic_warnning" style={{ ...fontStyle }} />
            ) : null}
          </span>
        ) : null}
      </strong>
    );
  }
}

// export default connect(({ fund }: { fund: any; }) => ({
//   fund: fund,
// }))(Warn);
export default connect(({ amountWarn, userLogin = {} }: { amountWarn: any; userLogin: any }) => ({
  // currentUser: user.currentUser,
  amountWarn,
  userInfo: userLogin.userInfo,
}))(Warn);
