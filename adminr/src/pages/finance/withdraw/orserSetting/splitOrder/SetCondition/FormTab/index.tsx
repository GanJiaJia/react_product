import { Button, Form, Icon, Input, Select, Spin, Table } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import Mtable from '@/pages/finance/withdraw/components/Mtable';
import DeleteModal from '../modal/DeleteModal';
import EditModal from '../modal/EditModal';
import LeveModal from '../modal/leveModal';
import { StateType } from '@/common-typings';
import { getColumns } from './utils';
import styles from './style.less';
import { checkPermission } from '@/utils/resolvePermission';
import { setCommonFun } from '@/pages/finance/withdraw/utils';

const { Option } = Select;
@setCommonFun
class FormTab extends React.Component<StateType> {
  refMtable: any;

  constructor(props: any) {
    super(props);
    this.$httpGetLevelList();
  }

  state = {
    columns: getColumns(this),
    isShowLeveModal: false,
    isShowDeleteModal: false,
    isShowEditModal: false,
    editModalSign: '',
    DeleteModalTitle: '删除提现分担设置',
    EditModalTitle: '提现分单条件设置修改',
    effectParams: {
      withdrawType: -1,
    },
    rowData: {},
  };

  $httpGetLevelList = () => {
    this.props.dispatch({
      type: 'withdraw/getLevelList',
      payload: {},
    });
  };

  $httpManageConditionSave = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/manageConditionSave',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpSetCondition = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/setCondition',
      payload,
    });
  };

  $httpDeleteCondition = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/deleteCondition',
      payload,
      fn: () => {
        this.refMtable.bindEffects();
      },
    });
  };

  $httpManageConditionUpdate = (payload: any) => {
    this.props.dispatch({
      type: 'withdraw/manageConditionUpdate',
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

  editModalCallback = async (values: any) => {
    const { editModalSign } = this.state;
    values.levelId = Array.isArray(values.levelId) ? values.levelId.join() : values.levelId;
    if (editModalSign === 'add') {
      await this.$httpManageConditionSave(values);
    }
    if (editModalSign === 'edit') {
      await this.$httpManageConditionUpdate(values);
    }
    this.setState({
      isShowEditModal: false,
    });
  };

  // 确认删除
  handelDelete = async () => {
    const params = {
      conditionId: this.state.rowData.id,
    };
    await this.$httpDeleteCondition(params);
    this.setState({ isShowDeleteModal: false });
  };

  showLevelName = (rowData: any) => {
    this.setState({
      rowData,
      isShowLeveModal: true,
    });
  };

  // 打开删除弹窗
  showDeleteModal = (rowData: any) => {
    this.setState({ isShowDeleteModal: true, rowData });
  };

  // 打开修改分单设置弹窗
  showEditModal = (rowData: any) => {
    this.setState({
      editModalSign: 'edit',
      isShowEditModal: true,
      EditModalTitle: '提现分单条件设置修改',
      rowData,
    });
  };

  handleAdd = () => {
    this.setState({
      editModalSign: 'add',
      isShowEditModal: true,
      EditModalTitle: '添加分单条件',
      rowData: {},
    });
  };

  // Form表单提交
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        values.userLevel = values.userLevel && values.userLevel.join();
        this.$httpSetCondition(values);
      }
    });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      columns,
      isShowDeleteModal,
      DeleteModalTitle,
      EditModalTitle,
      isShowEditModal,
      effectParams,
      rowData,
      isShowLeveModal,
    } = this.state;
    const { conditionTabData, levelListData } = this.props.withdraw.orserSetting;
    const tabData = { list: conditionTabData, total: conditionTabData.length };

    return (
      <div className={styles.rechargeWrap}>
        <DeleteModal
          handleDelete={this.handelDelete}
          title={DeleteModalTitle}
          show={isShowDeleteModal}
          showLoading={false}
          handleOk={this.handelDelete}
          hide={() => this.setState({ isShowDeleteModal: false })}
        />
        <EditModal
          rowData={rowData}
          callback={this.editModalCallback}
          title={EditModalTitle}
          show={isShowEditModal}
          showLoading={false}
          hide={() => this.setState({ isShowEditModal: false })}
        />
        <LeveModal
          levelListData={levelListData}
          rowData={rowData}
          show={isShowLeveModal}
          showLoading={false}
          hide={() => this.setState({ isShowLeveModal: false })}
        />
        <Spin spinning={false}>
          <Form layout="inline" onSubmit={this.handleSubmit} name="searchRecharge">
            <Form.Item label="条件名">
              {getFieldDecorator('conditionName', {
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input allowClear placeholder="请输入条件名" autoComplete="off" />)}
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
                  {levelListData.map((item: any, index: number) => (
                    <Option key={item.levelId} value={item.levelId}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="出款类型">
              {getFieldDecorator('withdrawType', {
                initialValue: '-1',
              })(
                <Select style={{ width: 220 }} placeholder="选择会员层级">
                  <Option value="-1">全部</Option>
                  <Option value="2">三方手动出款</Option>
                  <Option value="0">人工出款</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item className={styles.rechargeBtns}>
              <Button type="primary" icon="search" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
            <div className={styles.addbtn}>
              {checkPermission(this.props.btns, 'new-finance-withdraw-separate-setting-add') ? (
                <Button type="primary" onClick={this.handleAdd}>
                  + 添加
                </Button>
              ) : null}
            </div>
          </Form>

          <br />

          <Mtable
            pageSize={15}
            columns={columns}
            effectType="withdraw/setCondition"
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
