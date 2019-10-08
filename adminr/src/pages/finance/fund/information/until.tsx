import { Button, Form, Input, Select, message } from 'antd';

import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import styles from './style.less';

const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

export const getColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: '序号',
      dataIndex: 'order',
    },
    {
      title: '银行名称',
      dataIndex: 'merchantName',
    },
    {
      title: '银行卡号',
      dataIndex: 'merchantNumber',
    },
    {
      title: '账户可用余额',
      dataIndex: 'banlance',
    },
    {
      title: '待结算金额',
      dataIndex: 'waitAmount',
    },
    {
      title: '卡类型',
      dataIndex: 'cardType',
      filters: [
        { text: '内部存放卡', value: '1' },
        { text: '充值备用卡', value: '2' },
        { text: '外部资管中转卡', value: '3' },
      ],
    },
    {
      title: '卡日入款限额',
      dataIndex: 'dayCardLimit',
    },
    {
      title: '今日入款剩余',
      dataIndex: 'todayRemaining',
    },
    {
      title: '状态',
      dataIndex: 'switchStatus',
      filters: [{ text: '启用中', value: '1' }, { text: '已停用', value: '2' }],
    },
    {
      title: '电脑编号',
      dataIndex: 'computerNumber',
    },
    {
      title: '最后更新时间',
      dataIndex: 'lastUpdateTime',
    },
    {
      title: '操作',
      key: 'tags',
      render: (rowData: any) => (
        <div className={styles.tabelBtns}>
          <button
            type="button"
            onClick={() => {
              message.info('暂未开通此功能');
            }}
          >
            明细
          </button>

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
              message.info('暂未开通此功能');
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

export const InforMationForm = (props: any) => {
  const { getFieldDecorator, handleSubmit, resetForm } = props;
  return (
    <Form layout="inline" onSubmit={handleSubmit} name="searchInformation">
      <Form.Item label="银行名称：" style={{ width: '275px' }}>
        {getFieldDecorator('bankType', {})(
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

      <Form.Item label="状态：" style={{ width: '275px' }}>
        {getFieldDecorator('status', {
          initialValue: '-1',
        })(
          <Select style={{ width: '200px' }} placeholder="全部">
            <Option value="-1">全部</Option>
            <Option value="1">已启用</Option>
            <Option value="2">已停用</Option>
          </Select>,
        )}
      </Form.Item>

      <Form.Item className={styles.rechargeBtns}>
        <Button type="primary" htmlType="submit">
          {' '}
          查询{' '}
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
};
