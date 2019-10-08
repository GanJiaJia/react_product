import _ from 'lodash';
import { message } from 'antd';
import { ModelType } from './modelType';
import {
  addMerchant,
  addMerchantApp,
  checkMerchantStatus,
  deleteMerchant,
  editMerchant,
  getLevelList,
  getLogsList,
  getMerchanRateList,
  getMerchanSetList,
  getMerchantAppList,
  getMerchantHasSetApp,
  getMerchantList,
  getOrdFastAmount,
  getPaymentList,
  getRepairData,
  getReviewData,
  getReviewerList,
  getShopList,
  getWithdrawBankList,
  repairConfirm,
  repairRefuse,
  saveReviewData,
  setMerchantEdit,
  setMerchantRecommend,
  setMerchantStatus,
  setMerchantTop,
  setOrdFastAmount,
  setWithdraw,
  setWithdrawBankAmount,
  getReviewManageList,
  repairCreate,
  getChannelStatus,
  updateMerchantStatus,
} from './service';
import { handleMessage } from '@/utils/tools';
import { SUCCESS_CODE } from './data';

// function handleMessage(response: any, callback: Function) {
//   if (response.code === 1) {
//     message.success('保存成功');
//     if (callback) {
//       callback();
//     }
//   }
//   //  else {
//   //   message.error('保存失败');
//   // }
// }

