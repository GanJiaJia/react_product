import { Modal } from 'antd';
import React from 'react';

const C = (props: any) => {
  const { show, showLoading, hide, handleOffModalOk, title } = props;
  return (
    <>
      <Modal
        destroyOnClose
        title={`${title}三方提现设置`}
        okText="确定"
        visible={show}
        onCancel={() => {
          hide();
        }}
        onOk={() => handleOffModalOk()}
        confirmLoading={showLoading}
      >
        <p>确定{title}此三方提现设置吗？</p>
      </Modal>
    </>
  );
};

export default C;
