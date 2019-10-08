import { Button, Form, Select, Spin, Switch, Input } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { setCommonFun } from '@/pages/finance/withdraw/utils';
import Mtable from '../components/Mtable';
import BatchOpenModal from './modal/batchOpenModal';
import OffModal from './modal/offModal';
import OpenModal from './modal/openModal';
import DeleteModal from './modal/deleteModal';
import AddModal from './modal/addModal';
import { getColumns } from './utils';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

@setCommonFun
class Withdraw extends React.Component<StateType> {
  public refMtable: any;

  // public tabRowData: any;

  constructor(props: any) {
    super(props);
    this.$httpMerchantList();
    this.$httpGetChannelStatus();
  }

  state = {
    tabRowData: {},
    columns: getColumns(this),
    effectParams: {},
    addModalTitle: '',
    openAndCloseModalType: '',
    openAndCloseModalTitle: '',
    OffModalTitle: '',
    openModalTitle: '',
    isShowAddModal: false,
    isShowDeleteModal: false,
    isShowOpenModal: false,
    isShowBatchOpenModal: false,
    isShowOffModal: false,
    selectedRowKeys: [],
    addModalRequestSign: '',
  };

  // 新增三方平台请求
  $httpAddMerchantAccount = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/addMerchantAccount',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpUpdateMerchantAccount = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/updateMerchantAccount',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpGetChannelStatus = () => {
    this.props.dispatch({
      type: 'withdraw/getChannelStatus',
      payload: {},
    });
  };

  $httpMerchantList = () => {
    this.props.dispatch({
      type: 'withdraw/merchantList',
      payload: {},
    });
  };

