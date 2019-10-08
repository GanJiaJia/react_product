import React, { ReactNode, Fragment } from 'react';

import { Table } from 'antd';
import moment from 'moment';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import BaseComponent from '@/components/BaseComponent';

class Mtable extends BaseComponent {
  public self = this;

  constructor(props: any) {
    super(props);
    this.bindEffects();
  }

  public state = {
    page: 1,
    size: this.props.pageSize || 20,
    total: 0,
  };

  public handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // 表头有过滤功能需要传递该prop
    const { setFiltersParams } = this.props;
    if (typeof setFiltersParams !== 'function') {
      this.setState(
        {
          page: pagination.current,
          size: pagination.pageSize,
        },
        () => {
          this.bindEffects();
        },
      );
      return;
    }
    setFiltersParams(filters, sorter, () => {
      this.setState(
        {
          page: pagination.current,
          size: pagination.pageSize,
        },
        () => {
          this.bindEffects();
        },
      );
    });
  };

  // 查询充值资金管理 ， SyntheticEvent 是处理表带的事件对象类型;
  public handleSubmit(e: React.SyntheticEvent, self: any, formatType = 'YYYY-MM-DD') {
    e.preventDefault();
    self.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        const keys = Object.keys(values);
        const effectParams = {};
        keys.forEach(key => {
          if (values[key]) {
            effectParams[key] = values[key];
          }
          // 处理参数为数组，只取数组第一项
          if (values[key] instanceof Array) {
            const arr = values[key];
            const [first] = arr;
            effectParams[key] = first;
          }
          // 处理时间参数
          if (values[key] && moment.isMoment(values[key])) {
            effectParams[key] = moment(values[key]).format(formatType);
          }
        });
        // const params = Object.assign(self.state.effectParams, effectParams);
        const params = {
          startDate: self.state.effectParams.startDate,
          endDate: self.state.effectParams.endDate,
          ...effectParams,
        };

        self.setState({ effectParams: params }, () => {
          this.bindEffects();
        });
      }
    });
  }

  //  获取表格数据
  private bindEffects(cb: any = null) {
    const { effectType, effectParams, dispatch } = this.props;
    const { page, size } = this.state;
    dispatch({
      type: effectType,
      payload: {
        page,
        size,
        ...effectParams,
      },
      fn: (res: any) => {
        this.setState({
          total: res ? res.total : 0,
        });
        if (cb) {
          cb();
        }
      },
    });
  }

  public render(): ReactNode {
    const {
      dataSource,
      columns,
      scroll,
      bordered,
      tableSize,
      footer = null,
      className = null,
      rowClassName = () => {},
    } = this.props;
    const { total, page, size } = this.state;
    return (
      <Table
        className={className}
        size={tableSize || 'middle'}
        columns={columns}
        dataSource={dataSource.list ? dataSource.list : []}
        rowKey={(record: any, index: any) => record.merchantId || record.orderId || index}
        onChange={this.handleTableChange}
        scroll={scroll}
        bordered={bordered || null}
        footer={footer}
        rowClassName={rowClassName}
        pagination={{
          total,
          pageSize: size,
          current: page,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '200', '500'],
          // showTotal: () => `共 ${total}条记录 第 ${page} / ${Math.ceil(total / size)}`,
          showTotal: () => (
            <Fragment>
              <FormattedMessage id="globalComponent.table.total" />
              {total}
              <FormattedMessage id="globalComponent.table.records" />
              <FormattedMessage id="globalComponent.table.sort" />
              {`${page}/${Math.ceil(total / size)}`}
            </Fragment>
          ),
        }}
      />
    );
  }
}

export default Mtable;
