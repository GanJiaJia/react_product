import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';
import { withdrawStatusMap } from '@/pages/finance/withdraw/utils';
// import styles from './style.less';

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
  4: 'PAD',
};
export const getColumns1 = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '提现时间',
      dataIndex: 'createDate',
      width: 100,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '拆单关联号',
      dataIndex: 'batchNumber',
      width: 100,
    },
    {
      title: '提现订单号',
      dataIndex: 'orderId',
      width: 100,
    },
    {
      title: '提现类型',
      dataIndex: 'withdrawType',
      width: 100,
      render: key => <span>{withdrawTypeMap[key]}</span>,
    },
    {
      title: '出款商户',
      dataIndex: 'merchant',
      width: 100,
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      width: 100,
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      width: 100,
    },
    {
      title: '到账金额',
      width: 100,
      render: (text: any, rowData: any) => <span>{rowData.amount - rowData.fee}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: key => <span>{withdrawStatusMap[key]}</span>,
    },
  ];
  return columns;
};

export const getColumns3 = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '操作端',
      dataIndex: 'clientType',
      width: 100,
      render: clientType => <span>{clientTypeMap[clientType]}</span>,
    },
    {
      title: '提现出款时间',
      dataIndex: 'approveTime',
      width: 100,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '出款人',
      dataIndex: 'approver',
      width: 100,
    },
    {
      title: '处理时长',
      width: 100,
      render: (text: any, rowData: any) => {
        const start = moment(rowData.createDate).format('YY-MM-DD HH:mm:ss');
        const end = moment(rowData.approveTime).format('YY-MM-DD HH:mm:ss');
        const startTime = moment(start, 'YYYY-MM-DD HH:mm:ss');
        const endTime = moment(end, 'YYYY-MM-DD HH:mm:ss');
        const seconds = endTime.diff(startTime, 'seconds');
        const ss = seconds > 60 ? seconds % 60 : seconds;
        const mm: any = seconds > 60 ? Math.trunc(seconds / 60) % 60 : '00';
        const hh: any = mm > 60 ? Math.trunc(mm / 60) % 24 : '00';
        const dd = hh > 12 ? Math.trunc(hh / 24) : '00';
        if (dd === '00') {
          if (hh === '00') {
            return <span>{`${mm}分${ss}秒`}</span>;
          }
          return <span>{`${hh}小时${mm}分${ss}秒`}</span>;
        }
        return <span>{`${dd}天${hh}小时${mm}分${ss}秒`}</span>;
      },
    },
    {
      title: '分单人',
      dataIndex: 'seperator',
      width: 100,
    },
    {
      title: '分单时间',
      dataIndex: 'seperateDate',
      width: 100,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
  ];
  return columns;
};

export const getColumns2 = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '提现会员账号',
      dataIndex: 'username',
      width: 100,
    },
    {
      title: '收款银行',
      dataIndex: 'bankName',
      width: 100,
    },
    {
      title: '收款卡号',
      dataIndex: 'cardNo',
      width: 100,
    },
    {
      title: '收款人姓名',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '付款银行',
      dataIndex: 'transferBankName',
      width: 100,
    },
    {
      title: '付款卡号',
      dataIndex: 'transferBankCardNo',
      width: 100,
    },
    {
      title: '付款人姓名',
      dataIndex: 'transferName',
      width: 100,
    },
  ];
  return columns;
};
