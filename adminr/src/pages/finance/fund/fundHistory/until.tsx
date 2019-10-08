import { Button, DatePicker, Form, Input, Select } from 'antd';

import { ColumnProps } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';
import styles from './style.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface StateType {
  [propName: string]: any;
}
// 表格标题
export const getColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: '序号',
      dataIndex: 'order',
    },
    {
      title: '商户名称',
      dataIndex: 'merchantName',
    },
    {
      title: '  商户号',
      dataIndex: 'merchantNumber',
    },
    {
      title: '账户可用余额',
      dataIndex: 'banlance',
    },
    {
      title: '待结算金额',
      dataIndex: 'pendingSettlement',
    },
    {
      title: '渠道类型',
      dataIndex: 'channelType',
      filters: [
        { text: '渠道111', value: '1' },
        { text: '渠道222', value: '2' },
        { text: '渠道222', value: '3' },
      ],
    },
    {
      title: '日入款限额',
      dataIndex: 'dailyLimit',
    },
    {
      title: '今日入款剩余',
      dataIndex: 'remainingToday',
    },
    {
      title: '开关状态',
      dataIndex: 'switchStatus',
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
          <button type="button">明细</button>
          <button
            type="button"
            onClick={() => {
              self.setState({ showEditModal: true });
            }}
          >
            编辑
          </button>
          <button type="button">启用</button>
        </div>
      ),
    },
  ];
  return columns;
};

// 搜索表单
export const FundHistoryForm = (props: any) => {
  const { getFieldDecorator, handleSubmit, selectTimeChange, resetForm } = props;

  return (
    <Form layout="inline" onSubmit={handleSubmit} name="searchRecharge">
      <Form.Item label="商户名称">
        {getFieldDecorator('dateTime', {})(
          <RangePicker
            style={{ width: '400px' }}
            allowClear
            ranges={{
              今日: [moment(), moment()],
              本月: [moment().startOf('month'), moment().endOf('month')],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={selectTimeChange}
          />,
        )}
      </Form.Item>

      <Form.Item label="银行卡号：">
        {getFieldDecorator('merchantNumber', {})(
          <Input allowClear type="userNumber" placeholder="请输入商户号" />,
        )}
      </Form.Item>

      <Form.Item label="银行名称：" style={{ width: '275px' }}>
        {getFieldDecorator('bankType', {
          initialValue: '-1',
        })(
          <Select style={{ width: '200px' }} placeholder="请输入银行名称">
            <Option value="-1">全部</Option>
            <Option value="1">成功</Option>
            <Option value="2">失败</Option>
            <Option value="3">处理中</Option>
          </Select>,
        )}
      </Form.Item>

      <Form.Item className={styles.footer}>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
};
