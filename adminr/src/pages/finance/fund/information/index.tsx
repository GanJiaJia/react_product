import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Spin, Select, message, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import EditModal from './bankModal/EditModal';
import AddModal from './bankModal/AddModal';
import DeleteModal from './bankModal/DeleteModal';
import ChangeModal from './bankModal/ChangeModal';
import { getColumns, InforMationForm } from './until';
import styles from './style.less';
import { StateType } from '@/common-typings';
import Mtable from '@/components/Mtable';

const { Option } = Select;

class Information extends React.Component<StateType> {
  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.okSaveEdit = this.okSaveEdit.bind(this);
    this.okSaveAdd = this.okSaveAdd.bind(this);
    this.okSaveDelete = this.okSaveDelete.bind(this);
    this.okSaveChange = this.okSaveChange.bind(this);
  }

  public state = {
    effectParams: {
      bankName: undefined,
      bankCard: undefined,
    },
    rowData: {},
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    showChangeModal: false,
  };

  // 重置查询条件
  public resetForm() {
    this.props.form.resetFields();
    if (!this.state.effectParams.bankName && !this.state.effectParams.bankCard) {
      return;
    }
    this.setState(
      {
        effectParams: {
          bankName: undefined,
          bankCard: undefined,
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
      type: 'fund/editInformationEffect',
      payload: { ...params, id },
      fn: (res: any) => {
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
    const { id } = this.state;
    // 存储转账参数，做失败重试
    // this.setState({ transferParams: { ...params, id } });
    dispatch({
      type: 'fund/addInformationEffect',
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

  // 确认删除
  public okSaveDelete() {
    const { id } = this.state.rowData;
    const { dispatch } = this.props;
    dispatch({
      type: 'fund/deleteInformationEffect',
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

  public render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const { informationData } = this.props.fund;
    const { rowData, showAddModal, showEditModal, showDeleteModal, showChangeModal } = this.state;
    const { loading, loadingEdit, loadingAdd, loadingDelete, loadingChange } = this.props;
    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={loading}>
          <InforMationForm
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
              <span>
                待结算总额： <i>199999.00</i>
              </span>
              <Button>刷新</Button>
            </div>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ showAddModal: true });
              }}
            >
              {' '}
              + &nbsp; 添加银行卡
            </Button>
          </div>

          <Mtable
            columns={getColumns(this)}
            effectType="fund/informationEffect"
            effectParams={this.state.effectParams}
            dataSource={informationData}
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
const WrappedThird = Form.create({ name: 'searchInformation' })(Information);
export default connect(({ fund, loading }: { fund: any; loading }) => ({
  fund,
  loading: loading.effects['fund/informationEffect'],
  loadingEdit: loading.effects['fund/editInformationEffect'],
  loadingAdd: loading.effects['fund/addInformationEffect'],
  loadingDelete: loading.effects['fund/deleteInformationEffect'],
  loadingChange: loading.effects['fund/changeInformationEffect'],
}))(WrappedThird);
