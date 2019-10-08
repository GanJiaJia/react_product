import { Button, Card, Form, Input, Select, Table, notification } from 'antd';
import React, { Fragment, ReactNode } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import * as tools from '@/utils/tools';

import { getOrdQuckPaymentColumns, getWithdrawColumns } from '../utils';
import OrdBankDialog from './ordBankDialog';
import OrdEditDialog from './ordEditDialog';
import styles from '../style.less';
import { checkPermission } from '@/utils/resolvePermission';

const FormItem = Form.Item;
const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

interface PropType {
  [propName: string]: any;
}

// 渲染快捷金额设置表格
function renderFastTable(self: any): ReactNode {
  const columns = getOrdQuckPaymentColumns(self);
  const { rechargeType } = self.props;
  const { fastAmountList } =
    rechargeType === 0
      ? self.props.recharge.ordinaryAmountData
      : self.props.recharge.largeAmountData;
  return (
    <Table
      loading={self.state.loading}
      bordered
      rowKey={(record: any, index: number) => String(index)}
      columns={columns}
      dataSource={fastAmountList}
      pagination={false}
    />
  );
}

// 渲染提现通道设置表单
function renderFilters(self: any): ReactNode {
  const { getFieldDecorator } = self.props.form;
  const { merchantData, merchantAppData } = self.props.recharge;
  const { shopList } = merchantAppData;

  return (
    <Form layout="inline" onSubmit={self.handleSubmit}>
      {/* 三方支付名称 */}
      <FormItem label={<FormattedMessage id="amount.withdraw-channel-merchant-name" />}>
        {getFieldDecorator('channelId')(
          <Select
            style={{ width: 200 }}
            placeholder={formatMessage({ id: 'amount.withdraw-channel-merchant-name-placeholder' })}
            onChange={(val: number) => {
              self.getShopListEffect(val);
              self.props.form.resetFields('merchantId');
            }}
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
      <FormItem label={<FormattedMessage id="amount.withdraw-channel-merchant-code" />}>
        {getFieldDecorator('merchantId')(
          <Select
            style={{ width: 200 }}
            placeholder={formatMessage({ id: 'amount.withdraw-channel-merchant-code-placeholder' })}
          >
            {shopList.map((item: any) => (
              <Option value={item.merchantId} key={item.merchantId}>
                {item.merchantCode}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>

      <FormItem>
        {/* 搜索 */}
        <Button type="primary" htmlType="submit">
          {formatMessage({ id: 'amount.search-btn' })}
        </Button>
        {/* 重置 */}
        <Button
          style={{ marginLeft: '5px' }}
          onClick={() => {
            self.props.form.resetFields();
            self.getFastTableData();
          }}
        >
          {formatMessage({ id: 'amount.reset-btn' })}
        </Button>
      </FormItem>
    </Form>
  );
}

// 渲染提现通道表格
function renderWithdrawTable(self: any): ReactNode {
  const { rechargeType } = self.props;
  const { data } =
    rechargeType === 0
      ? self.props.recharge.ordinaryAmountData
      : self.props.recharge.largeAmountData;

  return (
    <Table
      loading={self.state.loading}
      style={{ marginTop: '20px' }}
      bordered
      rowKey={(record: any, index: any) => index}
      columns={getWithdrawColumns(self)}
      dataSource={data}
      pagination={false}
    />
  );
}

class OrdinaryTabPane extends React.PureComponent<PropType, StateType> {
  public state = {
    isEdit: false,
    fastAmountList: [],
    rowData: {},
    ordEditDialogVisible: false,
    ordBankDialogVisible: false,
    loading: false,
  };

  componentDidMount() {
    this.getFastTableData();
    this.getShopEffect();
  }

  // 获取三方平台
  private getShopEffect = () => {
    this.props.dispatch({
      type: 'recharge/merchantListEffect',
    });
  };

  // 获取快捷金额设置
  private getFastTableData = (params?: object) => {
    const { rechargeType } = this.props;
    const payload = params ? { limitType: rechargeType, ...params } : { limitType: rechargeType };
    this.props.dispatch({
      type: 'recharge/getFastAmountEffect',
      payload,
      callback: (fastAmountList: any) => {
        this.setState({
          fastAmountList,
          loading: false,
        });
      },
    });
    this.setState({ loading: true });
  };

  // 保存快捷金额设置
  private setFastAmountEffect = () => {
    const { rechargeType } = this.props;
    const { fastAmountList } = this.state;
    const fastAmountObj = fastAmountList['0'];
    const list: any[] = [];
    _.forIn(fastAmountObj, val => {
      list.push(val);
    });
    const amounts = list.join(',');
    this.props.dispatch({
      type: 'recharge/setFastAmountEffect',
      payload: {
        limitType: rechargeType,
        amounts,
      },
      callback: () => {
        this.getFastTableData();
      },
    });
  };

  // 获取银行列表
  private getBankListEffect = () => {
    const payload = {
      channelId: this.state.rowData.channelId,
      rechargeType: this.props.rechargeType,
    };
    this.props.dispatch({
      type: 'recharge/setWithdrawBankEffect',
      payload,
    });
  };

  // 保存快捷金额设置
  private handelFastAmountSubmit = () => {
    this.setState({ isEdit: false });
    this.setFastAmountEffect();
  };

  // 保存充值配置
  private editWithdrawEffect = (params: any) => {
    const limitType = this.props.rechargeType;
    const { merchantId, paymentId, feeId } = this.state.rowData;
    this.props.dispatch({
      type: 'recharge/setWithdrawEffect',
      payload: {
        limitType,
        merchantId,
        paymentId,
        feeId,
        ...params,
      },
      callback: () => {
        const data = tools.handleSendData(this.props.form.getFieldsValue());
        this.getFastTableData(data);
        this.setState({
          ordEditDialogVisible: false,
          rowData: {},
        });
      },
    });
  };

  // 设置银行卡限额
  private setBankEffect = (payload: any) => {
    this.props.dispatch({
      type: 'recharge/setWithdrawBankAmountEffect',
      payload,
      callback: () => {
        this.setState({
          ordBankDialogVisible: false,
          rowData: {},
        });
        const params = tools.handleSendData(this.props.form.getFieldsValue());
        this.getFastTableData({
          limitType: this.props.rechargeType,
          ...params,
        });
      },
    });
  };

  // 表单搜索
  private handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const params = tools.handleSendData(this.props.form.getFieldsValue());
    this.getFastTableData({
      limitType: this.props.rechargeType,
      ...params,
    });
  };

  // 获取商户号
  private getShopListEffect = (channelId: number) => {
    this.props.dispatch({
      type: 'recharge/getShopEffect',
      payload: {
        limitType: this.props.rechargeType,
        channelId,
      },
    });
  };

  render(): ReactNode {
    const { ordEditDialogVisible, ordBankDialogVisible, rowData, loading } = this.state;
    const { rechargeType } = this.props;
    const { fastAmountList } =
      rechargeType === 0
        ? this.props.recharge.ordinaryAmountData
        : this.props.recharge.largeAmountData;

    let btnExtra: any = null;

    if (
      !this.state.isEdit &&
      checkPermission(this.props.btns, 'new-finance-recharge-amount-set-edit')
    ) {
      btnExtra = (
        // 编辑
        <span
          className={styles.editBtn}
          onClick={() => {
            this.setState({ isEdit: true });
          }}
        >
          {formatMessage({ id: 'amount.edit-btn' })}
        </span>
      );
    }
    if (this.state.isEdit) {
      btnExtra = (
        // 保存
        <span className={styles.editBtn} onClick={this.handelFastAmountSubmit}>
          {formatMessage({ id: 'amount.save-btn' })}
        </span>
      );
    }

    return (
      <Fragment>
        {/* 快捷金额设置 */}
        <Card
          className={styles.cardContainer}
          title={formatMessage({ id: 'amount.fast-amount-set-title' })}
          extra={btnExtra}
          style={{ width: '100%' }}
        >
          {fastAmountList.length > 0 && renderFastTable(this)}
        </Card>

        {/* 提现通道设置 */}
        <Card
          className={styles.cardContainer}
          title={formatMessage({ id: 'amount.recharge-channel-set-title' })}
          style={{ width: '100%' }}
        >
          {renderFilters(this)}
          {renderWithdrawTable(this)}
        </Card>

        {ordEditDialogVisible ? (
          <OrdEditDialog<>
            rowData={rowData}
            visible={ordEditDialogVisible}
            cancel={() => {
              this.setState({
                ordEditDialogVisible: false,
                rowData: {},
              });
            }}
            confirm={this.editWithdrawEffect}
          />
        ) : null}

        {ordBankDialogVisible ? (
          <OrdBankDialog<>
            rowData={rowData}
            visible={ordBankDialogVisible}
            rechargeType={this.props.rechargeType}
            cancel={() => {
              this.setState({
                ordBankDialogVisible: false,
                rowData: {},
              });
            }}
            confirm={this.setBankEffect}
          />
        ) : null}
      </Fragment>
    );
  }
}

const OrdinaryTabPaneContainer = Form.create({ name: 'ordinaryAmount' })(OrdinaryTabPane);

export default withRouter(
  connect(({ recharge, global }: { recharge: any; global: any }) => ({
    recharge,
    btns: global.btns,
  }))(OrdinaryTabPaneContainer),
);
