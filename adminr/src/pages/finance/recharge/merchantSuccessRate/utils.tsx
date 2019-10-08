import { ColumnProps } from 'antd/lib/table';
import { formatMessage } from 'umi-plugin-react/locale';
import { StateType } from '../utils';
import * as tools from '@/utils/tools';

// 三方商户成功率 - 列数据
export const getMerchantRateColumns = (self: any) => {
  // const { page, size } = self.state.payload;
  // const { list } = self.props.recharge.merchantSuccessRate;
  const columns: ColumnProps<StateType>[] = [
    // 排行
    {
      title: formatMessage({ id: 'merchant-success-rate.table.rank' }),
      key: 'merchant',
      render: (text, record, index) => index + 1,
      // const itemIndex = _.findIndex(list, (item: any) => {
      //   return item.channelId === record.channelId
      // })
      // return itemIndex + (page - 1) * size + 1;
      width: 70,
    },
    // 三方平台
    {
      title: formatMessage({ id: 'merchant-success-rate.table.third-platform' }),
      dataIndex: 'channelName',
      key: 'channelName',
      width: 200,
    },
    // 商户号
    {
      title: formatMessage({ id: 'merchant-success-rate.table.merchant-code' }),
      dataIndex: 'merchantCode',
      key: 'merchantCode',
    },
    // 今日剩余收款额度
    {
      title: formatMessage({ id: 'merchant-success-rate.table.remain-amount' }),
      dataIndex: 'leftAmount',
      key: 'leftAmount',
      render: text => (text < 0 ? tools.currency(0) : tools.currency(text)),
      width: 250,
    },
    // 充值成功率
    {
      title: formatMessage({ id: 'merchant-success-rate.table.recharge-success-rate' }),
      dataIndex: 'successRate',
      key: 'successRate',
      render: text => `${tools.currency(text / 100)}%`,
      width: 120,
    },
  ];
  return columns;
};
