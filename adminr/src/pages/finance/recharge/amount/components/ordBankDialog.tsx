import { Form, Modal, Table, message, Button } from 'antd';

import React, { ReactNode } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { getWithdrawBankColumns } from '../utils';
import styles from '../style.less';
import { setTimeoutClose } from '../../utils';

interface StateType {
  [propName: string]: any;
}

interface PropType {
  [propName: string]: any;
}

function renderTable(self: any): ReactNode {
  const { rechargeType } = self.props;
  const { bankList } =
    rechargeType === 0
      ? self.props.recharge.ordinaryAmountData
      : self.props.recharge.largeAmountData;
  return (
    <Table
      className={styles.bankTable}
      size="small"
      columns={getWithdrawBankColumns(self)}
      dataSource={bankList}
      pagination={false}
    />
  );
}

// 处理银行表格参数
function getParams(data: any[]): object {
  const list = data.filter(item => item.checked);
  const bankList = _.map(list, (item: any) => ({
    paybankId: item.paybankId,
    status: item.status,
    minAmount: item.minAmount || 0,
    maxAmount: item.maxAmount || 0,
  }));
  return { bankList };
}

// 验证银行卡最低金额、最高金额
function checkAmount(data: any, bankList: any[]) {
  let flag = true;
  _.forEach(data.bankList, (item: any, index: number): boolean | void => {
    const { minAmount, maxAmount } = item;
    if (minAmount > maxAmount) {
      const { bankName } = bankList[index];
      message.error(`${bankName}, ${formatMessage({ id: 'amount.bank-dialog-error-message' })}`);
      flag = false;
    }
  });
  return flag;
}

class OrdBankDialog extends React.PureComponent<PropType, StateType> {
  public state: StateType = {
    bankList: [],
    visible: false,
  };

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  componentWillReceiveProps(nextProps: any) {
    const { rechargeType } = nextProps;
    const bankList =
      rechargeType === 0
        ? [...nextProps.recharge.ordinaryAmountData.bankList]
        : [...nextProps.recharge.largeAmountData.bankList];
    if (bankList.length) {
      this.setState({
        bankList,
      });
    }
  }

  private handleClose = () => {
    const payload = getParams(this.state.bankList);
    const flag = checkAmount(payload, this.state.bankList);
    if (flag) {
      this.setState({ visible: false });
      setTimeoutClose(() => {
        this.props.confirm(payload);
      });
    }
  };

  render(): ReactNode {
    const { visible } = this.state;

    return (
      // 设置银行卡限额
      <Modal
        title={formatMessage({ id: 'amount.bank-dialog-title' })}
        visible={visible}
        width={800}
        maskClosable={false}
        onCancel={this.props.cancel}
        footer={[
          // 取消
          <Button key="cancel" onClick={this.props.cancel}>
            {formatMessage({ id: 'amount.cancel-btn' })}
          </Button>,
          // 确定
          <Button
            key="comfirm"
            type="primary"
            onClick={() => {
              const payload = getParams(this.state.bankList);
              const flag = checkAmount(payload, this.state.bankList);
              if (flag) {
                this.setState({ visible: false });
                setTimeoutClose(() => {
                  this.props.confirm(payload);
                });
              }
            }}
          >
            {formatMessage({ id: 'amount.confirm-btn' })}
          </Button>,
        ]}
      >
        <Form>{renderTable(this)}</Form>
        <p className={styles.tip}>
          <FormattedMessage id="amount.bank-dialog-tip-one" />
        </p>
        <p className={styles.tip}>
          <FormattedMessage id="amount.bank-dialog-tip-two" />
        </p>
      </Modal>
    );
  }
}

const OrdBankDialogContainer = Form.create({ name: 'ordinaryBankDialog' })(OrdBankDialog);

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(OrdBankDialogContainer),
);
