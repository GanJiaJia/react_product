import { Button, Form, Input, Select, Spin, Table } from 'antd';
import React, { ReactNode } from 'react';
import { TableRowSelection } from 'antd/lib/table';
import { connect } from 'dva';
import Mtable from '@/pages/finance/withdraw/components/Mtable';
import AddModal from './modal/addModal';
import SettingModal from './modal/settingModal';
import { setCommonFun } from '@/pages/finance/withdraw/utils';
import ConditionsModal from './modal/conditionsModal';
import ConfirmModal from './modal/confirmModal';
import { StateType } from '@/common-typings';
import ThirdNumModal from './modal/thirdNumModal';
import { getColumns } from './utils';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';

const { Option } = Select;
@setCommonFun
class Account extends React.Component<StateType> {
  rowSelection: TableRowSelection<StateType> | undefined;

  refMtable: any;

  state = {
    rowData: {},
    isShowSettingModal: false,
    isShowconditionsModal: false,
    isshowThirdNumModal: false,
    isShowConfirmModal: false,
    selectedRowKeys: [],
    isShowAddModal: false,
    addAccountTitle: '添加分单账户',
    confirmModalTitle: '',
    // settingModalTitle: '分单设置',
    conditionsModalTitle: '查看条件',
    thirdNumModalTitle: '查看出款商户',
    messageKey: '',
    columns: getColumns(this),
    effectParams: {},
    OpenOrCloseParams: {},
    deleteParams: {},
  };

  // 添加账户确定按钮
  handleAdd = async (values: any) => {
    await this.$httpValidateAccount(values);
    await this.setState({ isShowAddModal: false });
  };

