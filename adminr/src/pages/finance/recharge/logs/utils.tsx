import React, { CSSProperties, ReactNode } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { formatMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';
import { StateType, toRechargeStatus, toRepairStatus, toPaymentType } from '../utils';
import * as tools from '@/utils/tools';
import { LOG_STATUS, REMARK_STATUS } from '../data';

// 充值记录 - 列数据
export const getLogsColumns = (self: any) => {
  const { merchantList } = self.state;
  const merchantListData = merchantList.map((item: any) => ({
    text: item.channelName,
    value: item.channelId,
  }));

  const { subStatus, limitType } = self.state.tableFilters;
  const limitTypeData = limitType ? [limitType] : ['-1'];
  // const subStatusData = subStatus ? [subStatus] : ['0,1,2,3,4,5,6,7'];

  let subStatusData = [];
  if (typeof subStatus === 'string') {
    subStatusData = subStatus.split(',');
  } else {
    subStatusData = subStatus;
  }

  const btnStyle: CSSProperties = {
    textAlign: 'center',
    wordBreak: 'break-all',
  };

  const columns: ColumnProps<StateType>[] = [
    // 充值时间
    {
      title: formatMessage({ id: 'recharge-logs.table.recharge-time' }),
      dataIndex: 'createDate',
      key: 'createDate',
      width: 120,
      render: text => tools.toTime(text),
    },
    // 充值单号
    {
      title: formatMessage({ id: 'recharge-logs.table.order-id' }),
      dataIndex: 'orderId',
      key: 'orderId',
      width: 200,
    },
    // 充值金额
    {
      title: formatMessage({ id: 'recharge-logs.table.recharge-amount' }),
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: text => tools.currency(text),
    },
    // 到账金额
    {
      title: formatMessage({ id: 'recharge-logs.table.arrival-amount' }),
      dataIndex: 'payAmount',
      key: 'payAmount',
      width: 120,
      render: text => tools.currency(text),
    },
    // 账户名
    {
      title: formatMessage({ id: 'recharge-logs.table.account-name' }),
      dataIndex: 'username',
      key: 'username',
      width: 90,
    },
    // 充值类型
    // {
    //   title: formatMessage({ id: 'recharge-logs.table.recharge-type' }),
    //   dataIndex: 'limitType',
    //   width: 120,
    //   render: text => toRechargeStatus(text),
    //   filters: [
    //     { text: '全部', value: '-1' },
    //     { text: '普通存款', value: '0' },
    //     { text: '大额存款', value: '1' },
    //   ],
    //   filterMultiple: false,
    //   filteredValue: limitTypeData,
    // },
    // 充值方式
    {
      title: '充值方式',
      dataIndex: 'paymentId',
      key: 'paymentId',
      width: 90,
      render: text => toPaymentType(text),
    },
    // 充值商户
    {
      title: formatMessage({ id: 'recharge-logs.table.recharge-merchant' }),
      dataIndex: 'merchant',
      width: 120,
      render: (text, record) => record.merchantName,
      filters: merchantListData,
      filterMultiple: false,
    },
    // 商户ID
    {
      title: formatMessage({ id: 'recharge-logs.table.merchant-id' }),
      dataIndex: 'merchantCode',
      key: 'merchantCode',
      width: 100,
    },
    // 订单状态
    {
      title: formatMessage({ id: 'recharge-logs.table.order-status' }),
      dataIndex: 'subStatus',
      key: 'subStatus',
      width: 120,
      render: (text, record) => toRepairStatus(record),
      filters: LOG_STATUS,
      // filterMultiple: false,
      filteredValue: subStatusData,
    },
    // 到账时间
    {
      title: formatMessage({ id: 'recharge-logs.table.arrival-time' }),
      dataIndex: 'payTime',
      key: 'payTime',
      width: 120,
      render: text => tools.toTime(text),
    },
    // 收款银行
    {
      title: formatMessage({ id: 'recharge-logs.table.arrival-bank' }),
      dataIndex: 'bankName',
      key: 'bankName',
      width: 90,
    },
    // 收款卡
    {
      title: formatMessage({ id: 'recharge-logs.table.arrival-bank-card' }),
      dataIndex: 'cardNo',
      key: 'cardNo',
      width: 120,
    },
    // 收款人
    {
      title: formatMessage({ id: 'recharge-logs.table.arrival-person' }),
      dataIndex: 'cardUsername',
      key: 'cardUsername',
      width: 90,
    },
    // 付款银行
    {
      title: formatMessage({ id: 'recharge-logs.table.payment-bank' }), // 拿不到
      dataIndex: '2',
      key: '2',
      width: 90,
    },
    // 付款卡
    {
      title: formatMessage({ id: 'recharge-logs.table.payment-bank-card' }),
      dataIndex: 'remark',
      key: 'remark',
      width: 130,
    },
    // 付款人
    {
      title: formatMessage({ id: 'recharge-logs.table.payment-person' }),
      dataIndex: 'fromUser',
      key: 'fromUser',
      width: 90,
      render: (text, record) => (record.keyword && record.keyword.split('|')[0]) || '',
    },
    // 附言
    {
      title: formatMessage({ id: 'recharge-logs.table.post-message' }),
      dataIndex: 'keyword',
      key: 'keyword',
      width: 130,
    },
    // 备注
    {
      title: formatMessage({ id: 'recharge-logs.table.remark' }),
      dataIndex: 'remarkType',
      key: 'remarkType',
      render: (text, record) => record.newRemark,
      filters: REMARK_STATUS,
      filterMultiple: false,
    },
    // 操作
    {
      title: formatMessage({ id: 'recharge-logs.table.operation' }),
      dataIndex: 'opt',
      key: 'opt',
      width: 150,
      fixed: 'right',
      render: (text, record): ReactNode => (
        // 详情
        <div
          style={btnStyle}
          onClick={() => {
            self.setState({
              rowData: record,
              detailDialogVisible: true,
            });
          }}
        >
          <span style={{ color: '#1890FF', cursor: 'pointer' }}>
            {formatMessage({ id: 'recharge-logs.table.detail' })}
          </span>
        </div>
      ),
    },
  ];
  return columns;
};
