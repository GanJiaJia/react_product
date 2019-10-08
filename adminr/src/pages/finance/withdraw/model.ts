import { message } from 'antd';
import {
  accountDelete,
  accountList,
  accountSwitch,
  addAccount,
  addAccountValidate,
  conditionAutoSave,
  conditionDelete,
  conditionReview,
  doAutoDelete,
  doAutoUpdate,
  getAutoList,
  getCheckApprovalList,
  getLevelList,
  getThirdNum,
  getWithdrawRecordData,
  getWithdrawSeparateData,
  getWithdrawTransferData,
  withdrawOperateList,
  withdrawOverview,
  withdrawSeperateList,
  withdrawSetCondition,
  withdrawSetOrserTime,
  approveReturn,
  withdrawStatusConfim,
  saveForceSuccess,
  saveWithdrawReturn,
  withdrawBankList,
  statusConfimBatch,
  manageApprove,
  rejectReasonList,
  manageBatchSeperate,
  withdrawAccountList,
  batchRecycling,
  saveReturnBatch,
  saveGeneralConfig,
  findGeneralConfig,
  saveQuickConfig,
  saveRejectReason,
  saveCommonConfig,
  findQuickConfig,
  findRejectReason,
  findCommonConfig,
  saveProxyConfig,
  findProxyConfig,
  getMerchantList,
  merchantAccountList,
  updateMerchantOpen,
  merchantAccountStatus,
  deleteMerchantAccount,
  addMerchantAccount,
  manageConditionSave,
  manageAccountModify,
  getChannelStatus,
  setChannelDisplay,
  updateMerchantAccount,
  findTimingConfig,
  manageConditionUpdate,
  getAccountBalance,
  merchantAccountInuse,
  seperatorMerchantList,
} from './service';

import { ModelType } from '@/common-typings.d';
import types from '@/const/constType';

const { CODE } = types;
const resMsg = '操作成功';

