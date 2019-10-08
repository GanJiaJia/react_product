import { Button, Form, Input, Select } from 'antd';

import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import { StateType } from '@/common-typings';
import styles from './style.less';
import { toTime } from '@/utils/tools';
import { checkPermission } from '@/utils/resolvePermission';
import { LAN } from './language';

const { Option } = Select;
const T_ACCOUNTSTATUS = {
  0: '启用',
  1: '禁用',
};

export const getThirdColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: '商户名称',
      dataIndex: 'channelName',
    },
    {
      title: '商户号',
      dataIndex: 'merchantCode',
    },
    {
      title: '出款账户可用余额',
      dataIndex: 'balance',
    },
    {
      title: '状态',
      dataIndex: 'accountStatus',
      filterMultiple: false,
      filters: [{ text: '启用', value: '0' }, { text: '禁用', value: '1' }],
      render: text => T_ACCOUNTSTATUS[text],
    },
    {
      title: '最后更新时间',
      dataIndex: 'updateDate',
      render: text => toTime(text),
    },
    {
      title: '操作',
      key: 'tags',
      render: (text: any, rowData: any) => (
        <div className={styles.tabelBtns}>
          {/* <button type="button">明细</button> */}
          {checkPermission(self.props.btns, 'new-finance-manage-withdraw-manage-edit') ? (
            <button
              type="button"
              onClick={() => {
                self.setState({ showEditModal: true, rowData }, () => {
                  console.log(rowData);
                  self.getBankList(rowData);
                });
              }}
            >
              编辑
            </button>
          ) : null}

          {/* <button type="button">开启</button> */}
        </div>
      ),
    },
  ];

  return columns;
};

export const getBankCardColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: '银行名称',
      dataIndex: 'merchantName',
    },
    {
      title: '银行卡号',
      dataIndex: 'merchantNumber',
    },
    {
      title: '账户名称',
      dataIndex: 'username',
    },
    {
      title: '账户可用余额',
      dataIndex: 'banlance',
    },
    {
      title: '状态',
      dataIndex: 'switchStatus',
      filters: [
        { text: '渠道111', value: '1' },
        { text: '渠道222', value: '2' },
        { text: '渠道222', value: '3' },
      ],
    },
    {
      title: '电脑编号',
      dataIndex: 'computerNumber',
      filters: [
        { text: '渠道111', value: '1' },
        { text: '渠道222', value: '2' },
        { text: '渠道222', value: '3' },
      ],
    },
    {
      title: '最后更新时间',
      dataIndex: 'lastUpdateTime',
    },
    {
      title: '操作',
      key: 'tags',
      render: (text: any, rowData: any) => (
        <div className={styles.tabelBtns}>
          <button type="button">明细</button>
          <button
            type="button"
            onClick={() => {
              self.setState({ showEditModal: true, rowData });
            }}
          >
            编辑
          </button>
          <button
            type="button"
            onClick={() => {
              self.setState({ showTransferModal: true, rowData });
            }}
          >
            转账
          </button>

          <button
            type="button"
            onClick={() => {
              self.setState({ showDeleteModal: true, rowData });
            }}
          >
            删除
          </button>

          <button
            type="button"
            onClick={() => {
              self.setState({ showChangeModal: true, rowData });
            }}
          >
            启用
          </button>
        </div>
      ),
    },
  ];
  return columns;
};

export const BankCardForm = (props: any) => {
  const { handleSubmit, getFieldDecorator, resetForm } = props;
  return (
    <Form layout="inline" onSubmit={handleSubmit} name="searchWithdraw">
      <Form.Item label="银行名称：" style={{ width: '275px' }}>
        {getFieldDecorator('bankType', {
          initialValue: '1',
        })(
          <Select style={{ width: '200px' }} placeholder="请输入银行名称">
            <Option value="1">中国银行</Option>
            <Option value="2">农业银行</Option>
            <Option value="3">建设银行</Option>
            <Option value="4">中国银行</Option>
          </Select>,
        )}
      </Form.Item>

      <Form.Item label="银行卡号">
        {getFieldDecorator('bankCard', {})(<Input allowClear placeholder="请输入银行卡号" />)}
      </Form.Item>

      <Form.Item label="账户名称">
        {getFieldDecorator('nickname', {})(<Input allowClear placeholder="请输入账户名称" />)}
      </Form.Item>

      <Form.Item className={styles.rechargeBtns}>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
};

export const ThirdForm = (props: any) => {
  const { handleSubmit, getFieldDecorator, resetForm } = props;
  return (
    <Form layout="inline" onSubmit={handleSubmit} name="searchWithdraw">
      <Form.Item label={LAN.merchantName}>
        {getFieldDecorator('channelName', {
          normalize: (value: any) => value && value.trim(),
        })(<Input allowClear placeholder={LAN.merchantNamePlaceholder} autoComplete="off" />)}
      </Form.Item>

      <Form.Item label={LAN.merchantNumber}>
        {getFieldDecorator('merchantCode', {
          normalize: (value: any) => value && value.trim(),
        })(
          <Input
            allowClear
            type="userNumber"
            placeholder={LAN.merchantNumberPlaceholder}
            autoComplete="off"
          />,
        )}
      </Form.Item>
      <Form.Item className={styles.rechargeBtns}>
        <Button type="primary" htmlType="submit">
          {' '}
          {LAN.btnSearch}{' '}
        </Button>
        <Button onClick={resetForm}> {LAN.btnReset}</Button>
      </Form.Item>
    </Form>
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
