import { Button, Cascader, DatePicker, Form, Input, Select } from 'antd';
import React, { Fragment } from 'react';

import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import { currency, toTime } from '@/utils/tools';
import styles from './style.less';
import types from '@/const/constType';
import { checkPermission } from '@/utils/resolvePermission';

const {
  USER_TYPE,
  ADJUST_TYPE,
  T_USER_TYPE,
  T_CHANGE_TYPE,
  T_SUB_TYPE,
  CHECK_RESULT_TYPES,
} = types;

const { Option } = Select;
const { RangePicker } = DatePicker;

interface StateType {
  [propName: string]: any;
}

// const checkType = 1;
// 0未审核， 1审核审核成功，2审核拒绝
// 一审

// 0待审核  1 || >2 审核通过  审核拒绝
const getFirstStatusColumn = (rowData: any, props: any = {}) => {
  const { status } = rowData;
  switch (status) {
    case 0:
      return { clickStyle: true, text: '审核', status };
    case 1:
      return { clickStyle: false, text: '审核通过', status };
    case 2:
      return { clickStyle: false, text: '审核拒绝', status };
    default:
      if (status > 2) {
        return { clickStyle: false, text: '审核通过', status };
      }
      return { clickStyle: false, text: '', status };
  }
};

// 二审
const getSecondStatusColumn = (rowData: any, props: any = {}) => {
  const { status } = rowData;
  switch (status) {
    case 0:
      return { clickStyle: false, text: '' };
    case 1:
      return { clickStyle: true, text: '审核' };
    case 2:
      return { clickStyle: false, text: '' };
    case 3:
      return { clickStyle: false, text: '审核通过' };
    case 4:
      return { clickStyle: false, text: '审核拒绝' };
    default:
      return { clickStyle: false, text: '' };
  }
};

const handleFirstBtn = (rowData: any, self: any) => {
  let isFisrtUncheck = false;
  const showFirstCheckModal = true;
  switch (rowData.status) {
    case 0:
      isFisrtUncheck = true;
      break;
    case 1:
      isFisrtUncheck = false;
      break;
    case 2:
      isFisrtUncheck = false;
      break;
    default:
      if (rowData.status > 2) {
        isFisrtUncheck = false;
      }
      break;
  }
  self.setState({
    isFisrtUncheck,
    showFirstCheckModal,
    rowData,
  });
};

const handleSecondBtn = (rowData: any, self: any) => {
  let isSecondUncheck = false;
  const showSecondCheckModal = true;

  switch (rowData.status) {
    case 0:
      isSecondUncheck = false;
      break;
    case 1:
      isSecondUncheck = true;
      break;
    case 2:
      isSecondUncheck = false;
      break;
    default:
      if (rowData.status > 2) {
        isSecondUncheck = false;
      }
      break;
  }
  self.setState({
    isSecondUncheck,
    showSecondCheckModal,
    rowData,
  });
};

// 表头
export const getColumns = (self: any) => {
  // const { props } = self;
  const columns: ColumnProps<StateType>[] = [
    {
      title: '资金调整单号',
      dataIndex: 'orderId',
      fixed: 'left',
      width: 180,
    },
    {
      title: '账户类型',
      dataIndex: 'userType',
      width: 150,
      render: (text: any) => T_USER_TYPE[text],
    },
    {
      title: '账户名',
      dataIndex: 'username',
    },
    {
      title: '调整类型',
      dataIndex: 'changeType',
      render: (text: any) => T_CHANGE_TYPE[text],
    },
    {
      title: '调整子类型',
      dataIndex: 'subType',
      render: (text: any) => T_SUB_TYPE[text],
    },
    {
      title: '调整金额',
      dataIndex: 'amount',
      render: (text: any) => currency(text),
    },
    {
      title: '需求流水金额',
      dataIndex: 'freezeAmount',
      render: (text: any) => currency(text),
    },
    {
      title: '申请人',
      dataIndex: 'creator',
      filterMultiple: false,
      filters: [],
    },
    {
      title: '申请备注',
      dataIndex: 'remark',
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      render: (text: any) => toTime(text),
    },
    {
      title: '一审状态',
      dataIndex: 'status',
      filterMultiple: false,

      render: (text: any, rowData: any) => {
        if (rowData) {
          const obj = getFirstStatusColumn(rowData);
          const renderDiv = (className: any) => (
            <div
              onClick={() => {
                handleFirstBtn(rowData, self);
              }}
              className={className}
            >
              {obj.text}
            </div>
          );

          if (
            checkPermission(self.props.btns, 'new-finance-adjust-record-firstCheck') &&
            obj.clickStyle
          ) {
            return renderDiv(styles.checkResultBtns);
          }
          if (
            !checkPermission(self.props.btns, 'new-finance-adjust-record-firstCheck') &&
            obj.clickStyle
          ) {
            return null;
          }
          return renderDiv(styles.checked);
        }
        return null;
      },
    },
    {
      title: '审核人',
      dataIndex: 'firstApprover',
      filterMultiple: false,
      filters: [],
    },
    {
      title: '审核时间',
      dataIndex: 'firstTime',
      width: 200,
      render: (text: any) => toTime(text),
    },
    {
      title: '二审状态',
      dataIndex: 'secondStatus',
      filterMultiple: false,
      render: (text: any, rowData: any) => {
        if (rowData) {
          const obj = getSecondStatusColumn(rowData);

          const renderDiv = (className: any) => (
            <div
              onClick={() => {
                handleSecondBtn(rowData, self);
              }}
              className={className}
            >
              {obj.text}
            </div>
          );

          if (
            checkPermission(self.props.btns, 'new-finance-adjust-record-secondCheck') &&
            obj.clickStyle
          ) {
            return renderDiv(styles.checkResultBtns);
          }
          if (
            !checkPermission(self.props.btns, 'new-finance-adjust-record-secondCheck') &&
            obj.clickStyle
          ) {
            return null;
          }
          return renderDiv(styles.checked);
        }
        return null;
      },
      filters: [],
    },
    {
      title: '审核人',
      dataIndex: 'secondApprover',
      filterMultiple: false,
      filters: [],
    },
    {
      title: '审核时间',
      dataIndex: 'secondTime',
      width: 200,
      render: (text: any) => toTime(text),
    },
  ];
  return columns;
};

