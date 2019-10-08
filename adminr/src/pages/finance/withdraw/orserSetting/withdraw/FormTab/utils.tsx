import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

export const getColumns = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '名称',
      dataIndex: 'conditionName',
    },
    {
      title: '会员层级',
      render: _rowData => <a onClick={() => self.showLevelName(_rowData)}>{_rowData.levelName}</a>,
    },
    {
      title: '金额区间值',
      render: _ => <span>{`${_.minAmount}-${_.maxAmount}`}</span>,
    },
    {
      title: '出款商户数',
      render: _ => <span>{_.merchantId ? _.merchantId.split(',').length : null}</span>,
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
          {checkPermission(
            self.props.btns,
            'new-finance-withdraw-separate-automatic-setting-delete',
          ) ? (
            <button type="button" onClick={() => self.showDeleteModal(_rowData)}>
              删除
            </button>
          ) : null}
          {checkPermission(
            self.props.btns,
            'new-finance-withdraw-separate-automatic-setting-update',
          ) ? (
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
