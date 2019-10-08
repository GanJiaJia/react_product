import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';
import { getColumnSearchProps } from '@/pages/finance/withdraw/utils';
import { checkPermission } from '@/utils/resolvePermission';

interface StateType {
  [propName: string]: any;
}

const withdrawStatusMap = {
  // '-3': '风险待审核',
  // '-2': '风险审核拒绝',
  0: '风险审核通过（待出款）',
  1: '出款成功',
  2: '拒绝出款（出款失败）',
  3: '申请退回中',
  4: '退回成功',
  5: '拒绝退回',
  6: '申请强制成功中',
  7: '自动出款失败',
  8: '通过强制成功',
  9: '拒绝强制成功',
  10: '三方自动出款中',
  11: '出款专员处理中',
};

const withdrawTypeMap = {
  0: '人工出款',
  2: '三方手动出款',
};

const formData = (obj: any) =>
  Object.keys(obj).map(key => ({
    text: obj[key],
    value: key,
  }));

export const getColumns1 = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: '提现时间',
      dataIndex: 'createDate',
      width: 130,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '提现单号',
      dataIndex: 'orderId',
      width: 130,
    },
    {
      title: '出款金额',
      dataIndex: 'amount',
      width: 150,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      width: 130,
      filters: formData(withdrawStatusMap),
      filterMultiple: false, // 是否多选
      render: status => <span>{withdrawStatusMap[status]}</span>,
    },
    {
      title: '账户名',
      dataIndex: 'username',
      width: 100,
    },
    {
      title: '出款方式',
      dataIndex: 'withdrawType',
      width: 150,
      filters: formData(withdrawTypeMap),
      filterMultiple: false, // 是否多选
      render: withdrawType => <span>{withdrawTypeMap[withdrawType]}</span>,
    },
    {
      title: '会员姓名',
      dataIndex: 'name',
      width: 130,
      ...getColumnSearchProps('name', self, '输入会员姓名'),
    },
    {
      title: '银行名称',
      dataIndex: 'bankName',
      width: 130,
    },
    {
      title: '银行卡号',
      dataIndex: 'cardNo',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 130,
    },
    {
      title: '操作时间',
      dataIndex: 'approveTime',
      width: 130,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      width: 100,
      key: 'tags',
      fixed: 'right',
      render: (_rowData: any) => {
        if (checkPermission(self.props.btns, 'new-finance-withdraw-transfer-do')) {
          return (
            <Button type="link" onClick={() => self.showPaymentOutModal(_rowData)}>
              出款
            </Button>
          );
        }
        return null;
      },
    },
  ];
  return columns;
};

export const getColumns2 = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: '提现时间',
      dataIndex: 'createDate',
      width: 130,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '提现单号',
      dataIndex: 'orderId',
      width: 130,
    },
    {
      title: '出款金额',
      dataIndex: 'amount',
      width: 150,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      width: 130,
      filters: formData(withdrawStatusMap),
      filterMultiple: false, // 是否多选
      render: status => <span>{withdrawStatusMap[status]}</span>,
    },
    {
      title: '账户名',
      dataIndex: 'username',
      width: 100,
    },
    {
      title: '出款方式',
      dataIndex: 'withdrawType',
      width: 150,
      filters: formData(withdrawTypeMap),
      filterMultiple: false, // 是否多选
      render: withdrawType => <span>{withdrawTypeMap[withdrawType]}</span>,
    },
    {
      title: '出款商户',
      dataIndex: 'merchant',
      width: 150,
    },
    {
      title: '会员姓名',
      dataIndex: 'name',
      width: 130,
      ...getColumnSearchProps('name', self, '输入会员姓名'),
    },
    {
      title: '银行名称',
      dataIndex: 'bankName',
      width: 130,
    },
    {
      title: '银行卡号',
      dataIndex: 'cardNo',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 130,
    },
    {
      title: '操作时间',
      dataIndex: 'approveTime',
      width: 130,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
  ];
  return columns;
};
