import { Button, DatePicker, Form, Icon, Input, Spin, Table } from 'antd';
// import { getColumnSearchProps } from '@/pages/finance/withdraw/utils'
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';
import { withdrawStatusMap } from '@/pages/finance/withdraw/utils';

interface StateType {
  [propName: string]: any;
}
export const getColumns = (self: any) => {
  const withdrawTypeMap = {
    0: '人工打款',
    1: '自动出款',
    2: '三方手动出款',
  };

  const clientTypeMap = {
    0: 'PC',
    1: 'H5',
    2: '安卓',
    3: 'IOS',
  };
  const formData = (obj: any) =>
    Object.keys(obj).map(key => ({
      text: obj[key],
      value: key,
    }));
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
      title: '提现金额',
      dataIndex: 'amount',
      width: 150,
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      width: 150,
    },
    {
      title: '出款金额',
      width: 150,
      render: (text: any, rowData: any) => <span>{rowData.amount - rowData.fee}</span>,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      width: 130,
      render: key => <span>{withdrawStatusMap[key]}</span>,
    },
    {
      title: '账户名',
      dataIndex: 'username',
      width: 100,
    },
    {
      title: '提现类别',
      dataIndex: 'withdrawType',
      width: 150,
      filters: formData(withdrawTypeMap),
      filterMultiple: false, // 是否多选
      render: (text: any, rowData: any) => {
        if (+rowData.status !== -3) {
          return <span>{withdrawTypeMap[rowData.withdrawType]}</span>;
        }
        return '';
      },
    },
    {
      title: '出款商户',
      dataIndex: 'merchant',
      width: 130,
    },
    {
      title: '出款卡信息',
      width: 130,
      render: (text: any, rowData: any) => (
        <span>{`${rowData.transferBankName} ${rowData.transferBankCardNo} ${rowData.transferName}`}</span>
      ),
    },
    {
      title: '出款时间',
      dataIndex: 'approveTime',
      width: 100,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '终端类型',
      dataIndex: 'clientType',
      width: 100,
      filters: formData(clientTypeMap),
      filterMultiple: false, // 是否多选
      render: clientType => <span>{clientTypeMap[clientType]}</span>,
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (text: any, rowData: any) => (
        <Button
          type="link"
          onClick={() => {
            self.showDetailsModal(rowData);
          }}
        >
          详情
        </Button>
      ),
    },
  ];
  return columns;
};
