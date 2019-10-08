import { ColumnProps } from 'antd/lib/table';

export const getColumns = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '三方出款商户',
      dataIndex: 'channelName',
      width: 200,
    },
    {
      title: '商户号',
      dataIndex: 'merchantCode',
      width: 350,
    },
    {
      title: '三方账户余额',
      dataIndex: 'balance',
      width: 200,
    },
  ];
  return columns;
};
