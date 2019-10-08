import { Modal } from 'antd';
import React from 'react';

const C = (props: any) => {
  const { show, showLoading, hide, handleDeleteModalOk } = props;
  return (
    <>
      <Modal
        destroyOnClose
        title="删除三方支付"
        okText="确定"
        visible={show}
        onCancel={() => {
          hide();
        }}
        onOk={() => handleDeleteModalOk()}
        confirmLoading={showLoading}
      >
        <p>确定删除此三方支付吗？</p>
      </Modal>
    </>
  );
};

export default C;
