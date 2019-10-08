import { Button, DatePicker, Form, Icon, Input, Spin, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';
import { checkPermission } from '@/utils/resolvePermission';

interface StateType {
  [propName: string]: any;
}
export const getColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: '三方平台',
      dataIndex: 'channelName',
      width: 100,
    },
    {
      title: '商户号',
      dataIndex: 'merchantCode',
      width: 100,
    },
    {
      title: '每日入款上限',
      dataIndex: 'dailyLimit',
      width: 100,
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastUpdate',
      width: 100,
      render: time => time && <span>{moment(time).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      width: 100,
      render: status => <span>{status ? '已下架' : '已上架'}</span>,
    },
    {
      title: '开启状态',
      dataIndex: 'openStatus',
      width: 100,
      render: openStatus => <span>{openStatus ? '已关闭' : '已开启'}</span>,
    },

    {
      title: '操作',
      // fixed: 'right',
      width: 180,
      render: (text: any, rowData: any) => {
        const renderUpDown = (word: any) => (
          <Button type="link" onClick={() => self.handleRowOff(rowData)}>
            {/* {rowData.status ? '上架' : '下架'} */}
            {word}
          </Button>
        );
        const renderStatus = (word: any) => (
          <Button type="link" onClick={() => self.handleRowOpen(rowData)}>
            {word}
          </Button>
        );

        let eleUpDown: any = null;
        let eleStatus: any = null;
        if (
          rowData.status &&
          checkPermission(self.props.btns, 'new-finance-withdraw-merchant-setting-up')
        ) {
          eleUpDown = renderUpDown('上架');
        }
        if (
          !rowData.status &&
          checkPermission(self.props.btns, 'new-finance-withdraw-merchant-setting-down')
        ) {
          eleUpDown = renderUpDown('下架');
        }
        if (
          rowData.openStatus &&
          checkPermission(self.props.btns, 'new-finance-withdraw-merchant-setting-enable')
        ) {
          eleStatus = renderStatus('开启');
        }
        if (
          !rowData.openStatus &&
          checkPermission(self.props.btns, 'new-finance-withdraw-merchant-setting-disable')
        ) {
          eleStatus = renderStatus('关闭');
        }
        return (
          <span>
            {eleUpDown}
            {checkPermission(self.props.btns, 'new-finance-withdraw-merchant-setting-edit') ? (
              <Button type="link" onClick={() => self.handleRowEdit(rowData)}>
                编辑
              </Button>
            ) : null}

            {checkPermission(self.props.btns, 'new-finance-withdraw-merchant-setting-delete') ? (
              <Button type="link" onClick={() => self.handleDelete(rowData)}>
                删除
              </Button>
            ) : null}
            {eleStatus}
          </span>
        );
      },
    },
  ];
  return columns;
};
