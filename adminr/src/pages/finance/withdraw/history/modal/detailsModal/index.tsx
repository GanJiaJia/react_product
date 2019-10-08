import { Button, Form, Input, Modal, Spin, Table } from 'antd';

import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import { getColumns1, getColumns2, getColumns3 } from './utils';

class ConditionsModal extends React.Component<StateType> {
  public columns1: any = [];

  public columns2: any = [];

  public columns3: any = [];

  componentWillMount() {
    this.columns1 = getColumns1(this);
    this.columns2 = getColumns2(this);
    this.columns3 = getColumns3(this);
  }

  render() {
    const { show, showLoading, title, hide, data } = this.props;
    const { columns1, columns2, columns3 } = this;

    return (
      <>
        <Modal
          destroyOnClose
          width={900}
          title={title}
          okText="确定"
          visible={show}
          onOk={() => {
            hide();
          }}
          onCancel={() => {
            hide();
          }}
          confirmLoading={showLoading}
        >
          <div>基本信息</div>
          <br />
          <Table
            bordered
            size="small"
            columns={columns1}
            dataSource={[data]}
            rowKey={(record: any, index: any) => index}
            pagination={false}
          />
          <br />
          <div>收付款人信息</div>
          <br />
          <Table
            bordered
            size="small"
            columns={columns2}
            dataSource={[data]}
            rowKey={(record: any, index: any) => index}
            pagination={false}
          />
          <br />
          <div>其他信息</div>
          <br />
          <Table
            bordered
            size="small"
            columns={columns3}
            dataSource={[data]}
            rowKey={(record: any, index: any) => index}
            pagination={false}
          />
        </Modal>
      </>
    );
  }
}

export default connect(({ withdraw }: { withdraw: any }) => ({
  withdraw,
}))(ConditionsModal);
