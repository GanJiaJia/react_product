// import { openNotification, notificationType } from '@/components/Notification';
import { message } from 'antd';
import {
  addBankCardData,
  addInformationData,
  addWarnRechargeData,
  addWarnWithdrawData,
  adjustAdjustmentData,
  changeInformationData,
  deleteInformationData,
  deleteWarnRechargeData,
  deleteWarnWithdrawData,
  editBankCardData,
  editInformationData,
  editRechargeData,
  editThirdData,
  getAdjustmentData,
  getBankCardData,
  getHistoryData,
  getInformationData,
  getRechargeData,
  getThirdBankList,
  getThirdData,
  getWarnRechargeData,
  getWarnWithdrawData,
  refreshBalance,
  refreshThirdBalance,
  transferBankCardData,
} from './service';

import { ModelType } from '@/common-typings';
import types from '@/const/constType';

const { CODE } = types;

const cbForRes = (fn: any = () => {}, res: any = {}) => {
  if (fn) {
    fn(res);
  }
};

const Model: ModelType = {
  namespace: 'fund',
  state: {
    rechargeData: {
      // 充值数据
      list: [],
    },
    thirdData: {
      // 提现-第三方数据
      list: [],
    },
    thirdBankList: [],
    bankCardData: {
      // 提现-银行卡数据
      list: [],
    },
    informationData: {
      list: [],
    },
    historyData: {
      list: [],
    },
    warnRechargeData: {
      list: [],
    },
    warnWithdrawData: {
      list: [],
    },
    adjustmentData: {
      list: [],
    },
  },

  effects: {
    //  effects里有三个参数，  put 用于触发action ,
    //  call 用于调用异步逻辑 ,  select 用于从 state 里获取数据。
    // 资管-充值
    *rechargeDataEffect({ payload, fn }, { call, put }) {
      const res = yield call(getRechargeData, payload); // put触发action，保存数据
      if (res.code === CODE) {
        yield put({ type: 'setRechargeData', payload: res.data });
        cbForRes(fn, res.data);
      }
    },

    *refreshBalanceEffect({ payload, fn }, { call, put }) {
      const res = yield call(refreshBalance, payload); // put触发action，保存数据
      if (res.code === CODE) {
        cbForRes(fn, res);
        // message.success("刷新成功");
      }
    },

    // 充值编辑
    *editRechargeDataEffect({ payload, fn }, { call, put }) {
      const res = yield call(editRechargeData, payload);
      if (res.code === CODE) {
        cbForRes(fn, res.data);
        message.success('操作成功');
      }
    },

    // 资管-提现
    *withdrawThirdEffect({ payload, fn }, { call, put }) {
      const res = yield call(getThirdData, payload);
      if (res.code === CODE) {
        yield put({ type: 'setThirdData', payload: res.data });
        cbForRes(fn, res.data);
      }
    },

    // 资管 - 提现 编辑-银行卡列表
    *withdrawThirdBankListEffect({ payload, fn }, { call, put }) {
      const res = yield call(getThirdBankList, payload);
      if (res.code === CODE) {
        yield put({ type: 'setThirdBankList', payload: res.data });
        // cbForRes(fn, res.data);
      }
    },

    // 资管 - 提现 - 刷新三方商户余额
    *refreshWithdrawEffect({ payload, fn }, { call, put }) {
      const res = yield call(refreshThirdBalance, payload); // put触发action，保存数据
      if (res.code === CODE) {
        cbForRes(fn, res);
        // message.success("刷新成功");
      }
    },

    // 资管-提现-第三方-编辑
    *editWithdrawThirdEffect({ payload, fn }, { call, put }) {
      const res = yield call(editThirdData, payload);
      if (res.code === CODE) {
        message.success('操作成功');
        cbForRes(fn, res);
      }
    },

    // 资管-银行卡
    *withdrawBankCardEffect({ payload, fn }, { call, put }) {
      const response = yield call(getBankCardData, payload);
      yield put({ type: 'setBankCardData', payload: response });
      cbForRes(fn, response);
    },

    // 资管-银行卡-编辑
    *editWithdrawBankCardEffect({ payload, fn }, { call, put }) {
      const response = yield call(editBankCardData, payload);
      message.success(response.msg);
      cbForRes(fn, response);
    },

    // 资管-银行卡-添加
    *addWithdrawBankCardEffect({ payload, fn }, { call, put }) {
      const response = yield call(addBankCardData, payload);
      message.success(response.msg);
      cbForRes(fn, response);
    },

    // 资管-银行卡-转账
    *transferWithdrawBankCardEffect({ payload, fn }, { call, put }) {
      const response = yield call(transferBankCardData, payload);
      message.success(response.msg);
      cbForRes(fn, response);
    },

    // 资管-资管资金数据
    *informationEffect({ payload, fn }, { call, put }) {
      const response = yield call(getInformationData, payload);
      yield put({ type: 'setInformationData', payload: response });
      cbForRes(fn, response);
    },

    // 添加-资管-资管资金
    *addInformationEffect({ payload, fn }, { call, put }) {
      const response = yield call(addInformationData, payload);
      message.success(response.msg);
      cbForRes(fn, response);
    },

    // 编辑-资管-资管资金
    *editInformationEffect({ payload, fn }, { call, put }) {
      const response = yield call(editInformationData, payload);
      message.success(response.msg);
      cbForRes(fn, response);
    },

    // 删除-资管-资管资金
    *deleteInformationEffect({ payload, fn }, { call, put }) {
      const response = yield call(deleteInformationData, payload);
      message.success(response.msg);
      cbForRes(fn, response);
    },

    // 删除-资管-资管资金
    *changeInformationEffect({ payload, fn }, { call, put }) {
      const response = yield call(changeInformationData, payload);
      message.success(response.msg);
      cbForRes(fn, response);
    },
    // 资管-资管资金记录
    *historyEffect({ payload, fn }, { call, put }) {
      const response = yield call(getHistoryData, payload);
      yield put({ type: 'setHistoryData', payload: response });
      cbForRes(fn, response);
    },

    // 资管-充值预警-列表
    *warnRechargeEffect({ payload, fn }, { call, put }) {
      const res = yield call(getWarnRechargeData, payload);
      if (res.code === CODE) {
        yield put({ type: 'setWarnRechargeData', payload: res });
        cbForRes(fn, res);
      }
    },
    // 资管-充值预警-添加
    *addWarnRechargeEffect({ payload, fn }, { call, put }) {
      const res = yield call(addWarnRechargeData, payload);
      if (res.code === CODE) {
        message.success('添加成功');
        cbForRes(fn, res);
      }
    },
    // 资管-充值预警-删除
    *deleteWarnRechargeEffect({ payload, fn }, { call, put }) {
      const res = yield call(deleteWarnRechargeData, payload);
      if (res.code === CODE) {
        message.success('删除成功');
        cbForRes(fn, res);
      }
    },
    // 资管-提现 预警-列表
    *warnWithdrawEffect({ payload, fn }, { call, put }) {
      const res = yield call(getWarnWithdrawData, payload);
      if (res.code === CODE) {
        yield put({ type: 'setWarnWithdrawData', payload: res });
        cbForRes(fn, res);
      }
    },
    // 资管-提现 预警-添加
    *addWarnWithdrawEffect({ payload, fn }, { call, put }) {
      const res = yield call(addWarnWithdrawData, payload);
      if (res.code === CODE) {
        message.success('添加成功');
        cbForRes(fn, res);
      }
    },
    // 资管-提现 预警-删除
    *deleteWarnWithdrawEffect({ payload, fn }, { call, put }) {
      const res = yield call(deleteWarnWithdrawData, payload);
      if (res.code === CODE) {
        message.success('删除成功');
        cbForRes(fn, res);
      }
    },

    // 资管-资金调整 表格数据
    *adjustmentEffect({ payload, fn }, { call, put }) {
      const response = yield call(getAdjustmentData, payload);
      yield put({ type: 'setAdjustmentData', payload: response });
      cbForRes(fn, response);
    },
    // 资管-资金调整申请
    *adjustAdjustmentEffect({ payload, fn }, { call, put }) {
      const response = yield call(adjustAdjustmentData, payload);
      message.success(response.msg);
      cbForRes(fn, response);
    },
  },

  reducers: {
    // 充值数据
    setRechargeData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.rechargeData = payload;
      return {
        ...state,
        ...newState,
      };
    },

    // 提现-第三方
    setThirdData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.thirdData = payload;
      return {
        ...state,
        ...newState,
      };
    },

    // 提现-编辑 - 第三方 - 银行卡列表
    setThirdBankList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.thirdBankList = payload;
      return {
        ...state,
        ...newState,
      };
    },

    // 提现-银行卡
    setBankCardData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.bankCardData.list = payload;
      return {
        ...state,
        ...newState,
      };
    },

    // 资管-资金管理数据
    setInformationData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.informationData.list = payload;
      return {
        ...state,
        ...newState,
      };
    },

    // 资管-资金管理数据
    setHistoryData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.historyData.list = payload;
      return {
        ...state,
        ...newState,
      };
    },

    // 资管-充值预警-数据
    setWarnRechargeData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.warnRechargeData.list = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    // 资管-提现预警-数据
    setWarnWithdrawData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.warnWithdrawData.list = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    // 资管-资金调整
    setAdjustmentData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.adjustmentData.list = payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
};
export default Model;
