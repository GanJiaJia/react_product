import { Button, DatePicker, Form, Icon, Input, Select, Table } from 'antd';
import React, { Fragment } from 'react';
import _ from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { setCommonFun, initialTimeWithMill } from '@/utils/tools';

import RepairDetailDialog from './components/detailDialog';
import CreateDetailDialog from './components/createDialog';
import DetailDialog from '../components/detailDialog';

import { getMerchant } from '../service';
import { getRepairColumns, spliceStr } from './utils';
import { checkShowOpt, getTableFiltersData, setStatusData } from '../utils';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';
import { TABLE_HEIGHT, PAGE_SIZE_OPTION, SUCCESS_CODE } from '../data';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

interface PropType {
  [propName: string]: any;
}

function setStatus(val: number) {
  const tableFiltersData = { subStatus: '' };
  switch (val) {
    case 1:
      tableFiltersData.subStatus = '2,3,4,5,6,7,10,11,12';
      break;
    case 2:
      tableFiltersData.subStatus = '2,3,4';
      break;
    default:
      break;
  }
  return tableFiltersData;
}

// 初始化表头数据
function initTableFilters() {
  return {
    reallyName: undefined, // 姓名
    subStatus: '2,3,4,5,6,7,10,11,12', // 订单状态
  };
}

// 渲染表单
function renderFilters(self: any) {
  const { getFieldDecorator } = self.props.form;

  return (
    <Form layout="inline" onSubmit={self.handleSubmit}>
      {/* 提交时间 */}
      <FormItem label={<FormattedMessage id="recharge-repair-filters.commit-time" />}>
        {getFieldDecorator('time', {
          initialValue: initialTimeWithMill(),
        })(
          <RangePicker
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            }}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={[
              formatMessage({ id: 'recharge-repair-filters.time-placeholder-start-time' }),
              formatMessage({ id: 'recharge-repair-filters.time-placeholder-end-time' }),
            ]}
          />,
        )}
      </FormItem>

      {/* 账户名 */}
      <FormItem label={<FormattedMessage id="recharge-repair-filters.user-name" />}>
        {getFieldDecorator('userAccount', {
          initialValue: '',
        })(
          <Input
            placeholder={formatMessage({ id: 'recharge-repair-filters.user-name-placeholder' })}
            allowClear
          />,
        )}
      </FormItem>

      {/* 充值单号 */}
      <FormItem label={<FormattedMessage id="recharge-repair-filters.order-id" />}>
        {getFieldDecorator('keywords', {
          initialValue: '',
        })(
          <Input
            placeholder={formatMessage({ id: 'recharge-repair-filters.order-id-placeholder' })}
            allowClear
          />,
        )}
      </FormItem>

      {/* 充值类型 */}
      <FormItem label={<FormattedMessage id="recharge-repair-filters.recharge-type" />}>
        {getFieldDecorator('limitType', {
          initialValue: -1,
        })(
          <Select style={{ width: 120 }}>
            {/* 全部 */}
            <Option value={-1}>{formatMessage({ id: 'recharge-repair-filters.all' })}</Option>
            {/* 普通充值 */}
            <Option value={0}>
              {formatMessage({ id: 'recharge-repair-filters.recharge-type-normal' })}
            </Option>
            {/* 大额充值 */}
            <Option value={1}>
              {formatMessage({ id: 'recharge-repair-filters.recharge-type-large' })}
            </Option>
          </Select>,
        )}
      </FormItem>

      {/* 补单记录： */}
      <FormItem label={<FormattedMessage id="recharge-repair-filters.repair-record" />}>
        {getFieldDecorator('status', {
          initialValue: 1,
        })(
          <Select
            style={{ width: 120 }}
            onChange={(val: number) => {
              const tableFilterData = setStatus(val);
              const { tableFilters } = self.state;
              self.setState({ tableFilters: { ...tableFilters, ...tableFilterData } });
            }}
          >
            {/* 全部 */}
            <Option value={1}>{formatMessage({ id: 'recharge-repair-filters.all' })}</Option>
            {/* 已补单 */}
            <Option value={2}>
              {formatMessage({ id: 'recharge-repair-filters.repair-record-complete' })}
            </Option>
          </Select>,
        )}
      </FormItem>

      <FormItem>
        {/* 搜索 */}
        <Button type="primary" htmlType="submit">
          {formatMessage({ id: 'recharge-repair-filters.search-btn' })}
        </Button>
        {/* 重置 */}
        <Button style={{ marginLeft: '10px' }} onClick={self.handleReset}>
          {formatMessage({ id: 'recharge-repair-filters.reset-btn' })}
        </Button>
        {checkPermission(self.props.btns, 'new-finance-recharge-repair-create') ? (
          // 创建订单
          <Button style={{ marginLeft: '10px' }} onClick={self.handleCreate}>
            {formatMessage({ id: 'recharge-repair-filters.create-order-btn' })}
          </Button>
        ) : null}
      </FormItem>
    </Form>
  );
}

// 渲染表格
function renderTable(self: any) {
  const { loading } = self.state;
  const { size, page } = self.state.payload;
  const { repairData } = self.props.recharge;

  return (
    <Table
      loading={loading}
      className={styles.tableStyle}
      style={{ wordBreak: 'break-all' }}
      bordered
      rowKey={(record: any) => record.orderId}
      columns={getRepairColumns(self)}
      dataSource={repairData.list}
      onChange={self.handleChange}
      pagination={{
        total: repairData.total,
        pageSize: size,
        current: page,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: PAGE_SIZE_OPTION,
        showTotal: () =>
          `共 ${repairData.total}条记录 第 ${page} / ${Math.ceil(repairData.total / size)}`,
      }}
    />
  );
}