// 表单
export const AdjustForm = (props: any) => {
  const {
    handleSubmit,
    resetForm,
    getFieldDecorator,
    handleCascaderChange,
    selectTimeChange,
  } = props;
  return (
    <Form layout="inline" onSubmit={handleSubmit} name="searchAdjustment">
      {/* <div style={{ marginBottom: '20px' }}> */}
      <Form.Item label="申请调整时间">
        {/* {getFieldDecorator('dateTime', {})( */}
        <RangePicker
          style={{ width: '400px' }}
          allowClear
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          }}
          ranges={{
            今日: [moment().startOf('day'), moment().endOf('day')],
            本周: [moment().startOf('week'), moment().endOf('week')],
            本月: [moment().startOf('month'), moment().endOf('month')],
          }}
          format="YYYY-MM-DD HH:mm:ss"
          onChange={selectTimeChange}
        />
      </Form.Item>

      <Form.Item label="账户类型：">
        {getFieldDecorator('userType', {
          initialValue: '-1',
        })(
          <Select placeholder="请选择账户类型：" style={{ width: '150px' }}>
            {USER_TYPE.map((item: any) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>

      <Form.Item label="账户名：">
        {getFieldDecorator('keywords', {
          normalize: (value: any) => value && value.trim(),
        })(<Input allowClear type="keywords" placeholder="请输入账户名" autoComplete="off" />)}
      </Form.Item>

      <Form.Item label="调整类型：">
        {getFieldDecorator('changeType', {
          // rules: [{ required: true, message: '请选择调整类型' }],
          initialValue: ['1009'],
        })(
          <Cascader
            allowClear={false}
            style={{ width: '300px' }}
            placeholder="请选择调整类型"
            options={ADJUST_TYPE}
            onChange={handleCascaderChange}
            changeOnSelect
          />,
        )}
      </Form.Item>

      {/* 隐藏的子类型 */}
      <Form.Item style={{ margin: 0 }}>
        {getFieldDecorator('subType', {})(<Input hidden />)}
      </Form.Item>

      {/* </div> */}
      <Form.Item label="审核状态：">
        {getFieldDecorator('status', {
          initialValue: '-1',
        })(
          <Select placeholder="请选择审核状态" style={{ width: '150px' }}>
            {CHECK_RESULT_TYPES.map((item: any) => (
              <Option key={item.value} value={item.value}>
                {item.label}
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
      </Form.Item>
    </Form>
  );
};

export const CheckForm = (props: any) => {
  const { getFieldDecorator, rowData } = props;
  return (
    <Fragment>
      <Form.Item label="调整金额：">
        {getFieldDecorator('changeType', {
          initialValue: T_CHANGE_TYPE[rowData.changeType],
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label="调整金额：">
        {getFieldDecorator('amount', {
          initialValue: rowData.amount,
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label="账户名：">
        {getFieldDecorator('username', {
          initialValue: rowData.username,
        })(<Input disabled />)}
      </Form.Item>

      <Form.Item label="申请原由：">
        {getFieldDecorator('remark', {
          initialValue: rowData.remark,
        })(<Input disabled />)}
      </Form.Item>
    </Fragment>
  );
};
