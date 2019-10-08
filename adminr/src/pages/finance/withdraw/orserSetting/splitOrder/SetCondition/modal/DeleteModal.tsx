import { Modal } from 'antd';
import React from 'react';
import styles from './style.less';

const DeleteModal = (props: any) => {
  const { show, showLoading, title, hide, handleDelete } = props;
  return (
    <>
      <Modal
        title={title}
        okText="确定"
        visible={show}
        onOk={handleDelete}
        onCancel={() => {
          hide();
        }}
        confirmLoading={showLoading}
      >
        <div className={styles.message}>确定要删除此提现分单设置？</div>
      </Modal>
    </>
  );
};

export default DeleteModal;
