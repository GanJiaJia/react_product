import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import { getColumns } from './utils';
import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;

class Edit extends React.PureComponent<StateType> {
  state = {
    columns: getColumns(this),
    selectedRowKeys: [],
  };

  constructor(props: any) {
    super(props);
    this.getLevelList();
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
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  getLevelList = () =>
    this.props.dispatch({
      type: 'withdraw/getLevelList',
      payload: {},
    });

  withdrawOverview = async () => {
    await this.props.dispatch({
      type: 'withdraw/withdrawOverview',
      payload: { channelId: -1 },
      fn: (res: any) => {
        message.success('SUCCESS');
      },
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    const { handleOk } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        const { selectedRowKeys } = this.state;
        values.merchantId = selectedRowKeys.join();
        values.levelId = Array.isArray(values.levelId) ? values.levelId.join() : values.levelId;
        if (values.merchantId) {
          handleOk(values);
        } else {
          message.error('请选择出款商户');
        }
      }
    });
  };

  onSelectedRowKeysChange = (selectedRowKeys: any[]) => {
    this.setState({
      selectedRowKeys,
    });
  };

  render() {
    const { show, showLoading, title, hide, rowData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { levelListData, withdrawOverviewData } = this.props.withdraw.orserSetting;
    const { columns, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    return (
      <>
        <Modal
          width={800}
          title={title}
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          confirmLoading={showLoading}
          footer={null}
          destroyOnClose
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
            <Form.Item label="条件名称：">
              {getFieldDecorator('conditionName', {
                rules: [{ required: true, message: '请输入条件名称' }],
                initialValue: rowData.conditionName,
                normalize: (value: any) => value && value.toString().trim(),
              })(<Input placeholder="请输入条件名称" autoComplete="off" />)}
            </Form.Item>

            <Form.Item label="层级类型：">
              {getFieldDecorator('levelId', {
                rules: [{ required: true, message: '请选择层级类型' }],
                initialValue: rowData.levelId ? rowData.levelId.split(',').map(Number) : [],
              })(
                <Select
                  placeholder="请选择层级类型"
                  mode="multiple"
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

            <Form.Item label="金额区间：">
              <span className={styles.red}>*</span>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('minAmount', {
                  rules: [{ required: true, message: '请选择金额区间' }],
                  initialValue: rowData.minAmount,
                  normalize: (value: any) => value && value.toString().trim(),
                })(<Input type="number" suffix="元" placeholder="最小金额" autoComplete="off" />)}
              </Form.Item>
              <span> ～ </span>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('maxAmount', {
                  rules: [{ required: true, message: '请选择金额区间' }],
                  initialValue: rowData.maxAmount,
                })(<Input type="number" suffix="元" placeholder="最大金额" autoComplete="off" />)}
              </Form.Item>
            </Form.Item>

            <Form.Item label="出款商户：" className={styles.tab}>
              <span className={styles.red1}>*</span>
              <Button
                className={styles.syncBtn}
                type="primary"
                onClick={() => this.withdrawOverview()}
              >
                同步三方余额
              </Button>
              <Table<StateType>
                style={{ width: 510, maxHeight: 250, overflow: 'scroll' }}
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
                // rules: [{ required: true, message: '备注不能为空' }],
                initialValue: rowData.remark,
              })(<TextArea />)}
            </Form.Item>

            <Form.Item className={styles.editBtns}>
              <Button
                onClick={() => {
                  hide();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={showLoading}
                style={{ marginLeft: '20px' }}
              >
                确定
              </Button>
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
