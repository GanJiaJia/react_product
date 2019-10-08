import { ColumnProps } from 'antd/lib/table';
import React from 'react';
// import styles from './style.less';

const withdrawTypeMap = {
  1: '三方自动出款',
  2: '三方手动出款',
  0: '人工出款',
};

export const getColumns = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '条件名称',
      dataIndex: 'conditionName',
    },
    {
      title: '金额区间',
      render: _rowData => <span>{`${_rowData.minAmount} - ${_rowData.maxAmount}`}</span>,
    },
    {
      title: '提现类型',
      dataIndex: 'withdrawType',
      render: withdrawType => <span>{withdrawTypeMap[withdrawType]}</span>,
    },
  ];
  return columns;
};
