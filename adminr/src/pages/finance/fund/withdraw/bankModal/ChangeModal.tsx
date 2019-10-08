import { Modal } from 'antd';
import React from 'react';

const ChangeModal = (props: any) => {
  const { show, handleOk, showLoading, hide, rowData } = props;
  const title = rowData.status === 1 ? '启用提示' : '停用提示';
  const bodyText =
    rowData.status === 1
      ? '启用该银行卡后，银行卡可投入正常使用'
      : '停用该银行卡后，银行卡将无法正常使用';
  return (
    <Modal
      title={title}
      visible={show}
      onOk={handleOk}
      confirmLoading={showLoading}
      onCancel={hide}
    >
      <p>{bodyText}</p>
    </Modal>
  );
};

export default ChangeModal;
