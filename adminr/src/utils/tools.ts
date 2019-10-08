import _ from 'lodash';
import { message } from 'antd';
import moment from 'moment';

/**
 * 初始化表单时间
 * data: 设置天数
 */
export function initialTimeWithMill() {
  return [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')];
}

// 金额格式格式转换
export function currency(value: any, symbol = '', decimals = 2, options?: any) {
  const digitsRE = /(\d{3})(?=\d)/g;
  options = options || {};
  value = parseFloat(value);
  if ((value === Infinity && value === -Infinity) || (!value && value !== 0)) return '';
  const thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ',';
  const symbolOnLeft = options.symbolOnLeft != null ? options.symbolOnLeft : true;
  const spaceBetweenAmountAndSymbol =
    options.spaceBetweenAmountAndSymbol != null ? options.spaceBetweenAmountAndSymbol : false;
  let stringified = _.floor(Math.abs(value), decimals).toFixed(decimals);
  if (options.type && options.type === 1) {
    // type 等于1表示进行四舍五入 2表示无条件进位  默认情况为无条件舍弃
    stringified = _.round(Math.abs(value), decimals).toFixed(decimals);
  } else if (options.type && options.type === 2) {
    stringified = _.ceil(Math.abs(value), decimals).toFixed(decimals);
  }

  stringified = options.decimalSeparator
    ? stringified.replace('.', options.decimalSeparator)
    : stringified;
  const intValue = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  const i = intValue.length % 3;
  const head = i > 0 ? intValue.slice(0, i) + (intValue.length > 3 ? thousandsSeparator : '') : '';
  const floatValue = decimals ? stringified.slice(-1 - decimals) : '';
  const symbolValue = symbolOnLeft ? `${symbol} ` : ` ${symbol}`;
  symbol = spaceBetweenAmountAndSymbol ? symbolValue : symbol;
  symbol = symbolOnLeft
    ? symbol + head + intValue.slice(i).replace(digitsRE, `$1${thousandsSeparator}`) + floatValue
    : head + intValue.slice(i).replace(digitsRE, `$1${thousandsSeparator}`) + floatValue + symbol;
  const sign = value < 0 ? '-' : '';
  return sign + symbol;
}

// 时间格式转换
export function toTime(timestamp: moment.Moment, format?: string) {
  if (!timestamp) {
    return '--';
  }
  return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD H:mm:ss') : timestamp;
}

// 处理接口请求数据，去除值为空的属性
export function handleSendData(sendData: any, format?: string) {
  const obj = { startTime: '', endTime: '' };
  const { time } = sendData;
  // console.log('sendData', sendData)

  if (time && time.length > 0) {
    obj.startTime = time[0].format(format || 'YYYY-MM-DD HH:mm:ss');
    obj.endTime = time[1].format(format || 'YYYY-MM-DD HH:mm:ss');
    delete sendData.time;
  } else {
    delete obj.startTime;
    delete obj.endTime;
  }

  _.forIn(sendData, (value, key) => {
    if (sendData[key] || sendData[key] === 0) {
      if (typeof value === 'string') {
        obj[key] = value.trim();
      } else {
        obj[key] = value;
      }
    }
  });
  return obj;
}

// 每页显示条数
export const setFunOnShowSizeChange = (self: any) => {
  self.onShowSizeChange = (current: number, size: number) => {
    const { payload } = self.state;
    self.setState({ payload: { ...payload, size } }, () => {
      self.bindEffects();
    });
  };
};

// 重置查询条件
export const setFunResetForm = (self: any) => {
  self.resetForm = () => {
    self.props.form.resetFields();
    self.setState({}, () => {
      self.bindEffects();
    });
  };
};

// 绑定effects发出请求
export const setFunBindEffects = (self: any, type: string, payload: any) => {
  self.bindEffects = () => {
    self.props.dispatch({
      type,
      // 请求参数
      payload,
    });
  };
};

// 表单提交
export const setFunHandleSubmit = (self: any, callback: Function) => {
  self.handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    self.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        callback(values);
      }
    });
  };
};

export const setFunSetStateAndDispatch = (self: any) => {
  self.setStateAndDispatch = (obj: object) => {
    self.setState(obj, () => {
      self.bindEffects();
    });
  };
};

export const setCommonFun = (target: any) =>
  class extends target {
    // 分页中控制表格显示条数的事件
    onShowSizeChange = (current: number, size: number) => {
      const data = { ...this.state.payload };
      data.page = current;
      data.size = size;
      this.setState({ payload: { ...data } }, () => {
        const { payload, tableFilters } = this.state;
        const params = this.setFiltersData(payload, tableFilters);
        this.bindEffects(params);
      });
    };

    // form重置按钮
    resetForm = () => {
      this.props.form.resetFields();
      this.setState({ payload: { size: 20, page: 1 } }, () => {
        const { payload, tableFilters } = this.state;
        const params = this.setFiltersData(payload, tableFilters);
        this.bindEffects(params);
      });
    };

    // 处理搜索数据
    setFiltersData = (payload: object, tableFilters?: object, params?: object) => {
      const obj = params || this.props.form.getFieldsValue();
      const data = tableFilters ? { ...payload, ...obj, ...tableFilters } : { ...payload, ...obj };
      return handleSendData(data);
    };

    // 更改state中请求参数，调用请求方法
    setStateAndDispatch = (obj: object) => {
      this.setState(obj, () => {
        const { payload, tableFilters } = this.state;
        const params = this.setFiltersData(payload, tableFilters);
        this.bindEffects(params);
      });
    };
  };

export function handleMessage(response: any, callback: Function) {
  if (response.code === 1) {
    message.success('保存成功');
  }
  if (callback) {
    callback();
  }
  //  else {
  //   message.error('保存失败');
  // }
}
