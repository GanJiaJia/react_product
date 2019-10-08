import { Button, Form, Input, Select } from 'antd';
import React, { Fragment, ReactNode } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { getMerchantRateColumns } from './utils';
import { TABLE_HEIGHT } from '../data';
import Mtable from '../components/Mtable/index';

const FormItem = Form.Item;
const { Option } = Select;

interface StateType {
  [propName: string]: any;
}

class SuccessRate extends React.PureComponent<StateType> {
  public refMtable: any;

  componentDidMount() {
    this.getMerchantListEffect();
  }

  // 获取三方商户
  private getMerchantListEffect = () => {
    this.props.dispatch({
      type: 'recharge/merchantListEffect',
    });
  };

  // 表单搜索
  private handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.refMtable.getTableData();
  };

  // 表单重置
  private handleReset = () => {
    this.props.form.resetFields();
    this.refMtable.getTableData();
  };

  public render(): ReactNode {
    // 筛选项
    const renderFilters = (): ReactNode => {
      const { getFieldDecorator } = this.props.form;
      const { merchantData } = this.props.recharge;
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          {/* 三方商户 */}
          <FormItem label={<FormattedMessage id="merchant-success-rate.filters.merchant" />}>
            {getFieldDecorator('channelId', {
              initialValue: -1,
            })(
              <Select
                style={{ width: 120 }}
                showSearch
                filterOption={(input, option: any) => option.props.children.indexOf(input) >= 0}
              >
                <Option value={-1}>全部</Option>
                {merchantData.map((item: any) => (
                  <Option value={item.channelId} key={item.channelId}>
                    {item.channelName}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>

          {/* 商户号 */}
          <FormItem label={<FormattedMessage id="merchant-success-rate.filters.merchant-code" />}>
            {getFieldDecorator('merchantCode', {
              initialValue: '',
            })(<Input placeholder="请输入商户号" onPressEnter={this.handleSubmit} />)}
          </FormItem>

          <FormItem>
            {/* 搜索 */}
            <Button type="primary" htmlType="submit">
              {formatMessage({ id: 'merchant-success-rate.filters.search-btn' })}
            </Button>

            {/* 重置 */}
            <Button style={{ marginLeft: '5px' }} onClick={this.handleReset}>
              {formatMessage({ id: 'merchant-success-rate.filters.reset-btn' })}
            </Button>
          </FormItem>
        </Form>
      );
    };

    const renderTable = (): ReactNode => {
      const { merchantSuccessRate } = this.props.recharge;

      return (
        <Mtable
          dataSource={merchantSuccessRate}
          columns={getMerchantRateColumns(this)}
          dispatch={this.props.dispatch}
          effectType="recharge/merchantRateDataEffect"
          validateFields={this.props.form.validateFieldsAndScroll}
          ref={(element: ReactNode) => {
            this.refMtable = element;
          }}
        />
      );
    };

    return (
      <Fragment>
        {renderFilters()}
        {renderTable()}
      </Fragment>
    );
  }
}

const SuccessRateContainer = Form.create({ name: 'merchantSucessRate' })(SuccessRate);

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(SuccessRateContainer),
);
