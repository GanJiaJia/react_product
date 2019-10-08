import { Button, Form, Input, Select, Table } from 'antd';
import React, { Fragment, ReactNode } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { ESCROW_STATUS, SWITCH_STATUS, TABLE_HEIGHT } from '../data';
import ChangeAppStatusDialog from './components/changeAppStatusDialog';
import EditDialog from './components/editDialog';
import LevelDetailDialog from './components/levelDetailDialog';
import MerchantOptDialog from './components/merchantOptDialog';
import Mtable from '../components/Mtable/index';

import { getMerchantAppColumns, setDispatchData } from './utils';
import { getTableFiltersData } from '../utils';
import { setCommonFun } from '@/utils/tools';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const FormItem = Form.Item;
const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

// 初始化表头筛选数据
function initTableFilters() {
  return {
    limitType: '-1', // 渠道类型
    levelIds: undefined, // 层级类型
    clientType: '-1', // 应用端
    recommendStatus: '-1', // 推荐状态
    topStatus: '-1', // 置顶状态
  };
}

// 渲染表单
function renderFilters(self: any) {
  const { getFieldDecorator } = self.props.form;
  const { merchantData } = self.props.recharge;

  return (
    <Form layout="inline" onSubmit={self.handleSubmit}>
      {/* 三方平台 */}
      <FormItem label={<FormattedMessage id="application.form-merchant" />}>
        {getFieldDecorator('channelId', {
          initialValue: -1,
        })(
          <Select
            style={{ width: 120 }}
            showSearch
            filterOption={(input, option: any) => option.props.children.indexOf(input) >= 0}
          >
            <Option value={-1}>全部</Option>
            {merchantData.map((item: any) => (
              <Option value={item.channelId} key={item.channelId}>
                {item.channelName}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
      {/* 商户号 */}
      <FormItem label={<FormattedMessage id="application.form-merchant-code" />}>
        {getFieldDecorator('merchantCode', {
          initialValue: '',
        })(
          <Input
            placeholder={formatMessage({ id: 'application.form-merchant-code-placeholder' })}
          />,
        )}
      </FormItem>
      {/* 上下架状态 */}
      <FormItem label={<FormattedMessage id="application.form-escrow-status" />}>
        {getFieldDecorator('status', {
          initialValue: -1,
        })(
          <Select style={{ width: 120 }}>
            {ESCROW_STATUS.map((item: any) => (
              <Option value={item.value} key={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
      {/* 开关状态 */}
      <FormItem label={<FormattedMessage id="application.form-switch-status" />}>
        {getFieldDecorator('openStatus', {
          initialValue: -1,
        })(
          <Select style={{ width: 120 }}>
            {SWITCH_STATUS.map((item: any) => (
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
          <FormattedMessage id="application.search-btn" />
        </Button>
        {/* 重置 */}
        <Button
          style={{ marginLeft: '5px' }}
          onClick={() => {
            self.props.form.resetFields();
            self.setState({ tableFilters: initTableFilters() }, () => {
              // self.getList();
              self.refMtable.getTableData();
            });
          }}
        >
          <FormattedMessage id="application.reset-btn" />
        </Button>
      </FormItem>
    </Form>
  );
}

// 渲染表格
function renderTable(self: any) {
  const columns = getMerchantAppColumns(self);
  const { selectedRowKeys, loading } = self.state;
  const { page, size } = self.state.payload;
  const { list, total } = self.props.recharge.merchantAppData;

  const { merchantAppData } = self.props.recharge;

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKey: any, selectedRows: any) => {
      self.onSelectChange(selectedRowKey, selectedRows);
    },
  };

  return (
    <Mtable
      rowClassName={(record, index) => {
        let rowStyle: any = '';
        if (record.successAmount > record.dailyLimit) rowStyle = styles.warn;
        return rowStyle;
      }}
      style={{ wordBreak: 'break-all' }}
      setRowSelection={self.setRowSelection}
      rowSelection={rowSelection}
      dataSource={merchantAppData}
      columns={getMerchantAppColumns(self)}
      dispatch={self.props.dispatch}
      effectType="recharge/merchantAppListEffect"
      validateFields={self.props.form.validateFieldsAndScroll}
      setEffectParams={self.setEffectParams}
      scroll={{ x: 2000 }}
      ref={(element: ReactNode) => {
        self.refMtable = element;
      }}
    />
  );
}

// 渲染按钮
function renderBtnGroup(self: any) {
  const { selectedRows } = self.state;
  const merchantIdList = _.map(selectedRows, item => item.merchantId);
  const merchangIds = merchantIdList.join(',');
  return (
    <div className={styles.btnGroup}>
      {checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-create') ? (
        // 新增三方平台应用
        <Button
          type="primary"
          htmlType="submit"
          icon="plus"
          onClick={() => {
            self.setState({ editDialogVisible: true, isAdd: true });
          }}
        >
          <FormattedMessage id="application.add-merchant-btn" />
        </Button>
      ) : null}

      {checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-batch-enable') ? (
        // 批量上架
        <Button
          type="primary"
          htmlType="submit"
          disabled={selectedRows.length === 0}
          onClick={() => {
            self.setState({ isBatch: true, isSetUp: true, appStatusDialogVisible: true });
          }}
        >
          <FormattedMessage id="application.batch-up-btn" />
        </Button>
      ) : null}

      {checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-batch-disable') ? (
        // 批量下架
        <Button
          type="primary"
          htmlType="submit"
          disabled={selectedRows.length === 0}
          onClick={() => {
            self.setState({ isBatch: true, isSetUp: false, appStatusDialogVisible: true });
          }}
        >
          <FormattedMessage id="application.batch-down-btn" />
        </Button>
      ) : null}
    </div>
  );
}

@setCommonFun
class MerchantApplication extends React.PureComponent<StateType> {
  public refMtable: any;

  public state = {
    isBatch: false,
    isAdd: false,
    isSetUp: false,
    editDialogVisible: false,
    appStatusDialogVisible: false,
    levelDetailDialogVisible: false,
    selectedRows: [],
    selectedRowKeys: [],
    rowData: {},
    payload: {
      page: 1,
      size: 20,
      status: -1, // 上下架状态
      openStatus: -1, // 开关状态
    },
    tableFilters: initTableFilters(),
    merchantOptDialogVisible: false,
    dialogType: 1, // 1.上架 2.下架 3.删除 4.置顶 5.推荐
    loading: false,
  };

  componentDidMount() {
    this.getMerchantListEffect();
    this.getLevel();
  }

  // 处理表头筛选项
  private setEffectParams = (filters?: any, sorter?: any) => {
    if (filters) {
      const tableFiltersData = getTableFiltersData(filters);
      this.setState({ tableFilters: tableFiltersData });
      return tableFiltersData || {};
    }
    return this.state.tableFilters || {};
  };

  // 获取商户列表
  private getMerchantListEffect = () => {
    this.props.dispatch({
      type: 'recharge/merchantListEffect',
    });
  };

  // 处理表格数据多选
  private onSelectChange = (selectedRowKeys: any[], selectedRows: any[]) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  // 搜索
  private handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.refMtable.getTableData();
  };

  // 关闭弹窗
  private handleDialogClose = (name: string) => {
    const newState = { ...this.state };
    newState[name] = false;
    newState.rowData = {};
    newState.isAdd = false;
    this.setState({
      ...newState,
    });
  };

  // 保存对三方商户的处理 dialogType: 1.上架 2.下架 3.删除 4.置顶 5.推荐
  private handleOptSubmit = () => {
    const { dialogType, rowData, selectedRowKeys, isBatch } = this.state;
    const dispatchData = setDispatchData(dialogType, isBatch, selectedRowKeys, rowData);
    this.props.dispatch({
      ...dispatchData,
      callback: () => {
        // this.getList();
        this.refMtable.getTableData();
      },
    });
    this.handleDialogClose('merchantOptDialogVisible');
  };

  // 保存编辑
  private hanleEditSubmit = (payload: any) => {
    this.props.dispatch({
      type: 'recharge/setMerchantEditEffect',
      payload,
      callback: () => {
        this.refMtable.getTableData();
      },
    });
    this.handleDialogClose('editDialogVisible');
  };

  // 添加三方商户
  private handleAdd = (data: any) => {
    this.props.dispatch({
      type: 'recharge/setMerchantAppAddEffect',
      payload: data,
      callback: () => {
        this.refMtable.getTableData();
        this.setState({
          editDialogVisible: false,
          isAdd: false,
        });
      },
    });
  };

  // 获取商户号
  private getShopList = (payload?: any) => {
    const data = { type: 'recharge/getShopEffect' };
    if (payload) {
      data.payload = payload;
    }
    this.props.dispatch({ ...data });
  };

  // 获取三方平台
  private getShopEffect = (limitType = 0) => {
    this.props.dispatch({
      type: 'recharge/setMerchantHasSetEffect',
      payload: {
        limitType,
      },
    });
  };

  // 获取商户层级
  private getLevel = () => {
    this.props.dispatch({
      type: 'recharge/getLevelEffect',
    });
  };

  // 批量上/下架三方充值应用
  private getShopHasSetEffect = () => {
    const { isSetUp, selectedRows } = this.state;
    let merchantIdList = [];
    merchantIdList = _.map(selectedRows, item => item.id);
    const merchantAppIds = merchantIdList.join(',');
    this.props.dispatch({
      type: 'recharge/merchantStatusEffect',
      payload: {
        merchantAppIds,
        status: isSetUp ? 0 : 1,
      },
      callback: () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          isSetUp: false,
        });
        this.refMtable.getTableData();
      },
    });
    this.handleDialogClose('appStatusDialogVisible');
  };

  // 设置表格多选
  private setRowSelection = () => {
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  render(): ReactNode {
    const {
      merchantOptDialogVisible,
      editDialogVisible,
      appStatusDialogVisible,
      levelDetailDialogVisible,
      isBatch,
      dialogType,
      rowData,
      isAdd,
      isSetUp,
    } = this.state;

    return (
      <Fragment>
        {renderFilters(this)}
        {renderBtnGroup(this)}
        {renderTable(this)}

        <MerchantOptDialog<>
          visible={merchantOptDialogVisible}
          cancel={() => {
            this.handleDialogClose('merchantOptDialogVisible');
          }}
          confirm={this.handleOptSubmit}
          isBatch={isBatch}
          dialogType={dialogType}
          rowData={rowData}
        />

        {editDialogVisible ? (
          <EditDialog<>
            visible={editDialogVisible}
            isAdd={isAdd}
            rowData={rowData}
            getShopList={this.getShopList}
            cancel={() => {
              this.handleDialogClose('editDialogVisible');
            }}
            confirm={isAdd ? this.handleAdd : this.hanleEditSubmit}
          />
        ) : null}

        <ChangeAppStatusDialog<>
          visible={appStatusDialogVisible}
          isSetUp={isSetUp}
          confirm={() => {
            this.getShopHasSetEffect();
          }}
          cancel={() => {
            this.handleDialogClose('appStatusDialogVisible');
          }}
        />

        {levelDetailDialogVisible ? (
          <LevelDetailDialog
            visible={levelDetailDialogVisible}
            rowData={rowData}
            cancel={() => {
              this.handleDialogClose('levelDetailDialogVisible');
            }}
          />
        ) : null}
      </Fragment>
    );
  }
}

const MerchantApplicationContainer = Form.create({ name: 'merchantApplication' })(
  MerchantApplication,
);

export default withRouter(
  connect(({ recharge, global }: { recharge: any; global: any }) => ({
    recharge,
    btns: global.btns,
  }))(MerchantApplicationContainer),
);
