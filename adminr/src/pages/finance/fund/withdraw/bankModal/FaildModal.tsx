import { Modal } from 'antd';
import React from 'react';

const colorStyle = { color: 'red' };
const FaildModel = (props: any) => {
  const { show, hide, showLoading, faildInfo, handleOk } = props;
  return (
    <div>
      <Modal
        title={faildInfo.title}
        okText="重试"
        visible={show}
        onOk={handleOk}
        style={colorStyle}
        onCancel={() => {
          hide();
        }}
        confirmLoading={showLoading}
      >
        <p style={{ textAlign: 'center', ...colorStyle }}> {faildInfo.title} </p>
      </Modal>
    </div>
  );
};
export default FaildModel;