  $httpUpdateMerchantOpen = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/updateMerchantOpen',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpMerchantAccountStatus = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/merchantAccountStatus',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpDeleteMerchantAccount = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/deleteMerchantAccount',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $setChannelDisplay = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/setChannelDisplay',
      payload,
    });
  };

  handleRowEdit = (rowData: any) => {
    this.setState({
      addModalRequestSign: 'edit',
      addModalTitle: '编辑三方平台',
      isShowAddModal: true,
      tabRowData: rowData,
    });
  };

  handleRowOff = (rowData: any) => {
    this.setState({
      isShowOffModal: true,
      OffModalTitle: rowData.status ? '上架' : '下架',
      tabRowData: rowData,
    });
  };

  handleDelete = (rowData: any) => {
    this.setState({
      isShowDeleteModal: true,
      tabRowData: rowData,
    });
  };

  handleRowOpen = (rowData: any) => {
    this.setState({
      isShowOpenModal: true,
      openModalTitle: rowData.openStatus ? '开启' : '关闭',
      tabRowData: rowData,
    });
  };

  handleRowDelete = (rowData: any) => {
    this.setState({
      isShowDeleteModal: true,
      tabRowData: rowData,
    });
  };

  setFiltersParams = (filtes: any, sorter: any, cb: any) => {
    if (cb) {
      cb();
    }
  };

  // 新增三方平台弹窗内的回调
  addModalCallback = async (values: any) => {
    const { addModalRequestSign } = this.state;
    if (addModalRequestSign === 'add') {
      await this.$httpAddMerchantAccount(values);
    }
    if (addModalRequestSign === 'edit') {
      await this.$httpUpdateMerchantAccount(values);
    }
    await this.setState({
      isShowAddModal: false,
    });
  };

  // 单条删除弹窗确定按钮
  handleDeleteModalOk = async () => {
    const { tabRowData } = this.state;
    const { merchantId } = tabRowData;
    const params = {
      merchantId,
    };
    await this.$httpDeleteMerchantAccount(params);
    await this.setState({ isShowDeleteModal: false });
  };

  // 单条开启，关闭弹窗确定按钮
  handleOpenModalOk = async () => {
    const { tabRowData } = this.state;
    const { merchantId, openStatus } = tabRowData;
    const params = {
      merchantIds: merchantId,
      status: openStatus ? 0 : 1,
    };
    await this.$httpUpdateMerchantOpen(params);
    await this.setState({ isShowOpenModal: false });
  };

  // 上下架弹窗，确定按钮
  handleOffModalOk = async () => {
    const { tabRowData } = this.state;
    const { merchantId, status } = tabRowData;
    const params = {
      merchantId,
      status: status ? 0 : 1,
    };
    await this.$httpMerchantAccountStatus(params);
    await this.setState({ isShowOffModal: false });
  };

  // 批量开启，批量关闭弹窗确定按钮
  handleBatchOpenModalOk = async () => {
    const { selectedRowKeys, openAndCloseModalType } = this.state;
    const params: any = {
      merchantIds: selectedRowKeys.join(),
    };
    if (openAndCloseModalType === 'open') {
      params.status = 0;
    }
    if (openAndCloseModalType === 'close') {
      params.status = 1;
    }
    await this.$httpUpdateMerchantOpen(params);
    await this.setState({ isShowBatchOpenModal: false });
  };

  // 新增三方平台按钮
  handleAddThird = () => {
    this.setState({
      addModalRequestSign: 'add',
      isShowAddModal: true,
      addModalTitle: '新建三方出款',
      tabRowData: {},
    });
  };

  // 批量开启商户按钮
  handleBatchOpen = () => {
    this.setState({
      isShowBatchOpenModal: true,
      openAndCloseModalTitle: '批量开启三方商户',
      openAndCloseModalType: 'open',
    });
  };

  // 批量关闭商户按钮
  handleBatchClose = () => {
    this.setState({
      isShowBatchOpenModal: true,
      openAndCloseModalTitle: '批量关闭三方商户',
      openAndCloseModalType: 'close',
    });
  };

  onSelectedRowKeysChange = (selectedRowKeys: any[]) => {
    this.setState({ selectedRowKeys });
  };

  handleSwitchchange = (checked: boolean, event: Event) => {
    const status = checked ? 0 : 1;
    this.$setChannelDisplay({ status });
  };

  showCheckModal = () => {};

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      columns,
      effectParams,
      selectedRowKeys,
      isShowBatchOpenModal,
      isShowOffModal,
      openAndCloseModalTitle,
      OffModalTitle,
      openModalTitle,
      isShowOpenModal,
      isShowDeleteModal,
      addModalTitle,
      isShowAddModal,
      tabRowData,
    } = this.state;
    const { merchantAccountListData, ChannelStatus } = this.props.withdraw.third;
    let { merchantData } = this.props.withdraw.third;
    merchantData = [{ channelId: -1, channelName: '全部' }, ...merchantData];
    const formatMerchantData = (data: any) =>
      data.map((item: any, index: number) => ({
        key: item.channelId,
        value: item.channelName,
      }));
    const openStatusMap = [
      { key: -1, value: '全部' },
      { key: 0, value: '开启' },
      { key: 1, value: '关闭' },
    ];
    const statusMap = [
      { key: -1, value: '全部' },
      { key: 0, value: '上架' },
      { key: 1, value: '下架' },
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={false}>
          <BatchOpenModal
            title={openAndCloseModalTitle}
            handleBatchOpenModalOk={this.handleBatchOpenModalOk}
            show={isShowBatchOpenModal}
            showLoading={false}
            hide={() => this.setState({ isShowBatchOpenModal: false })}
          />
          <AddModal
            title={addModalTitle}
            tabRowData={tabRowData}
            // handleBatchOpenModalOk={this.handleBatchOpenModalOk}
            callback={this.addModalCallback}
            show={isShowAddModal}
            showLoading={false}
            hide={() => this.setState({ isShowAddModal: false })}
          />
          <OffModal
            title={OffModalTitle}
            handleOffModalOk={this.handleOffModalOk}
            show={isShowOffModal}
            showLoading={false}
            hide={() => this.setState({ isShowOffModal: false })}
          />
          <OpenModal
            title={openModalTitle}
            handleOpenModalOk={this.handleOpenModalOk}
            show={isShowOpenModal}
            showLoading={false}
            hide={() => this.setState({ isShowOpenModal: false })}
          />
          <DeleteModal
            handleDeleteModalOk={this.handleDeleteModalOk}
            show={isShowDeleteModal}
            showLoading={false}
            hide={() => this.setState({ isShowDeleteModal: false })}
          />
          <Form
            layout="inline"
            onSubmit={(e: React.SyntheticEvent) => {
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
              }
            }}
            name="searchRecharge"
          >
            <Form.Item label="三方平台">
              {getFieldDecorator('channelId', {
                initialValue: merchantData.length ? formatMerchantData(merchantData)[0].key : '',
              })(
                <Select
                  style={{ width: 220 }}
                  placeholder="选择三方平台"
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {formatMerchantData(merchantData).map((item: any) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            {/* <Form.Item label="商户号">
              {getFieldDecorator('merchantCode', {})(
                <Input placeholder="请输入商户号" />,
              )}
            </Form.Item> */}
            <Form.Item label="上下架状态">
              {getFieldDecorator('status', {})(
                <Select style={{ width: 220 }} placeholder="选择上下架状态">
                  {statusMap.map((item: any) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="开关状态">
              {getFieldDecorator('openStatus', {
                initialValue: openStatusMap[0].key,
              })(
                <Select style={{ width: 220 }} placeholder="选择开关状态">
                  {openStatusMap.map((item: any) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item className={styles.rechargeBtns}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button onClick={this.resetForm}>重置</Button>
            </Form.Item>
          </Form>

          <br />

          <div>
            {checkPermission(this.props.btns, 'new-finance-withdraw-merchant-setting') ? (
              <Button type="primary" onClick={this.handleAddThird} style={{ marginRight: 10 }}>
                新增三方平台
              </Button>
            ) : null}

            {checkPermission(
              this.props.btns,
              'new-finance-withdraw-merchant-setting-batch-enable',
            ) ? (
              <Button
                type="primary"
                disabled={!selectedRowKeys.length}
                onClick={this.handleBatchOpen}
                style={{ marginRight: 10 }}
              >
                批量开启商户
              </Button>
            ) : null}

            {checkPermission(
              this.props.btns,
              'new-finance-withdraw-merchant-setting-batch-disable',
            ) ? (
              <Button
                type="danger"
                ghost
                disabled={!selectedRowKeys.length}
                onClick={this.handleBatchClose}
              >
                批量关闭商户
              </Button>
            ) : null}
            {/* <span style={{ marginLeft: 10 }}>是否开启通道展示：</span>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              onChange={this.handleSwitchchange}
              defaultChecked={!!ChannelStatus}
            /> */}
          </div>

          <br />

          <Mtable
            rowSelection={rowSelection}
            pageSize={10}
            columns={columns}
            effectType="withdraw/merchantAccountList"
            effectParams={effectParams}
            dataSource={merchantAccountListData}
            dispatch={this.props.dispatch}
            setFiltersParams={this.setFiltersParams}
            setSubmitFormatParams={this.setSubmitFormatParams}
            scroll={{ x: 780 }}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />
        </Spin>
      </div>
    );
  }
}

const C = Form.create({ name: 'searchWithdraw' })(Withdraw);

export default connect(({ withdraw, global }: { withdraw: any; global: any }) => ({
  withdraw,
  btns: global.btns,
}))(C);
