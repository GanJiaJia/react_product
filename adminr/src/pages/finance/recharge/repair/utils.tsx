import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Select, Input, InputNumber } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';
import { StateType, toRepairStatus, toMerchantStatus, checkShowOpt, toPaymentType } from '../utils';
import * as tools from '@/utils/tools';
import { ORDER_STATUS_ALL, ORDER_STATUS_REPAIRED } from '../data';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;

export function spliceStr(list: any[], value: any) {
  const index = _.findIndex(list, (item: object) => item === value);
  list.splice(index, 1);
}

// 补单操作 -- 列数据
export const getRepairColumns = (self: any) => {
  // 1 全部 2 已补单
  const statusValue = self.props.form.getFieldValue('status');
  const { merchantList } = self.state;
  const merchantListData = merchantList.map((item: any) => ({
    text: item.channelName,
    value: item.channelId,
  }));

  const orderFilterData = statusValue === 1 ? ORDER_STATUS_ALL : ORDER_STATUS_REPAIRED;
  const { subStatus } = self.state.tableFilters;
  // const limitTypeData = limitType ? [limitType] : ['-1'];
  let subStatusData = [];
  if (typeof subStatus === 'string') {
    subStatusData = subStatus.split(',');
  } else {
    subStatusData = subStatus;
  }

  const columns: ColumnProps<StateType>[] = [
    // 充值时间
    {
      title: formatMessage({ id: 'recharge-repair-table.recharge-time' }),
      dataIndex: 'createDate',
      key: 'createDate',
      width: 110,
      render: text => tools.toTime(text),
    },
    // 充值单号
    {
      title: formatMessage({ id: 'recharge-repair-table.order-id' }),
      dataIndex: 'orderId',
      width: 230,
    },
    // 充值金额
    {
      title: formatMessage({ id: 'recharge-repair-table.recharge-amount' }),
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      render: text => tools.currency(text),
    },
    // 账户名
    {
      title: formatMessage({ id: 'recharge-repair-table.account-name' }),
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    // 姓名
    {
      title: formatMessage({ id: 'recharge-repair-table.really-name' }),
      dataIndex: 'reallyName',
      key: 'reallyName',
      width: 120,
      ...self.getColumnSearchProps('reallyName'),
    },
    // 订单状态
    {
      title: formatMessage({ id: 'recharge-repair-table.order-status' }),
      dataIndex: 'subStatus',
      key: 'subStatus',
      width: 120,
      render: (text, record) => toRepairStatus(record),
      filters: orderFilterData,
      // filterMultiple: false,
      filteredValue: subStatusData,
    },
    // 充值类型
    // {
    //   title: formatMessage({ id: 'recharge-repair-table.recharge-type' }),
    //   dataIndex: 'limitType',
    //   key: 'limitType',
    //   width: 90,
    //   render: text => toRechargeStatus(text),
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
      title: formatMessage({ id: 'recharge-repair-table.recharge-merchant' }),
      dataIndex: 'merchant',
      key: 'merchant',
      width: 130,
      render: (text, record) => record.merchantName,
      filters: merchantListData,
      filterMultiple: false,
    },
    // 补单操作时间
    {
      title: formatMessage({ id: 'recharge-repair-table.repair-time' }),
      dataIndex: 'sucReqTime',
      key: 'sucReqTime',
      width: 110,
      render: text => tools.toTime(text),
    },
    // 操作人
    {
      title: formatMessage({ id: 'recharge-repair-table.operator' }),
      dataIndex: 'sucReqOperator',
      key: 'sucReqOperator',
      width: 90,
    },
    // 操作
    {
      title: formatMessage({ id: 'recharge-repair-table.operation' }),
      dataIndex: 'detail',
      render: (text, record) => {
        const element = checkShowOpt(record) ? (
          // 补单
          <span className={styles.tableBtn} onClick={() => self.handleDetail(record)}>
            {formatMessage({ id: 'recharge-repair-table.repair' })}
          </span>
        ) : (
          // 详情
          <span
            className={styles.tableBtn}
            onClick={() => self.setState({ rowData: record, detailDialogVisible: true })}
          >
            {formatMessage({ id: 'recharge-repair-table.detail' })}
          </span>
        );
        return checkPermission(self.props.btns, 'new-finance-recharge-repair-replacement')
          ? element
          : null;
      },
    },
  ];
  return columns;
};

