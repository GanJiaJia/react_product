import { Form, Input, InputNumber, Modal, Radio, Select } from 'antd';
import React from 'react';
import _ from 'lodash';
import { connect } from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import styles from '../style.less';
import { STATUS_OPEN } from '../../data';

interface StateType {
  [propName: string]: any;
}

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

function renderForm(self: any) {
  const { rowData } = self.props;
  const { channelId } = rowData;
  const { merchantData } = self.props.recharge;
  const { getFieldDecorator } = self.props.form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  // const isCreated = !(rowData && rowData.merchantId);
  const disableFlag = rowData.status === STATUS_OPEN;
  return (
    <Form {...formItemLayout} className={styles.editForm}>
      {/* 渠道类型 */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.channel-name" />}>
        {getFieldDecorator('limitType', {
          initialValue: rowData.limitType || 0,
        })(
          <RadioGroup disabled={disableFlag}>
            {/* 普通渠道 */}
            <Radio value={0}>
              {formatMessage({ id: 'merchant-set-edit.channel-name-normal' })}
            </Radio>
            {/* 大额渠道 */}
            <Radio value={1}>{formatMessage({ id: 'merchant-set-edit.channel-name-large' })}</Radio>
          </RadioGroup>,
        )}
      </FormItem>

      {/* 三方平台 */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.merchant" />}>
        {getFieldDecorator('channelId', {
          initialValue: channelId,
          rules: [
            // 三方平台为必选项!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.merchant-msg' }),
            },
          ],
        })(
          <Select
            style={{ width: 120 }}
            disabled={disableFlag}
            showSearch
            filterOption={(input, option: any) => option.props.children.indexOf(input) >= 0}
          >
            {merchantData.map((item: any) => (
              <Option value={item.channelId} key={item.channelId}>
                {item.channelName}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>

      {/* 商户号 */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.merchant-code" />}>
        {getFieldDecorator('merchantCode', {
          initialValue: rowData.merchantCode,
          rules: [
            // 商户号为必填项!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.merchant-code-msg' }),
              type: 'string',
            },
          ],
        })(
          <Input
            placeholder={formatMessage({ id: 'merchant-set-edit.merchant-code-placeholder' })}
            disabled={disableFlag}
          />,
        )}
      </FormItem>

      {/* 公钥 */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.public-key" />}>
        {getFieldDecorator('publicKey', {
          initialValue: rowData.publicKey,
          rules: [
            // 公钥为必填项!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.public-key-msg' }),
              type: 'string',
            },
          ],
        })(
          <Input
            placeholder={formatMessage({ id: 'merchant-set-edit.public-key-placeholder' })}
            disabled={disableFlag}
          />,
        )}
      </FormItem>

      {/* 私钥 */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.private-key" />}>
        {getFieldDecorator('privateKey', {
          initialValue: rowData.privateKey,
          rules: [
            // 私钥为必填项!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.private-key-msg' }),
              type: 'string',
            },
          ],
        })(
          <Input
            placeholder={formatMessage({ id: 'merchant-set-edit.private-key-placeholder' })}
            disabled={disableFlag}
          />,
        )}
      </FormItem>

      {/* 请求URL */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.request-url" />}>
        {getFieldDecorator('payUrl', {
          initialValue: rowData.payUrl,
          rules: [
            // 请求URL为必填项!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.request-url-msg' }),
              type: 'string',
            },
          ],
        })(
          <Input
            placeholder={formatMessage({ id: 'merchant-set-edit.request-url-placeholder' })}
            disabled={disableFlag}
          />,
        )}
      </FormItem>

      {/* 接收URL */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.receive-url" />}>
        {getFieldDecorator('notifyUrl', {
          initialValue: rowData.notifyUrl,
          rules: [
            // 接收URL为必填项!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.receive-url-msg' }),
              type: 'string',
            },
          ],
        })(
          <Input
            placeholder={formatMessage({ id: 'merchant-set-edit.receive-url-placeholder' })}
            disabled={disableFlag}
          />,
        )}
      </FormItem>

      {/* 结果URL */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.result-url" />}>
        {getFieldDecorator('resultUrl', {
          initialValue: rowData.resultUrl,
          rules: [
            // 结果URL为必填项!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.result-url-msg' }),
              type: 'string',
            },
          ],
        })(
          <Input
            placeholder={formatMessage({ id: 'merchant-set-edit.result-url-placeholder' })}
            disabled={disableFlag}
          />,
        )}
      </FormItem>

      {/* 备注 */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.remark" />}>
        {getFieldDecorator('remark', {
          initialValue: rowData.remark,
          rules: [
            // 请输入备注!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.remark-placeholder' }),
              type: 'string',
            },
          ],
        })(
          <TextArea
            rows={4}
            placeholder={formatMessage({ id: 'merchant-set-edit.remark-placeholder' })}
            disabled={disableFlag}
          />,
        )}
      </FormItem>

      {/* 当日入款上限 */}
      <FormItem label={<FormattedMessage id="merchant-set-edit.day-limit" />}>
        {getFieldDecorator('dailyLimit', {
          initialValue: rowData.dailyLimit,
          rules: [
            // 当日入款上限为必填项!
            {
              required: true,
              message: formatMessage({ id: 'merchant-set-edit.day-limit-msg' }),
              type: 'number',
            },
          ],
        })(<InputNumber style={{ width: 180 }} min={0} disabled={disableFlag} />)}
      </FormItem>
    </Form>
  );
}

class EditDialog extends React.PureComponent<StateType> {
  render() {
    const { visible, rowData, isAdd } = this.props;
    const title = isAdd
      ? formatMessage({ id: 'merchant-set-edit.add-merchant' })
      : formatMessage({ id: 'merchant-set-edit.edit-merchant' });

    return (
      // 新增/编辑三方平台
      <Modal
        title={title}
        visible={visible}
        width={800}
        onOk={() => {
          this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
              values.merchantId = rowData.merchantId;
              this.props.confirm(values, this.props.form.resetFields);
            }
          });
        }}
        onCancel={() => {
          this.props.cancel();
          this.props.form.resetFields();
        }}
      >
        {renderForm(this)}
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
