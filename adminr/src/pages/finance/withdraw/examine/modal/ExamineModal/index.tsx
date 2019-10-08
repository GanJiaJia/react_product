import { Button, Form, Input, Table, Modal, Select, Radio } from 'antd';

import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import { getColumnsOne, getColumnsTwo } from './utils';
import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;

class Edit extends React.Component<StateType> {
  state = {
    columnsOne: getColumnsOne(this),
    columnsTwo: getColumnsTwo(this),
  };

  handleFresh = () => {
    const { modalTabData } = this.props;
    this.props.dispatch({
      type: 'withdraw/withdrawStatusConfim',
      // 请求参数
      payload: { orderId: modalTabData.orderId },
    });
    // withdrawStatusConfim
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    const { modalHandleOk } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        modalHandleOk(values);
      }
    });
  };

  render() {
    // 0成功，1失败,2处理中
    const withdrawStatusMap = {
      0: '成功',
      1: '失败',
      2: '处理中',
    };
    const { getFieldDecorator } = this.props.form;
    const { show, showLoading, title, hide, modalTabData = [], loadingBtn } = this.props;
    const { columnsOne, columnsTwo } = this.state;
    const { statusConfimData } = this.props.withdraw.examine;
    // const statusConfimData = {
    //   amount: 200,
    //   dbStatus: 0,
    //   merchantCode: '1830',
    //   merchantId: 29,
    //   merchantName: 'StormPay',
    //   orderId: 'TX201909141411NG0BGA',
    //   remark: '',
    //   status: 2,
    //   successTime: 1568458428246,
    //   thirdOrderId: '201909141411NG0BGA',
    // };
    let tabData: any;
    let tabDataArr: any;
    if (Object.keys(statusConfimData).length) {
      tabData = { ...modalTabData };
      tabData.withdrawStatus = statusConfimData.status;
      tabData.orderId = statusConfimData.thirdOrderId;
      columnsTwo[5].render = key => <span>{withdrawStatusMap[key]}</span>;
    } else {
      tabData = {};
    }
    if (Object.keys(tabData).length) {
      tabDataArr = [tabData];
    } else {
      tabDataArr = null;
    }
    return (
      <>
        <Modal
          destroyOnClose
          width={800}
          title={title}
          okText="确定"
          visible={show}
          onCancel={() => {
            hide();
          }}
          confirmLoading={showLoading}
          footer={null}
        >
          <p>系统订单信息</p>
          <Table
            columns={columnsOne}
            size="small"
            dataSource={[modalTabData]}
            rowKey={(record: any, index: any) => record.orderId || index}
            pagination={false}
            bordered
          />
          <br />
          <p>
            三方商户订单信息{' '}
            <Button type="link" onClick={this.handleFresh} loading={loadingBtn}>
              验证订单状态
            </Button>
          </p>
          <Table
            columns={columnsTwo}
            size="small"
            dataSource={tabDataArr}
            rowKey={(record: any, index: any) => record.id || index}
            pagination={false}
            bordered
          />
          <br />
          <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} onSubmit={this.handleSubmit}>
            <Form.Item label="审核结果">
              {getFieldDecorator('status', {
                rules: [{ required: true, message: '选择审核结果' }],
                initialValue: 1,
              })(
                <Radio.Group>
                  <Radio value={1}>通过</Radio>
                  {/* <Radio value={2}>不通过</Radio> */}
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label="备注：">
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '备注不能为空' }],
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
export default connect(({ withdraw, loading }: any) => ({
  withdraw,
  loadingBtn: loading.effects['withdraw/withdrawStatusConfim'],
}))(Wrap);
