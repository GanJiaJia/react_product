import { $http } from '@/utils/utils';
import { FormDataType } from '@/common-typings';

// 检查是否预警
const CHECK_IS_WARN = '/gl/fund/finance/warning/manage/load/data';

// 资管 - 充值资金管理
export async function checkIsWarn(params: FormDataType) {
  return $http(CHECK_IS_WARN, params);
}
