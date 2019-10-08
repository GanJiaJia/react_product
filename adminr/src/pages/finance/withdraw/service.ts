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

// 提现操作--列表
export const withdrawOperateList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/list/return', params);
// 分单操作--列表
export const withdrawSeperateList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/list', params);
// 提现分单设置--分单时间区间设置
export const withdrawSetOrserTime = (params: FormDataType) =>
  $http('/gl/withdraw/manage/save/timing/config', params);
// 提现分单设置--条件设置
export const withdrawSetCondition = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/list', params);
// 删除提现分担设置
export const conditionDelete = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/delete', params);
// 分单账户设置列表
export const accountList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/account/list', params);
// 添加账户
export const addAccount = (params: FormDataType) =>
  $http('/gl/withdraw/manage/account/add', params);
// 校验添加的账户是否存在
export const addAccountValidate = (params: FormDataType) =>
  $http('/gl/admin/username/validate', params);
// 查看条件
export const conditionReview = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/review', params);
// 查看三方商户数
export const getThirdNum = (params: FormDataType) =>
  $http('/gl/withdraw/manage/merchant/review', params);
// 开启，关闭分单
export const accountSwitch = (params: FormDataType) =>
  $http('/gl/withdraw/manage/account/switch', params);
// 删除分单
export const accountDelete = (params: FormDataType) =>
  $http('/gl/withdraw/manage/account/delete', params);
// 自动出款设置列表数据
export const getAutoList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/auto/list', params);
// 自动出款设置--删除
export const doAutoDelete = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/auto/delete', params);
// 层级类型状态查询
export const getLevelList = (params: FormDataType) => $http('/gl/manage/user/level/list', params);
// 三方出款商户状态查询
export const withdrawOverview = (params: FormDataType) =>
  $http('/gl/withdraw/manage/withdraw/overview', params);
// 自动提现设置--添加分单条件
export const conditionAutoSave = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/auto/save', params);
// 三方账户余额查询
export const getAccountBalance = (params: FormDataType) =>
  $http('/gl/withdraw/manage/account/balance', params);
// 自动出款条件设置修改
export const doAutoUpdate = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/auto/update', params);
// 提现审核列表查询
export const getCheckApprovalList = (params: FormDataType) =>
  $http('/gl/admin/withdraw/approval', params, 'GET');
// 提现出款列表查询
export const getWithdrawTransferData = (params: FormDataType) =>
  $http('/gl/admin/withdraw/transfer', params, 'GET');
// 提现分单列表查询
export const getWithdrawSeparateData = (params: FormDataType) =>
  $http('/gl/admin/withdraw/separate', params, 'GET');
// 提现订单记录列表查询
export const getWithdrawRecordData = (params: FormDataType) =>
  $http('/gl/admin/withdraw', params, 'GET');
// 提现审核弹窗确定
export const approveReturn = (params: FormDataType) =>
  $http('/gl/withdraw/manage/approve/return', params);
// 提现审核弹窗确定
export const withdrawStatusConfim = (params: FormDataType) =>
  $http('/gl/withdraw/manage/withdraw/status/confim', params);
// 提现订单记录--申请强制成功
export const saveForceSuccess = (params: FormDataType) =>
  $http('/gl/withdraw/manage/save/force/success/batch', params);
// 提现订单记录--申请提现退回
export const saveWithdrawReturn = (params: FormDataType) =>
  $http('/gl/withdraw/manage/save/return/batch', params);
// 查询银行卡列表
export const withdrawBankList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/list/bank', params);
// 提现订单记录--批量三方出款订单查询商户后台状态
export const statusConfimBatch = (params: FormDataType) =>
  $http('/gl/withdraw/manage/withdraw/status/confim/batch', params);
// 提现出款--人工出款审核
export const manageApprove = (params: FormDataType) => $http('/gl/withdraw/manage/approve', params);
// 提现出款--拒绝原因列表
export const rejectReasonList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/reject/reason/list', params, 'GET');
// 提现分单--分单操作
export const manageBatchSeperate = (params: FormDataType) =>
  $http('/gl/withdraw/manage/batch/seperate', params);
// 提现分单--人工分单列表
export const withdrawAccountList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/withdraw/account/list', params);
// 提现分单--回收操作
export const batchRecycling = (params: FormDataType) =>
  $http('/gl/withdraw/manage/batch/recycling', params);
