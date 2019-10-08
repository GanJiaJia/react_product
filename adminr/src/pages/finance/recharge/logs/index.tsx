import { Button, DatePicker, Form, Input, Select } from 'antd';
import React, { Fragment, ReactNode } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { setCommonFun } from '@/utils/tools';

import DetailDialog from '@/pages/finance/recharge/components/detailDialog/index';
import Mtable from '../components/Mtable/index';
import { getLogsColumns } from './utils';
import { getTableFiltersData, setStatusData } from '../utils';
import { getMerchant } from '../service';
import { TABLE_HEIGHT, SUCCESS_CODE } from '../data';

interface StateType {
  [propName: string]: any;
}

interface PropType {
  [propName: string]: any;
}

// 初始化表单筛选项
function initTableFilters(): object {
  return {
    merchant: undefined,
    subStatus: '1,2,3,4,5,6,7,8,9,10,11', // 订单状态
    remark: undefined,
    limitType: '-1', // 充值类型  -1：全部 1：普通充值 2：大额充值
  };
}

// 初始化时间
function initialTimeWithMill() {
  const lastMoment = moment().subtract(2, 'days');
  lastMoment.set({ hour: 0, minute: 0, second: 0 });
  return [lastMoment, moment('23:59:59', 'HH:mm:ss')];
}

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

@setCommonFun
class Logs extends React.PureComponent<PropType, StateType> {
  public state: StateType = {
    tableFilters: initTableFilters(),
    detailDialogVisible: false,
    rowData: {},
    isClick: false,
    merchantList: [],
  };

  public refMtable: any;

  componentDidMount() {
    this.getMerchantList();
  }

  // 渲染表单
  private renderFilters = (): ReactNode => {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('dateType', {
            initialValue: 1,
          })(
            <Select style={{ width: 120 }}>
              {/* 充值时间 */}
              <Option value={1}>
                {formatMessage({ id: 'recharge-logs.filters.recharge-time' })}
              </Option>
              {/* 到账时间 */}
              <Option value={2}>
                {formatMessage({ id: 'recharge-logs.filters.arrival-time' })}
              </Option>
            </Select>,
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('time', {
            initialValue: initialTimeWithMill(),
          })(
            <RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={[
                formatMessage({ id: 'recharge-logs.filters.start-time' }),
                formatMessage({ id: 'recharge-logs.filters.end-time' }),
              ]}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
              }}
            />,
          )}
        </FormItem>

        {/* 充值单号 */}
        <FormItem label={<FormattedMessage id="recharge-logs.filters.order-id" />}>
          {getFieldDecorator('orderId', {
            initialValue: '',
          })(<Input placeholder={formatMessage({ id: 'recharge-logs.filters.order-id' })} />)}
        </FormItem>

        {/* 账户名 */}
        <FormItem label={<FormattedMessage id="recharge-logs.filters.account-name" />}>
          {getFieldDecorator('userAccount', {
            initialValue: '',
          })(
            <Input
              placeholder={formatMessage({ id: 'recharge-logs.filters.account-name-placeholder' })}
            />,
          )}
        </FormItem>

        <FormItem>
          {/* 查询 */}
          <Button type="primary" htmlType="submit">
            {formatMessage({ id: 'recharge-logs.filters.search-btn' })}
          </Button>
          {/* 重置 */}
          <Button style={{ marginLeft: '10px' }} onClick={this.handleReset}>
            {formatMessage({ id: 'recharge-logs.filters.reset-btn' })}
          </Button>
        </FormItem>
      </Form>
    );
  };

  renderTable = (): ReactNode => {
    const { isClick } = this.state;

    const { logsData } = this.props.recharge;
    const style = !isClick
      ? { display: 'none', wordBreak: 'break-all' }
      : { wordBreak: 'break-all' };

    return (
      <Mtable
        style={style}
        dataSource={logsData}
        columns={getLogsColumns(this)}
        dispatch={this.props.dispatch}
        effectType="recharge/getLogsListEffect"
        validateFields={this.props.form.validateFieldsAndScroll}
        setEffectParams={this.setEffectParams}
        scroll={{ x: 2400 }}
        ref={(element: ReactNode) => {
          this.refMtable = element;
        }}
      />
    );
  };

  private handleSubmit = (e: React.SyntheticEvent) => {
    const { isClick } = this.state;
    e.preventDefault();
    this.refMtable.getTableData();
    if (!isClick) {
      this.setState({ isClick: true });
    }
  };

  // 获取已经配置商户的充值渠道账号
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

  // 重置
  private handleReset = () => {
    this.props.form.resetFields();
    this.setState(
      {
        tableFilters: initTableFilters(),
      },
      () => {
        this.refMtable.getTableData();
      },
    );
  };

  // 处理表头筛选项
  private setEffectParams = (filters?: any, sorter?: any) => {
    if (filters) {
      const tableFiltersData: any = getTableFiltersData(filters);
      const { subStatus } = tableFiltersData;
      if (!subStatus.length) {
        tableFiltersData.subStatus = '1,2,3,4,5,6,7,8,9,10,11';
      }
      this.setState({ tableFilters: tableFiltersData });

      let newTableFiltersData = { ...tableFiltersData };
      newTableFiltersData = setStatusData(newTableFiltersData);
      const { status } = newTableFiltersData;
      if (status && status.split(',').length === 5) {
        delete newTableFiltersData.subStatus;
      }
      return { ...newTableFiltersData, paymentId: '-1' } || {};
    }
    let tableFiltersData = _.cloneDeep(this.state.tableFilters);
    tableFiltersData = setStatusData(tableFiltersData);
    const { status } = tableFiltersData;
    if (status && status.split(',').length === 5) {
      delete tableFiltersData.subStatus;
    }
    return { ...tableFiltersData, paymentId: '-1' } || {};
  };

  render(): ReactNode {
    const { detailDialogVisible, rowData, merchantList } = this.state;
    return (
      <Fragment>
        {this.renderFilters()}
        {this.renderTable()}

        {detailDialogVisible ? (
          <DetailDialog
            visible={detailDialogVisible}
            rowData={rowData}
            close={() => {
              this.setState({
                detailDialogVisible: false,
                rowData: {},
              });
            }}
          />
        ) : null}
      </Fragment>
    );
  }
}

const LogsContainer = Form.create({ name: 'rechargeLogs' })(Logs);

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(LogsContainer),
);
