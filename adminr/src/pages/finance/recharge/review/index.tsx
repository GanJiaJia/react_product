import { Button, DatePicker, Form, Icon, Input, Select, Table } from 'antd';
import React, { ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import _ from 'lodash';
import moment from 'moment';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import ReviewDialog from './components/reviewDialog';

import styles from './style.less';
import * as tools from '@/utils/tools';
import { RECHARGE_TYPE, REVIEW_TYPE, TABLE_HEIGHT } from '../data';
import { getReviewColumns } from './utils';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

interface PropType {
  [propName: string]: any;
}

function getStatusKey(val: number, state: any) {
  switch (val) {
    case -1:
      return state.all;
    case 1:
      return state.reviewed;
    case 2:
      return state.readyReview;
    default:
      return {};
  }
}

// 初始化表头筛选数据
function initTableFilters() {
  return {
    userType: -1,
    keywords: undefined,
    username: undefined,
    reallyName: undefined,
  };
}

// 渲染表单
function renderFilters(self: any) {
  const { getFieldDecorator } = self.props.form;
  return (
    <Form layout="inline" onSubmit={self.handleSubmit} style={{ marginBottom: '20px' }}>
      {/* 提交时间： */}
      <FormItem label={<FormattedMessage id="recharge-review.filters.commit-time" />}>
        {getFieldDecorator('time', {
          initialValue: tools.initialTimeWithMill(),
        })(
          <RangePicker
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={['开始时间', '结束时间']}
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            }}
          />,
        )}
      </FormItem>

      {/* 充值单号： */}
      <FormItem label={<FormattedMessage id="recharge-review.filters.order-id" />}>
        {getFieldDecorator('orderId', {
          initialValue: '',
        })(<Input placeholder="请输入充值单号" allowClear />)}
      </FormItem>

      {/* 充值类型 */}
      <FormItem label={<FormattedMessage id="recharge-review.filters.recharge-type" />}>
        {getFieldDecorator('limitType', {
          initialValue: -1,
        })(
          <Select style={{ width: 120 }}>
            {RECHARGE_TYPE.map(item => (
              <Option value={item.value} key={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>

      {/* 审核记录 */}
      <FormItem label={<FormattedMessage id="recharge-review.filters.recharge-record" />}>
        {getFieldDecorator('status', {
          initialValue: -1,
        })(
          <Select style={{ width: 120 }}>
            {REVIEW_TYPE.map(item => (
              <Option value={item.value} key={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>

      <FormItem>
        {/* 搜索 */}
        <Button type="primary" htmlType="submit">
          {formatMessage({ id: 'recharge-review.filters.search-btn' })}
        </Button>
        {/* 重置 */}
        <Button onClick={self.handleReset}>
          {formatMessage({ id: 'recharge-review.filters.reset-btn' })}
        </Button>
      </FormItem>
    </Form>
  );
}

// 渲染表格
function renderTable(self: any) {
  const { reviewRow, loading, payload } = self.state;
  const { size, page } = payload;
  const { reviewData } = self.props.recharge;

  return (
    <Table
      loading={loading}
      className={styles.tableStyle}
      style={{ wordBreak: 'break-all' }}
      bordered
      rowKey={(record: any) => record.orderId}
      columns={getReviewColumns(self)}
      dataSource={reviewData.list}
      onChange={(pagination, filters, sorter) => self.onTableChange(pagination, filters, sorter)}
      pagination={{
        total: reviewData.total,
        pageSize: size,
        current: page,
        onShowSizeChange: self.handleSizeChange,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '200', '500'],
        showTotal: () =>
          `共 ${reviewData.total}条记录 第 ${page} / ${Math.ceil(reviewData.total / size)}`,
      }}
    />
  );
}

class Review extends React.PureComponent<PropType, StateType> {
  public state: StateType = {
    payload: {
      size: 20,
      page: 1,
    },
    reviewDialogVisible: false,
    reviewRow: {},
    tableFilters: initTableFilters(),
    imgViewDialogVisible: false,
    imgList: [],
    loading: false,
    all: {
      // 全部
      status: '-1',
    },
    reviewed: {
      // 已审核
      status: '3',
    },
    readyReview: {
      // 待审核
      status: '0',
    },
  };

  componentDidMount() {
    this.bindEffects();
    this.getReviewerListEffect();
    this.getManageListEffect();
  }

  private getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ confirm }) => (
      <div style={{ padding: '8px' }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          value={this.state.tableFilters[dataIndex]}
          onChange={e => {
            const state = _.cloneDeep(this.state);
            state.tableFilters[dataIndex] = e.target.value;
            this.setState({
              ...state,
            });
          }}
          onPressEnter={() => this.bindEffects(confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          allowClear
        />
        {/* 搜索 */}
        <Button
          type="primary"
          onClick={() => this.bindEffects(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          {formatMessage({ id: 'recharge-review.table.search-btn' })}
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });

  // 获取列表
  private bindEffects = (confirm?: any) => {
    if (confirm) confirm();
    const { page, size } = this.state.payload;
    const params = this.props.form.getFieldsValue();

    // 处理审核状态数据
    const { status } = params;
    const statusData = getStatusKey(status, { ...this.state });
    delete params.status;
    Object.keys(statusData).forEach(item => {
      params[item] = statusData[item];
    });
    const obj = tools.handleSendData({ ...this.state.tableFilters, ...params });

    this.props.dispatch({
      type: 'recharge/reviewDataEffect',
      payload: {
        page,
        size,
        userType: -1,
        ...obj,
      },
      callback: () => this.setState({ loading: false }),
    });
    this.setState({ loading: true });
  };

  // 获取申请人
  private getReviewerListEffect = () => {
    this.props.dispatch({
      type: 'recharge/reviewerListEffect',
    });
  };

  // 获取审核人
  private getManageListEffect = () => {
    this.props.dispatch({
      type: 'recharge/getReviewManageListEffect',
    });
  };

  private onTableChange = (pagination: any, filters: any[], sorter?: any) => {
    const { current, pageSize } = pagination;
    const tableFilters = { ...this.state.tableFilters };
    Object.keys(filters).forEach(key => {
      const { length } = filters[key];
      const str = length > 1 ? filters[key].join(',') : filters[key]['0'];
      const dataStr = length > 1 ? str.substring(0, str.length - 1) : str;
      if (key === 'sucReqOperator') {
        tableFilters.applicant = dataStr;
      } else {
        tableFilters[key] = dataStr;
      }
    });

    this.setState(
      {
        tableFilters: { ...tableFilters },
        payload: {
          page: current,
          size: pageSize,
        },
      },
      () => this.bindEffects(),
    );
  };

  private handlePageChange = (page: number) => {
    const { payload } = this.state;
    const params = { ...payload, page };
    this.setState({ payload: params }, () => {
      this.bindEffects();
    });
  };

  private handleSizeChange = (page: number, size: number) => {
    const payload = { ...this.state.payload, size };
    this.setState({ size }, () => {
      this.bindEffects();
    });
  };

  private handleDialogClose = () => {
    this.setState({
      reviewDialogVisible: false,
    });
  };

  private handleDialogConfirm = () => {
    this.setState({
      reviewDialogVisible: false,
    });
    this.bindEffects();
  };

  private handleReview = (record: object) => {
    this.setState({
      reviewRow: record,
      reviewDialogVisible: true,
    });
  };

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.bindEffects();
  };

  private handleReset = () => {
    this.props.form.resetFields();
    const state = { ...this.state };
    state.tableFilters = initTableFilters();
    this.setState({ ...state }, () => {
      this.bindEffects();
    });
  };

  public render(): ReactNode {
    const { reviewRow, reviewDialogVisible, imgViewDialogVisible, imgList } = this.state;

    return (
      <div className={styles.reviewContainer}>
        {renderFilters(this)}
        {renderTable(this)}
        {reviewDialogVisible && !_.isEmpty(reviewRow) ? (
          <ReviewDialog<>
            data={reviewRow}
            confirm={this.handleDialogConfirm}
            close={this.handleDialogClose}
            visible={reviewDialogVisible}
          />
        ) : null}
      </div>
    );
  }
}

const ReviewContainer = Form.create({ name: 'rechargeReview' })(Review);

export default withRouter(
  connect(({ recharge, global }: { recharge: any }) => ({
    recharge,
    btns: global.btns,
  }))(ReviewContainer),
);
