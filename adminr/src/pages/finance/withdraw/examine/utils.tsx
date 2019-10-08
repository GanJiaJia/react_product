import { Button, DatePicker, Form, Icon, Input, Spin, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';
import { getColumnSearchProps } from '@/pages/finance/withdraw/utils';
import { checkPermission } from '@/utils/resolvePermission';

interface StateType {
  [propName: string]: any;
}
export const getColumns = (self: any) => {
  const withdrawStatusMap = {
    // '-3': '风险待审核',
    // '-2': '风险审核拒绝',
    // 0: '风险审核通过（待出款）',
    // 1: '出款成功',
    // 2: '拒绝出款（出款失败）',
    3: '申请退回中',
    4: '退回成功',
    5: '拒绝退回',
    6: '申请强制成功中',
    // 7: '自动出款失败',
    8: '通过强制成功',
    9: '拒绝强制成功',
    // 10: '三方自动出款中',
    // 11: '出款专员处理中（该状态不入库）',
  };
  const withdrawTypeMap = {
    0: '人工打款',
    1: '自动出款',
    2: '三方手动出款',
  };
  const statusMap = {
    0: '待审核',
    1: '审核通过',
    2: '审核拒绝',
  };
  const formData = (obj: any) =>
    Object.keys(obj).map(key => ({
      text: obj[key],
      value: key,
    }));
  const columns: ColumnProps<StateType>[] = [
    {
      title: '申请时间',
      dataIndex: 'createTime',
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
      dataIndex: 'withdrawStatus',
      width: 130,
      render: key => <span>{withdrawStatusMap[key]}</span>,
      filters: formData(withdrawStatusMap),
      filterMultiple: false, // 是否多选
    },
    {
      title: '账户名',
      dataIndex: 'username',
      width: 100,
      ...getColumnSearchProps('username', self, '输入账户名'),
    },
    {
      title: '出款方式',
      dataIndex: 'withdrawType',
      width: 150,
      filters: formData(withdrawTypeMap),
      filterMultiple: false, // 是否多选
      render: key => <span>{withdrawTypeMap[key]}</span>,
    },
    {
      title: '提现商户',
      dataIndex: 'merchant',
      width: 130,
    },
    {
      title: '申请人',
      dataIndex: 'creator',
      width: 130,
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      width: 100,
      render: type => <span>{type ? '强制成功' : '提现退回'}</span>,
    },
    {
      title: '申请备注',
      dataIndex: 'remark',
      width: 100,
    },
    {
      title: '审核人',
      dataIndex: 'approver',
      width: 130,
    },
    {
      title: '审核结果',
      dataIndex: 'status',
      width: 100,
      render: key => <span>{statusMap[key]}</span>,
    },
    {
      title: '审核时间',
      width: 100,
      fixed: 'right',
      render: (text: any, rowData: any) => {
        if (!rowData.status) {
          return checkPermission(self.props.btns, 'new-finance-withdraw-approval-do') ? (
            <Button
              type="primary"
              onClick={() => {
                self.showCheckModal(rowData);
              }}
            >
              审核
            </Button>
          ) : null;
        }
        if (rowData.approveTime) {
          return <span>{moment(rowData.approveTime).format('YY-MM-DD HH:mm:ss')}</span>;
        }
        return <span></span>;
      },
    },
  ];
  return columns;
};
