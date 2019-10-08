import React, { ReactNode } from 'react';

import { Table } from 'antd';
import BaseComponent from '@/components/BaseComponent';

class Mtable extends BaseComponent {
  public self = this;

  constructor(props: any) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.bindEffects();
  }

  public state = {
    page: 1,
    size: this.props.pageSize || 10,
    total: 0,
  };

  // 选择一页多少条
  public onShowSizeChange(current: number, size: number) {
    this.setState({ size }, () => {
      this.bindEffects();
    });
  }

  public handleTableChange = (pagination: any, filters: any, sorter: any) => {
    //  每个父组件必传的  因为每个表格的过滤参数不一样
    const { setFiltersParams } = this.props;
    if (typeof setFiltersParams !== 'function') {
      throw Error('setFiltersParams is not a function');
    }
    setFiltersParams(filters, sorter, () => {
      this.setState({ page: pagination.current }, () => {
        this.bindEffects();
      });
    });
  };

  // 查询充值资金管理 ， SyntheticEvent 是处理表带的事件对象类型;
  public handleSubmit(e: React.SyntheticEvent, self: any) {
    e.preventDefault();
    self.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        const { setSubmitFormatParams } = this.props;
        const params = setSubmitFormatParams(values);
        self.setState({ effectParams: params }, () => {
          this.bindEffects();
        });
      }
    });
  }

  //  获取表格数据
  private bindEffects() {
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
      rowSelection,
      rowKey,
      paginationSign = true,
    } = this.props;
    const { total, page, size } = this.state;
    return (
      <Table
        size={tableSize || 'middle'}
        rowSelection={rowSelection || null}
        columns={columns}
        dataSource={dataSource.list ? dataSource.list : []}
        rowKey={(record: any, index: any) => {
          if (rowKey) {
            return record[rowKey];
          }
          return record.merchantId || record.orderId || index;
        }}
        onChange={this.handleTableChange}
        scroll={scroll}
        bordered
        pagination={
          paginationSign
            ? {
                total,
                pageSize: size,
                current: page,
                pageSizeOptions: ['10', '20', '50', '200', '500'],
                onShowSizeChange: this.onShowSizeChange.bind(this),
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: () => `共 ${total}条记录 第 ${page} / ${Math.ceil(total / size)}`,
              }
            : false
        }
      />
    );
  }
}

export default Mtable;
