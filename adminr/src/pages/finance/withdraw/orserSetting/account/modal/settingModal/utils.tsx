import { ColumnProps } from 'antd/lib/table';
import React from 'react';

export const getColumns = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '出款商户',
      dataIndex: 'merchantName',
    },
    {
      title: '商户号',
      dataIndex: 'merchantCode',
    },
    {
      title: '账户可用余额',
      dataIndex: 'balance',
    },
  ];
  return columns;
};
