import React from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';

// 资金调整审核类型
const CODE = 1;

const ADJUST_TYPE = [
  {
    1009: '2,1',
    value: '1009',
    label: '加币-计入红利',
    children: [
      // {
      //   value: '2,1',
      //   label: '全部',
      // },
      {
        value: '2',
        label: '活动红利',
      },
      {
        value: '1',
        label: '红包',
      },
    ],
  },

  {
    1018: '7,3,4,5,6,8,9,25',
    value: '1018',
    label: '加币-不计入红利',
    children: [
      // {
      //   value: '7,3,4,5,6,8,9,25',
      //   label: '全部',
      // },
      {
        value: '7',
        label: '游戏补分-LB彩票',
      },
      {
        value: '3',
        label: '人工充值',
      },
      {
        value: '4',
        label: '提现失败退回',
      },
      {
        value: '5',
        label: '转账补分',
      },
      {
        value: '6',
        label: '游戏部分-贝博体育',
      },
      {
        value: '8',
        label: '上分返利',
      },
      {
        value: '9',
        label: '佣金调整',
      },
      {
        value: '25',
        label: '虚拟额度',
      },
    ],
  },

  {
    1011: '11,10,9',
    value: '1011',
    label: '减币',
    children: [
      // {
      //   value: '11,10,9',
      //   label: '全部',
      // },
      {
        value: '11',
        label: '错误上分回扣',
      },
      {
        value: '10',
        label: '系统扣回',
      },
      {
        value: '9',
        label: '佣金调整',
      },
    ],
  },
];

const T_CHANGE_TYPE = {
  1009: '加币-计入红利',
  1018: '加币-不计入红利',
  1011: '减币',
};

const T_SUB_TYPE = {
  2: '活动红利',
  1: '红包',
  7: '游戏补分-LB彩票',
  3: '人工充值',
  4: '提现失败退回',
  5: '转账补分',
  6: '游戏部分-贝博体育',
  8: '上分返利',
  9: '佣金调整',
  25: '虚拟额度',
  11: '错误上分回扣',
  10: '系统扣回',
};

// 账户类型
const USER_TYPE = [
  {
    value: '-1',
    label: '全部',
  },
  {
    value: '0',
    label: '会员',
  },
  {
    value: '1',
    label: '代理',
  },
];

const T_USER_TYPE = {
  '-1': '全部',
  0: '会员',
  1: '代理',
};

const T_LIMIT_TYPE = {
  '-1': '全部',
  0: <FormattedMessage id="finance.fund.recharge.table.title.channelType.ordinaryRecharge" />,
  1: <FormattedMessage id="finance.fund.recharge.table.title.channelType.largeRecharge" />,
};

// 开关状态
const SWITCH_STATUS_TYPES = {
  '-1': '全部',
  0: <FormattedMessage id="finance.fund.recharge.table.title.switchStatus.turnedOn" />,
  1: <FormattedMessage id="finance.fund.recharge.table.title.switchStatus.turnedOff" />,
};
// { text: '待审核', value: '0' },
// { text: '审核通过', value: '1' },
// { text: '审核拒绝', value: '2' },
// 审核状态
const CHECK_RESULT_TYPES = [
  {
    value: '-1',
    label: '全部',
  },
  {
    value: '0',
    label: '待审核',
  },
  {
    value: '1',
    label: '一审通过',
  },
  {
    value: '2',
    label: '一审拒绝',
  },
  {
    value: '3',
    label: '二审通过',
  },
  {
    value: '4',
    label: '二审拒绝',
  },
];

export default {
  ADJUST_TYPE,
  USER_TYPE,
  T_USER_TYPE,
  T_CHANGE_TYPE,
  T_SUB_TYPE,
  CODE,
  T_LIMIT_TYPE,
  SWITCH_STATUS_TYPES,
  CHECK_RESULT_TYPES,
};
