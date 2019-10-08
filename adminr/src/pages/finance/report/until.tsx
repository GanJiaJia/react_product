import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Form, Button, Select, DatePicker } from 'antd';
import { StateType } from '@/common-typings';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;

const getExportBtn = (rowData: any, btnText: any = '') => (
  <div className={styles.tabelBtns}>
    {rowData.detailPath ? (
      <button type="button">
        <a href={rowData.detailPath}>{`导出${btnText}明细`}</a>
      </button>
    ) : null}
  </div>
);

// 表格标题
export const getColumns = (
  self: any,
  total: any = '充值总额',
  count: any = '充值笔数',
  dataIndex = 'totalRechargeAmount',
) => {
  const columns: ColumnProps<StateType>[] = [
    {
      width: '14.2%',
      title: '日期',
      dataIndex: 'date',
    },
    {
      width: '14.2%',
      title: '商户名称',
      dataIndex: 'channelName',
      render: (text: any, rowData: any) => {
        if (text === '全部商户') {
          return <strong style={{ color: 'red' }}>{text}</strong>;
        }
        return text;
      },
    },
    {
      width: '14.2%',
      title: '商户号',
      dataIndex: 'merchantCode',
    },
    {
      width: '14.2%',
      title: total,
      dataIndex,
    },
    {
      width: '14.2%',
      title: count,
      dataIndex: 'totalRow',
    },
    {
      width: '14.2%',
      title: '商户手续费总额',
      dataIndex: 'totalFeeAmount',
    },

    {
      width: '14.2%',
      title: '操作',
      key: 'tags',
      render: (text: any, rowData: any, index: any) => {
        if (
          rowData.channelName === '全部商户' &&
          checkPermission(self.props.btns, self.allExportPermission)
        ) {
          return getExportBtn(rowData, '全部');
        }
        if (
          rowData.channelName !== '全部商户' &&
          checkPermission(self.props.btns, self.exportPermission)
        ) {
          return getExportBtn(rowData);
        }
        return null;
      },
    },
  ];
  return columns;
};

// 搜索表单
export const ReportForm = (props: any) => {
  const { getFieldDecorator, handleSubmit, resetForm, merchantList, onDateChange } = props;
  const newMerchantList = JSON.parse(JSON.stringify(merchantList));
  const delItem: any = newMerchantList.splice(0, 1);
  if (delItem[0]) {
    newMerchantList.unshift(delItem[0], {
      channelId: -2,
      channelName: '人工出款',
    });
  }

  // console.log(merchantList);
  return (
    <Form layout="inline" onSubmit={handleSubmit} name="searchRecharge">
      <Form.Item label="日期">
        {getFieldDecorator('date', {})(
          <DatePicker showToday format="YYYY-MM-DD" onChange={onDateChange} />,
        )}
      </Form.Item>

      <Form.Item label="商户名称：" style={{ width: '275px' }}>
        {getFieldDecorator('channelId', {
          initialValue: '-1',
        })(
          <Select style={{ width: '200px' }} placeholder="请选择商户名称">
            {newMerchantList.map((ele: any, index: any) => (
              <Option key={ele.channelName} value={ele.channelId}>
                {ele.channelName}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>

      <Form.Item className={styles.footer}>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
        {/* <Button>导出</Button> */}
      </Form.Item>
    </Form>
  );
};

export const WithdrawReportForm = (props: any) => {
  const { getFieldDecorator, handleSubmit, resetForm, merchantList, onDateChange } = props;
  if (merchantList instanceof Array) {
    merchantList.unshift({
      channelId: -2,
      channelName: '人工出款',
    });
  }
  console.log(merchantList);
  return (
    <Form layout="inline" onSubmit={handleSubmit} name="searchRecharge">
      <Form.Item label="日期">
        {getFieldDecorator('date', {})(<DatePicker showToday format="YYYY-MM-DD" />)}
      </Form.Item>

      <Form.Item label="商户名称：" style={{ width: '275px' }}>
        {getFieldDecorator('channelId', {
          initialValue: '-1',
        })(
          <Select style={{ width: '200px' }} placeholder="请选择商户名称">
            {merchantList.map((ele: any, index: any) => (
              <Option key={ele.channelName} value={ele.channelId}>
                {ele.channelName}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>

      <Form.Item className={styles.footer}>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
        {/* <Button>导出</Button> */}
      </Form.Item>
    </Form>
  );
};

export const TableFooter = (props: any): any => {
  const { total } = props;
  return (
    <table className={styles.reportTableFooter}>
      <tbody className="ant-table-tbody">
        <tr className="ant-table-row ant-table-row-level-0">
          <td>合计：</td>
          <td> </td>
          <td></td>
          <td>{total.totalAmount} </td>
          <td>{total.totalRow}</td>
          <td> {total.totalFee}</td>
          <td> </td>
        </tr>
      </tbody>
    </table>
  );
};

// 交易明细报表表格标题
export const getReportDetailColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    {
      title: '交易订单号',
      dataIndex: 'date',
    },
    {
      title: '账户名',
      dataIndex: 'channelName',
    },
    {
      title: '账户类型',
      dataIndex: 'merchantCode',
    },
    {
      title: '所属代理',
      dataIndex: 'totalRechargeAmount',
    },
    {
      title: '交易类型',
      dataIndex: 'totalRow',
    },
    {
      title: '细分类型',
      dataIndex: 'totalFeeAmount',
    },
    {
      title: '操作动作',
      dataIndex: 'merchantCode',
    },
    {
      title: '操作时间',
      dataIndex: 'totalRechargeAmount',
    },
    {
      title: '交易金额',
      dataIndex: 'totalRow',
    },
    {
      title: '手续费',
      dataIndex: 'totalFeeAmount',
    },
    {
      title: '应到账',
      dataIndex: 'totalFeeAmount',
    },
    {
      title: '中心钱包帐变前余额',
      dataIndex: 'totalFeeAmount',
    },
    {
      title: '状态',
      dataIndex: 'totalFeeAmount',
    },
    {
      title: '中心钱包帐变前余额',
      dataIndex: 'totalFeeAmount',
    },
    {
      title: '中心钱包帐变后余额',
      dataIndex: 'totalFeeAmount',
    },
  ];
  return columns;
};