const Model: ModelType = {
  namespace: 'withdraw',
  state: {
    // 分单操作页面数据
    withdrawSeperate: {
      data: [],
    },
    // 提现分单设置模块
    orserSetting: {
      // accountBalanceData: [],
      withdrawOverviewData: [],
      levelListData: [],
      conditionTabData: [],
      accountListData: {
        list: [],
      },
      autoListData: [],
      validateAccountData: {
        exitAccount: [],
      },
      conditionReviewData: [],
      thirdNumData: [],
      timingConfig: {},
    },
    // 提现审核模块
    examine: {
      checkApprovalList: {
        list: [],
      },
      statusConfimData: {},
    },
    // 提现出款模块
    payment: {
      rejectReasonList: [],
      withdrawTransferData: {
        list: [],
      },
      withdrawBankListData: [],
      accountBalanceData: '',
      accountInuseData: [],
      seperatorMerchantList: [],
    },
    // 提现分单模块
    seperate: {
      withdrawSeparateData: {
        list: [],
      },
      withdrawAccountList: [],
      statusConfimBatchData: [],
    },
    // 提现订单记录模块
    history: {
      withdrawRecordData: {
        list: [],
      },
    },
    // 提现相关设置模块
    setting: {
      findGeneralConfigData: {},
      findQuickConfigData: {},
      findRejectReasonData: [],
      findCommonConfigData: {},
      findProxyConfigData: {},
    },
    // 三方设置
    third: {
      merchantData: [],
      merchantAccountListData: {},
      ChannelStatus: false,
    },
  },

  effects: {
    *getWithdrawOperateList({ payload }, { call, put }) {
      const response = yield call(withdrawOperateList, payload);
      yield put({ type: 'setRechargeData', payload: response });
    },
    *getWithdrawSeperateList({ payload }, { call, put }) {
      const response = yield call(withdrawSeperateList, payload);
      // message.success(resMsg);
      yield put({ type: 'setWithdrawData', payload: response });
    },

    // --------------------提现分单设置-------------------------------------

    *setOrserTime({ payload, fn }, { call, put }) {
      const response = yield call(withdrawSetOrserTime, payload);
      if (response.code === CODE) {
        message.success(resMsg);
      }
      if (fn) {
        fn(response);
      }
    },

    *merchantAccountInuse({ payload, fn }, { call, put }) {
      const response = yield call(merchantAccountInuse, payload);
      if (response.code === CODE) {
        yield put({ type: 'setAccountInuseData', payload: response });
      }
    },

    *seperatorMerchantList({ payload, fn }, { call, put }) {
      const response = yield call(seperatorMerchantList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setSeperatorMerchantList', payload: response });
      }
    },

    *setCondition({ payload, fn }, { call, put }) {
      const response = yield call(withdrawSetCondition, payload);
      if (response.code === CODE) {
        yield put({ type: 'setConditionTabData', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *deleteCondition({ payload, fn }, { call, put }) {
      const response = yield call(conditionDelete, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *manageConditionUpdate({ payload, fn }, { call, put }) {
      const response = yield call(manageConditionUpdate, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *addAccount({ payload }, { call, put }) {
      const response = yield call(addAccount, payload);
      if (response.code === CODE) {
        message.success(resMsg);
      }
    },

    *getAccountList({ payload, fn }, { call, put }) {
      const response = yield call(accountList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setAccountListData', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *validateAccount({ payload, fn }, { call, put }) {
      const validateResponse = yield call(addAccountValidate, payload);
      if (validateResponse.code === CODE) {
        if (validateResponse.data.exitAccount) {
          message.error(`已经存在分单账号：${validateResponse.data.exitAccount.join()}`);
          // yield put({ type: 'setValidateAccount', payload: validateResponse });
        } else if (validateResponse.data.errorUser) {
          message.error(`不存在的账号：${validateResponse.data.errorUser.join()}`);
        } else if (fn) {
          fn();
        }
      }
    },

    *getConditionList({ payload }, { call, put }) {
      const response = yield call(conditionReview, payload);
      if (response.code === CODE) {
        yield put({ type: 'setConditionListData', payload: response });
      }
    },

    *getThirdNumList({ payload }, { call, put }) {
      const response = yield call(getThirdNum, payload);
      if (response.code === CODE) {
        yield put({ type: 'setThirdNumListData', payload: response });
      }
    },

    *doAccountSwitch({ payload, fn }, { call, put }) {
      const response = yield call(accountSwitch, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *doAccountDelete({ payload, fn }, { call, put }) {
      const response = yield call(accountDelete, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *getAutoList({ payload, fn }, { call, put }) {
      const response = yield call(getAutoList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setAutoListData', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *doAutoDelete({ payload, fn }, { call, put }) {
      const response = yield call(doAutoDelete, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *getLevelList({ payload }, { call, put }) {
      const response = yield call(getLevelList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setLevelListData', payload: response });
      }
    },

    *withdrawOverview({ payload, fn }, { call, put }) {
      const response = yield call(withdrawOverview, payload);
      if (response.code === CODE) {
        yield put({ type: 'setwithdrawOverviewData', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *conditionAutoSave({ payload, fn }, { call, put }) {
      const response = yield call(conditionAutoSave, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *doAutoUpdate({ payload, fn }, { call, put }) {
      const response = yield call(doAutoUpdate, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *manageConditionSave({ payload, fn }, { call, put }) {
      const response = yield call(manageConditionSave, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    // --------------------提现审核-------------------------------------

    *getCheckApprovalList({ payload, fn }, { call, put }) {
      const response = yield call(getCheckApprovalList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setCheckWithdrawList', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *approveReturn({ payload, fn }, { call, put }) {
      const response = yield call(approveReturn, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *withdrawStatusConfim({ payload }, { call, put }) {
      const response = yield call(withdrawStatusConfim, payload);
      if (response.code === CODE) {
        yield put({ type: 'setStatusConfimData', payload: response });
      }
    },

    // --------------------提现出款-------------------------------------

    *getWithdrawTransferData({ payload, fn }, { call, put }) {
      const response = yield call(getWithdrawTransferData, payload);
      if (response.code === CODE) {
        yield put({ type: 'setWithdrawTransferData', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *getAccountBalance({ payload, fn }, { call, put }) {
      const response = yield call(getAccountBalance, payload);
      if (response.code === CODE) {
        yield put({ type: 'setAccountBalance', payload: response });
      }
    },

    *withdrawBankList({ payload, fn }, { call, put }) {
      const response = yield call(withdrawBankList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setWithdrawBankListData', payload: response });
      }
    },

    *manageApprove({ payload, fn }, { call, put }) {
      const response = yield call(manageApprove, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *rejectReasonList({ payload, fn }, { call, put }) {
      const response = yield call(rejectReasonList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setRejectReasonList', payload: response });
      }
    },

    // --------------------提现分单-------------------------------------

    *getWithdrawSeparateData({ payload, fn }, { call, put }) {
      const response = yield call(getWithdrawSeparateData, payload);
      if (response.code === CODE) {
        yield put({ type: 'setWithdrawSeparateData', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *manageBatchSeperate({ payload, fn }, { call, put }) {
      const response = yield call(manageBatchSeperate, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *batchRecycling({ payload, fn }, { call, put }) {
      const response = yield call(batchRecycling, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *saveReturnBatch({ payload, fn }, { call, put }) {
      const response = yield call(saveReturnBatch, payload);
      if (response.code === CODE) {
        message.success(resMsg);
      }
    },

    *withdrawAccountList({ payload, fn }, { call, put }) {
      const response = yield call(withdrawAccountList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setWithdrawAccountList', payload: response });
      }
    },

    *manageAccountModify({ payload, fn }, { call, put }) {
      const response = yield call(manageAccountModify, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    // --------------------提现订单记录-------------------------------------

    *getWithdrawRecordData({ payload, fn }, { call, put }) {
      const response = yield call(getWithdrawRecordData, payload);
      if (response.code === CODE) {
        yield put({ type: 'setWithdrawRecordData', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *saveForceSuccess({ payload, fn }, { call, put }) {
      const response = yield call(saveForceSuccess, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *saveWithdrawReturn({ payload, fn }, { call, put }) {
      const response = yield call(saveWithdrawReturn, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *statusConfimBatch({ payload, fn }, { call, put }) {
      const response = yield call(statusConfimBatch, payload);
      if (response.code === CODE) {
        yield put({ type: 'setStatusConfimBatchData', payload: response });
        message.success(resMsg);
      }
    },

    // --------------------提现相关设置-------------------------------------

    *saveGeneralConfig({ payload, fn }, { call, put }) {
      const response = yield call(saveGeneralConfig, payload);
      if (response.code === CODE) {
        message.success(resMsg);
      }
      if (fn) {
        fn(response);
      }
    },

    *findTimingConfig({ payload, fn }, { call, put }) {
      const response = yield call(findTimingConfig, payload);
      if (response.code === CODE) {
        yield put({ type: 'setTimingConfig', payload: response });
      }
    },

    *saveQuickConfig({ payload, fn }, { call, put }) {
      const response = yield call(saveQuickConfig, payload);
      if (response.code === CODE) {
        message.success(resMsg);
      }
      if (fn) {
        fn(response);
      }
    },

    *findQuickConfig({ payload, fn }, { call, put }) {
      const response = yield call(findQuickConfig, payload);
      if (response.code === CODE) {
        yield put({ type: 'setFindQuickConfigData', payload: response });
      }
    },

    *saveRejectReason({ payload, fn }, { call, put }) {
      const response = yield call(saveRejectReason, payload);
      // if (response.code === CODE) {
      //   message.success(resMsg);
      // }
      if (fn) {
        fn(response);
      }
    },

    *findRejectReason({ payload, fn }, { call, put }) {
      const response = yield call(findRejectReason, payload);
      if (response.code === CODE) {
        yield put({ type: 'setFindRejectReasonData', payload: response });
      }
    },

    *saveCommonConfig({ payload, fn }, { call, put }) {
      const response = yield call(saveCommonConfig, payload);
      if (response.code === CODE) {
        message.success(resMsg);
      }
      if (fn) {
        fn(response);
      }
    },

    *findCommonConfig({ payload, fn }, { call, put }) {
      const response = yield call(findCommonConfig, payload);
      if (response.code === CODE) {
        yield put({ type: 'setFindCommonConfigData', payload: response });
      }
    },

    *findGeneralConfig({ payload, fn }, { call, put }) {
      const response = yield call(findGeneralConfig, payload);
      if (response.code === CODE) {
        yield put({ type: 'setFindGeneralConfigData', payload: response });
      }
    },

    *findProxyConfig({ payload, fn }, { call, put }) {
      const response = yield call(findProxyConfig, payload);
      if (response.code === CODE) {
        yield put({ type: 'setFindProxyConfigData', payload: response });
      }
    },

    *saveProxyConfig({ payload, fn }, { call, put }) {
      const response = yield call(saveProxyConfig, payload);
      if (response.code === CODE) {
        message.success(resMsg);
      }
      if (fn) {
        fn(response);
      }
    },

    // --------------------三方商户设置-------------------------------------

    *merchantList({ payload }, { call, put }) {
      const response = yield call(getMerchantList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setMerchantList', payload: response });
      }
    },

    *getChannelStatus({ payload }, { call, put }) {
      const response = yield call(getChannelStatus, payload);
      if (response.code === CODE) {
        yield put({ type: 'setChannelStatus', payload: response });
      }
    },

    *merchantAccountList({ payload, fn }, { call, put }) {
      const response = yield call(merchantAccountList, payload);
      if (response.code === CODE) {
        yield put({ type: 'setMerchantAccountListData', payload: response });
        if (fn) {
          fn(response.data);
        }
      }
    },

    *updateMerchantOpen({ payload, fn }, { call }) {
      const response = yield call(updateMerchantOpen, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *setChannelDisplay({ payload, fn }, { call }) {
      const response = yield call(setChannelDisplay, payload);
      if (response.code === CODE) {
        message.success(resMsg);
      }
    },

    *merchantAccountStatus({ payload, fn }, { call }) {
      const response = yield call(merchantAccountStatus, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *deleteMerchantAccount({ payload, fn }, { call }) {
      const response = yield call(deleteMerchantAccount, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *addMerchantAccount({ payload, fn }, { call }) {
      const response = yield call(addMerchantAccount, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },

    *updateMerchantAccount({ payload, fn }, { call }) {
      const response = yield call(updateMerchantAccount, payload);
      if (response.code === CODE) {
        message.success(resMsg);
        if (fn) {
          fn();
        }
      }
    },
  },

  reducers: {
    setWithdrawData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.withdrawSeperate.data = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setConditionTabData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.conditionTabData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setAccountListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.accountListData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setValidateAccount(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.validateAccountData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setConditionListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.conditionReviewData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setThirdNumListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.thirdNumData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setAutoListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.autoListData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setLevelListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.levelListData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setwithdrawOverviewData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.withdrawOverviewData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setCheckWithdrawList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.examine.checkApprovalList = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setWithdrawTransferData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.payment.withdrawTransferData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setWithdrawSeparateData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.seperate.withdrawSeparateData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setWithdrawRecordData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.history.withdrawRecordData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setStatusConfimData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.examine.statusConfimData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setWithdrawBankListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.payment.withdrawBankListData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setRejectReasonList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.payment.rejectReasonList = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setWithdrawAccountList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.seperate.withdrawAccountList = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setFindGeneralConfigData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.setting.findGeneralConfigData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setFindQuickConfigData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.setting.findQuickConfigData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setFindRejectReasonData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.setting.findRejectReasonData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setFindCommonConfigData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.setting.findCommonConfigData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setFindProxyConfigData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.setting.findProxyConfigData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setMerchantList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.third.merchantData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setMerchantAccountListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.third.merchantAccountListData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setChannelStatus(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.third.ChannelStatus = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setTimingConfig(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.orserSetting.timingConfig = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setAccountBalance(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.payment.accountBalanceData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setStatusConfimBatchData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.seperate.statusConfimBatchData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setAccountInuseData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.payment.accountInuseData = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
    setSeperatorMerchantList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.payment.seperatorMerchantList = payload.data;
      return {
        ...state,
        ...newState,
      };
    },
  },
};

export default Model;
