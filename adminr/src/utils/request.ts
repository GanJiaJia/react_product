import { message, notification } from 'antd';

import { Http2SecureServer } from 'http2';
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import md5 from 'blueimp-md5';
import qs from 'qs';
import router from 'umi/router';
import { logout } from '@/utils/auth';
import { getLogin } from './auth';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  console.log(error);
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
interface SignParamsType {
  device_id?: string;
  os_type?: number;
  timestamp?: number;
  version?: string;
  token?: string | undefined;
  uid?: string | undefined;
  sign?: string;
}

const addSign = (): object => {
  const timestamp = Date.parse(new Date().toString());
  const signParams: SignParamsType = {};
  const { token, uid } = getLogin();
  signParams.device_id = '1.0';
  signParams.os_type = 0;
  signParams.timestamp = timestamp;
  signParams.version = '1.0';
  const urlStr = urlEncode(signParams).substr(1);
  signParams.token = token;
  signParams.uid = uid;
  signParams.sign = md5(`${urlStr}global`);
  // console.log(urlStr)

  return signParams;
};

function urlEncode(param: object, key?: string | number, encode?: string): string {
  if (param == null) {
    return '';
  }
  let paramStr = '';
  const t = typeof param;
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += `&${key}=${
      encode == null || encode ? encodeURIComponent(param.toString()) : param
    }`;
  } else {
    Object.keys(param).forEach((i: string) => {
      const k = key == null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`);
      paramStr += urlEncode(param[i], k, encode);
    });
  }
  return paramStr;
}

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    some: 'header', // 统一的headers,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json, text/plain, */*',
  },
  requestType: 'form',
  timeout: 100000,
  // params: {
  //   hello: 'world'   // 每个请求都要带上的query参数
  // }
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options): any => {
  const { data } = options;
  options.data = qs.stringify(data, {
    allowDots: true,
  });
  return {
    url: `/api${url}`,
    options: {
      ...options,
      headers: {
        ...options.headers,
        ...addSign(),
      },
    },
  };
});

// response拦截器, 处理response
// request.interceptors.response.use((response, options) => {
//   console.log(response);
//   return response;
// });

/**
 * 对于状态码实际是 200 的错误
 */

request.interceptors.response.use(async (response: any) => {
  const data = await response.clone().json();
  // console.log(data);
  if (data.code > 200 && data.code < 400) {
    message.warning(data.message);
  } else if (data.code === 405) {
    logout();
    router.push('/user/login');
    message.error(data.message);
  } else if (data.code >= 400 && data.code < 600) {
    message.error(data.message);
  }
  return response;
  // // if(data && data.NOT_LOGIN) {
  // //   location.href = '登录url';
  // }
});

// 中间件，对请求前、响应后做处理
// request.use(async (ctx, next) => {
//  const { res }  = ctx;
//  console.log(res);
// })

export default request;
