import { $http } from '@/utils/utils';
import { FormDataType } from './index';

const PERSSION_PATH = '/gl/admin/list/data/new-menu';

// 登录接口
export const accountLogin = async (params: FormDataType) => $http('/gl/admin/login/submit', params);
// 登录前，账号检测接口
export const loginConfirm = async (params: FormDataType) =>
  $http('/gl/admin/login/confirm', params);
// 后台管理用户在线心跳维持的接口
export const heartbeat = async (params?: FormDataType) => $http('/gl/admin/heartbeat', {});

// 获取权限
export async function getPerssion(params = {}): Promise<any> {
  return $http(PERSSION_PATH, params);
}
