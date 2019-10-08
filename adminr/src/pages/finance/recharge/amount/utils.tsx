import React, { Fragment } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { InputNumber, Checkbox, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { StateType } from '../utils';
import * as tools from '@/utils/tools';
import { checkPermission } from '@/utils/resolvePermission';

// 充值金额设置 - 提现快捷通道 - 银行
export const getWithdrawBankColumns = (self: any) => {
  const { bankList } = self.state;
  const columns: ColumnProps<StateType>[] = [
    // 勾选启用
    {
      title: formatMessage({ id: 'amount.bank-dialog-selected' }),
      dataIndex: 'checked',
      key: 'checked',
      width: 100,
      render: (text, record, index) => (
        <Checkbox
          checked={text}
          onChange={e => {
            const bankListData = [...bankList];
            bankListData[index].checked = e.target.checked;
            bankListData[index].status = e.target.checked ? 0 : 1;
            self.setState({
              bankList: bankListData,
            });
          }}
        />
      ),
    },
    // 银行名称
    {
      title: formatMessage({ id: 'amount.bank-dialog-bank-name' }),
      dataIndex: 'bankName',
      key: 'bankName',
      width: 200,
    },
    // 最低金额
    {
      title: formatMessage({ id: 'amount.bank-dialog-min-amount' }),
      dataIndex: 'minAmount',
      key: 'minAmount',
      render: (text, record, index) => (
        <InputNumber
          style={{ width: '80%' }}
          value={text}
          min={0}
          precision={2}
          onChange={val => {
            const bankListData = [...bankList];
            bankListData[index].minAmount = val;
            self.setState({
              bankList: bankListData,
            });
          }}
        />
      ),
    },
    // 最高金额
    {
      title: formatMessage({ id: 'amount.bank-dialog-max-amount' }),
      dataIndex: 'maxAmount',
      key: 'maxAmount',
      render: (text, record, index) => (
        <InputNumber
          style={{ width: '80%' }}
          value={text}
          min={0}
          precision={2}
          onChange={val => {
            const bankListData = [...bankList];
            bankListData[index].maxAmount = val;
            self.setState({
              bankList: bankListData,
            });
          }}
        />
      ),
    },
  ];
  return columns;
};

function setFastAmountData(fastAmountList: object[]) {
  const obj = {
    amount1: 0,
    amount2: 0,
    amount3: 0,
    amount4: 0,
    amount5: 0,
    amount6: 0,
    amount7: 0,
    amount8: 0,
  };

  const fastAmountObj = fastAmountList[0];
  if (fastAmountObj) {
    const keys = Object.keys(fastAmountObj);
    keys.forEach(item => {
      obj[item] = fastAmountObj[item];
    });
  }
  return obj;
}

// 充值金额设置 - 普通充值设置 - 快捷金额
export const getOrdQuckPaymentColumns = (self: any) => {
  const { isEdit, fastAmountList } = self.state;

  const fastAmountObj = setFastAmountData(fastAmountList);
  const { amount1, amount2, amount3, amount4, amount5, amount6, amount7, amount8 } = fastAmountObj;

  const columns: ColumnProps<StateType>[] = [
    // 金额1
    {
      title: formatMessage({ id: 'amount.fast-amount-one' }),
      dataIndex: 'amount1',
      key: 'amount1',
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          value={amount1}
          disabled={!isEdit}
          min={1}
          max={1000000000}
          precision={2}
          onChange={val => {
            const list = [...fastAmountList];
            list['0'].amount1 = val;
            self.setState({
              fastAmountList: [...list],
            });
          }}
        />
      ),
    },
    // 金额2
    {
      title: formatMessage({ id: 'amount.fast-amount-two' }),
      key: 'amount2',
      dataIndex: 'amount2',
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          value={amount2}
          disabled={!isEdit}
          min={1}
          max={1000000000}
          precision={2}
          onChange={val => {
            const list = [...fastAmountList];
            list['0'].amount2 = val;
            self.setState({
              fastAmountList: [...list],
            });
          }}
        />
      ),
    },
    // 金额3
    {
      title: formatMessage({ id: 'amount.fast-amount-three' }),
      dataIndex: 'amount3',
      key: 'amount3',
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          value={amount3}
          disabled={!isEdit}
          min={1}
          max={1000000000}
          precision={2}
          onChange={val => {
            const list = [...fastAmountList];
            list['0'].amount3 = val;
            self.setState({
              fastAmountList: [...list],
            });
          }}
        />
      ),
    },
    // 金额4
    {
      title: formatMessage({ id: 'amount.fast-amount-four' }),
      dataIndex: 'amount4',
      key: 'amount4',
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          value={amount4}
          disabled={!isEdit}
          min={1}
          max={1000000000}
          precision={2}
          onChange={val => {
            const list = [...fastAmountList];
            list['0'].amount4 = val;
            self.setState({
              fastAmountList: [...list],
            });
          }}
        />
      ),
    },
    // 金额5
    {
      title: formatMessage({ id: 'amount.fast-amount-five' }),
      dataIndex: 'amount5',
      key: 'amount5',
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          value={amount5}
          disabled={!isEdit}
          min={1}
          max={1000000000}
          precision={2}
          onChange={val => {
            const list = [...fastAmountList];
            list['0'].amount5 = val;
            self.setState({
              fastAmountList: [...list],
            });
          }}
        />
      ),
    },
    // 金额6
    {
      title: formatMessage({ id: 'amount.fast-amount-six' }),
      dataIndex: 'amount6',
      key: 'amount6',
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          value={amount6}
          disabled={!isEdit}
          min={1}
          max={1000000000}
          precision={2}
          onChange={val => {
            const list = [...fastAmountList];
            list['0'].amount6 = val;
            self.setState({
              fastAmountList: [...list],
            });
          }}
        />
      ),
    },
    // 金额7
    {
      title: formatMessage({ id: 'amount.fast-amount-seven' }),
      dataIndex: 'amount7',
      key: 'amount7',
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          value={amount7}
          disabled={!isEdit}
          min={1}
          max={1000000000}
          precision={2}
          onChange={val => {
            const list = [...fastAmountList];
            list['0'].amount7 = val;
            self.setState({
              fastAmountList: [...list],
            });
          }}
        />
      ),
    },
    // 金额8
    {
      title: formatMessage({ id: 'amount.fast-amount-eight' }),
      dataIndex: 'amount8',
      key: 'amount8',
      render: () => (
        <InputNumber
          style={{ width: '100%' }}
          value={amount8}
          disabled={!isEdit}
          min={1}
          max={1000000000}
          precision={2}
          onChange={val => {
            const list = [...fastAmountList];
            list['0'].amount8 = val;
            self.setState({
              fastAmountList: [...list],
            });
          }}
        />
      ),
    },
  ];
  return columns;
};