const Model: ModelType = {
  namespace: 'recharge',
  state: {
    loading: false, // 表格loading
    reviewData: {
      list: [],
      total: 0,
      reviewerList: [],
      manageList: [],
    },
    reviewDialogData: {
      systemList: [],
      merchantList: [],
    },
    repairData: {
      list: [],
      total: 0,
    },
    merchantSuccessRate: {
      merchantList: [],
      list: [],
      total: 0,
    },
    merchantSetData: {
      list: [],
      total: 0,
      status: 1,
    },
    merchantAppData: {
      list: [],
      total: 0,
      paymentList: [],
      shopList: [],
      levelList: [],
      shopHasSetList: [],
    },
    ordinaryAmountData: {
      fastAmountList: [],
      data: [],
      bankList: [],
    },
    largeAmountData: {
      fastAmountList: [],
      data: [],
      bankList: [],
    },
    logsData: {
      list: [],
      total: 0,
    },
    merchantData: [],
  },
  effects: {
    *reviewDataEffect({ payload, callback }, { call, put }) {
      const response = yield call(getReviewData, payload);
      yield put({ type: 'setReviewData', payload: response });
      if (callback) callback();
    },
    *reviewerListEffect({ payload }, { call, put }) {
      const response = yield call(getReviewerList, payload);
      yield put({ type: 'setReviewerData', payload: response });
    },
    *reviewSaveEffect({ payload, callback }, { call }) {
      const response = yield call(saveReviewData, payload);
      handleMessage(response, callback);
    },
    *checkMerchantStatusEffect({ payload, callback }, { call }) {
      const response = yield call(checkMerchantStatus, payload);
      if (response.code === SUCCESS_CODE) {
        message.success('验证成功');
      }
      if (callback) {
        callback(response);
      }
    },
    *repairDataEffect({ payload, callback }, { call, put }) {
      const response = yield call(getRepairData, payload);
      yield put({ type: 'setRepairData', payload: response });
      if (callback) callback();
    },
    *repairRefuseEffect({ payload, callback }, { call }) {
      const response = yield call(repairRefuse, payload);
      handleMessage(response, callback);
    },
    *repairConfirmEffect({ payload, callback }, { call }) {
      const response = yield call(repairConfirm, payload);
      handleMessage(response, callback);
    },
    *merchantListEffect({ payload }, { call, put }) {
      const response = yield call(getMerchantList, payload);
      yield put({ type: 'setMerchantList', payload: response });
    },
    *merchantRateDataEffect({ payload, callback }, { call, put }) {
      const response = yield call(getMerchanRateList, payload);
      yield put({ type: 'setMerchanRateList', payload: response });
      if (callback) callback();
    },
    *merchantSetDataEffect({ payload, callback }, { call, put }) {
      const response = yield call(getMerchanSetList, payload);
      yield put({ type: 'setMerchanSetList', payload: response });
      if (callback) callback();
    },
    *merchantSetStatusEffect({ payload, callback }, { call, put }) {
      const response = yield call(setMerchantStatus, payload);
      handleMessage(response, callback);
    },
    *merchantEditEffect({ payload, callback }, { call }) {
      const response = yield call(editMerchant, payload);
      handleMessage(response, callback);
    },
    *merchantAppListEffect({ payload, callback }, { call, put }) {
      const response = yield call(getMerchantAppList, payload);
      yield put({ type: 'setMerchantAppList', payload: response });
      if (callback) callback();
    },
    *merchantStatusEffect({ payload, callback }, { call }) {
      const response = yield call(updateMerchantStatus, payload);
      if (response.code === 1) {
        message.success(`${payload.status === 0 ? '上架' : '下架'}成功`);
        if (callback) {
          callback();
        }
      } else {
        message.error(`${payload.status === 0 ? '上架' : '下架'}成功`);
      }
    },
    *deleteMerchantEffect({ payload, callback }, { call }) {
      const response = yield call(deleteMerchant, payload);
      handleMessage(response, callback);
    },
    *setMerchantTopEffect({ payload, callback }, { call }) {
      const response = yield call(setMerchantTop, payload);
      handleMessage(response, callback);
    },
    *setMerchantRecommendEffect({ payload, callback }, { call }) {
      const response = yield call(setMerchantRecommend, payload);
      handleMessage(response, callback);
    },
    *getPaymentEffect({ payload }, { call, put }) {
      const response = yield call(getPaymentList, payload);
      yield put({ type: 'setPaymentList', payload: response });
    },
    *getShopEffect({ payload }, { call, put }) {
      const response = yield call(getShopList, payload);
      yield put({ type: 'setShopList', payload: response });
    },
    *getLevelEffect({ payload }, { call, put }) {
      const response = yield call(getLevelList, payload);
      yield put({ type: 'setLevelList', payload: response });
    },
    *setMerchantEditEffect({ payload, callback }, { call }) {
      const response = yield call(setMerchantEdit, payload);
      handleMessage(response, callback);
    },
    *setMerchantAddEffect({ payload, callback }, { call }) {
      const response = yield call(addMerchant, payload);
      handleMessage(response, callback);
    },
    *setMerchantAppAddEffect({ payload, callback }, { call }) {
      const response = yield call(addMerchantApp, payload);
      handleMessage(response, callback);
    },
    *setMerchantHasSetEffect({ payload }, { call, put }) {
      const response = yield call(getMerchantHasSetApp, payload);
      yield put({ type: 'setShopHasSetList', payload: response });
    },
    *getFastAmountEffect({ payload, callback }, { call, put }) {
      const response = yield call(getOrdFastAmount, payload);
      const { limitType } = payload;
      if (limitType === 0) {
        yield put({ type: 'setOrdFastList', payload: response, callback });
      } else {
        yield put({ type: 'setLargeFastList', payload: response, callback });
      }
    },
    *setFastAmountEffect({ payload, callback }, { call }) {
      const response = yield call(setOrdFastAmount, payload);
      handleMessage(response, callback);
    },
    *setWithdrawEffect({ payload, callback }, { call }) {
      const response = yield call(setWithdraw, payload);
      handleMessage(response, callback);
    },
    *setWithdrawBankEffect({ payload, callback }, { call, put }) {
      const { channelId, rechargeType } = payload;
      const response = yield call(getWithdrawBankList, { channelId });
      if (rechargeType === 0) {
        yield put({ type: 'setOrdBankList', payload: response, callback });
      } else {
        yield put({ type: 'setLargeBankList', payload: response, callback });
      }
    },
    *setWithdrawBankAmountEffect({ payload, callback }, { call }) {
      const response = yield call(setWithdrawBankAmount, payload);
      handleMessage(response, callback);
    },
    *getLogsListEffect({ payload, callback }, { call, put }) {
      const response = yield call(getLogsList, payload);
      yield put({ type: 'setLogsList', payload: response });
      if (callback) callback();
    },
    *getReviewManageListEffect({ payload }, { call, put }) {
      const response = yield call(getReviewManageList, payload);
      yield put({ type: 'setReviewManageList', payload: response });
    },
    *repairCreateEffect({ payload, callback }, { call }) {
      const response = yield call(repairCreate, payload);
      handleMessage(response, callback);
      // if(callback) callback();
    },
    *getChannelStatusEffect({ payload }, { call, put }) {
      const response = yield call(getChannelStatus, payload);
      yield put({ type: 'setChannelStatus', payload: response });
    },
  },
  reducers: {
    setReviewData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const { list, total } = payload.data;
        newState.reviewData.list = list || [];
        newState.reviewData.total = total || 0;
      }
      return newState;
    },
    setReviewerData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      const { data } = payload;
      if (data) {
        newState.reviewData.reviewerList = data || [];
      }
      return newState;
    },
    setRepairData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      const { data } = payload;
      if (data) {
        const { list, total } = data;
        newState.repairData.list = list || [];
        newState.repairData.total = total || 0;
      }
      return newState;
    },
    setMerchantList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        newState.merchantData = payload.data || [];
      }
      return {
        ...newState,
      };
    },
    setMerchanRateList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const { list, total } = payload.data;
        newState.merchantSuccessRate.list = list || [];
        newState.merchantSuccessRate.total = total || 0;
      }
      return newState;
    },
    setMerchanSetList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const { list, total } = payload.data;
        newState.merchantSetData.list = list || [];
        newState.merchantSetData.total = total || 0;
      }
      return newState;
    },
    setMerchantAppList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const { list, total } = payload.data;
        newState.merchantAppData.list = list || [];
        newState.merchantAppData.total = total || 0;
      }
      return newState;
    },
    setPaymentList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        newState.merchantAppData.paymentList = payload.data;
      }
      return newState;
    },
    setShopList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        newState.merchantAppData.shopList = payload.data.list;
      }
      return newState;
    },
    setLevelList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        newState.merchantAppData.levelList = payload.data;
      }
      return newState;
    },
    setShopHasSetList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        newState.merchantAppData.shopHasSetList = payload.data;
      }
      return newState;
    },
    setOrdFastList(state, { payload, callback }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const obj = {};
        _.forEach(payload.data.fastAmount, (item: string | number, index: number) => {
          obj[`amount${index + 1}`] = item;
        });
        newState.ordinaryAmountData.fastAmountList = [obj];
        newState.ordinaryAmountData.data = payload.data.data;
        if (callback) callback([obj]);
      }
      return newState;
    },
    setOrdBankList(state, { payload, callback }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const bankList = _.map(payload.data, item => {
          item.checked = item.status === 0;
          return item;
        });
        newState.ordinaryAmountData.bankList = bankList;
        if (callback) callback(bankList);
      }
      return newState;
    },
    setLargeFastList(state, { payload, callback }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const obj = {};
        _.forEach(payload.data.fastAmount, (item: string | number, index: number) => {
          obj[`amount${index + 1}`] = item;
        });
        newState.largeAmountData.fastAmountList = [obj];
        newState.largeAmountData.data = payload.data.data;
        if (callback) callback([obj]);
      }
      return newState;
    },
    setLargeBankList(state, { payload, callback }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const bankList = _.map(payload.data, item => {
          item.checked = item.status === 0;
          return item;
        });
        newState.largeAmountData.bankList = bankList;
        if (callback) callback(bankList);
      }
      return newState;
    },
    setLogsList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        const { list, total } = payload.data;
        newState.logsData.list = list || [];
        newState.logsData.total = total || 0;
      }
      return newState;
    },
    setReviewManageList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        newState.reviewData.manageList = payload.data;
      }
      return newState;
    },
    setChannelStatus(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload.data) {
        newState.merchantSetData.status = payload.data === 'true' ? 0 : 1;
      }
      return newState;
    },
  },
};

export default Model;
