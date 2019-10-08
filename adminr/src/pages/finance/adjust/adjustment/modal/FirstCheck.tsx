import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { Fragment } from 'react';

import { CheckForm } from '../until';
import { StateType } from '@/common-typings';
import codes from '@/const/perssionDataCode';
import styles from '../style.less';

const { TextArea } = Input;
const { FIRST_ADJUST_MENU_ID } = codes;

class FirstCheckModal extends React.Component<StateType, StateType> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public state = {};

  public handleSubmit = (e: React.SyntheticEvent) => {
    const { handleOk } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      let params: { [propName: string]: string | number };
      if (!err) {
        params = {
          orderId: this.props.rowData.orderId,
          step: 1,
          remark: values.firstRemark,
          status: values.status,
          menuId: FIRST_ADJUST_MENU_ID,
        };
        handleOk(params, () => {
          this.props.form.resetFields();
        });
      }
    });
  };

  render() {
    const { show, hide, showLoading, isFisrtUncheck, rowData, loadingFirstCheck } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="一次审核"
          okText="确认"
          visible={show}
          onCancel={() => {
            hide();
            this.props.form.resetFields();
          }}
          confirmLoading={showLoading}
          onOk={this.handleSubmit}
          footer={null}
        >
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }}>
            <CheckForm rowData={rowData} getFieldDecorator={getFieldDecorator} />
            <Form.Item label="一审备注：">
              {getFieldDecorator('firstRemark', {
                rules: [
                  { required: isFisrtUncheck, message: isFisrtUncheck ? '请填写一审备注' : null },
                ],
                initialValue: isFisrtUncheck ? '' : rowData.firstRemark,
              })(<TextArea placeholder="请填写一审备注信息" disabled={!isFisrtUncheck} />)}
            </Form.Item>

            {isFisrtUncheck ? (
              <Fragment>
                <Form.Item label="审核结果：">
                  {getFieldDecorator('status', {
                    rules: [{ required: true, message: '请选择审核结果' }],
                    initialValue: '',
                  })(
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="1">通过</Radio.Button>
                      <Radio.Button value="2">不通过</Radio.Button>
                    </Radio.Group>,
                  )}
                </Form.Item>

                <Form.Item className={styles.firstCheckBtn}>
                  <Button
                    onClick={() => {
                      hide();
                      this.props.form.resetFields();
                    }}
                  >
                    取消
                  </Button>
                  <Button onClick={this.handleSubmit} loading={loadingFirstCheck} type="primary">
                    确认
                  </Button>
                </Form.Item>
              </Fragment>
            ) : null}
          </Form>
        </Modal>
      </div>
    );
  }
}
const Wrap = Form.create({})(FirstCheckModal);
export default Wrap;
