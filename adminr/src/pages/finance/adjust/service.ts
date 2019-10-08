import { $http } from '@/utils/utils';
import { FormDataType } from '@/common-typings';

// const GET_ADJUSTMENT_DATA_PATH = '/adjustment/data';
const GET_ADJUSTMENT_DATA_PATH = '/gl/fund/manage/list/operation';
const ADJUST_ADJUSTMENT_DATA_PATH = '/gl/fund/manage/add';
const ADJUSTMENT_FIRST_CHECK_DATA_PATH = '/gl/fund/manage/approve/first';
const ADJUSTMENT_SECOND_CHECK_DATA_PATH = '/gl/fund/manage/approve/second';
const ADJUSTMENT_CREATOR_DATA_PATH = '/gl/fund/manage/list/creator';
const ADJUSTMENT_FIRST_LIST_DATA_PATH = '/gl/fund/manage/list/first';
const ADJUSTMENT_SECOND_LIST_DATA_PATH = '/gl/fund/manage/list/second';
const EXCEL_EXPORT_PATH = '/gl/fund/manage/export/operation';

// 资管 - 资金调整数据
export async function getAdjustmentData(params: FormDataType) {
  return $http(GET_ADJUSTMENT_DATA_PATH, params);
}

// 资管 - 资金调整 申请
export async function adjustAdjustmentData(params: FormDataType) {
  return $http(ADJUST_ADJUSTMENT_DATA_PATH, params);
}

// 资管 - 资金调整 一审
export async function adjustmentFirstCheckData(params: FormDataType) {
  return $http(ADJUSTMENT_FIRST_CHECK_DATA_PATH, params);
}

// 资管 - 资金调整 二审
export async function adjustmentSecondCheckData(params: FormDataType) {
  return $http(ADJUSTMENT_SECOND_CHECK_DATA_PATH, params);
}

// 资管 - 资金调整 申请人
export async function adjustmentCreatorData(params: FormDataType) {
  return $http(ADJUSTMENT_CREATOR_DATA_PATH, params);
}
// 资管 - 资金调整 一审人列表
export async function adjustmentFirstListData(params: FormDataType) {
  return $http(ADJUSTMENT_FIRST_LIST_DATA_PATH, params);
}
// 资管 - 资金调整 二审人列表
export async function adjustmentSecondListData(params: FormDataType) {
  return $http(ADJUSTMENT_SECOND_LIST_DATA_PATH, params);
}

// 导出
export async function excelExportData(params: FormDataType) {
  return $http(EXCEL_EXPORT_PATH, params);
}

// get请求
// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }
