import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';
import { withdrawStatusMap } from '@/pages/finance/withdraw/utils';

const withdrawTypeMap = {
  0: '人工打款',
  1: '自动出款',
  2: '三方手动出款',
};

export const getColumnsOne = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '提现时间',
      dataIndex: 'createTime',
      width: 100,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '提现单号',
      dataIndex: 'orderId',
      width: 100,
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      width: 100,
    },
    {
      title: '会员账户',
      dataIndex: 'username',
      width: 100,
    },
    {
      title: '提现类别',
      dataIndex: 'withdrawType',
      width: 100,
      render: key => <span>{withdrawTypeMap[key]}</span>,
    },
    {
      title: '提现状态',
      dataIndex: 'withdrawStatus',
      width: 100,
      render: key => <span>{withdrawStatusMap[key]}</span>,
    },
    {
      title: '申请原因',
      dataIndex: 'remark',
      width: 100,
    },
  ];
  return columns;
};

export const getColumnsTwo = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '提现时间',
      dataIndex: 'createTime',
      width: 100,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '提现单号',
      dataIndex: 'orderId',
      width: 100,
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      width: 100,
    },
    {
      title: '会员账户',
      dataIndex: 'username',
      width: 100,
    },
    {
      title: '提现类别',
      dataIndex: 'withdrawType',
      width: 100,
      render: key => <span>{withdrawTypeMap[key]}</span>,
    },
    {
      title: '提现状态',
      dataIndex: 'withdrawStatus',
      width: 100,
      render: key => <span>{withdrawStatusMap[key]}</span>,
    },
  ];
  return columns;
};
