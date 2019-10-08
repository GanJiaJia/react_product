import _ from 'lodash';
import { RECHARGE_TRANSFER_TYPE_NAMES, RECHARGE_TYPE } from './data';

export interface StateType {
  [propName: string]: any;
}

// 补单审核 - 充值类型
export function toRechargeStatus(val: number): string {
  const obj = _.find(RECHARGE_TYPE, { value: val });
  return obj ? obj.title : '-';
}

export function toPaymentType(val: number): string {
  const obj = _.find(RECHARGE_TRANSFER_TYPE_NAMES, { value: val });
  return obj ? obj.title : '-';
}

// 补单审核 - 状态
export function toStatus(val: number): string {
  let str = '';
  switch (val) {
    case 0:
      str = '待审核';
      break;
    case 1:
    case 3:
    case 4:
      str = '审核通过';
      break;
    case 2:
      str = '审核拒绝';
      break;
    default:
      break;
  }
  return str;
}

export function toMerchantStatus(val: number): string {
  switch (val) {
    case 0:
      return '待处理';
    case 1:
      return '成功';
    default:
      return '';
  }
}

// 补单操作 - 状态
export function toRepairStatus(rowData: any): string {
  const { status, subStatus } = rowData;
  let statusName = '';
  switch (status) {
    case 0:
      statusName = '待支付';
      break;
    case 1:
      if (subStatus === 1) {
        statusName = '支付成功';
      } else if (subStatus === 2) {
        statusName = '补单审核成功';
      } else {
        statusName = '支付成功';
      }
      break;
    case 2:
      if (subStatus === 6) {
        statusName = '超时撤销';
      } else if (subStatus === 5) {
        statusName = '用户撤销';
      } else if (subStatus === 4) {
        statusName = '人工拒绝补单';
      } else if (subStatus === 3) {
        statusName = '补单审核拒绝';
      } else {
        statusName = '支付失败';
      }
      break;
    case 3:
      if (subStatus === 2) {
        statusName = '补单审核成功';
      } else if (subStatus === 5) {
        statusName = '用户撤销';
      } else if (subStatus === 6) {
        statusName = '超时撤销';
      } else {
        statusName = '补单审核中';
      }
      break;
    case 4:
      statusName = '处理中';
      break;
    default:
      break;
  }
  return statusName;
}

// 补单操作 - 详情 - 判断是否可以操作审核
export const checkShowOpt = (rowData: any): boolean => {
  const { subStatus, status } = rowData;
  return (
    subStatus === 4 ||
    subStatus === 5 ||
    subStatus === 6 ||
    (status === 2 && ![2, 3].includes(subStatus)) ||
    status === 0
  );
};

// 处理表头筛选项数据
export function getTableFiltersData(data: any): object {
  const obj = {};
  const keys = Object.keys(data);
  _.each(keys, item => {
    obj[item] = data[item].join(',');
  });
  return obj;
}

// 延时关闭弹窗
export function setTimeoutClose(cb: Function): void {
  setTimeout(() => {
    cb();
  }, 500);
}

export function spliceStr(list: any[], value: any) {
  const index = _.findIndex(list, (item: object) => item === value);
  list.splice(index, 1);
}

// 处理订单状态
export function setOrderStatus(
  firstValue: string,
  secondValue: string,
  subStatus: string,
  params: any,
) {
  const firstFlag = subStatus.indexOf(firstValue) > -1;
  const secondFlag = subStatus.indexOf(secondValue) > -1;

  // 如果subStatus中存在需要处理的状态
  if (firstFlag || secondFlag) {
    if (firstFlag && secondFlag) {
      const subStatusList = subStatus.split(',');
      spliceStr(subStatusList, firstValue);
      spliceStr(subStatusList, secondValue);
      params.subStatus = subStatusList.join(',');
      params.status = `${firstValue},3`;
    } else {
      const statusValue = firstFlag ? firstValue : '3';
      if (subStatus.length > 1) {
        const subStatusList = subStatus.split(',');
        spliceStr(subStatusList, firstFlag ? firstValue : secondValue);
        params.subStatus = subStatusList.join(',');
      }
      if (subStatus === firstValue || subStatus === secondValue) {
        delete params.subStatus;
      }
      params.status = `-2,${statusValue}`;
    }
  }

  // 支付成功状态(status = 2), 补单审核成功(subStatus = 2)，两者值冲突
  // 补单审核成功值改为8，请求时处理为subStatus = 2
  if (params.subStatus) {
    params.subStatus = params.subStatus.replace(/8/, '2');
  }

  return params;
}

// 处理status 、 subStatus
export function setStatusData(params: any) {
  // 7: 补单审核中 --> status: 3
  // 8: 待支付 --> status: 0
  // 9: 支付成功 --> status: 1
  // 10: 支付失败 --> status: 2
  // 11: 处理中 --> status: 4
  const statusTransList = [
    { title: '7', value: '3' },
    { title: '8', value: '0' },
    { title: '9', value: '1' },
    { title: '10', value: '2' },
    { title: '11', value: '4' },
    { title: '12', value: '0' },
  ];
  let subStatusList: any[] = [];
  const { subStatus } = params;
  const statusList: string[] = [];
  if (subStatus) {
    subStatusList = subStatus.split(',');
  }
  statusTransList.forEach((item: { title: string; value: string }) => {
    if (subStatus && subStatus.indexOf(item.title) > -1) {
      const index = _.findIndex(subStatusList, i => i === item.title);
      subStatusList.splice(index, 1);
      statusList.push(item.value);
    }
  });
  if (statusList.length === 1) {
    params.status = statusList.join(',');
  }

  params.status = statusList.length === 1 ? `${statusList['0']}` : statusList.join(',');
  params.subStatus = subStatusList.join(',');
  return params;
}