// 充值补单 - 创建单号
export const getCreateColumns = (self: any) => {
  const { orderInfo, bankList } = self.state;

  const columns: ColumnProps<StateType>[] = [
    // 关联单号
    {
      title: () => (
        <div>
          <span style={{ color: 'red' }}>*</span>
          <FormattedMessage id="recharge-repair-create-dialog-table.relation-id" />
        </div>
      ),
      dataIndex: 'ord',
      width: 300,
      render: () => (
        // 请输入关联单号
        <Input
          style={{ width: '100%' }}
          placeholder={formatMessage({
            id: 'recharge-repair-create-dialog-table.relation-id-placeholder',
          })}
          onPressEnter={(e: any) => {
            if (e.target.value) self.getInfo();
          }}
          onChange={(e: any) => {
            const obj = { ...orderInfo };
            obj.orderId = e.target.value;
            self.setState({ orderInfo: { ...obj } });
          }}
          onBlur={(e: any) => {
            const keys = Object.keys(orderInfo);
            if (keys.length < 4 && e.target.value) self.getInfo();
          }}
        />
      ),
    },
    // 充值方式
    {
      title: formatMessage({ id: 'recharge-repair-create-dialog-table.recharge-type' }),
      dataIndex: 'paymentName',
      key: 'paymentName',
      width: 90,
    },
    // 充值通道
    {
      title: formatMessage({ id: 'recharge-repair-create-dialog-table.recharge-channel' }),
      dataIndex: 'channelName',
      key: 'channelName',
      width: 90,
    },
    // 商户号
    {
      title: formatMessage({ id: 'recharge-repair-create-dialog-table.merchant-code' }),
      dataIndex: 'merchantCode',
      key: 'merchantCode',
      width: 150,
    },
    // 订单金额
    {
      title: () => (
        <div>
          <span style={{ color: 'red' }}>*</span>
          <FormattedMessage id="recharge-repair-create-dialog-table.order-amount" />
        </div>
      ),
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={2}
          onChange={val => {
            const obj = { ...orderInfo };
            obj.amount = val;
            self.setState({
              orderInfo: { ...obj },
            });
          }}
        />
      ),
    },
    // 账户名
    {
      title: formatMessage({ id: 'recharge-repair-create-dialog-table.account-name' }),
      dataIndex: 'userName',
      key: 'userName',
      width: 90,
    },
    // 收款卡姓名
    {
      title: formatMessage({ id: 'recharge-repair-create-dialog-table.payee-name' }),
      dataIndex: 'payeeName',
      key: 'payeeName',
      width: 100,
      render: () => (
        <Input
          onChange={(e: any) => {
            const obj = { ...orderInfo };
            obj.payeeName = e.target.value;
            self.setState({ orderInfo: { ...obj } });
          }}
        />
      ),
    },
    // 收款卡银行名称
    {
      title: formatMessage({ id: 'recharge-repair-create-dialog-table.payee-bank-name' }),
      dataIndex: 'payeeBankId',
      key: 'payeeBankId',
      width: 130,
      render: text => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(val: number) => {
            const obj = { ...orderInfo };
            obj.payeeBankId = val;
            self.setState({ orderInfo: { ...obj } });
          }}
        >
          {bankList.map((item: any) => (
            <Option key={item.bankId}>{item.bankName}</Option>
          ))}
        </Select>
      ),
    },
  ];
  return columns;
};

