import React, { ReactNode, Fragment } from 'react';

import { Table } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import BaseComponent from '@/components/BaseComponent';
import { handleSendData } from '@/utils/tools';
import styles from './style.less';

class Mtable extends BaseComponent {
  public state = {
    page: 1,
    size: this.props.pageSize || 20,
    loading: false,
  };

  componentDidMount() {
    this.getTableData();
  }

  /**
   * 表格中数据发生变化的回调
   * pagination 分页相关数据
   * filters 表头筛选相关数据
   * sorter 排序相关数据
   */
  public handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // 表头有过滤功能需要传递该prop
    const { page, size } = this.state;
    const { setEffectParams, rowSelection, setRowSelection } = this.props;
    const { current, pageSize } = pagination;

    // 表格如果有多选，翻页或选择页面条数重置绑定数据
    if (page !== current || size !== pageSize) {
      if (rowSelection && setRowSelection) {
        setRowSelection();
      }
    }

    if (typeof setEffectParams !== 'function') {
      this.setState({ page: current, size: pageSize }, () => {
        this.getTableData();
      });
      return;
    }

    this.setState({ page: current, size: pageSize }, () => {
      this.getTableData(filters, sorter);
    });
  };

  // 重置
  private tableReset = () => {
    this.setState({ page: 1 }, () => {
      this.getTableData();
    });
  };

  // 处理表单验证，请求表格数据
  private getTableData = (filters?: any, sorter?: any) => {
    let params = {};
    const { setEffectParams } = this.props;
    if (setEffectParams && typeof setEffectParams === 'function') {
      params = setEffectParams(filters, sorter);
    }

    const { validateFields } = this.props;
    validateFields((err: any, values: any) => {
      // 获取表单数据
      if (!err) {
        this.bindEffects(values, params);
      }
    });
  };

  // 获取表格数据
  private bindEffects(formData?: any, params?: any) {
    const { effectType, dispatch } = this.props;
    const { page, size } = this.state;
    const payload = handleSendData({ page, size, ...params, ...formData });

    this.setState({ loading: true });
    dispatch({
      type: effectType,
      payload,
      callback: () => {
        this.setState({ loading: false });
      },
    });
  }

  public render(): ReactNode {
    const {
      rowSelection,
      dataSource,
      columns,
      scroll,
      bordered = true,
      tableSize,
      footer = null,
      style = {},
      pageSizeOptions = ['10', '20', '50', '200', '500'],
      rowClassName,
    } = this.props;
    const { page, size, loading } = this.state;

    return (
      <Table
        loading={loading}
        className={styles.tableStyle}
        style={{
          wordBreak: 'break-all',
          ...style,
        }}
        rowKey={(record: any, index: number) => String(index)}
        rowClassName={rowClassName}
        size={tableSize || 'middle'}
        columns={columns}
        dataSource={dataSource.list ? dataSource.list : []}
        onChange={this.handleTableChange}
        scroll={scroll}
        bordered={bordered || null}
        rowSelection={rowSelection}
        footer={footer}
        pagination={{
          total: dataSource.total,
          pageSize: size,
          current: page,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions,
          showTotal: () => (
            <Fragment>
              <FormattedMessage id="globalComponent.table.total" />
              {dataSource.total}
              <FormattedMessage id="globalComponent.table.records" />
              <FormattedMessage id="globalComponent.table.sort" />
              {`${page}/${Math.ceil(dataSource.total / size)}`}
            </Fragment>
          ),
        }}
      />
    );
  }
}

export default Mtable;
