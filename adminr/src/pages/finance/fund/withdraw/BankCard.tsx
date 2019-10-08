import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Table, Spin, Select } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import EditModal from './bankModal/EditModal';
import AddModal from './bankModal/AddModal';
import TransferModal from './bankModal/TransferModal';
import FaildModal from './bankModal/FaildModal';
import SuccessModal from './bankModal/SuccessModal';
import DeleteModal from './bankModal/DeleteModal';
import ChangeModal from './bankModal/ChangeModal';
import { getBankCardColumns, BankCardForm } from './until';
import { StateType } from '@/common-typings';
import styles from './style.less';
import Mtable from '@/components/Mtable';

const { Option } = Select;

class Withdraw extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.okSaveEdit = this.okSaveEdit.bind(this);
    this.okSaveAdd = this.okSaveAdd.bind(this);
    this.okSaveTransfer = this.okSaveTransfer.bind(this);
    this.okSaveFaild = this.okSaveFaild.bind(this);
    this.handleSelectTransferType = this.handleSelectTransferType.bind(this);
    this.okSaveDelete = this.okSaveDelete.bind(this);
    this.okSaveChange = this.okSaveChange.bind(this);
  }

  public state = {
    effectParams: {
      bankCard: null,
      bankType: 1,
      nickname: null,
    },
    rowData: {},
    showTransferModal: false,
    showAddModal: false,
    showEditModal: false,
    transferType: '0',
    transferParams: {},
    showFaildModal: false,
    showDeleteModal: false,
    showChangeModal: false,
    faildInfo: {
      title: '转账失败提示',
      bodyText: '转账失败：收款卡号错误',
    },
    showSuccessModal: false,
    successInfo: {},
  };

  // 重置查询条件
  public resetForm() {
    this.props.form.resetFields();
    if (!this.state.effectParams.bankCard && !this.state.effectParams.nickname) {
      return;
    }
    this.setState(
      {
        effectParams: {
          bankCard: null,
          bankType: 1,
          nickname: null,
        },
      },
      () => {
        this.refMtable.bindEffects();
      },
    );
  }

  // 确认编辑
  public okSaveEdit(params: any, cb) {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch({
      type: 'fund/editWithdrawBankCardEffect',
      payload: { ...params, id },
      fn: res => {
        console.log(res);
        this.setState({ showEditModal: false });
        if (cb) {
          cb();
        }
      },
    });
  }

  // 确认添加
  public okSaveAdd(params: any, cb: function) {
    const { dispatch } = this.props;
    const { id } = this.state.rowData;
    // 存储转账参数，做失败重试
    this.setState({ transferParams: { ...params, id } });
    dispatch({
      type: 'fund/addWithdrawBankCardEffect',
      payload: { ...params, id },
      // 清除表单历史记录
      fn: (res: any) => {
        console.log(res);
        this.setState({ showAddModal: false });
        if (cb) {
          cb();
        }
      },
    });
  }

  // 确认转账
  public okSaveTransfer(params: any, cb) {
    const { dispatch } = this.props;
    const { id } = this.state.rowData;
    this.setState({
      transferParams: { ...params, id },
    });
    dispatch({
      type: 'fund/transferWithdrawBankCardEffect',
      payload: { ...params, id },
      // 清除表单历史记录
      fn: (res: any) => {
        console.log(res);
        if (cb) {
          cb();
        }
        this.setState({
          showTransferModal: false,
          showFaildModal: true,
        });
      },
    });
  }

  // 失败重试
  public okSaveFaild(params: any, cb) {
    const { dispatch } = this.props;
    dispatch({
      type: 'fund/transferWithdrawBankCardEffect',
      payload: this.state.transferParams,
      // 清除表单历史记录
      fn: (res: any) => {
        console.log(res);
        this.setState({
          showFaildModal: false,
          showSuccessModal: true,
        });
        if (cb) {
          cb();
        }
      },
    });
  }

  // 确认删除
  public okSaveDelete() {
    const { id } = this.state.rowData;
    const { dispatch } = this.props;
    dispatch({
      type: 'fund/deleteInformationEffect',
      // 请求参数
      payload: { id },
      fn: (res: any) => {
        this.setState({ showDeleteModal: false });
      },
    });
  }

  // 启用或停用
  public okSaveChange() {
    const { id } = this.state.rowData;
    const { dispatch } = this.props;
    dispatch({
      type: 'fund/changeInformationEffect',
      payload: { id },
      fn: (res: any) => {
        this.setState({ showChangeModal: false });
      },
    });
  }

  public handleSelectTransferType(transferType) {
    this.setState({ transferType });
  }

  public render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      rowData,
      showTransferModal,
      showAddModal,
      showEditModal,
      transferType,
      faildInfo,
      showFaildModal,
      showSuccessModal,
      showDeleteModal,
      showChangeModal,
    } = this.state;
    const { bankCardData } = this.props.fund;
    const {
      loading,
      loadingEdit,
      loadingAdd,
      loadingTransfer,
      loadingDelete,
      loadingChange,
    } = this.props;
    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={loading}>
          <BankCardForm
            getFieldDecorator={getFieldDecorator}
            resetForm={this.resetForm}
            handleSubmit={(e: React.SyntheticEvent) => {
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
              }
            }}
          />
          <div className={styles.balanceAddWrap}>
            <div className={styles.balanceWrap}>
              <span>
                可用资金总额：<i>100000000.00</i>
              </span>
              <Button>刷新</Button>
            </div>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ showAddModal: true });
              }}
            >
              + &nbsp; 添加银行卡
            </Button>
          </div>

          <Mtable
            columns={getBankCardColumns(this)}
            effectType="fund/withdrawBankCardEffect"
            effectParams={this.state.effectParams}
            dataSource={bankCardData}
            dispatch={this.props.dispatch}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />

          <EditModal<>
            show={showEditModal}
            showLoading={loadingEdit}
            hide={() => {
              this.setState({ showEditModal: false });
            }}
            handleOk={this.okSaveEdit}
            rowData={rowData}
          />

          <AddModal<>
            show={showAddModal}
            showLoading={loadingAdd}
            hide={() => {
              this.setState({ showAddModal: false });
            }}
            handleOk={this.okSaveAdd}
          />

          <TransferModal<>
            show={showTransferModal}
            showLoading={loadingTransfer}
            hide={() => {
              this.setState({ showTransferModal: false });
            }}
            handleOk={this.okSaveTransfer}
            slectChange={this.handleSelectTransferType}
            transferType={transferType}
          />

          <FaildModal<>
            show={showFaildModal}
            showLoading={loadingTransfer}
            hide={() => {
              this.setState({ showFaildModal: false });
            }}
            handleOk={this.okSaveFaild}
            faildInfo={faildInfo}
          />

          <SuccessModal<>
            show={showSuccessModal}
            showLoading={loadingTransfer}
            hide={() => {
              this.setState({ showSuccessModal: false });
            }}
            handleOk={() => {
              this.setState({ showSuccessModal: false });
            }}
            successInfo={this.state.successInfo}
          />

          <DeleteModal
            show={showDeleteModal}
            showLoading={loadingDelete}
            hide={() => {
              this.setState({ showDeleteModal: false });
            }}
            handleOk={this.okSaveDelete}
          />

          <ChangeModal
            show={showChangeModal}
            showLoading={loadingChange}
            hide={() => {
              this.setState({ showChangeModal: false });
            }}
            handleOk={this.okSaveChange}
            rowData={rowData}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedThird = Form.create({ name: 'searchWithdraw' })(Withdraw);
export default connect(({ fund, loading }: { fund: any; loading: any }) => ({
  fund,
  loading: loading.effects['fund/withdrawBankCardEffect'],
  loadingEdit: loading.effects['fund/editWithdrawBankCardEffect'],
  loadingAdd: loading.effects['fund/addWithdrawBankCardEffect'],
  loadingDelete: loading.effects['fund/addWithdrawBankCardEffect'],
  loadingChange: loading.effects['fund/addWithdrawBankCardEffect'],
  loadingTransfer: loading.effects['fund/transferWithdrawBankCardEffect'],
}))(WrappedThird);
