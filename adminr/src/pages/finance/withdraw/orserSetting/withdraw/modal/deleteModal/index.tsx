import { Modal } from 'antd';
import React from 'react';
import styles from './style.less';

const DeleteModal = (props: any) => {
  const { show, showLoading, title, hide, handleDelete } = props;
  return (
    <>
      <Modal
        destroyOnClose
        title={title}
        okText="确定"
        visible={show}
        onOk={handleDelete}
        onCancel={() => {
          hide();
        }}
        confirmLoading={showLoading}
      >
        <div className={styles.message}>确定要删除此自动出款设置吗？</div>
      </Modal>
    </>
  );
};

export default DeleteModal;
