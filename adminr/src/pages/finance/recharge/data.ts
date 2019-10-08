// 充值类别
export const RECHARGE_TYPE = [
  { title: '全部', value: -1 },
  { title: '普通存款', value: 0, permission: 'rechargeCommon' },
  { title: '大额存款', value: 1, permission: 'rechargeBig' },
];

// 审核状态
export const REVIEW_TYPE = [
  { title: '全部', value: -1 },
  // { title: '已审核', value: '1,2' },
  { title: '已审核', value: 1 },
  { title: '待审核', value: 2 },
];

export const DATA_PERMISSION = {
  // 会员管理 --> 操作审核
  'memChangeSuperiorAgency-firstAudit': 1000000,
  'memChangeSuperiorAgency-secondAudit': 1000001,
  'memChangeContact-firstAudit': 1000100,
  'memChangeContact-secondAudit': 1000101,
  'memResetBankCardName-firstAudit': 1000200,
  'memResetBankCardName-secondAudit': 1000201,
  'memWholeLock-firstAudit': 1000300,
  'memWholeLock-secondAudit': 1000301,
  'memIndirectLock-firstAudit': 1000400,
  'memIndirectLock-secondAudit': 1000401,
  'memLoginLock-firstAudit': 1000500,
  'memLoginLock-secondAudit': 1000501,
  'memUnLock-firstAudit': 1000600,
  'memUnLock-secondAudit': 1000601,
  'memDeleteBank-firstAudit': 1000700,
  'memDeleteBank-secondAudit': 1000701,
  'memClearFlowLimit-firstAudit': 1000800,
  'memClearFlowLimit-secondAudit': 1000801,
  'memAdjustFlow-firstAudit': 1000900,
  'memAdjustFlow-secondAudit': 1000901,
  'memRecoverFlow-firstAudit': 1001000,
  'memRecoverFlow-secondAudit': 1001001,
  'memRemoveFlow-firstAudit': 1001100,
  'memRemoveFlow-secondAudit': 1001101,
  // 代理管理 --> 操作审核
  'agenChangeSuperiorAgency-firstAudit': 2000000,
  'agenChangeSuperiorAgency-secondAudit': 2000001,
  'agenChangeContact-firstAudit': 2000100,
  'agenChangeContact-secondAudit': 2000101,
  'agenResetBankCardName-firstAudit': 2000200,
  'agenResetBankCardName-secondAudit': 2000201,
  'agenWholeLock-firstAudit': 2000300,
  'agenWholeLock-secondAudit': 2000301,
  'agenIndirectLock-firstAudit': 2000400,
  'agenIndirectLock-secondAudit': 2000401,
  'agenLoginLock-firstAudit': 2000500,
  'agenLoginLock-secondAudit': 2000501,
  'agenUnLock-firstAudit': 2000600,
  'agenUnLock-secondAudit': 2000601,
  'agenDeleteBank-firstAudit': 2000700,
  'agenDeleteBank-secondAudit': 2000701,
  'agenModifyAddScoreSet-firstAudit': 2000900,
  'agenModifyAddScoreSet-secondAudit': 2000901,
  'agenClearAudit-firstAudit': 2001000,
  'agenClearAudit-secondAudit': 2001001,
  'agenAddScoreSet-firstAudit': 2001100,
  'agenAddScoreSet-secondAudit': 2001101,
  'agenChangeFee-firstAudit': 2001200,
  'agenChangeFee-secondAudit': 2001201,
  'agenModifyCommission-firstAudit': 2001300,
  'agenModifyCommission-secondAudit': 2001301,
  'agenflushCash-firstAudit': 2001400,
  'agenflushCash-secondAudit': 2001401,

  // 财务管理 --> 充值补单审核
  'rechargeCommon-audit': 300000000,
  'rechargeBig-audit': 300000100,

  // 财务管理 --> 异常提现处理
  'memWithdrawFirstAmountBig-agree': 30100000100,
  'memWithdrawFirstAmountBig-reject': 30100000101,
  'memWithdrawSingleAmountBig-agree': 30100000200,
  'memWithdrawSingleAmountBig-reject': 30100000201,
  'memWithdrawOneDayAmountBig-agree': 30100000300,
  'memWithdrawOneDayAmountBig-reject': 30100000301,
  'memWithdrawFrequent-agree': 30100000400,
  'memWithdrawFrequent-reject': 30100000401,
  'memWithdrawProfitAbnormal-agree': 30100000500,
  'memWithdrawProfitAbnormal-reject': 30100000501,
  'memWithdrawSevenDayAmountBig-agree': 30100000600,
  'memWithdrawSevenDayAmountBig-reject': 30100000601,
  'memWithdrawIpConflict-agree': 30100000700,
  'memWithdrawIpConflict-reject': 30100000701,
  'memWithdrawDeviceConflict-agree': 30100000800,
  'memWithdrawDeviceConflict-reject': 30100000801,

  'agenWithdrawFirstAmountBig-agree': 30100010100,
  'agenWithdrawFirstAmountBig-reject': 30100010101,
  'agenWithdrawSingleAmountBig-agree': 30100010200,
  'agenWithdrawSingleAmountBig-reject': 30100010201,
  'agenWithdrawOneDayAmountBig-agree': 30100010300,
  'agenWithdrawOneDayAmountBig-reject': 30100010301,
  'agenWithdrawFrequent-agree': 30100010400,
  'agenWithdrawFrequent-reject': 30100010401,
  'agenWithdrawProfitAbnormal-agree': 30100010500,
  'agenWithdrawProfitAbnormal-reject': 30100010501,
  'agenWithdrawSevenDayAmountBig-agree': 30100010600,
  'agenWithdrawSevenDayAmountBig-reject': 30100010601,
  'agenWithdrawIpConflict-agree': 30100010700,
  'agenWithdrawIpConflict-reject': 30100010701,
  'agenWithdrawDeviceConflict-agree': 30100010800,
  'agenWithdrawDeviceConflict-reject': 30100010801,

  // 财务管理 --> 提现操作审核
  'thirdAutoWithdraw-audit': 301010000,
  'thirdManualWithdraw-audit': 301010100,

  // 财务管理 --> 资金调整审核
  'redPacket-firstAudit': 30200000000,
  'redPacket-secondAudit': 30200000001,
  'bonusActivity-firstAudit': 30200000100,
  'bonusActivity-secondAudit': 30200000101,
  'manualRecharge-firstAudit': 30200010000,
  'manualRecharge-secondAudit': 30200010001,
  'withdrawFailedSendBack-firstAudit': 30200010100,
  'withdrawFailedSendBack-secondAudit': 30200010101,
  'transferAddScore-firstAudit': 30200010200,
  'transferAddScore-secondAudit': 30200010201,
  'gameAddScore-ballBetSport-firstAudit': 30200010300,
  'gameAddScore-ballBetSport-secondAudit': 30200010301,
  'gameAddScore-LbLottery-firstAudit': 30200010400,
  'gameAddScore-LbLottery-secondAudit': 30200010401,
  'addScoreBonus-firstAudit': 30200010500,
  'addScoreBonus-secondAudit': 30200010501,
  'addMoneyCommissionAdjust-firstAudit': 30200010600,
  'addMoneyCommissionAdjust-secondAudit': 30200010601,
  'virtualLines-firstAudit': 30200010700,
  'virtualLines-secondAudit': 30200010701,
  'mistakeAddScoreSendBack-firstAudit': 30200020000,
  'mistakeAddScoreSendBack-secondAudit': 30200020001,
  'systemBrokerage-firstAudit': 30200020100,
  'systemBrokerage-secondAudit': 30200020101,
  'minusMoneyCommissionAdjust-firstAudit': 30200020200,
  'minusMoneyCommissionAdjust-secondAudit': 30200020201,
};