  $httpValidateAccount = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/validateAccount',
      payload,
      fn: async () => {
        await this.$httpAddAccount(payload);
        await this.refMtable.bindEffects();
      },
    });
  };

  $httpAddAccount = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/addAccount',
      payload,
    });
  };

  $httpDoAccountSwitch = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/doAccountSwitch',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpDoAccountDelete = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/doAccountDelete',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpManageAccountModify = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/manageAccountModify',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  handleSettingModalOk = async (values: any) => {
    await this.$httpManageAccountModify(values);
    this.setState({
      isShowSettingModal: false,
    });
  };

  setFiltersParams = (filtes: any, sorter: any, cb: any) => {
    if (cb) {
      cb();
    }
  };

  // 关闭删除开启，确认按钮
  handleConfirm = async () => {
    const { messageKey } = this.state;
    // (批量)开启，(批量)关闭
    if (messageKey === 'close' || messageKey === 'open') {
      await this.$httpDoAccountSwitch(this.state.OpenOrCloseParams);
      await this.setState({ isShowConfirmModal: false });
    }
    // (批量)删除
    if (messageKey === 'delete') {
      await this.$httpDoAccountDelete(this.state.deleteParams);
      await this.setState({ isShowConfirmModal: false });
    }
  };

  // 添加分单账户弹窗
  showAddModal = () => {
    this.setState({ isShowAddModal: true });
  };

  // 三方出款商户总数弹窗
  showThirdNumModal = (data: any) => {
    this.setState({ isshowThirdNumModal: true });
    this.props.dispatch({
      type: 'withdraw/getThirdNumList',
      payload: { merchantIds: data },
    });
  };

  // (批量)关闭，(批量)开启，(批量)删除
  showConfirmModal = (type?: string, id?: string) => {
    this.setState({
      isShowConfirmModal: true,
      messageKey: type,
    });
    const { selectedRowKeys } = this.state;
    // 删除，批量删除
    if (type === 'delete' && id === 'batch') {
      this.setState({
        confirmModalTitle: '删除分单账户',
        deleteParams: { accountIds: selectedRowKeys.join() },
      });
      return;
    }
    if (type === 'delete') {
      this.setState({
        confirmModalTitle: '删除分单账户',
        deleteParams: { accountIds: id },
      });
    }
    // 开启，批量开启
    if (type === 'open' && id === 'batch') {
      this.setState((prevState: any) => ({
        confirmModalTitle: '开启分单',
        OpenOrCloseParams: { accountIds: selectedRowKeys.join(), status: 1 },
      }));
      return;
    }
    if (type === 'open') {
      this.setState({
        confirmModalTitle: '开启分单',
        OpenOrCloseParams: { accountIds: id, status: 1 },
      });
    }
    // 关闭，批量关闭
    if (type === 'close' && id === 'batch') {
      this.setState((prevState: any) => ({
        confirmModalTitle: '关闭分单',
        OpenOrCloseParams: { accountIds: selectedRowKeys.join(), status: 0 },
      }));
      return;
    }

    if (type === 'close') {
      this.setState({
        confirmModalTitle: '关闭分单',
        OpenOrCloseParams: { accountIds: id, status: 0 },
      });
    }
  };

  // 打开设置账户弹窗
  showSettingModal = (rowData: any) => {
    this.setState({ isShowSettingModal: true, rowData });
  };

  // 查看条件弹窗
  showConditionsModal = (data: any) => {
    this.setState({ isShowconditionsModal: true });
    this.props.dispatch({
      type: 'withdraw/getConditionList',
      payload: { conditionIds: data },
    });
  };

  onSelectedRowKeysChange = (selectedRowKeys: any[]) => {
    this.setState({ selectedRowKeys });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { columns } = this.state;
    const { accountListData } = this.props.withdraw.orserSetting;

    const {
      selectedRowKeys,
      addAccountTitle,
      isShowAddModal,
      // settingModalTitle,
      isShowSettingModal,
      conditionsModalTitle,
      isShowconditionsModal,
      isshowThirdNumModal,
      thirdNumModalTitle,
      isShowConfirmModal,
      confirmModalTitle,
      messageKey,
      effectParams,
      rowData,
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

    return (
      <div className={styles.rechargeWrap}>
        <AddModal
          title={addAccountTitle}
          show={isShowAddModal}
          showLoading={false}
          handleOk={this.handleAdd}
          hide={() => this.setState({ isShowAddModal: false })}
        />
        <SettingModal
          rowData={rowData}
          show={isShowSettingModal}
          showLoading={false}
          handleOk={this.handleSettingModalOk}
          hide={() => this.setState({ isShowSettingModal: false })}
        />
        <ConditionsModal
          title={conditionsModalTitle}
          show={isShowconditionsModal}
          showLoading={false}
          handleOk={() => this.setState({ isShowconditionsModal: false })}
          hide={() => this.setState({ isShowconditionsModal: false })}
        />
        <ThirdNumModal
          title={thirdNumModalTitle}
          show={isshowThirdNumModal}
          showLoading={false}
          handleOk={() => this.setState({ isshowThirdNumModal: false })}
          hide={() => this.setState({ isshowThirdNumModal: false })}
        />
        <ConfirmModal
          handleConfirm={this.handleConfirm}
          title={confirmModalTitle}
          messageKey={messageKey}
          show={isShowConfirmModal}
          showLoading={false}
          hide={() => this.setState({ isShowConfirmModal: false })}
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
            <Form.Item label="账户名">
              {getFieldDecorator('userName', {
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input allowClear placeholder="请输入账户名" autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="班次">
              {getFieldDecorator('work', {
                initialValue: '-1',
              })(
                <Select style={{ width: 150 }}>
                  <Option value="-1">全部</Option>
                  <Option value="1">早班</Option>
                  <Option value="2">中班</Option>
                  <Option value="3">晚班</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="三方出款商户">
              {getFieldDecorator('merchantId', {
                initialValue: '-1',
              })(
                <Select style={{ width: 150 }}>
                  <Option value="-1">全部</Option>
                  <Option value="49">安心付</Option>
                  <Option value="17">BV代付</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item className={styles.rechargeBtns}>
              <Button type="primary" icon="search" htmlType="submit">
                搜索
              </Button>
            </Form.Item>

            <div className={styles.peratingBtn}>
              {checkPermission(
                this.props.btns,
                'new-finance-withdraw-separate-account-setting-add-account',
              ) ? (
                <Button type="primary" onClick={this.showAddModal} className={styles.headBtn}>
                  + 添加分单账户
                </Button>
              ) : null}

              {checkPermission(
                this.props.btns,
                'new-finance-withdraw-separate-account-setting-batch-open',
              ) ? (
                <Button
                  type="primary"
                  onClick={() => this.showConfirmModal('open', 'batch')}
                  className={styles.headBtn}
                  disabled={!selectedRowKeys.length}
                >
                  批量开启
                </Button>
              ) : null}

              {checkPermission(
                this.props.btns,
                'new-finance-withdraw-separate-account-setting-batch-close',
              ) ? (
                <Button
                  type="danger"
                  ghost
                  onClick={() => this.showConfirmModal('close', 'batch')}
                  className={styles.headBtn}
                  disabled={!selectedRowKeys.length}
                >
                  批量关闭
                </Button>
              ) : null}

              {checkPermission(
                this.props.btns,
                'new-finance-withdraw-separate-account-setting-batch-delete',
              ) ? (
                <Button
                  type="danger"
                  ghost
                  onClick={() => this.showConfirmModal('delete', 'batch')}
                  disabled={!selectedRowKeys.length}
                >
                  批量删除
                </Button>
              ) : null}
            </div>
          </Form>

          <br />

          <Mtable
            rowSelection={rowSelection}
            rowKey="id"
            pageSize={10}
            columns={columns}
            effectType="withdraw/getAccountList"
            effectParams={effectParams}
            dataSource={accountListData}
            dispatch={this.props.dispatch}
            setFiltersParams={this.setFiltersParams}
            setSubmitFormatParams={this.setSubmitFormatParams}
            scroll={{ x: 1530 }}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />
        </Spin>
      </div>
    );
  }
}

const C = Form.create()(Account);

export default connect(({ withdraw, global }: { withdraw: any; global: any }) => ({
  withdraw,
  btns: global.btns,
}))(C);
