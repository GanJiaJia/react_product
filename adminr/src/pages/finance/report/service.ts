import { $http } from '@/utils/utils';
import { FormDataType } from '@/common-typings';

const REPORT_RECHARGE_PATH = '/gl/fund/report/manage/recharge/check/list';
const REPORT_RECHARGE_FOOTER_PATH = '/gl/fund/report/manage/recharge/check/total';
const REPORT_WITHDRAW_PATH = '/gl/fund/report/manage/withdraw/check/list';
const REPORT_WITHDRAW_FOOTER_PATH = '/gl/fund/report/manage/withdraw/check/total';
const MERCHANT_LIST_PATH = '/gl/payment/manage/list/merchant/account/inuse';

// 财报 - 充值
export async function getRechargeReportData(params: FormDataType) {
  return $http(REPORT_RECHARGE_PATH, params);
}

// 财报 - 充值统计
export async function getRechargeFooterData(params: FormDataType) {
  return $http(REPORT_RECHARGE_FOOTER_PATH, params);
}

// 财报 - 提现
export async function getWithdrwaReportData(params: FormDataType) {
  return $http(REPORT_WITHDRAW_PATH, params);
}

// 财报 - 提现统计
export async function getWithdrawFooterData(params: FormDataType) {
  return $http(REPORT_WITHDRAW_FOOTER_PATH, params);
}

// 商户列表
export async function getMerchantList(params: FormDataType) {
  return $http(MERCHANT_LIST_PATH, params);
}

// get请求
// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }
