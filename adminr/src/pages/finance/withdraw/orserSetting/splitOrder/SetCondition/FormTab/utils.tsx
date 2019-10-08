import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

export const getColumns = (self: any) => {
  const withdrawTypeMap = {
    0: '人工打款',
    1: '自动出款',
    2: '三方手动出款',
  };
  const columns: ColumnProps<any>[] = [
    {
      title: '名称',
      dataIndex: 'conditionName',
    },
    // {
    //   title: '账户类型',
    //   dataIndex: 'orderId',
    // },
    {
      title: '会员层级',
      render: _rowData => {
        const sign = _rowData.levelName.split(',').length >= _rowData.levelId.split(',').length;
        const len = _rowData.levelId.split(',').length;
        return (
          <a onClick={() => self.showLevelName(_rowData)}>
            {sign ? _rowData.levelName : `${_rowData.levelName}等${len}个层级`}
          </a>
        );
      },
    },
    {
      title: '金额区间值',
      render: (_rowData, index) => <span>{`${_rowData.minAmount} - ${_rowData.maxAmount}`}</span>,
    },
    {
      title: '出款方式',
      dataIndex: 'withdrawType',
      render: withdrawType => <span>{withdrawTypeMap[withdrawType]}</span>,
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      key: 'tags',
      render: (_rowData, index) => (
        <div className={styles.tabelBtns}>
          {checkPermission(self.props.btns, 'new-finance-withdraw-separate-setting-delete') ? (
            <button type="button" onClick={() => self.showDeleteModal(_rowData)}>
              删除
            </button>
          ) : null}
          {checkPermission(self.props.btns, 'new-finance-withdraw-separate-setting-update') ? (
            <button type="button" onClick={() => self.showEditModal(_rowData)}>
              修改
            </button>
          ) : null}
        </div>
      ),
    },
  ];
  return columns;
};