@setCommonFun
class Repair extends React.PureComponent<PropType, StateType> {
  public state: StateType = {
    loading: false,
    payload: {
      size: 20,
      page: 1,
      // userType: -1, // 账户类型
      dateType: 1, // 1 充值时间 2 到账时间
      searchType: 1, // 充值单号搜索
    },
    tableFilters: initTableFilters(),
    isClick: false,
    all: {
      // 全部
      status: '0,2,3,4',
      subStatus: '2,3,4,5,6',
    },
    alreadyMakeUp: {
      // 已补单状态
      subStatus: '2,3,4',
    },
    rowData: {},
    dialogVisible: false,
    isShowOpt: false,
    createDialogVisible: false,
    detailDialogVisible: false,
    isRepair: false,
    merchantList: [],
  };

  componentDidMount() {
    this.getMerchantList();
  }

  // 表头的输入框搜索
  private getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ confirm }) => (
      <div style={{ padding: 8 }}>
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
          onPressEnter={() => this.getList(confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          allowClear
        />
        {/* 搜索 */}
        <Button
          type="primary"
          onClick={() => this.getList(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          {formatMessage({ id: 'recharge-repair-filters.search-btn' })}
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });

  // 获取表格数据
  private getList = (confirm?: any) => {
    if (confirm) confirm();
    const { alreadyMakeUp, all } = this.state;
    const params = this.props.form.getFieldsValue();
    const { payload, tableFilters } = this.state;
    let tableFiltersData = _.cloneDeep(tableFilters);
    const { subStatus } = tableFiltersData;

    // 如果表头有针对订单状态做筛选
    if (subStatus && subStatus.length) {
      tableFiltersData = setStatusData(tableFiltersData);
    }
    const sendData = this.setFiltersData(payload, tableFiltersData, params);
    this.bindEffects(sendData);
  };

  private bindEffects = (payload: object) => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'recharge/repairDataEffect',
      payload,
      callback: subStatus => {
        this.setState({ loading: false });
      },
    });
  };

  // 获取收款商户
  private getMerchantList = () => {
    getMerchant().then((res: any) => {
      if (res) {
        const { code, data } = res;
        if (code === SUCCESS_CODE && data) {
          this.setState({ merchantList: data });
        }
      }
    });
  };

  // 获取银行列表
  private getBankListEffect = (payload: object) => {
    this.props.dispatch({
      type: 'recharge/setWithdrawBankEffect',
      payload,
    });
  };

  // 创建订单 - 保存
  private createOrderEffect = (payload: object) => {
    this.props.dispatch({
      type: 'recharge/repairCreateEffect',
      payload,
      callback: () => {
        this.setState({ createDialogVisible: false });
        this.getList();
      },
    });
  };

  // 表单提交
  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({
      isClick: true,
    });
    // this.bindEffects();
    this.getList();
  };

  // 表单重置
  private handleReset = () => {
    this.props.form.resetFields();
    this.setState({ tableFilters: initTableFilters() }, () => {
      this.getList();
    });
  };

  // 补单操作
  private handleDetail = (rowData: any) => {
    const isShowOpt = checkShowOpt(rowData);
    const { channelId } = rowData;
    if (channelId === 1001 || channelId === 1003) {
      this.getBankListEffect({ channelId: rowData.channelId, rechargeType: 0 });
    }
    this.setState({
      dialogVisible: true,
      rowData,
      isShowOpt,
      isRepair: true,
    });
  };

  private handleDetailDialogClose = () => {
    this.setState({
      dialogVisible: false,
      rowData: {},
    });
  };

  private handleCreate = () => {
    this.setState({
      createDialogVisible: true,
    });
  };

  private handleChange = (pagination, filters) => {
    const { tableFilters } = this.state;
    const { current, pageSize } = pagination;
    const tableFiltersData = getTableFiltersData(filters);
    if (!tableFiltersData.subStatus) {
      tableFiltersData.subStatus = '2,3,4,5,6,7,10,11,12';
    }
    const { payload } = this.state;
    const data = { ...payload, size: pageSize, page: current };
    this.setState({ payload: data, tableFilters: { ...tableFilters, ...tableFiltersData } }, () => {
      this.getList();
    });
  };

  render() {
    const {
      isClick,
      dialogVisible,
      createDialogVisible,
      detailDialogVisible,
      rowData,
      isShowOpt,
    } = this.state;

    return (
      <Fragment>
        {renderFilters(this)}
        {isClick && renderTable(this)}
        {dialogVisible ? (
          <RepairDetailDialog<>
            visible={dialogVisible}
            data={rowData}
            showOpt={isShowOpt}
            confirm={() => {
              this.handleDetailDialogClose();
              this.getList();
            }}
            close={this.handleDetailDialogClose}
          />
        ) : null}
        {createDialogVisible ? (
          <CreateDetailDialog<>
            visible={createDialogVisible}
            cancle={() => {
              this.setState({ createDialogVisible: false });
            }}
            confirm={this.createOrderEffect}
          />
        ) : null}
        {detailDialogVisible ? (
          <DetailDialog<>
            visible={detailDialogVisible}
            rowData={rowData}
            close={() => this.setState({ detailDialogVisible: false, rowData: {} })}
          />
        ) : null}
      </Fragment>
    );
  }
}

const RepairContainer = Form.create({ name: 'rechargeRepair' })(Repair);

export default withRouter(
  connect(({ recharge, global }: { recharge: any; global: any }) => ({
    recharge,
    btns: global.btns,
  }))(RepairContainer),
);
