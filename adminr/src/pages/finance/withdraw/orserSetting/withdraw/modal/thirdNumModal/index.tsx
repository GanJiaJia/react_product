import { Button, Form, Input, Modal, Spin, Table } from 'antd';

import React from 'react';
import { connect } from 'dva';
import { StateType } from '@/common-typings';
import { getColumns } from './utils';

class ThirdNumModal extends React.PureComponent<StateType> {
  state = {
    columns: getColumns(this),
  };

  render() {
    const { show, showLoading, title, hide } = this.props;
    const { columns } = this.state;
    const { thirdNumData } = this.props.withdraw.orserSetting;

    return (
      <>
        <Modal
          destroyOnClose
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
          <Table<StateType>
            columns={columns}
            dataSource={thirdNumData}
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
}))(ThirdNumModal);
