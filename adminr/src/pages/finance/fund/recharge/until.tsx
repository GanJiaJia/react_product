import { Button, Form, Input } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { StateType } from '@/common-typings';
import styles from './style.less';
import { toTime } from '@/utils/tools';
import { checkPermission } from '@/utils/resolvePermission';
import types from '@/const/constType';

const { T_LIMIT_TYPE, SWITCH_STATUS_TYPES } = types;

export const getColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.merchantName" />,
      dataIndex: 'channelName',
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.merchantNumber" />,
      dataIndex: 'merchantCode',
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.availableBalance" />,
      dataIndex: 'balance',
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.pendingAmount" />,
      dataIndex: 'settlementFund',
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.channelType" />,
      dataIndex: 'limitType',
      filterMultiple: false,
      filters: [
        {
          text: (
            <FormattedMessage id="finance.fund.recharge.table.title.channelType.ordinaryRecharge" />
          ),
          value: '0',
        },
        {
          text: (
            <FormattedMessage id="finance.fund.recharge.table.title.channelType.largeRecharge" />
          ),
          value: '1',
        },
      ],
      render: (text: any) => T_LIMIT_TYPE[text],
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.dailyDepositLimit" />,
      dataIndex: 'dailyLimit',
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.remainingToday" />,
      dataIndex: 'dailySurplus',
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.switchStatus" />,
      dataIndex: 'accountStatus',
      filterMultiple: false,
      filters: [
        {
          text: <FormattedMessage id="finance.fund.recharge.table.title.switchStatus.turnedOn" />,
          value: '0',
        },
        {
          text: <FormattedMessage id="finance.fund.recharge.table.title.switchStatus.turnedOff" />,
          value: '1',
        },
      ],
      render: (text: any) => SWITCH_STATUS_TYPES[text],
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.lastUpdateTime" />,
      dataIndex: 'updateDate',
      render: text => toTime(text),
    },
    {
      title: <FormattedMessage id="finance.fund.recharge.table.title.action" />,
      key: 'tags',
      render: (text: any, rowData: any) => (
        <div className={styles.tabelBtns}>
          {/* <button type="button">明细</button> */}
          {checkPermission(self.props.btns, 'new-finance-manage-recharge-manage-edit') ? (
            <button
              type="button"
              onClick={() => {
                self.setState({ showEditModal: true, rowData });
              }}
            >
              <FormattedMessage id="finance.fund.recharge.table.title.action.edit" />
            </button>
          ) : null}

          {/* <button type="button">启用</button> */}
        </div>
      ),
    },
  ];
  return columns;
};

//  表单
export const RechargeForm = (props: any) => {
  const { handleSubmit, getFieldDecorator, resetForm } = props;
  return (
    <Form layout="inline" onSubmit={handleSubmit} name="searchRecharge">
      <Form.Item label={<FormattedMessage id="finance.fund.recharge.merchantName.title" />}>
        {getFieldDecorator('channelName', {})(
          <Input
            allowClear
            placeholder={formatMessage({
              id: 'finance.fund.recharge.merchantName.titlePlaceholder',
            })}
          />,
        )}
      </Form.Item>
      <Form.Item label={<FormattedMessage id="finance.fund.recharge.merchantNumber.title" />}>
        {getFieldDecorator('merchantCode', {})(
          <Input
            allowClear
            type="userNumber"
            placeholder={formatMessage({
              id: 'finance.fund.recharge.merchantNumber.titlePlaceholder',
            })}
          />,
        )}
      </Form.Item>
      <Form.Item className={styles.rechargeBtns}>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="finance.fund.recharge.btn.search" />
        </Button>
        <Button onClick={resetForm}>
          <FormattedMessage id="finance.fund.recharge.btn.reset" />
        </Button>
      </Form.Item>
    </Form>
  );
};

export const AmountWrap = (props: any) => {
  const { balance, settlementFund, refreshBalance, loadingRefresh } = props;
  return (
    <div className={styles.balanceWrap}>
      <span>
        <FormattedMessage id="finance.fund.recharge.text.amount.available" /> ：<i>{balance}</i>
      </span>
      <span>
        <FormattedMessage id="finance.fund.recharge.text.amount.settlement" /> ：
        <i>{settlementFund}</i>
      </span>
      <Button onClick={refreshBalance} loading={loadingRefresh}>
        <FormattedMessage id="finance.fund.recharge.btn.refresh" />
      </Button>
    </div>
  );
};

export const selectClass = (record: any) => {
  if (record.warningStatus === 2) {
    return 'red';
  }
  if (record.warningStatus === 1) {
    return 'orange';
  }
  return null;
};
