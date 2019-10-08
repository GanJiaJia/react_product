import { Button, Form, Input, Select, Switch, Table, message } from 'antd';
import React, { Fragment, ReactNode } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { setCommonFun, handleMessage } from '@/utils/tools';
import { getMerchantSetColumns } from './utils';
import StatusDialog from './components/statusDialog';
import EditDialog from './components/editDialog';
import StatusChangeDialog from './components/statusChangeDialog';
import Mtable from '../components/Mtable/index';

import { CHANNEL_TYPE, SWITCH_STATUS, TABLE_HEIGHT, SUCCESS_CODE } from '../data';
import styles from './style.less';
import { getTableFiltersData } from '../utils';
import { getChannelStatus, setChannelDisplay, deleteThird } from '../service';
import { checkPermission } from '@/utils/resolvePermission';

const FormItem = Form.Item;
const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

// 渲染表单
function renderFilters(self: any): ReactNode {
  const { getFieldDecorator } = self.props.form;
  const { merchantData } = self.props.recharge;
  return (
    <Form layout="inline" onSubmit={self.handleSubmit}>
      {/* 三方平台 */}
      <FormItem label={<FormattedMessage id="merchant-set.filters-merchant" />}>
        {getFieldDecorator('channelId', {
          initialValue: -1,
        })(
          <Select
            style={{ width: 120 }}
            showSearch
            filterOption={(input, option: any) => option.props.children.indexOf(input) >= 0}
          >
            <Option value={-1}>全部</Option>
            {merchantData.map((item: any, index: number) => (
              <Option value={item.channelId} key={item.channelId}>
                {item.channelName}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
      {/* 商户号 */}
      <FormItem label={<FormattedMessage id="merchant-set.filters-merchant-code" />}>
        {getFieldDecorator('merchantCode', {
          initialValue: '',
        })(<Input placeholder="请输入商户号" />)}
      </FormItem>
      {/* 开关状态 */}
      <FormItem label={<FormattedMessage id="merchant-set.filters-switch-status" />}>
        {getFieldDecorator('status', {
          initialValue: -1,
        })(
          <Select style={{ width: 120 }}>
            {SWITCH_STATUS.map((item: any, index: number) => (
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
          {formatMessage({ id: 'merchant-set.search-btn' })}
        </Button>
        {/* 重置 */}
        <Button
          onClick={() => {
            self.props.form.resetFields();
            self.refMtable.tableReset();
          }}
          style={{ marginLeft: '5px' }}
        >
          {formatMessage({ id: 'merchant-set.reset-btn' })}
        </Button>
      </FormItem>
    </Form>
  );
}

// 渲染表格
function renderTable(self: any): ReactNode {
  const { selectedRowKeys } = self.state;
  const { merchantSetData } = self.props.recharge;

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKey: any, selectedRows: any) => {
      self.onSelectChange(selectedRowKey, selectedRows);
    },
  };

  return (
    <Mtable
      style={{ wordBreak: 'break-all' }}
      setRowSelection={self.setRowSelection}
      rowSelection={rowSelection}
      dataSource={merchantSetData}
      columns={getMerchantSetColumns(self)}
      dispatch={self.props.dispatch}
      effectType="recharge/merchantSetDataEffect"
      validateFields={self.props.form.validateFieldsAndScroll}
      setEffectParams={self.setEffectParams}
      ref={(element: ReactNode) => {
        self.refMtable = element;
      }}
    />
  );
}

// 渲染按钮
function renderBtnGroup(self: any): ReactNode {
  const { selectedRows, isOpen, status } = self.state;
  const merchantIdList = _.map(selectedRows, item => item.merchantId);
  const merchangIds = merchantIdList.join(',');

  return (
    <div className={styles.btnGroup}>
      {checkPermission(self.props.btns, 'new-finance-recharge-merchant-set-create') ? (
        // 新增三方平台
        <Button
          type="primary"
          htmlType="submit"
          icon="plus"
          onClick={() => {
            self.setState({ editDialogVisble: true, isAdd: true });
          }}
        >
          {formatMessage({ id: 'merchant-set.add-merchant-btn' })}
        </Button>
      ) : null}

      {checkPermission(self.props.btns, 'new-finance-recharge-merchant-set-batch-enable') ? (
        // 批量开启商户
        <Button
          type="primary"
          htmlType="submit"
          disabled={selectedRows.length === 0}
          onClick={() => {
            self.setState({ isBatch: true, batchStatus: 0, statusDialogVisible: true });
          }}
        >
          {formatMessage({ id: 'merchant-set.batch-open-btn' })}
        </Button>
      ) : null}

      {checkPermission(self.props.btns, 'new-finance-recharge-merchant-set-batch-disable') ? (
        // 批量关闭商户
        <Button
          type="primary"
          htmlType="submit"
          disabled={selectedRows.length === 0}
          onClick={() => {
            self.setState({ isBatch: true, batchStatus: 1, statusDialogVisible: true });
          }}
        >
          {formatMessage({ id: 'merchant-set.batch-close-btn' })}
        </Button>
      ) : null}

      {/* 是否开启通道展示 */}
      <span className={styles.channel}>
        {formatMessage({ id: 'merchant-set.channel-show-tip' })}:
        <Switch
          className={styles.switchBtn}
          checkedChildren={formatMessage({ id: 'merchant-set.switch-open-status' })}
          unCheckedChildren={formatMessage({ id: 'merchant-set.switch-close-status' })}
          checked={status === 0}
          onChange={(checked: boolean) => {
            self.setState({ statusChangeDialogVisible: true });
          }}
        />
      </span>
    </div>
  );
}

@setCommonFun
class MerchantSet extends React.PureComponent<StateType> {
  public state: StateType = {
    isOpen: false, // 是否开启通道展示
    isBatch: false, // 是否批量操作
    isAdd: false,
    batchStatus: undefined,
    selectedRows: [],
    selectedRowKeys: [],
    statusDialogVisible: false,
    editDialogVisble: false,
    statusChangeDialogVisible: false,
    rowData: {},
    payload: {
      page: 1,
      size: 20,
    },
    status: 1,
    isDelete: false,
  };

  public refMtable: any;

  componentDidMount() {
    this.getMerchantListEffect();
    this.getChanelStatusEffect();
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

  // 设置表格多选
  private setRowSelection = () => {
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  // 获取三方平台
  private getMerchantListEffect = () => {
    this.props.dispatch({
      type: 'recharge/merchantListEffect',
    });
  };

  // 开启/关闭三方平台
  private changeStatusEffect = (merchantIds: string | number, status: number) => {
    this.closeStatusDialog();
    this.props.dispatch({
      type: 'recharge/merchantSetStatusEffect',
      payload: { merchantIds, status },
      callback: () => {
        this.refMtable.getTableData();
      },
    });
  };

  // 开启/关闭通道展示
  private changeChannelStatuEffect = (params: object) => {
    setChannelDisplay(params).then(response => {
      handleMessage(response, () => {
        const { status } = this.state;
        this.setState({ status: status === 0 ? 1 : 0 });
      });
    });
  };

  // 开启/关闭三方平台
  private getChanelStatusEffect = () => {
    getChannelStatus().then((res: any) => {
      const { code, data } = res;
      if (code === 1 && data) {
        this.setState({ status: data === 'true' ? 0 : 1 });
      }
    });
  };

  // 搜索
  private handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.refMtable.getTableData();
  };

  // 关闭提示弹窗
  private closeStatusDialog = () =>
    this.setState({
      statusDialogVisible: false,
      isBatch: false,
      batchStatus: undefined,
      selectedRows: [],
      selectedRowKeys: [],
      rowData: {},
    });

  // 多选
  private onSelectChange = (selectedRowKeys: any[], selectedRows: any[]) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  // 编辑三方平台
  private handleEdit = (data: any, cb: Function) => {
    this.props.dispatch({
      type: 'recharge/merchantEditEffect',
      payload: data,
      callback: () => {
        if (cb) cb();
        this.refMtable.getTableData();
        this.setState({
          editDialogVisble: false,
        });
      },
    });
  };

  // 新增三方平台
  private handleAdd = (data: any, cb: Function) => {
    this.props.dispatch({
      type: 'recharge/setMerchantAddEffect',
      payload: data,
      callback: () => {
        if (cb) cb();
        this.refMtable.getTableData();
        this.setState({
          editDialogVisble: false,
          isAdd: false,
        });
      },
    });
  };

  // 删除三方平台
  private handleDelete = (params: object) => {
    deleteThird(params).then((res: any) => {
      if (res.code === SUCCESS_CODE) {
        this.refMtable.getTableData();
        this.setState({ statusChangeDialogVisible: false });
        message.success(formatMessage({ id: 'merchant-set.delete-suc-msg' }));
      } else {
        message.error(res.message);
      }
    });
  };

  public render(): ReactNode {
    const {
      payload,
      statusDialogVisible,
      rowData,
      isBatch,
      batchStatus,
      selectedRows,
      selectedRowKeys,
      editDialogVisble,
      statusChangeDialogVisible,
      isAdd,
      status,
      isOpen,
      isDelete,
    } = this.state;

    return (
      <Fragment>
        {renderFilters(this)}
        {renderBtnGroup(this)}
        {renderTable(this)}

        <StatusDialog<>
          rowData={rowData}
          isBatch={isBatch}
          batchStatus={batchStatus}
          visible={statusDialogVisible}
          selectedRows={selectedRows}
          selectedRowKeys={selectedRowKeys}
          onCancel={this.closeStatusDialog}
          onOk={this.changeStatusEffect}
        />

        <EditDialog
          visible={editDialogVisble}
          rowData={rowData}
          isAdd={isAdd}
          confirm={isAdd ? this.handleAdd : this.handleEdit}
          cancel={() => {
            this.setState({
              isAdd: false,
              editDialogVisble: false,
              rowData: {},
            });
          }}
        />

        <StatusChangeDialog
          visible={statusChangeDialogVisible}
          status={status}
          isDelete={isDelete}
          rowData={rowData}
          confirm={(params?: object) => {
            if (isDelete) {
              this.handleDelete(params);
              return;
            }
            this.changeChannelStatuEffect({ status: status === 0 ? 1 : 0 });
            this.setState({ statusChangeDialogVisible: false });
          }}
          cancel={() => {
            this.setState({ statusChangeDialogVisible: false });
          }}
        />
      </Fragment>
    );
  }
}

const MerchantSetContainer = Form.create({ name: 'merchantSet' })(MerchantSet);

export default withRouter(
  connect(({ recharge, global }: { recharge: any; global: any }) => ({
    recharge,
    btns: global.btns,
  }))(MerchantSetContainer),
);
