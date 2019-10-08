import { ModelType } from '@/common-typings';
import types from '@/const/constType';
import {
  getRechargeReportData,
  getMerchantList,
  getRechargeFooterData,
  getWithdrwaReportData,
  getWithdrawFooterData,
} from './service';

const { CODE } = types;

const Model: ModelType = {
  namespace: 'report',
  state: {
    rechargeData: {
      // 充值数据
      list: [],
    },
    rechargeTotal: {},
    withdrawData: {
      // 充值数据
      list: [],
    },
    withdrawTotal: {},
    merchantList: [],
  },

  effects: {
    // 财报-充值
    *rechargeReportEffect({ payload, fn }, { call, put }) {
      const res = yield call(getRechargeReportData, payload);
      if (res.code === CODE) {
        yield put({ type: 'setRechargeReportData', payload: res.data });
        if (fn) {
          fn(res.data);
        }
      }
    },

    // 财报-footer统计
    *rechargeReportFooterEffect({ payload }, { call, put }) {
      const res = yield call(getRechargeFooterData, payload);
      if (res.code === CODE) {
        yield put({ type: 'setRechargeReportRooterData', payload: res.data });
      }
    },

    // 商户列表
    *merchantListEffect({ payload }, { call, put }) {
      const res = yield call(getMerchantList, payload);
      if (res.code === CODE) {
        yield put({ type: 'setMerchantList', payload: res.data });
      }
    },

    // 财报-提现
    *withdrawReportEffect({ payload, fn }, { call, put }) {
      const res = yield call(getWithdrwaReportData, payload);
      if (res.code === CODE) {
        yield put({ type: 'setWithdrawReportData', payload: res.data });
        if (fn) {
          fn(res.data);
        }
      }
    },

    // 财报-提现-footer统计
    *withdrawReportFooterEffect({ payload }, { call, put }) {
      const res = yield call(getWithdrawFooterData, payload);
      if (res.code === CODE) {
        yield put({ type: 'setWithdrawReportRooterData', payload: res.data });
      }
    },
  },

  reducers: {
    // 充值数据
    setRechargeReportData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.rechargeData = payload;
      return {
        ...state,
        ...newState,
      };
    },
    // 充值表格footer统计
    setRechargeReportRooterData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.rechargeTotal = payload;
      return {
        ...state,
        ...newState,
      };
    },
    // 提现数据
    setWithdrawReportData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.withdrawData = payload;
      return {
        ...state,
        ...newState,
      };
    },
    // 提现表格footer统计
    setWithdrawReportRooterData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.withdrawTotal = payload;
      return {
        ...state,
        ...newState,
      };
    },
    // 商户列表
    setMerchantList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      payload.unshift({
        channelId: '-1',
        channelName: '全部',
      });
      newState.merchantList = payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
};

export default Model;
