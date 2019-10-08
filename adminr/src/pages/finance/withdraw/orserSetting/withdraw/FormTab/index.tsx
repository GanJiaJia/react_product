import { Button, Form, Icon, Input, Select, Spin, Table } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import Mtable from '@/pages/finance/withdraw/components/Mtable';
import AddModal from '../modal/addModal';
import DeleteModal from '../modal/deleteModal';
import EditModal from '../modal/editModal';
import LeveModal from '../modal/leveModal';
import { StateType } from '@/common-typings';
import { getColumns } from './utils';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';
import { setCommonFun } from '@/pages/finance/withdraw/utils';

const { Option } = Select;
@setCommonFun
class FormTab extends React.PureComponent<StateType> {
  refMtable: any;

  state = {
    selectedRowKeys: [],
    tabRowData: {},
    columns: getColumns(this),
    isShowLeveModal: false,
    isShowDeleteModal: false,
    isShowEditModal: false,
    isShowAddModal: false,
    AddModalTitle: '添加分单条件',
    DeleteModalTitle: '删除自动出款设置',
    EditModalTitle: '自动出款条件设置',
    effectParams: {},
  };

  constructor(props: any) {
    super(props);
    this.$httpGetWithdrawOverviewList();
  }

  $httpDoAutoDelete = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/doAutoDelete',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  setFiltersParams = (filtes: any, sorter: any, cb: any) => {
    if (cb) {
      cb();
    }
  };

  showLevelName = (rowData: any) => {
    this.setState({
      tabRowData: rowData,
      isShowLeveModal: true,
    });
  };

  // 确认删除
  handelDelete = async () => {
    const { tabRowData } = this.state;
    const params = { conditionId: tabRowData.id };
    await this.$httpDoAutoDelete(params);
    // await this.refMtable.bindEffects();
    await this.setState({ isShowDeleteModal: false });
  };

  // 打开删除弹窗
  showDeleteModal = (rowData: any) => {
    this.setState({ isShowDeleteModal: true, tabRowData: rowData });
  };

  // 打开修改弹窗
  showEditModal = async (rowData: any) => {
    this.setState({
      isShowEditModal: true,
      EditModalTitle: '提现分单条件设置修改',
      tabRowData: rowData,
    });
  };

  // 获取出款商户列表数据
  $httpGetWithdrawOverviewList = () => {
    this.props.dispatch({
      type: 'withdraw/withdrawOverview',
      payload: { channelId: -1 },
    });
  };

  $httpConditionAutoSave = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/conditionAutoSave',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpDoAutoUpdate = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/doAutoUpdate',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  // 修改弹窗确认按钮
  handelEdit = async (params: any) => {
    const { tabRowData }: any = this.state;
    const payload = { ...params, id: tabRowData.id };
    await this.$httpDoAutoUpdate(payload);
    this.setState({ isShowEditModal: false });
  };

  // 添加弹窗确认按钮
  handleAdd = async (values: any) => {
    values.levelId = values.levelId && values.levelId.join();
    values.merchantId = values.merchantId && values.merchantId.join();
    await this.$httpConditionAutoSave(values);
    this.setState({ isShowAddModal: false });
  };

  // 打开添加弹窗
  showAddModal = () => {
    this.setState({ isShowAddModal: true });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      columns,
      isShowDeleteModal,
      DeleteModalTitle,
      EditModalTitle,
      isShowEditModal,
      isShowAddModal,
      AddModalTitle,
      effectParams,
      tabRowData,
      isShowLeveModal,
      selectedRowKeys,
    } = this.state;
    const { autoListData = [], levelListData } = this.props.withdraw.orserSetting;
    const tabData = { list: autoListData, total: autoListData.length };
    return (
      <div className={styles.rechargeWrap}>
        <LeveModal
          levelListData={levelListData}
          rowData={tabRowData}
          show={isShowLeveModal}
          showLoading={false}
          hide={() => this.setState({ isShowLeveModal: false })}
        />
        <DeleteModal
          handleDelete={this.handelDelete}
          title={DeleteModalTitle}
          show={isShowDeleteModal}
          showLoading={false}
          hide={() => this.setState({ isShowDeleteModal: false })}
        />
        <EditModal
          rowData={this.state.tabRowData}
          title={EditModalTitle}
          show={isShowEditModal}
          showLoading={false}
          handleOk={this.handelEdit}
          hide={() => this.setState({ isShowEditModal: false })}
        />
        <AddModal
          title={AddModalTitle}
          show={isShowAddModal}
          showLoading={false}
          handleOk={this.handleAdd}
          hide={() => this.setState({ isShowAddModal: false })}
        />
        <Spin spinning={false}>
          <Form
            layout="inline"
            onSubmit={(e: React.SyntheticEvent) => {
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
              }
            }}
            name="searchRecharge"
          >
            <Form.Item label="条件名">
              {getFieldDecorator('conditionName', {
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input allowClear placeholder="请输入条件名" />)}
            </Form.Item>
            <Form.Item label="会员层级">
              {getFieldDecorator('userLevel', {})(
                <Select
                  style={{ width: 220 }}
                  mode="multiple"
                  placeholder="选择会员层级"
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {levelListData.map((item: any) => (
                    <Option key={item.sortId} value={item.levelId}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item className={styles.rechargeBtns}>
              <Button type="primary" icon="search" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
            {checkPermission(
              this.props.btns,
              'new-finance-withdraw-separate-automatic-setting-add',
            ) ? (
              <div className={styles.addbtn}>
                <Button type="primary" onClick={this.showAddModal}>
                  + 添加
                </Button>
              </div>
            ) : null}
          </Form>

          <br />

          <Mtable
            pageSize={15}
            columns={columns}
            effectType="withdraw/getAutoList"
            effectParams={effectParams}
            dataSource={tabData}
            dispatch={this.props.dispatch}
            paginationSign={false}
            setFiltersParams={this.setFiltersParams}
            setSubmitFormatParams={this.setSubmitFormatParams}
            scroll={{ x: 1030 }}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedThird = Form.create()(FormTab);

export default connect(({ withdraw, global }: { withdraw: any; global: any }) => ({
  withdraw,
  btns: global.btns,
}))(WrappedThird);