// 提现分单--批量申请提现退回
export const saveReturnBatch = (params: FormDataType) =>
  $http('/gl/withdraw/manage/save/return/batch', params);
// 提现相关设置--普通提现设置
export const saveGeneralConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/save/general/config', params);
// 提现相关设置--三方支付设置列表
export const merchantAccount = (params: FormDataType) =>
  $http('/gl/payment/manage/list/merchant/account', params);
// 提现相关设置--普通提现设置--初始化设置数据--查询
export const findGeneralConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/find/general/config', params);
// 提现相关设置--大额提现设置
export const saveQuickConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/save/quick/config', params);
// 提现相关设置--大额提现设置--初始化设置数据--查询
export const findQuickConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/find/quick/config', params);
// 提现相关设置--通用提现设置--拒绝理由设置
export const saveRejectReason = (params: FormDataType) =>
  $http('/gl/withdraw/manage/reject/reason/save', params);
// 提现相关设置--通用提现设置--拒绝理由设置--查询
export const findRejectReason = (params: FormDataType) =>
  $http('/gl/withdraw/manage/reject/reason/list', params, 'GET');
// 提现相关设置--通用提现设置
export const saveCommonConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/save/common/config', params);
// 提现相关设置--通用提现设置--初始化设置数据--查询
export const findCommonConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/find/common/config', params);
// 提现相关设置--代理提现设置
export const saveProxyConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/save/proxy/config', params);
// 提现相关设置--代理提现设置--初始化设置数据--查询
export const findProxyConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/find/proxy/config', params);
// 三方平台--下拉列表数据
export const getMerchantList = (params: FormDataType) =>
  $http('/gl/payment/manage/list/channel', params);
// 三方商户设置 - table列表数据
export const merchantAccountList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/list/merchant/account', params);
// 三方商户设置 - 开关状态设置
export const setMerchantStatus = (params: FormDataType) =>
  $http('/gl/payment/manage/batch/update/merchant/account', params);
// 三方商户设置 - 获取通道展示状态
export const getChannelStatus = (params: FormDataType) =>
  $http('/gl/recharge/manage/showMerchant/view', params);
// 三方商户设置 - 通道展示开关
export const setChannelDisplay = (params: FormDataType) =>
  $http('/gl/recharge/manage/showMerchant/setting', params);
// 三方商户设置 - 批量开启，关闭
export const updateMerchantOpen = (params: FormDataType) =>
  $http('/gl/withdraw/manage/update/merchant/open', params);
// 三方商户设置 - 下架
export const merchantAccountStatus = (params: FormDataType) =>
  $http('/gl/withdraw/manage/update/merchant/account/status', params);
// 三方商户设置 - 删除
export const deleteMerchantAccount = (params: FormDataType) =>
  $http('/gl/withdraw/manage/delete/merchant/account', params);
// 三方商户设置 - 添加
export const addMerchantAccount = (params: FormDataType) =>
  $http('/gl/withdraw/manage/add/merchant/account', params);
// 三方商户设置 - 修改
export const updateMerchantAccount = (params: FormDataType) =>
  $http('/gl/withdraw/manage/update/merchant/account', params);
// 提现分单设置 - 分单调价设置--添加
export const manageConditionSave = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/save', params);
// 提现分单设置 - 批量设置分单账户
export const manageAccountModify = (params: FormDataType) =>
  $http('/gl/withdraw/manage/account/modify', params);
// 提现分单设置 - 提现分单时间区间
export const findTimingConfig = (params: FormDataType) =>
  $http('/gl/withdraw/manage/find/timing/config', params);
// 提现分单设置 - 修改
export const manageConditionUpdate = (params: FormDataType) =>
  $http('/gl/withdraw/manage/condition/update', params);
// 查询已经配置商户的出款渠道账号列表的接口
export const merchantAccountInuse = (params: FormDataType) =>
  $http('/gl/withdraw/manage/list/merchant/account/inuse', params);
// 获取已分配的三方商户
export const seperatorMerchantList = (params: FormDataType) =>
  $http('/gl/withdraw/manage/seperator/merchant/list', params);
