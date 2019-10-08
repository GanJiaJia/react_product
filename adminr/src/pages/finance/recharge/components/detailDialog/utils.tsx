import { ColumnProps } from 'antd/lib/table';
import _ from 'lodash';
import * as tools from '@/utils/tools';
import { toRechargeStatus, toPaymentType, toRepairStatus } from '@/pages/finance/recharge/utils';
import { DEVICE_TYPE } from '@/pages/finance/recharge/data';

interface StateType {
  [propName: string]: any;
}

// 系统订单表格列
export const getLogsBasicColumns = () => {
  const columns: ColumnProps<StateType>[] = [
    // 充值时间
    {
      title: '充值时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 120,
      render: text => tools.toTime(text),
    },
    // 订单号
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 120,
    },
    // 充值类型
    {
      title: '充值类型',
      dataIndex: 'limitType',
      key: 'limitType',
      width: 120,
      render: text => toRechargeStatus(text),
    },
    // 充值方式
    {
      title: '充值方式',
      dataIndex: 'paymentId',
      key: 'paymentId',
      width: 120,
      render: text => toPaymentType(text),
    },
    // 支付商户号
    {
      title: '支付商户号',
      dataIndex: 'merchantCode',
      key: 'merchantCode',
      width: 120,
    },
    // 充值金额
    {
      title: '充值金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: text => tools.currency(text),
    },
    // 手续费
    {
      title: '手续费',
      dataIndex: 'fee',
      key: 'fee',
      width: 120,
      render: text => tools.currency(text),
    },
    // 到账金额
    {
      title: '到账金额',
      dataIndex: 'payAmount',
      key: 'payAmount',
      width: 120,
      render: text => tools.currency(text),
    },
    // 状态
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (text, record) => toRepairStatus(record),
    },
  ];
  return columns;
};

// 收付款人信息表格列
export const getLogsPersonColumns = () => {
  const columns: ColumnProps<StateType>[] = [
    // 付款会员账户
    {
      title: '付款会员账户',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    // 收款银行
    {
      title: '收款银行',
      dataIndex: 'bankName',
      key: 'bankName',
      width: 120,
    },
    // 收款卡号
    {
      title: '收款卡号',
      dataIndex: 'cardNo',
      key: 'cardNo',
    },
    // 收款人姓名
    {
      title: '收款人姓名',
      dataIndex: 'cardUsername',
      key: 'cardUsername',
      width: 120,
    },
    // 付款银行
    {
      title: '付款银行',
      dataIndex: 'bankName1',
      key: 'bankName1',
      width: 120,
    },
    // 付款卡号
    {
      title: '付款卡号',
      dataIndex: 'remark',
      key: 'remark',
      width: 120,
    },
    // 付款人姓名
    {
      title: '付款人姓名',
      dataIndex: 'keyword',
      key: 'keyword',
      width: 120,
      render: text => (text && text.split('|')['0']) || '',
    },
  ];
  return columns;
};

// 其他信息表格列
export const getLogsOtherColumns = () => {
  const columns: ColumnProps<StateType>[] = [
    // 充值操作端
    {
      title: '充值操作端',
      dataIndex: 'clientType',
      key: 'clientType',
      render: text => {
        const obj = _.find(DEVICE_TYPE, { value: text });
        return obj ? obj.title : '';
      },
    },
    // 补单时间
    {
      title: '补单时间',
      dataIndex: 'sucReqTime',
      key: 'sucReqTime',
      render: text => tools.toTime(text),
    },
    // 补单人
    {
      title: '补单人',
      dataIndex: 'sucApvOperator',
      key: 'sucApvOperator',
    },
    // 补单金额
    {
      title: '补单金额',
      dataIndex: 'sucReqAmount',
      key: 'sucReqAmount',
      render: text => tools.currency(text),
    },
  ];
  return columns;
};
