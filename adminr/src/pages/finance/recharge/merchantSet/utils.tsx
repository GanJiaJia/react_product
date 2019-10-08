import React, { Fragment, CSSProperties } from 'react';
import { ColumnProps } from 'antd/lib/table';
import _ from 'lodash';
import { formatMessage } from 'umi-plugin-react/locale';
import { StateType } from '../utils';
import * as tools from '@/utils/tools';
import { SWITCH_STATUS, STATUS_CLOSE } from '../data';
import { checkPermission } from '@/utils/resolvePermission';

// 三方商户设置 - 列数据
export const getMerchantSetColumns = (self: any) => {
  const style: CSSProperties = {
    margin: '0 0 0 15px',
    padding: 0,
  };
  const btnStyle: CSSProperties = {
    cursor: 'pointer',
    color: '#1890FF',
    wordBreak: 'break-all',
  };
  const columns: ColumnProps<StateType>[] = [
    // 三方平台
    {
      title: formatMessage({ id: 'merchant-set.table-merchant' }),
      dataIndex: 'channelName',
      key: 'channelName',
      width: 180,
    },
    // 商户号
    {
      title: formatMessage({ id: 'merchant-set.table-merchant-code' }),
      dataIndex: 'merchantCode',
      key: 'merchantCode',
    },
    // 每日入款上限
    {
      title: formatMessage({ id: 'merchant-set.table-day-limit' }),
      dataIndex: 'dailyLimit',
      key: 'dailyLimit',
      width: 130,
      render: text => tools.currency(text),
    },
    // 最后修改时间
    {
      title: formatMessage({ id: 'merchant-set.table-last-time' }),
      dataIndex: 'lastUpdate',
      key: 'dailylastUpdateLimit',
      width: 200,
      render: text => tools.toTime(text),
    },
    // 开启状态
    {
      title: formatMessage({ id: 'merchant-set.table-open-status' }),
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: text => {
        const obj = _.find(SWITCH_STATUS, { value: text });
        return obj ? obj.title : '';
      },
    },
    // 操作
    {
      title: formatMessage({ id: 'merchant-set.table-opt' }),
      dataIndex: 'opt',
      key: 'opt',
      width: 200,
      render: (text, record) => {
        const { status } = record;
        const renderStatus = (word: any) => (
          <span
            style={{ ...style, margin: '0', padding: '0', ...btnStyle }}
            onClick={() => {
              self.setState({
                rowData: record,
                statusDialogVisible: true,
              });
            }}
          >
            {word}
          </span>
        );
        let eleStatus: any = null;
        if (
          status === STATUS_CLOSE &&
          checkPermission(self.props.btns, 'new-finance-recharge-merchant-set-enable')
        ) {
          // 开启
          eleStatus = renderStatus(formatMessage({ id: 'merchant-set.switch-open-status' }));
        }
        if (
          status !== STATUS_CLOSE &&
          checkPermission(self.props.btns, 'new-finance-recharge-merchant-set-disable')
        ) {
          // 关闭
          eleStatus = renderStatus(formatMessage({ id: 'merchant-set.switch-close-status' }));
        }

        const eleDelete =
          record.status === STATUS_CLOSE ? (
            // 删除
            <span
              style={{ ...style, ...btnStyle }}
              onClick={() => {
                self.setState({
                  isDelete: true,
                  rowData: record,
                  statusChangeDialogVisible: true,
                });
              }}
            >
              {formatMessage({ id: 'merchant-set.delete-btn' })}
            </span>
          ) : null;

        return (
          <Fragment>
            {eleStatus}

            {checkPermission(self.props.btns, 'new-finance-recharge-merchant-set-edit') ? (
              // 编辑
              <span
                style={{ ...style, ...btnStyle }}
                onClick={() => {
                  self.setState({
                    rowData: record,
                    editDialogVisble: true,
                  });
                }}
              >
                {formatMessage({ id: 'merchant-set.edit-btn' })}
              </span>
            ) : null}

            {checkPermission(self.props.btns, 'new-finance-recharge-merchant-set-delete')
              ? eleDelete
              : null}
          </Fragment>
        );
      },
    },
  ];
  return columns;
};
