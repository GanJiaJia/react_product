import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import _ from 'lodash';
import { formatMessage } from 'umi-plugin-react/locale';
import { StateType, toRechargeStatus, toStatus, toMerchantStatus } from '../utils';
import * as tools from '@/utils/tools';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';
import { OPT_TYPE } from '../data';

function toOptType(val: number) {
  const obj = _.find(OPT_TYPE, (item: any) => item.value === val);
  return obj ? obj.title : '';
}

// 补单审核 - 列数据
export const getReviewColumns = (self: any) => {
  const { reviewerList, manageList } = self.props.recharge.reviewData;
  const manageListData = _.map(manageList, value => ({ text: value, value }));
  const reviewerListData = _.map(reviewerList, value => ({ text: value, value }));
  const { applicant, auditor } = self.state.tableFilters;
  const applicantFilterData = applicant ? [applicant] : undefined;
  const auditorFilterData = auditor ? [auditor] : undefined;

  const columns: ColumnProps<StateType>[] = [
    // 提交时间
    {
      title: formatMessage({ id: 'recharge-review.table.commit-time' }),
      dataIndex: 'sucReqTime',
      width: 110,
      render: text => tools.toTime(text),
    },
    // 充值单号
    {
      title: formatMessage({ id: 'recharge-review.table.order-id' }),
      dataIndex: 'orderId',
    },
    // 充值金额
    {
      title: formatMessage({ id: 'recharge-review.table.recharge-amount' }),
      dataIndex: 'amount',
      width: 110,
      render: text => tools.currency(text),
    },
    // 手续费
    {
      title: formatMessage({ id: 'recharge-review.table.fee' }),
      dataIndex: 'fee',
      width: 110,
      render: text => tools.currency(text),
    },
    // 到账金额
    {
      title: formatMessage({ id: 'recharge-review.table.arrival-amount' }),
      dataIndex: 'payAmount',
      width: 110,
      render: text => tools.currency(text),
    },
    // 账户名
    {
      title: formatMessage({ id: 'recharge-review.table.account-name' }),
      dataIndex: 'username',
      width: 90,
      ...self.getColumnSearchProps('username'),
    },
    // 姓名
    {
      title: formatMessage({ id: 'recharge-review.table.really-name' }),
      dataIndex: 'reallyName',
      width: 90,
      ...self.getColumnSearchProps('reallyName'),
    },
    // 充值类型
    {
      title: formatMessage({ id: 'recharge-review.table.recharge-type' }),
      dataIndex: 'limitType',
      width: 80,
      render: text => toRechargeStatus(text),
    },
    // 操作类型
    {
      title: formatMessage({ id: 'recharge-review.table.operation-type' }),
      dataIndex: 'dataType',
      width: 80,
      render: text => toOptType(text),
    },
    // 备注
    {
      title: formatMessage({ id: 'recharge-review.table.remark' }),
      dataIndex: 'sucApvRemark',
      width: 100,
      render: (text, record) => {
        const { sucStatus, sucReqRemark, sucApvRemark } = record;
        return sucStatus === 0 ? sucReqRemark : sucApvRemark;
      },
    },
    // 申请人
    {
      title: formatMessage({ id: 'recharge-review.table.applicant' }),
      dataIndex: 'sucReqOperator',
      width: 90,
      filters: reviewerListData,
      filterMultiple: false,
      filteredValue: applicantFilterData,
      filtered: true,
    },
    // 审核状态
    {
      title: formatMessage({ id: 'recharge-review.table.review-status' }),
      dataIndex: 'sucStatus',
      width: 90,
      render: text => toStatus(text),
    },
    // 审核人
    {
      title: formatMessage({ id: 'recharge-review.table.review-person' }),
      dataIndex: 'auditor',
      width: 90,
      render: (text, record) => record.sucApvOperator,
      filters: manageListData,
      filterMultiple: false,
      filteredValue: auditorFilterData,
    },
    // 操作
    {
      title: formatMessage({ id: 'recharge-review.table.operation' }),
      width: 110,
      render: (text, record) => {
        const { sucStatus } = record;
        const element =
          sucStatus === 0 ? (
            // 审核
            <span className={styles.tableBtn} onClick={() => self.handleReview(record)}>
              {formatMessage({ id: 'recharge-review.table.review-btn' })}
            </span>
          ) : (
            tools.toTime(record.sucApvTime)
          );
        return checkPermission(self.props.btns, 'new-finance-recharge-repair-audit-do')
          ? element
          : null;
      },
    },
  ];
  return columns;
};

// 补单审核 -- 审核 -- 第三方订单详情列数据
export const getReviewMerColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    // 充值时间
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-recharge-time' }),
      dataIndex: 'createDate',
      key: 'createDate',
      width: 110,
      render: text => tools.toTime(text),
    },
    // 充值单号
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-order-id' }),
      dataIndex: 'orderId',
    },
    // 状态
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-status' }),
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: text => toMerchantStatus(text),
    },
    // 三方充值金额
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-third-recharge-amount' }),
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: text => tools.currency(text),
    },
    // 姓名
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-really-name' }),
      dataIndex: 'keyword',
      key: 'keyword',
      width: 90,
      render: text => (text && text.split('|')['0']) || '',
    },
    // 操作
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-operation' }),
      dataIndex: 'opt',
      key: 'opt',
      width: 120,
      render: () => (
        // 验证三方状态
        <span className={styles.btnLine} onClick={() => self.handleCheck(self.props.data)}>
          验证三方状态
        </span>
      ),
    },
  ];
  return columns;
};

// 补单审核 -- 审核 -- 系统订单详情列数据
export const getReviewSysColumns = (self: any) => {
  const columns: ColumnProps<StateType>[] = [
    // 充值时间
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-recharge-time' }),
      dataIndex: 'sucReqTime',
      key: 'sucReqTime',
      width: 110,
      render: text => tools.toTime(text),
    },
    // 充值单号
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-order-id' }),
      dataIndex: 'orderId',
    },
    // 状态
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-status' }),
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: text => toStatus(text),
    },
    // 充值金额
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-recharge-amount' }),
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: text => tools.currency(text),
    },
    // 账户名
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-account-name' }),
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    // 姓名
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-really-name' }),
      dataIndex: 'reallyName',
      key: 'reallyName',
      width: 90,
    },
    // 补单金额
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-repair-amount' }),
      dataIndex: 'sucReqAmount',
      key: 'sucReqAmount',
      width: 120,
      render: text => tools.currency(text),
    },
    // 备注
    {
      title: formatMessage({ id: 'recharge-review-dialog.table-remark' }),
      dataIndex: 'sucReqRemark',
      key: 'sucReqRemark',
      width: 100,
    },
  ];
  return columns;
};
