import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { Fragment } from 'react';

import { CheckForm } from '../until';
import { StateType } from '@/common-typings';
import codes from '@/const/perssionDataCode';
import styles from '../style.less';

const { SECOND_ADJUST_MENU_ID } = codes;

const { TextArea } = Input;
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
          step: 2,
          remark: values.secondRemark,
          status: values.status,
          menuId: SECOND_ADJUST_MENU_ID,
        };
        handleOk(params, () => {
          console.log(values);
          this.props.form.resetFields();
        });
      }
    });
  };

  render() {
    const { show, hide, showLoading, isSecondUncheck, rowData, loadingSecondCheck } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="二次审核"
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
              {getFieldDecorator('firstMark', {
                initialValue: rowData.firstRemark,
              })(<TextArea placeholder="" disabled />)}
            </Form.Item>

            <Form.Item label="二审备注：">
              {getFieldDecorator('secondRemark', {
                rules: [
                  { required: isSecondUncheck, message: isSecondUncheck ? '请填写二审备注' : null },
                ],
                initialValue: isSecondUncheck ? '' : rowData.secondRemark,
              })(<TextArea placeholder="请填写二审备注信息" disabled={!isSecondUncheck} />)}
            </Form.Item>

            {isSecondUncheck ? (
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
                  <Button onClick={this.handleSubmit} loading={loadingSecondCheck} type="primary">
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