// 补单操作 -- 详情 -- 系统订单详情列数据
export const getRepairSysColumns = (self: any) => {
  const { bankList } = self.props.recharge.ordinaryAmountData;
  const { bankId } = self.props.data;
  const bankListData = [...bankList];
  if (bankId === 0 || bankId === -1) {
    bankListData.push({ bankId, bankName: '其他' });
  }

  const columns: ColumnProps<StateType>[] = [
    // 充值时间
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.recharge-time' }),
      dataIndex: 'createDate',
      key: 'createDate',
      width: 120,
      render: text => tools.toTime(text),
    },
    // 充值单号
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.order-id' }),
      key: 'orderId',
      dataIndex: 'orderId',
      width: 120,
    },
    // 状态
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.status' }),
      dataIndex: 'status',
      key: 'status',
      width: 90,
      // render: text => toStatus(text),
      render: (text, record) => toRepairStatus(record),
    },
    // 订单金额
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.order-amount' }),
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: text => tools.currency(text),
    },
    // 账户名
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.account-name' }),
      dataIndex: 'username',
      key: 'username',
      width: 90,
    },
    // 收款人姓名
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.accept-bank-name' }),
      dataIndex: 'cardUsername',
      key: 'cardUsername',
      width: 90,
      render: (text, record) => {
        const { channelId } = record;
        return channelId === 1001 || channelId === 1003 ? (
          <Input
            defaultValue={record.cardUsername}
            onChange={(e: any) => {
              self.setState({ payeeName: e.target.value });
            }}
          />
        ) : (
          record.cardUsername
        );
      },
    },
    // 收款银行名称
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.payee-bank-name' }),
      dataIndex: 'bankName',
      key: 'bankName',
      width: 120,
      render: (text, record) => {
        const { bankId: id } = record;
        return record.channelId === 1001 || record.channelId === 1003 ? (
          <Select
            style={{ width: '110px' }}
            defaultValue={id}
            onChange={(val: number) => {
              self.setState({ payeeBankId: val });
            }}
          >
            {bankListData.map((item: any) => (
              <Option value={item.bankId} key={item.bankId}>
                {item.bankName}
              </Option>
            ))}
          </Select>
        ) : (
          record.bankName
        );
      },
    },
    // 补单金额
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.make-up-amout' }),
      key: 'makeUpAmount',
      width: 140,
      render: (text, record) => (
        <InputNumber
          min={0}
          style={{ width: '140px' }}
          value={self.state.saveData.amount}
          disabled={!checkShowOpt(record)}
          onChange={val => {
            const saveData = { ...self.state.saveData, amount: val };
            self.setState({ saveData });
          }}
        />
      ),
    },
  ];
  return columns;
};

// 补单操作 -- 详情 -- 第三方订单详情列数据
export const getRepairMerColumns = (self: any) => {
  const { data } = self.props;
  const columns: ColumnProps<StateType>[] = [
    // 入款商户
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.accept-merchant' }),
      dataIndex: 'channelName',
      key: 'channelName',
      render: (text, record) => `${record.channelName || ''} ${record.merchantCode || ''}`,
    },
    // 订单时间
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.order-time' }),
      dataIndex: 'payDate',
      key: 'payDate',
      render: text => tools.toTime(text),
    },
    // 订单单号
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.order-code' }),
      dataIndex: 'thirdOrderId',
      key: 'thirdOrderId',
    },
    // 订单状态
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.order-status' }),
      dataIndex: 'status',
      key: 'status',
      render: text => toMerchantStatus(text),
    },
    // 订单金额
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.order-amount' }),
      dataIndex: 'amount',
      key: 'amount',
      render: text => tools.currency(text),
    },
    // 姓名
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.really-name' }),
      dataIndex: 'name',
      key: 'name',
    },
    // 操作
    {
      title: formatMessage({ id: 'recharge-repair-detail-dialog-table.operation' }),
      dataIndex: 'opt',
      key: 'opt',
      render: () => {
        const element = checkShowOpt(data) ? (
          // 验证订单状态
          <span className={styles.btnLine} onClick={() => self.handleCheck(data)}>
            {formatMessage({ id: 'recharge-repair-detail-dialog-table.check-status' })}
          </span>
        ) : null;
        return element;
      },
    },
  ];
  return columns;
};
