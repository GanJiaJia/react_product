import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const workMap = {
  1: '早班',
  2: '中班',
  3: '晚班',
};

export const getColumns = (self: any) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '账户名',
      dataIndex: 'userName',
    },
    {
      title: '班次',
      dataIndex: 'work',
      render: work => <span>{workMap[work]}</span>,
    },
    {
      title: '条件',
      render: _rowData => {
        const { conditionId, conditionName } = _rowData;
        return (
          <a onClick={() => self.showConditionsModal(conditionId)}>
            {conditionId.length ? `${conditionName}等${conditionId.split(',').length}个条件` : ''}
          </a>
        );
      },
    },
    {
      title: '三方出款商户数',
      render: _rowData => (
        <a onClick={() => self.showThirdNumModal(_rowData.merchantId)}>{_rowData.merchantCount}</a>
      ),
    },
    {
      title: '添加时间',
      dataIndex: 'createDate',
      render: createDate => <span>{moment(createDate).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '添加人',
      dataIndex: 'creator',
    },
    {
      title: '修改时间',
      dataIndex: 'lastUpdate',
      render: lastUpdate =>
        lastUpdate && <span>{moment(lastUpdate).format('YY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '修改人',
      dataIndex: 'lastOperator',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: status => <span>{status ? '已开启' : '已关闭'}</span>,
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      key: 'tags',
      render: (_rowData, index) => {
        const renderStatusBtn = (word: any) => (
          <Button
            type="link"
            onClick={() => {
              if (_rowData.status) {
                self.showConfirmModal('close', _rowData.id);
              } else {
                self.showConfirmModal('open', _rowData.id);
              }
            }}
          >
            {word}
            {/* {_rowData.status ? '开启' : '关闭'} */}
          </Button>
        );
        let elementBtn = null;

        if (
          _rowData.status &&
          checkPermission(self.props.btns, 'new-finance-withdraw-separate-account-setting-open')
        ) {
          elementBtn = renderStatusBtn('关闭');
        }
        if (
          !_rowData.status &&
          checkPermission(self.props.btns, 'new-finance-withdraw-separate-account-setting-close')
        ) {
          elementBtn = renderStatusBtn('开启');
        }

        return (
          <div className={styles.tabelBtns}>
            {checkPermission(
              self.props.btns,
              'new-finance-withdraw-separate-account-setting-set',
            ) ? (
              <Button type="link" onClick={() => self.showSettingModal(_rowData)}>
                设置
              </Button>
            ) : null}

            {elementBtn}

            {checkPermission(
              self.props.btns,
              'new-finance-withdraw-separate-account-setting-delete',
            ) ? (
              <Button type="link" onClick={() => self.showConfirmModal('delete', _rowData.id)}>
                删除
              </Button>
            ) : null}

            {/* {checkPermission(
              self.props.btns,
              'new-finance-withdraw-separate-account-setting-update',
            ) ? (
              <Button type="link" onClick={() => {}}>
                修改
              </Button>
            ) : null} */}
          </div>
        );
      },
    },
  ];
  return columns;
};
