import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';

interface StateType {
  // 组建内state类型接口
  [propName: string]: any;
}

type Effect = (
  // 该类型定义Effect类型
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  // 定义模型类型接口
  namespace: string;
  state: StateType;
  effects: {
    [propName: string]: Effect;
  };
  reducers: {
    [propName: string]: Reducer<StateType>;
  };
}

interface FormDataType {
  [propName: string]: any;
}