const renderContent = (value: any, row: any, index: any) => {
  const obj: any = {
    children: value,
    props: {},
  };
  if (index === 0) {
    obj.props.rowSpan = 11;
  } else {
    obj.props.rowSpan = 0;
  }
  return obj;
};

// 充值金额设置 - 提现快捷通道列表
export const getWithdrawColumns = (self: any) => {
  const style = {
    margin: '0 0 0 15px',
    padding: 0,
  };
  const columns: ColumnProps<StateType>[] = [
    // 商户名
    {
      title: formatMessage({ id: 'amount.withdraw-channel-table-merchant-name' }),
      dataIndex: 'channelName',
      key: 'channelName',
      width: 180,
      render: renderContent,
    },
    // 商户号
    {
      title: formatMessage({ id: 'amount.withdraw-channel-table-merchant-code' }),
      dataIndex: 'merchantCode',
      key: 'merchantCode',
      render: renderContent,
    },
    // 充值名称显示
    {
      title: formatMessage({ id: 'amount.withdraw-channel-table-recharge-name' }),
      dataIndex: 'paymentName',
      key: 'paymentName',
      width: 120,
    },
    // 充值手续费
    {
      title: formatMessage({ id: 'amount.withdraw-channel-table-recharge-fee' }),
      dataIndex: 'feeRate',
      key: 'feeRate',
      width: 150,
      render: (text, record) => (record.feeRate >= 0 ? `${tools.currency(text)}%` : '--'),
    },
    // 手续费最高金额
    {
      title: formatMessage({ id: 'amount.withdraw-channel-table-fee-max' }),
      dataIndex: 'maxFee',
      key: 'maxFee',
      width: 150,
      render: (text, record) => (record.maxFee >= 0 ? tools.currency(text) : '--'),
    },
    // 最低金额
    {
      title: formatMessage({ id: 'amount.withdraw-channel-table-amount-min' }),
      dataIndex: 'minAmount',
      key: 'minAmount',
      width: 150,
      render: (text, record) => (record.minAmount >= 0 ? tools.currency(text) : '--'),
    },
    // 最高金额
    {
      title: formatMessage({ id: 'amount.withdraw-channel-table-amount-max' }),
      dataIndex: 'maxAmount',
      key: 'maxAmount',
      width: 150,
      render: (text, record) => (record.maxAmount >= 0 ? tools.currency(text) : '--'),
    },
    // 操作
    {
      title: formatMessage({ id: 'amount.withdraw-channel-table-operation' }),
      dataIndex: 'opt',
      key: 'opt',
      width: 210,
      render: (text, record) => (
        <Fragment>
          {checkPermission(self.props.btns, 'new-finance-recharge-amount-set-recharge-set') ? (
            // 充值配置
            <Button
              type="link"
              style={{ margin: '0', padding: '0' }}
              onClick={() => {
                self.setState({
                  rowData: record,
                  ordEditDialogVisible: true,
                });
              }}
            >
              {formatMessage({ id: 'amount.recharge-set-btn' })}
            </Button>
          ) : null}

          {record.paymentName === '网银支付' &&
          checkPermission(self.props.btns, 'new-finance-recharge-amount-set-bank-limit') ? (
            // 设置银行卡限额
            <Button
              type="link"
              style={style}
              onClick={() => {
                self.setState(
                  {
                    rowData: record,
                    ordBankDialogVisible: true,
                  },
                  () => self.getBankListEffect(),
                );
              }}
            >
              {formatMessage({ id: 'amount.bank-set-btn' })}
            </Button>
          ) : null}
        </Fragment>
      ),
    },
  ];
  return columns;
};
