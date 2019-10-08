import { ModelType } from '@/common-typings';
import { checkIsWarn } from '../components/GlobalHeader/service';
import types from '@/const/constType';

const { CODE } = types;

const Model: ModelType = {
  namespace: 'amountWarn',
  state: {
    warnData: {},
  },

  effects: {
    // 资管-资金调整表格数据
    *checkIsWarnEffect({ payload, fn }, { call, put }) {
      const res = yield call(checkIsWarn, payload);
      if (res.code === CODE) {
        const { data } = res;
        yield put({ type: 'setCheckWarnData', payload: data });
        if (fn) {
          fn(data);
        }
      }
    },
  },

  reducers: {
    // 资管-资金调整
    setCheckWarnData(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.warnData = payload;
      return {
        ...state,
        ...newState,
      };
    },
  },
};
export default Model;
