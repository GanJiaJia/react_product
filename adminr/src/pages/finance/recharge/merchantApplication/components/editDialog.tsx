import { Form, Input, Modal, Radio, Select } from 'antd';
import React from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from '../style.less';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CLIENT_TYPE } from '../../data';
import { getMerchantHasSetApp, getShopList } from '../../service';

interface StateType {
  [propName: string]: any;
}

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class EditDialog extends React.PureComponent<StateType> {
  public state = {
    thirdList: [], // 三方平台
    merchantCodeList: [], // 商户号
  };

  componentDidMount() {
    const { isAdd, rowData } = this.props;
    this.getThirdEffect();
    this.getPaymentEffect();
    if (!isAdd) {
      this.getMerchantCodeEffect({ channelId: rowData.channelId, limitType: rowData.limitType });
    }
  }

  // 获取支付类型
  private getPaymentEffect = () => {
    this.props.dispatch({
      type: 'recharge/getPaymentEffect',
    });
  };

  // 获取三方平台
  private getThirdEffect = (type?: number) => {
    const limitType = _.isNumber(type) ? type : this.props.form.getFieldValue('limitType');
    getMerchantHasSetApp({ limitType }).then((res: any) => {
      if (res.code === 1 && res.data) {
        this.setState({ thirdList: res.data });
      }
    });
  };

  // 获取商户号
  private getMerchantCodeEffect = (params: any) => {
    getShopList(params).then((res: any) => {
      if (res.code === 1 && res.data) {
        this.setState({ merchantCodeList: res.data.list || [] });
      }
    });
  };

  private getParams = (data: any) => {
    const params = { ...data };
    const { id } = this.props.rowData;
    const { levelId } = params;
    params.id = id;
    if (Array.isArray(levelId) && levelId.length > 0) {
      params.levelId = levelId.join(',');
    } else {
      params.levelId = levelId || '';
    }
    delete params.channelId;
    return params;
  };

  private renderForm() {
    const { visible } = this.props;
    const rowData = { ...this.props.rowData };
    const { paymentList, levelList } = this.props.recharge.merchantAppData;
    const { getFieldDecorator } = this.props.form;
    const { thirdList, merchantCodeList } = this.state;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const isCreated = !(rowData && rowData.id);

    if (!_.isEmpty(rowData) && visible) {
      if (Number.isNaN(Number(rowData.levelId)) && typeof rowData.levelId === 'string') {
        const levelIdList = rowData.levelId.split(',');
        rowData.levelId = _.map(levelIdList, item => Number(item));
      } else {
        rowData.levelId = Number(rowData.levelId);
      }
    }

    return (
      <Form {...formItemLayout} className={styles.editForm}>
        {/* 支付渠道 */}
        <FormItem label={<FormattedMessage id="application.edit-form-channel" />}>
          {getFieldDecorator('limitType', {
            initialValue: rowData.limitType || 0,
          })(
            <RadioGroup
              disabled={!isCreated}
              onChange={e => {
                this.props.form.setFieldsValue({ channelId: undefined, merchantId: undefined });
                this.getThirdEffect(e.target.value);
              }}
            >
              {/* 普通渠道 */}
              <Radio value={0}>
                {formatMessage({ id: 'application.edit-form-channel-normal' })}
              </Radio>
              {/* 大额渠道 */}
              <Radio value={1}>
                {formatMessage({ id: 'application.edit-form-channel-large' })}
              </Radio>
            </RadioGroup>,
          )}
        </FormItem>

        {/* 支付类型 */}
        <FormItem label={<FormattedMessage id="application.edit-form-pay-type" />}>
          {getFieldDecorator('paymentId', {
            initialValue: rowData.paymentId,
            rules: [
              // 支付类型为必选项!
              {
                required: true,
                message: formatMessage({ id: 'application.edit-form-pay-type-msg' }),
              },
            ],
          })(
            <Select style={{ width: 250 }} disabled={!isCreated}>
              {paymentList.map((item: any) => (
                <Option value={item.paymentId} key={item.paymentId}>
                  {item.paymentName}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>

        {/* 三方平台 */}
        <FormItem label={<FormattedMessage id="application.edit-form-merchant" />}>
          {getFieldDecorator('channelId', {
            initialValue: rowData.channelId,
            rules: [
              // 三方平台为必选项!
              {
                required: true,
                message: formatMessage({ id: 'application.edit-form-merchant-msg' }),
              },
            ],
          })(
            <Select
              style={{ width: 250 }}
              disabled={!isCreated}
              showSearch
              filterOption={(input, option: any) => option.props.children.indexOf(input) >= 0}
              onChange={(value: any) => {
                this.props.form.setFieldsValue({ merchantId: undefined });
                this.props.form.setFields({
                  merchantId: {
                    value: undefined,
                  },
                });
                const { limitType } = this.props.form.getFieldsValue();
                this.getMerchantCodeEffect({ channelId: value, limitType });
              }}
            >
              {thirdList.map((item: any) => (
                <Option value={item.channelId} key={item.channelId}>
                  {item.channelName}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>
        {/* 商户号 */}
        <FormItem label={<FormattedMessage id="application.edit-form-merhcant-code" />}>
          {getFieldDecorator('merchantId', {
            initialValue: rowData.merchantId,
            rules: [
              // 商户号为必填项!
              {
                required: true,
                message: formatMessage({ id: 'application.edit-form-merchant-code-msg' }),
              },
            ],
          })(
            <Select style={{ width: 250 }} disabled={!isCreated}>
              {merchantCodeList.map((item: any) => (
                <Option value={item.merchantId} key={item.merchantId}>
                  {item.merchantCode}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>

        {/* 应用端 */}
        <FormItem label={<FormattedMessage id="application.edit-form-client" />}>
          {getFieldDecorator('clientType', {
            initialValue: rowData.clientType,
            rules: [
              // 应用端为必填项!
              {
                required: true,
                message: formatMessage({ id: 'application.edit-form-client-msg' }),
              },
            ],
          })(
            <Select style={{ width: 250 }}>
              {CLIENT_TYPE.map((item: any) => (
                <Option value={item.value} key={item.value}>
                  {item.title}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>

        {/* 层级 */}
        <FormItem label={<FormattedMessage id="application.edit-form-level" />}>
          {getFieldDecorator('levelId', {
            initialValue: rowData.levelId,
            rules: [
              // 层级为必填项!
              {
                required: true,
                message: formatMessage({ id: 'application.edit-form-level-msg' }),
              },
            ],
          })(
            <Select style={{ width: 350 }} mode="multiple">
              {levelList.map((item: any) => (
                <Option value={item.levelId} key={item.levelId}>
                  {item.name}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>

        {/* 备注 */}
        <FormItem label={<FormattedMessage id="application.edit-form-remark" />}>
          {getFieldDecorator('remark', {
            initialValue: rowData.remark,
            rules: [
              // 请输入备注!
              {
                required: true,
                message: formatMessage({ id: 'application.edit-form-remark-msg' }),
                type: 'string',
              },
            ],
          })(
            <TextArea
              rows={4}
              placeholder={formatMessage({ id: 'application.edit-form-remark-placeholder' })}
            />,
          )}
        </FormItem>
      </Form>
    );
  }

  render() {
    const { visible, isAdd } = this.props;
    const title = isAdd
      ? formatMessage({ id: 'application.edit-add-merchant' })
      : formatMessage({ id: 'application.edit-edit-merchant' });
    return (
      // 新增三方平台应用/编辑三方平台应用
      <Modal
        title={title}
        visible={visible}
        width={800}
        onOk={() => {
          this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
              const params = this.getParams(values);
              this.props.confirm(params);
              this.props.form.resetFields();
            }
          });
        }}
        onCancel={() => {
          this.props.form.resetFields();
          this.props.cancel();
        }}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

const EditDialogContainer = Form.create({ name: 'merchantEditDialog' })(EditDialog);

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(EditDialogContainer),
);
