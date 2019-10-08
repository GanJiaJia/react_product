import request from '@/utils/request';

interface FormDataType {
  [propName: string]: any;
}

const $http = (path: string, params: FormDataType, type: string = 'POST') => {
  if (type === 'POST') {
    return request(path, { method: type, data: params });
  }
  if (type === 'GET') {
    return request(path, { method: type, params });
  }
  return '';
};

// 获取充值记录详情
export const getOrderDetail = (params: FormDataType): any =>
  $http('/gl/recharge/manage/load/order/detail', params);

// 充值 - 补单操作列表
export const getRepairData = (params: FormDataType) => $http('/gl/recharge/manage/list', params);

// 充值 - 补单操作 - 详情 - 拒绝补单
export const repairRefuse = (params: FormDataType) =>
  $http('/gl/recharge/manage/success/reject', params);

// 充值 - 补单操作 - 详情 - 确认补单
export const repairConfirm = (params: FormDataType) =>
  $http('/gl/recharge/manage/success/requestReCharge', params);

// 充值 - 补单操作 - 创建订单
export const repairCreate = (params: FormDataType) =>
  $http('/gl/recharge/manage/submit/create/order', params);

// 获取订单详情
export const getOrderInfo = (params: FormDataType) =>
  $http('/gl/recharge/manage/load/order/detail', params);

// 充值 - 补单审核列表
export const getReviewData = (params: FormDataType) =>
  $http('/gl/recharge/manage/list/success', params);

// 充值 - 补单审核 - 获取申请人
export const getReviewerList = (params: FormDataType) =>
  $http('/gl/recharge/manage/list/applicant', params);

// 充值 - 补单审核 - 获取审核人
export const getReviewManageList = (params: FormDataType) =>
  $http('/gl/recharge/manage/list/auditor', params);

// 充值 - 审核 - 保存审核
export const saveReviewData = (params: FormDataType) =>
  $http('/gl/recharge/manage/success/approve', params);

// 充值 - 审核 - 验证三方状态
export const checkMerchantStatus = (params: FormDataType) =>
  $http('/gl/recharge/manage/query/status', params);

// 三方商户成功率 - 三方平台
export const getMerchantList = (params: FormDataType) =>
  $http('/gl/payment/manage/list/channel', params);

// 三方商户成功率 - 列表
export const getMerchanRateList = (params: FormDataType) =>
  $http('/gl/payment/manage/success/rate/list', params);

// 三方商户设置 - 列表
export const getMerchanSetList = (params: FormDataType) =>
  $http('/gl/payment/manage/list/merchant/account', params);

// 三方商户设置 - 通道展示开关
export const setChannelDisplay = (params: FormDataType) =>
  $http('/gl/recharge/manage/showMerchant/setting', params);

// 三方商户设置 - 开关状态设置
export const setMerchantStatus = (params: FormDataType) =>
  $http('/gl/payment/manage/batch/update/merchant/account', params);

// 三方商户设置 - 获取通道展示状态
export const getChannelStatus = (params: FormDataType) =>
  $http('/gl/recharge/manage/showMerchant/view', params);

// 三方商户设置 - 编辑
export const editMerchant = (params: FormDataType) =>
  $http('/gl/payment/manage/update/merchant/account', params);

// 三方商户设置 - 新增三方平台
export const addMerchant = (params: FormDataType) =>
  $http('/gl/payment/manage/add/merchant/account', params);

// 三方商户应用 - 列表
export const getMerchantAppList = (params: FormDataType) =>
  $http('/gl/payment/manage/list/merchant', params);

// 三方商户应用 - 上/下架状态设置
export const updateMerchantStatus = (params: FormDataType) =>
  $http('/gl/payment/manage/update/merchant/status', params);

// 三方商户应用 - 删除三方商户
export const deleteMerchant = (params: FormDataType) =>
  $http('/gl/payment/manage/delete/merchant', params);

// 三方商户应用 - 置顶设置
export const setMerchantTop = (params: FormDataType) =>
  $http('/gl/payment/manage/update/merchant/topping', params);

// 三方商户应用 - 推荐设置
export const setMerchantRecommend = (params: FormDataType) =>
  $http('/gl/payment/manage/update/merchant/recommend', params);

// 三方商户应用 - 编辑 - 获取支付类型
export const getPaymentList = (params: FormDataType) => $http('/gl/payment/manage/list', params);

// 三方商户应用 - 编辑 - 获取商户号
export const getShopList = (params: FormDataType): any =>
  $http('/gl/payment/manage/list/merchant/account', params);

// 三方商户应用 - 编辑 - 获取层级
export const getLevelList = (params: FormDataType) => $http('/gl/manage/user/level/list', params);

// 三方商户应用 - 编辑
export const setMerchantEdit = (params: FormDataType) =>
  $http('/gl/payment/manage/update/merchant', params);

// 三方商户应用 - 新增三方平台应用
export const addMerchantApp = (params: FormDataType) =>
  $http('/gl/payment/manage/add/merchant', params);

// 三方商户应用 - 获取已设置的三方平台应用
export const getMerchantHasSetApp = (params: FormDataType): any =>
  $http('/gl/payment/manage/list/merchant/account/inuse', params);

// 获取三方商户
export const getMerchant = (params: FormDataType): any =>
  $http('/gl/payment/manage/list/channel', params);

// 充值金额设置 - 普通金额设置 - 获取快捷金额设置
export const getOrdFastAmount = (params: FormDataType) =>
  $http('/gl/payment/manage/list/fee', params);

// 充值金额设置 - 普通金额设置 - 快捷金额设置
export const setOrdFastAmount = (params: FormDataType) =>
  $http('/gl/payment/manage/update/fastAmount', params);

// 充值金额设置 - 提现通道 - 编辑
export const setWithdraw = (params: FormDataType) => $http('/gl/payment/manage/update/fee', params);

// 充值金额设置 - 提现通道 - 银行卡限额 - 获取银行列表
export const getWithdrawBankList = (params: FormDataType) =>
  $http('/gl/payment/manage/find/bank/list', params);

// 充值金额设置 - 提现通道 - 设置银行卡限额
export const setWithdrawBankAmount = (params: FormDataType) =>
  $http('/gl/payment/manage/update/bank/limit', params);

// 充值订单记录
export const getLogsList = (params: FormDataType) => $http('/gl/recharge/manage/list', params);

// 删除三方平台
export const deleteThird = (params: FormDataType): any =>
  $http('/gl/payment/manage/delete/merchant/account', params);

// 创建订单保存
export const createOrderSave = (params: FormDataType): any =>
  $http('/gl/recharge/manage/success/approve/create', params);
