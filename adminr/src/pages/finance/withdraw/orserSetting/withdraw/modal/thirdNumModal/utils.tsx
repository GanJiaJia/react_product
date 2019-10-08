import { ColumnProps } from 'antd/lib/table';

export const getColumns = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '三方出款商户',
      dataIndex: 'channelName',
    },
    {
      title: '商户号',
      dataIndex: 'merchantCode',
    },
    {
      title: '三方账户余额',
      dataIndex: 'openStatus',
    },
  ];
  return columns;
};
