import { $http } from '@/utils/utils';
import { FormDataType } from '@/common-typings';
// 充值模块的
const RECHARGE_DATA_PATH = '/gl/fund/recharge/finance/manage/list';
const REFRESH_BALANCE_PATH = '/gl/fund/recharge/finance/manage/total';
const EDIT_RECHARGE_PATH = '/gl/fund/recharge/finance/manage/submit/update/merchant';
// 提现模块 三方商户
const WITHDRAW_THIRD_DATA_PATH = '/gl/fund/withdram/finance/manage/list';
const REFRESH_THIRD_BALANCE_PATH = '/gl/fund/withdram/finance/manage/total';
const GET_THIRD_BANKLIST_PATH = '/gl/fund/withdram/finance/manage/channel/bank/list';
const EDIT_WITHDRAEW_THIRD_DATA_PATH = '/gl/fund/withdram/finance/manage/submit/update/merchant';
// 提现模块  银行卡
const BANKCARD_DATA_PATH = '/withdraw/bankCard-data';
const EDIT_BANKCARD_DATA_PATH = '/withdraw/bankCard-edit';
const ADD_BANKCARD_DATA_PATH = '/withdraw/bankCard-add';
const TRANSFER_BANKCARD_DATA_PATH = '/withdraw/bankCard-transfer';
// 资管资金管理
const INFORMATIONDATA_DATA_PATH = '/information/data';
const ADD_INFORMATIONDATA_DATA_PATH = '/information/add';
const EDIT_INFORMATIONDATA_DATA_PATH = '/information/edit';
const DELETE_INFORMATIONDATA_DATA_PATH = '/information/delete';
const CHANGE_INFORMATIONDATA_DATA_PATH = '/information/change';
const GET_HISTORY_DATA_PATH = '/history/data';
// 资管预警 -充值
const WARN_RECHARGE_DATA_PATH = '/gl/fund/recharge/finance/manage/warning/config/list';
const ADD_WARN_RECHARGE_DATA_PATH = '/gl/fund/recharge/finance/manage/submit/warning/create';
const DELETE_WARN_RECHARGE_DATA_PATH = '/gl/fund/recharge/finance/manage/submit/warning/delete';
// 资管预警 - 提现
const WARN_WITHDRAW_DATA_PATH = '/gl/fund/withdram/finance/manage/warning/config/list';
const ADD_WARN_WITHDRAW_DATA_PATH = '/gl/fund/withdram/finance/manage/submit/warning/create';
const DELETE_WARN_WITHDRAW_DATA_PATH = '/gl/fund/withdram/finance/manage/submit/warning/delete';

// 资金调整
const GET_ADJUSTMENT_DATA_PATH = '/adjustment/data';
const ADJUST_ADJUSTMENT_DATA_PATH = '/adjustment/adjust';

// 资管 - 充值资金管理
export async function getRechargeData(params: FormDataType) {
  return $http(RECHARGE_DATA_PATH, params);
}
// 资管 - 充值 - 刷新第三方账户余额
export async function refreshBalance(params: FormDataType) {
  return $http(REFRESH_BALANCE_PATH, params);
}
// 充值编辑
export async function editRechargeData(params: FormDataType) {
  return $http(EDIT_RECHARGE_PATH, params);
}

// 资管 - 提现 - 三方账户
export async function getThirdData(params: FormDataType) {
  return $http(WITHDRAW_THIRD_DATA_PATH, params);
}

// // 资管 - 提现 - 三方账户 - 刷新
export async function refreshThirdBalance(params: FormDataType) {
  return $http(REFRESH_THIRD_BALANCE_PATH, params);
}

// // 资管 - 提现 - 三方账户 - 编辑 - 银行卡列表
export async function getThirdBankList(params: FormDataType) {
  return $http(GET_THIRD_BANKLIST_PATH, params);
}

// 资管 - 提现-第三方-编辑
export async function editThirdData(params: FormDataType) {
  return $http(EDIT_WITHDRAEW_THIRD_DATA_PATH, params);
}

// 资管 - 提现-银行卡
export async function getBankCardData(params: FormDataType) {
  return $http(BANKCARD_DATA_PATH, params);
}

// 资管 - 提现-银行卡-编辑
export async function editBankCardData(params: FormDataType) {
  return $http(EDIT_BANKCARD_DATA_PATH, params);
}

// 资管 - 提现-银行卡-添加
export async function addBankCardData(params: FormDataType) {
  return $http(ADD_BANKCARD_DATA_PATH, params);
}

// 资管 - 提现-银行卡-转账
export async function transferBankCardData(params: FormDataType) {
  return $http(TRANSFER_BANKCARD_DATA_PATH, params);
}

// 资管 - 资管资金管理
export async function getInformationData(params: FormDataType) {
  return $http(INFORMATIONDATA_DATA_PATH, params);
}

// 资管 - 资管资金管理 - 添加
export async function addInformationData(params: FormDataType) {
  return $http(ADD_INFORMATIONDATA_DATA_PATH, params);
}

// 资管 - 资管资金管理 - 编辑
export async function editInformationData(params: FormDataType) {
  return $http(EDIT_INFORMATIONDATA_DATA_PATH, params);
}

// 资管 - 资管资金管理 - 删除
export async function deleteInformationData(params: FormDataType) {
  return $http(DELETE_INFORMATIONDATA_DATA_PATH, params);
}

// 资管 - 资管资金管理 - 启用或停用
export async function changeInformationData(params: FormDataType) {
  return $http(CHANGE_INFORMATIONDATA_DATA_PATH, params);
}

// 资管 - 资管资金管理 - 启用或停用
export async function getHistoryData(params: FormDataType) {
  return $http(GET_HISTORY_DATA_PATH, params);
}

// 资管 - 充值 资金预警 - 列表
export async function getWarnRechargeData(params: FormDataType) {
  return $http(WARN_RECHARGE_DATA_PATH, params);
}

// 资管 - 充值 资金预警 - 增加
export async function addWarnRechargeData(params: FormDataType) {
  return $http(ADD_WARN_RECHARGE_DATA_PATH, params);
}

// 资管 - 充值 资金预警 - 删除
export async function deleteWarnRechargeData(params: FormDataType) {
  return $http(DELETE_WARN_RECHARGE_DATA_PATH, params);
}

// 资管 - 提现 资金预警 - 列表
export async function getWarnWithdrawData(params: FormDataType) {
  return $http(WARN_WITHDRAW_DATA_PATH, params);
}

// 资管 - 提现 资金预警 - 增加
export async function addWarnWithdrawData(params: FormDataType) {
  return $http(ADD_WARN_WITHDRAW_DATA_PATH, params);
}

// 资管 - 提现 资金预警 - 删除
export async function deleteWarnWithdrawData(params: FormDataType) {
  return $http(DELETE_WARN_WITHDRAW_DATA_PATH, params);
}

// 资管 - 资金调整数据
export async function getAdjustmentData(params: FormDataType) {
  return $http(GET_ADJUSTMENT_DATA_PATH, params);
}

// 资管 - 资金调整 申请
export async function adjustAdjustmentData(params: FormDataType) {
  return $http(ADJUST_ADJUSTMENT_DATA_PATH, params);
}

// get请求
// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }
