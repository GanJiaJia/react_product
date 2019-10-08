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
    0: '待出款',
    // 1: '出款成功',
    // 2: '拒绝出款（出款失败）',
    // 3: '申请退回中',
    // 4: '退回成功',
    // 5: '拒绝退回',
    // 6: '申请强制成功中',
    7: '自动出款失败',
    // 8: '通过强制成功',
    // 9: '拒绝强制成功',
    // 10: '三方自动出款中',
    // 11: '出款专员处理中（该状态不入库）',
  };
  const userTypeMap = {
    // 'null': '全部',
    0: '会员',
    1: '代理',
  };
  const withdrawTypeMap = {
    0: '人工打款',
    1: '自动出款',
    2: '三方手动出款',
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
      title: '出款金额',
      dataIndex: 'amount',
      width: 150,
    },
    {
      title: '账户名',
      dataIndex: 'username',
      width: 100,
      ...getColumnSearchProps('username', self, '请输入账户名'),
    },
    {
      title: '账户类型',
      dataIndex: 'userType',
      width: 100,
      filters: formData(userTypeMap),
      filterMultiple: false, // 是否多选
      render: key => <span>{userTypeMap[key]}</span>,
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
      title: '提现银行',
      dataIndex: 'bankName',
      width: 100,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      width: 130,
      render: key => <span>{withdrawStatusMap[key]}</span>,
      filters: formData(withdrawStatusMap),
      filterMultiple: false, // 是否多选
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 100,
    },
    {
      title: '分单状态',
      dataIndex: 'isSeparate',
      width: 130,
      render: isSeparate => <span>{isSeparate ? '已分单' : '未分单'}</span>,
    },
    {
      title: '分单给',
      dataIndex: 'seperator',
      width: 130,
      ...getColumnSearchProps('seperator', self),
    },
    {
      title: '未分单原因',
      dataIndex: 'seperateReason',
      width: 100,
    },
    {
      title: '分单时间',
      dataIndex: 'seperateDate',
      width: 130,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (text: any, rowData: any) => {
        const disabled =
          rowData.status === 5 ||
          rowData.status === 7 ||
          rowData.status === 9 ||
          rowData.status === 0;
        if (rowData.isSeparate) {
          return checkPermission(self.props.btns, 'new-finance-withdraw-separate-recovery') ? (
            <Button
              type="primary"
              disabled={!disabled}
              onClick={() => self.showRecoveryModal(rowData, 'radio')}
            >
              回收
            </Button>
          ) : null;
        }
        if (rowData.status !== 1 || rowData.status !== 3 || rowData.status !== 6) {
          return checkPermission(self.props.btns, 'new-finance-withdraw-separate-do') ? (
            <Button
              type="primary"
              disabled={!disabled}
              onClick={() => self.showSeperateModal(rowData, 'radio')}
            >
              分单
            </Button>
          ) : null;
        }
        return '';
      },
    },
  ];
  return columns;
};
