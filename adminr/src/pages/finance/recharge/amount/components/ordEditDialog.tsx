import React, { ReactNode } from 'react';
import { Form, InputNumber, Modal } from 'antd';
import _ from 'lodash';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import styles from '../style.less';
import { setTimeoutClose } from '../../utils';

const FormItem = Form.Item;

interface StateType {
  [propName: string]: any;
}

interface PropType {
  [propName: string]: any;
}

function renderForm(self: any): ReactNode {
  const { rowData } = self.props;
  const { getFieldDecorator } = self.props.form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Form {...formItemLayout} className={styles.editForm}>
      {/* 商户名 */}
      <FormItem label={formatMessage({ id: 'amount-edit-dialog-merchant-name' })}>
        {rowData.channelName}
      </FormItem>
      {/* 商户号 */}
      <FormItem label={formatMessage({ id: 'amount-edit-dialog-merchant-code' })}>
        {rowData.merchantCode}
      </FormItem>
      {/* 充值名称显示 */}
      <FormItem label={formatMessage({ id: 'amount-edit-dialog-recharge-name' })}>
        {rowData.paymentName}
      </FormItem>
      {/* 手续费配置 */}
      <FormItem label={formatMessage({ id: 'amount-edit-dialog-fee-set' })}>
        {getFieldDecorator('feeRate', {
          initialValue: (rowData.feeRate >= 0 && rowData.feeRate) || '0.00',
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'amount-edit-dialog-fee-set-placeholder' }),
            },
          ],
        })(<InputNumber style={{ width: '200px' }} precision={2} min={0} />)}
        %
      </FormItem>
      {/* 最大手续费金额 */}
      <FormItem label={formatMessage({ id: 'amount-edit-dialog-max-fee-set' })}>
        {getFieldDecorator('maxFee', {
          initialValue: (rowData.maxFee >= 0 && rowData.maxFee) || '0.00',
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'amount-edit-dialog-max-fee-set-placeholder' }),
            },
          ],
        })(<InputNumber style={{ width: '200px' }} precision={2} min={0} />)}
        元
      </FormItem>
      {/* 充值上下限配置 */}
      <div className={styles.item}>
        {/* 元 */}
        <FormItem label={formatMessage({ id: 'amount-edit-dialog-recharge-min-max-set' })}>
          {getFieldDecorator('minAmount', {
            initialValue: (rowData.minAmount >= 0 && rowData.minAmount) || '0.00',
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'amount-edit-dialog-recharge-min-set-placeholder' }),
              },
            ],
          })(<InputNumber style={{ width: '200px' }} precision={2} min={0} />)}
          {formatMessage({ id: 'amount-edit-dialog-money' })}
        </FormItem>

        {/* 元 */}
        <FormItem>
          {getFieldDecorator('maxAmount', {
            initialValue: (rowData.maxAmount >= 0 && rowData.maxAmount) || '0.00',
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'amount-edit-dialog-recharge-max-set-placeholder' }),
              },
            ],
          })(<InputNumber style={{ width: '200px' }} precision={2} min={0} />)}
          {formatMessage({ id: 'amount-edit-dialog-money' })}
        </FormItem>
      </div>
    </Form>
  );
}

class OrdEditDialog extends React.PureComponent<PropType, StateType> {
  public state: StateType = {
    visible: false,
  };

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  render(): ReactNode {
    const { visible } = this.state;

    return (
      // 编辑充值金额配置
      <Modal
        title={formatMessage({ id: 'amount-edit-dialog-title' })}
        visible={visible}
        width={800}
        onOk={() => {
          this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
              this.setState({ visible: false });
              setTimeoutClose(() => {
                this.props.confirm(values);
              });
            }
          });
        }}
        onCancel={() => {
          this.setState({ visible: false });
          setTimeoutClose(() => {
            this.props.cancel();
          });
        }}
      >
        {renderForm(this)}
      </Modal>
    );
  }
}

const OrdEditDialogContainer = Form.create({ name: 'ordinaryEditDialog' })(OrdEditDialog);

export default OrdEditDialogContainer;
