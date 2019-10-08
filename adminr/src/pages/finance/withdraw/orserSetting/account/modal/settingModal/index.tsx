import { Button, Form, Input, Modal, Table, Radio, Checkbox, Icon } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import { getColumns } from './utils';
import AccountModal from './accountModal';
import styles from './style.less';

const { TextArea } = Input;

class Edit extends React.PureComponent<StateType> {
  state = {
    columns: getColumns(this),
    selectedRowKeys: [],
    isShowAccountModal: false,
    userNameMap: [],
    accountIds: '',
  };

  constructor(props: any) {
    super(props);
    this.$httpWithdrawOverview();
    this.$httpSetCondition();
    this.$httpGetAccountList();
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { rowData } = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (rowData !== prevState.rowData) {
      let selectedRowKeys: any;
      if (rowData.merchantId) {
        selectedRowKeys = rowData.merchantId.split(',').map(Number);
      } else {
        selectedRowKeys = [];
      }
      return {
        rowData,
        selectedRowKeys,
        userNameMap: [{ label: rowData.userName, value: rowData.id }],
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  showAccountModal = () => {
    this.setState({ isShowAccountModal: true });
  };

  handlAccountModalOk = (values: any) => {
    const { accountListData } = this.props.withdraw.orserSetting;
    const accountIds = values.accountIds.join();
    const accountIdsMap = accountIds.split(',').map(Number);
    const arr: any = [];
    accountIdsMap.forEach((item: any, index: number) => {
      accountListData.list.forEach((value: any, i: number) => {
        if (value.id === item) {
          arr.push(value);
        }
      });
    });
    const arrMap = arr.map((item: any, index: number) => ({
      label: item.userName,
      value: item.id,
    }));
    this.setState({
      accountIds: arrMap,
      isShowAccountModal: false,
    });
  };

  $httpGetAccountList = () => {
    this.props.dispatch({
      type: 'withdraw/getAccountList',
      payload: { size: 10000, page: 1 },
    });
  };

  $httpWithdrawOverview = () => {
    this.props.dispatch({
      type: 'withdraw/withdrawOverview',
      payload: { channelId: -1 },
    });
  };

  $httpSetCondition = () => {
    this.props.dispatch({
      type: 'withdraw/setCondition',
      payload: {},
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
      if (!err) {
        const { handleOk } = this.props;
        const { accountIds, userNameMap, selectedRowKeys } = this.state;
        if (accountIds) {
          values.accountIds = accountIds.map((item: any, index: number) => item.value).join();
        } else {
          values.accountIds = userNameMap.map((item: any, index: number) => item.value).join();
        }
        values.conditionIds = values.conditionIds ? values.conditionIds.join() : '';
        values.merchantIds = selectedRowKeys.join();
        handleOk(values);
      }
    });
  };

  onSelectedRowKeysChange = (selectedRowKeys: any[]) => {
    this.setState({
      selectedRowKeys,
    });
  };

  render() {
    const { show, showLoading, hide, rowData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {
      conditionTabData,
      withdrawOverviewData,
      accountListData,
    } = this.props.withdraw.orserSetting;
    const { columns, selectedRowKeys, isShowAccountModal, accountIds, userNameMap } = this.state;
    // 表格选择项
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

    // 条件数据格式处理
    const conditionTabDataMap = conditionTabData.map((item: any, index: number) => ({
      label: item.conditionName,
      value: `${item.id}`,
    }));

    // // 判断分单设置弹窗中，分单账户的数据显示
    let userNameArr: any = [];
    if (!Array.isArray(accountIds)) {
      userNameArr = userNameMap;
    } else {
      userNameArr = accountIds;
    }

    return (
      <>
        <Modal
          destroyOnClose
          width={800}
          title="分单设置"
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          onOk={this.handleSubmit}
          confirmLoading={showLoading}
        >
          <AccountModal
            defaltSelectData={userNameMap}
            show={isShowAccountModal}
            showLoading={false}
            handlAccountModalOk={this.handlAccountModalOk}
            hide={() => this.setState({ isShowAccountModal: false })}
          />
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <Form.Item label="分单账户：">
              {userNameArr.map((item: any, index: number) => (
                // eslint-disable-next-line
                <span key={index} className={styles.nickName}>
                  {item.label}
                  <Icon type="close-circle" className={styles.closeIcon} />
                </span>
              ))}

              <Icon type="plus-circle" style={{ fontSize: 16 }} onClick={this.showAccountModal} />
            </Form.Item>

            <Form.Item label="班次：">
              {getFieldDecorator('work', {
                rules: [{ required: true, message: '请选择班次' }],
                initialValue: rowData.work,
              })(
                <Radio.Group>
                  <Radio value="1">早班</Radio>
                  <Radio value="2">中班</Radio>
                  <Radio value="3">晚班</Radio>
                </Radio.Group>,
              )}
            </Form.Item>

            <Form.Item label="分单条件：">
              {getFieldDecorator('conditionIds', {
                rules: [{ required: true, message: '请选择分单条件' }],
                initialValue: rowData.conditionId ? rowData.conditionId.split(',') : [],
              })(<Checkbox.Group options={conditionTabDataMap} style={{ marginTop: 10 }} />)}
            </Form.Item>

            <Form.Item label="出款商户：" className={styles.tab}>
              <Button
                className={styles.syncBtn}
                type="primary"
                onClick={() => this.$httpWithdrawOverview()}
              >
                同步三方余额
              </Button>
              <Table<StateType>
                style={{ width: 510 }}
                size="small"
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={withdrawOverviewData}
                rowKey={(record: any, index: any) => record.merchantId}
                pagination={false}
              />
            </Form.Item>

            <Form.Item label="备注：">
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '备注不能为空' }],
                initialValue: rowData.remark,
              })(<TextArea />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
const Wrap = Form.create()(Edit);
export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(Wrap);
