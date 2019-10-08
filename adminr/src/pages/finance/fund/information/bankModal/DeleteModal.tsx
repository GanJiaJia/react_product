import { Modal } from 'antd';
import React from 'react';

const DeleteModal = (props: any) => {
  const { show, handleOk, showLoading, hide } = props;
  return (
    <Modal
      title="删除提示"
      visible={show}
      onOk={handleOk}
      confirmLoading={showLoading}
      onCancel={hide}
    >
      <p>确认从系统删除该银行卡吗？</p>
    </Modal>
  );
};

export default DeleteModal;