export const DATA_PERMISSION_OBJ = {
  0: 'rechargeCommon-audit',
  1: 'rechargeBig-audit',
};

export const PAYMENT_STATUS = [
  // 支付状态
  { title: '全部', value: '0,2,3,5,6' },
  { title: '支付失败', value: 2 },
  { title: '待支付', value: 0 },
  { title: '补单审核中', value: 3 },
  { title: '用户撤销', value: 5 },
  { title: '超时撤销', value: 6 },
];

export const PAYMENT_SUB_STATUS = [
  { title: '全部', value: '1,2,3,4' },
  { title: '支付成功', value: 1 },
  { title: '补单审核成功', value: 2 },
  { title: '补单审核拒绝', value: 3 },
  { title: '人工拒绝补单', value: 4 },
];

// 补单操作 - 表格筛选数据
export const REPAIR_TABLE_FILTERS = {
  dateType: 1,
  userType: -1,
  status: '0,2,3,5,6',
  paymentId: -3,
  searchType: 1,
  keywords: '',
  username: '',
  reallyName: '',
};

// 三方商户设置 - 渠道类型
export const CHANNEL_TYPE = [
  { title: '全部', value: -1 },
  { title: '普通渠道', value: 0 },
  { title: '大额渠道', value: 1 },
];

export const ORDINARY_LIMIT_TYPE = 0;
export const LARGE_LIMIT_TYPE = 1;

