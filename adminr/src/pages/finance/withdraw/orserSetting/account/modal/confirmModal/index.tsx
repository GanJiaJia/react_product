import { Modal } from 'antd';
import React from 'react';
import styles from './style.less';

const ConfirmModal = (props: any) => {
  const { show, showLoading, title, hide, handleConfirm, messageKey } = props;
  const messagesMap = {
    close: '关闭该功能后，系统将不会再给选中的账户进行自动分单,确认关闭吗 ?',
    open: '开启分单功能后，系统将根据配置自动分单给选中的账户,确认开启吗 ?',
    delete: '确认删除分单账户吗 ?',
  };
  return (
    <>
      <Modal
        destroyOnClose
        title={title}
        okText="确定"
        visible={show}
        onOk={handleConfirm}
        onCancel={() => {
          hide();
        }}
        confirmLoading={showLoading}
      >
        <div className={styles.message}>{messagesMap[messageKey]}</div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
