import { Cascader, Form, Icon, Input, InputNumber, Modal } from 'antd';

import React from 'react';
import ErrorBox from '@/components/ErrorBox';
import { StateType } from '@/common-typings';
import styles from '../style.less';
import type from '@/const/constType';

const { ADJUST_TYPE } = type;
const { TextArea } = Input;

class ApplicationModal extends React.Component<StateType, StateType> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCascaderChange = this.handleCascaderChange.bind(this);
    this.hideErrorBox = this.hideErrorBox.bind(this);
  }

  public state = {
    showErrorBox: false,
    errorMsg: '',
    successStr: '',
    faildStr: '',
    showInput: true,
  };

  public handleSubmit = (e: React.SyntheticEvent) => {
    const { handleOk } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        Object.keys(values).forEach(key => {
          if (values[key] instanceof Array) {
            // values[key] = values[key][0];
            const arr = values[key];
            const [first] = arr;
            values[key] = first;
          }
        });
        handleOk(values, () => {
          const { failInfo } = this.props;
          console.log(failInfo);
          // 显示验证错误信息
          if (failInfo.failList.length > 0 || failInfo.invalid.length > 0) {
            let invalidStr = '';
            let successStr = '';
            let faildStr = '';
            if (failInfo.invalid.length > 0) {
              invalidStr += `账号${failInfo.invalid.join()}不存在`;
            }
            if (failInfo.failList.length > 0) {
              faildStr += `账号${failInfo.failList.join()}不支持该类型`;
            }
            if (failInfo.successList.length > 0) {
              successStr += `账号${failInfo.successList.join()}资金调整申请成功`;
            }
            this.setState({
              showErrorBox: true,
              errorMsg: invalidStr,
              successStr,
              faildStr,
            });
          } else {
            console.log(222);
            this.setState({
              showErrorBox: false,
              errorMsg: '',
              successStr: '',
              faildStr: '',
            });
          }
          this.props.form.resetFields();
          this.setState({
            showInput: true,
          });
        });
      }
    });
  };

  // 调整类型 选择器改变
  public handleCascaderChange = (value: any) => {
    let result: any = null;
    const [value1, value2] = value;
    for (let i = 0; i < ADJUST_TYPE.length; i += 1) {
      if (ADJUST_TYPE[i][value1]) {
        result = ADJUST_TYPE[i][value1];
        break;
      }
    }
    this.props.form.setFieldsValue({
      subType: value2,
    });
    if (value1 === '1018' || value1 === '1011') {
      if (value2 === '8' || value2 === '9') {
        this.setState({
          showInput: false,
        });
      } else {
        this.setState({
          showInput: true,
        });
      }
    } else {
      this.setState({
        showInput: true,
      });
    }
  };

  public hideErrorBox() {
    this.setState({
      showErrorBox: false,
      successStr: '',
      errorMsg: '',
      faildStr: '',
    });
  }

  render() {
    const { show, hide, showLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { showErrorBox, errorMsg, successStr, faildStr } = this.state;

    return (
      <div className={styles.ajustModelWrap}>
        <Modal
          width="580px"
          title="资金调整申请"
          okText="完成"
          visible={show}
          onCancel={() => {
            this.hideErrorBox();
            hide();
            this.setState({
              showInput: true,
            });
            this.props.form.resetFields();
          }}
          confirmLoading={showLoading}
          onOk={this.handleSubmit}
        >
          <ErrorBox
            show={showErrorBox}
            errorMsg={errorMsg}
            hide={this.hideErrorBox}
            faildStr={faildStr}
          />
          <p>{successStr}</p>
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 14 }}>
            <Form.Item label="用户名：">
              {getFieldDecorator('users', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <TextArea
                  placeholder="请输入需要调整资金的会员或代理账户名，多个账户名用“，”隔开，若有重复账号，系统将自动去重"
                  autosize={{ minRows: 3, maxRows: 6 }}
                />,
              )}
            </Form.Item>

            {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
            <Form.Item label="调整类型：">
              {getFieldDecorator('changeType', {
                rules: [{ required: true, message: '请选择调整类型' }],
                // initialValue: ADJUST_TYPE[0].children
              })(
                <Cascader
                  placeholder="请选择调整类型"
                  options={ADJUST_TYPE}
                  onChange={this.handleCascaderChange}
                />,
              )}
            </Form.Item>

            {/* 隐藏的子类型 */}
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator('subType', {})(<Input hidden />)}
            </Form.Item>

            <Form.Item label="调整金额：">
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: '单笔≤50000.00 元' }],
              })(
                <InputNumber
                  style={{ width: '280px' }}
                  className={styles.inputNumber}
                  placeholder="单笔≤50000.00 元"
                  min={1}
                  max={50000.0}
                />,
              )}{' '}
              &nbsp;元
            </Form.Item>
            {this.state.showInput ? (
              <Form.Item label="需求流水金额：" wrapperCol={{ span: 16 }}>
                {getFieldDecorator('freezeAmount', {
                  rules: [{ required: true, message: '请输入需求流水金额' }],
                })(
                  <InputNumber
                    style={{ width: '280px' }}
                    className={styles.inputNumber}
                    min={0}
                    placeholder="请输入需求流水金额"
                  />,
                )}{' '}
                &nbsp;元
              </Form.Item>
            ) : null}

            <Form.Item label="关联订单号：">
              {getFieldDecorator('relationOrderId', {
                normalize: (value: any) => value && value.trim(),
              })(<Input placeholder="请输入关联订单号" allowClear />)}
            </Form.Item>

            <Form.Item label="调整原因：">
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入调整原因' }],
              })(<TextArea placeholder="请输入调整原因" autosize={{ minRows: 3, maxRows: 6 }} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const Wrap = Form.create({})(ApplicationModal);
export default Wrap;
