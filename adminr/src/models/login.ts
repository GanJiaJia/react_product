import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { accountLogin, getPerssion, loginConfirm } from '../pages/login/service';

import { ModelType } from '@/common-typings';
import { setLogin } from '@/utils/auth';
import types from '@/const/constType';

const { CODE } = types;

const userInfo: any = localStorage.getItem('admin-user-info')
  ? localStorage.getItem('admin-user-info')
  : JSON.stringify([]);

const savePermissionList = (data: any) => {
  localStorage.setItem('permissionList', JSON.stringify(data));
};

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
    userInfo: JSON.parse(userInfo),
    googleValidate: {
      data: '',
      showBindInfo: false,
    },
    permissionList: [],
    // permissionList: JSON.parse(permissionList)
  },

  effects: {
    *getPermissionListEffect({ payload, fn }, { call, put }) {
      const res = yield call(getPerssion, payload);
      if (res.code === CODE) {
        yield put({
          type: 'setPermissionData',
          payload: res.data,
        });
        savePermissionList(res.data);
        if (fn) {
          fn(res.data);
        }
      }
    },

    *login({ payload }, { call, put }) {
      if (payload.code) {
        // 如果输入了验证码，走登录接口
        const response = yield call(accountLogin, payload);
        // 登录成功
        if (response.code === 1) {
          setLogin(response.data); // 设置登录后 cookie  storage
          yield put({
            // 将 data 存进 state
            type: 'userInfoReducers',
            payload: response.data,
          });

          const res = yield call(getPerssion, payload);
          if (res.code === CODE) {
            yield put({
              type: 'setPermissionData',
              payload: res.data,
            });
            savePermissionList(res.data);
          }

          yield put(routerRedux.replace('/')); // 路由跳转
        } else {
          // 登录失败,请求拦截器那里有统一处理的错误提示，这里就不需要错误提示了
          // message.error(response.message);
        }
      } else {
        // 否则，走绑定谷歌验证接口
        yield put({ type: 'bindGoogle', payload });
      }
    },

    *bindGoogle({ payload }, { call, put }) {
      const response = yield call(loginConfirm, payload);
      if (response.data) {
        const { data } = response;
        const obj: { showBindInfo?: any; data?: string } = {};
        obj.showBindInfo = true;
        obj.data = data;

        yield put({
          type: 'setGoogleValidate',
          payload: obj,
        });
      } else if (response.message !== '用户密码错误' && response.message !== '用户名不存在') {
        message.error('您已绑定验证码，请输入验证码后登陆!');
      }
      return false;
    },
  },

  reducers: {
    setGoogleValidate(state: any, { payload }) {
      return {
        ...state,
        googleValidate: payload,
      };
    },
    userInfoReducers(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
    setPermissionData(state, { payload }) {
      return {
        ...state,
        permissionList: payload,
      };
    },
  },
};

export default Model;
