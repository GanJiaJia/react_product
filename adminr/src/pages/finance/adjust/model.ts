import { notification } from 'antd';
import {
  adjustAdjustmentData,
  adjustmentCreatorData,
  adjustmentFirstCheckData,
  adjustmentFirstListData,
  adjustmentSecondCheckData,
  adjustmentSecondListData,
  excelExportData,
  getAdjustmentData,
} from './service';

// import { message } from 'antd';
import { ModelType } from '@/common-typings';
import types from '@/const/constType';

const { CODE } = types;

const creatorList: any = sessionStorage.getItem('creatorList')
  ? sessionStorage.getItem('creatorList')
  : JSON.stringify([]);
const firstCheckerList: any = sessionStorage.getItem('firstCheckerList')
  ? sessionStorage.getItem('firstCheckerList')
  : JSON.stringify([]);
const secondCheckerList: any = sessionStorage.getItem('secondCheckerList')
  ? sessionStorage.getItem('secondCheckerList')
  : JSON.stringify([]);

const Model: ModelType = {
  namespace: 'adjust',
  state: {
    adjustmentData: {
      list: [],
    },
    creatorList: JSON.parse(creatorList),
    firstCheckerList: JSON.parse(firstCheckerList),
    secondCheckerList: JSON.parse(secondCheckerList),
  },

  effects: {
    // 资管-资金调整表格数据
    *adjustmentEffect({ payload, fn }, { call, put }) {
      const response = yield call(getAdjustmentData, payload);
      const { data } = response;
      yield put({ type: 'setAdjustmentData', payload: data });
      if (fn) {
        fn(data);
      }
    },
    // 资管-资金调整申请
    *adjustAdjustmentEffect({ payload, fn }, { call, put }) {
      const res = yield call(adjustAdjustmentData, payload);
      if (res.code === CODE) {
        if (res.data.invalid.length <= 0 && res.data.failList.length <= 0) {
          notification.success({ message: '操作成功', description: '' });
        }
        if (fn) {
          fn(res);
        }
      }
    },

    // 一审
    *adjustmentFirstCheckEffect({ payload, fn }, { call, put }) {
      const res = yield call(adjustmentFirstCheckData, payload);
      if (res.code === CODE) {
        notification.success({ message: '操作成功', description: '' });
      }
      if (fn) {
        fn(res);
      }
    },

    // 二审
    *adjustmentSecondCheckEffect({ payload, fn }, { call, put }) {
      const res = yield call(adjustmentSecondCheckData, payload);
      if (res.code === CODE) {
        notification.success({ message: '操作成功', description: '' });
      }
      if (fn) {
        fn(res);
      }
    },

    // 申请人列表
    *adjustmentCreatorEffect({ payload, fn }, { call, put, select }) {
      const oldCreatorList = yield select((state: any) => state.adjust.creatorList);
      // console.log(oldCreatorList);
      if (oldCreatorList.toString()) {
        yield put({ type: 'setCreatorListData', payload: oldCreatorList });
        return;
      }
      const res = yield call(adjustmentCreatorData, payload);
      // console.log(res);
      if (res.code === CODE) {
        sessionStorage.setItem('creatorList', JSON.stringify(res.data));
        yield put({ type: 'setCreatorListData', payload: res.data });
      }
    },

    // 一审人列表
    *adjustmentFirstListEffect({ payload, fn }, { call, put, select }) {
      const oldFirstCheckerList = yield select((state: any) => state.adjust.firstCheckerList);
      if (oldFirstCheckerList.toString()) {
        yield put({ type: 'setFirstCheckerListData', payload: oldFirstCheckerList });
        return;
      }
      const res = yield call(adjustmentFirstListData, payload);
      if (res.code === CODE) {
        sessionStorage.setItem('firstCheckerList', JSON.stringify(res.data));
        yield put({ type: 'setFirstCheckerListData', payload: res.data });
      }
    },

    // 二审人列表
    *adjustmentSecondListEffect({ payload, fn }, { call, put, select }) {
      const oldSecondCheckerList = yield select((state: any) => state.adjust.secondCheckerList);
      if (oldSecondCheckerList.toString()) {
        yield put({ type: 'setSecondCheckerListData', payload: oldSecondCheckerList });
        return;
      }
      const res = yield call(adjustmentSecondListData, payload);
      if (res.code === CODE) {
        sessionStorage.setItem('secondCheckerList', JSON.stringify(res.data));
        yield put({ type: 'setSecondCheckerListData', payload: res.data });
      }
    },
    // 导出
    *excelExportEffect({ payload, fn }, { call, put, select }) {
      const res = yield call(excelExportData, payload);
      if (res.code === CODE) {
        if (fn) {
          fn(res.data);
        }
        window.location.href = res.data;
      }
    },
  },

  reducers: {
    // 资管-资金调整
    setAdjustmentData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      if (payload && payload.list) {
        newState.adjustmentData = payload;
      } else {
        newState.adjustmentData = {
          list: [],
        };
      }
      return {
        ...state,
        ...newState,
      };
    },

    // 资管-申请人列表
    setCreatorListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.creatorList = payload;
      return {
        ...state,
        ...newState,
      };
    },
    // 资管- 一审人列表
    setFirstCheckerListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.firstCheckerList = payload;
      return {
        ...state,
        ...newState,
      };
    },
    // 资管- 二审人列表
    setSecondCheckerListData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.secondCheckerList = payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
};

export default Model;
