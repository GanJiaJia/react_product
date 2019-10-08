import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';

// 该接口用于定义state类型接口

// import { EffectsCommandMap } from 'dva';
// import { AnyAction, Reducer } from 'redux';
// import { Effect, StateType, ModelType } from './modelType';

export interface StateType {
  [propName: string]: any;
}

// 该类型定义Effect类型
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

// 定义模型类型接口
export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    // rechargeDataEffect: Effect;
    // editRechargeDataEffect: Effect;
    // withdrawThirdEffect: Effect;
    // editWithdrawThirdEffect: Effect;
    [propName: string]: Effect;
  };
  reducers: {
    // setRechargeData: Reducer<StateType>;
    // setLoading: Reducer<StateType>;
    // setEditLoading: Reducer<StateType>;
    // setShowEdit: Reducer<StateType>;
    // setThirdData: Reducer<StateType>;
    // setThirdModal: Reducer<StateType>;
    [propName: string]: Reducer<StateType>;
  };
}