// 三方商户设置 - 开关状态
export const SWITCH_STATUS = [
  { title: '全部', value: -1 },
  { title: '已开启', value: 0 },
  { title: '已关闭', value: 1 },
];

export const STATUS_OPEN = 0; // 已开启
export const STATUS_CLOSE = 1; // 已关闭

// 上下架状态
export const ESCROW_STATUS = [
  { title: '全部', value: -1 },
  { title: '已上架', value: 0 },
  { title: '已下架', value: 1 },
];
export const ESCROW_ON = 0;
export const ESCROW_OFF = 1;

// 应用端
export const DEVICE_TYPE = [
  { title: '全部', value: -1 },
  { title: 'PC端', value: 0 },
  { title: '移动端', value: 1 },
  { title: '安卓', value: 2 },
  { title: 'IOS', value: 3 },
  { title: 'PAD', value: 4 },
];

// 三方设置-应用端
export const CLIENT_TYPE = [
  { title: '全部', value: -1 },
  { title: 'PC端', value: 0 },
  { title: '移动端', value: 1 },
];

// 置顶状态
export const TOPPING_TYPE = [
  { title: '全部', value: -1 },
  { title: '已置顶', value: 0 },
  { title: '未置顶', value: 1 },
];

export const TOP_STATUS_OPEN = 0; // 置顶
export const TOP_STATUS_CLOSE = 1; // 未置顶

export const RECOMMEND_STATUS_OPEN = 0; // 推荐
export const RECOMMEND_STATUS_CLOSE = 1; // 未推荐

// 充值方式
export const RECHARGE_TRANSFER_TYPE_NAMES = [
  { title: '银行卡转账', value: 7 },
  { title: '支付宝转账', value: 8 },
  { title: '微信转账', value: 9 },
  { title: '网银支付', value: 1 },
  { title: '支付宝支付', value: 2 },
  { title: '微信支付', value: 3 },
  { title: '快捷支付', value: 24 },
  { title: '银联扫码', value: 5 },
  { title: '京东支付', value: 6 },
  { title: 'QQ支付', value: 4 },
  { title: '云闪付', value: 25 },
];

// 订单状态 - 全部
export const ORDER_STATUS_ALL = [
  // { text: '全部', value: '1,2,3,4,5,6' },
  // { text: '支付成功', value: '1' },
  // { text: '补单审核成功', value: '2' },
  { text: '支付失败', value: '10' },
  { text: '补单审核成功', value: '2' },
  { text: '补单审核拒绝', value: '3' },
  { text: '人工拒绝补单', value: '4' },
  { text: '用户撤销', value: '5' },
  { text: '超时撤销', value: '6' },
  { text: '补单审核中', value: '7' },
  { text: '处理中', value: '11' },
  { text: '待支付', value: '12' },
];

// 订单状态 - 已补单
export const ORDER_STATUS_REPAIRED = [
  { text: '补单审核成功', value: '2' },
  { text: '补单审核拒绝', value: '3' },
  { text: '人工拒绝补单', value: '4' },
];

export const LOG_STATUS = [
  { text: '补单审核成功', value: '2' },
  { text: '补单审核拒绝', value: '3' },
  { text: '人工拒绝补单', value: '4' },
  { text: '用户撤销', value: '5' },
  { text: '超时撤销', value: '6' },
  { text: '补单审核中', value: '7' },
  { text: '待支付', value: '8' },
  { text: '支付成功', value: '9' },
  { text: '支付失败', value: '10' },
  { text: '处理中', value: '11' },
];

// 备注状态
export const REMARK_STATUS = [
  { text: '资金调整申请备注', value: '1' },
  { text: '资金调整一审备注', value: '2' },
  { text: '资金调整二审备注', value: '3' },
  { text: '补单申请备注', value: '4' },
  { text: '补单审核备注', value: '5' },
];

// 推荐状态
export const RECOMMEND_TYPE = [
  { title: '全部', value: -1 },
  { title: '已推荐', value: 0 },
  { title: '未推荐', value: 1 },
];

export const UPLOAD_PIC = '/api/gl/file/upload'; // 上传图片路径
export const CACHE_TOKEN = 'admin-token';
export const CACHE_UID = 'admin-uid';

// 操作类型
export const OPT_TYPE = [{ title: '创建订单', value: 0 }, { title: '补单申请', value: 1 }];

// 表格高度
export const TABLE_HEIGHT = 600;

// 接口成功的状态
export const SUCCESS_CODE = 1;

export const PAGE_SIZE_OPTION = ['10', '20', '50', '200', '500'];
