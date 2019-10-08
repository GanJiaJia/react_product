import { Modal } from 'antd';
import React from 'react';
import styles from './style.less';

const C = (props: any) => {
  const { show, showLoading, hide, handleOpenModalOk, title } = props;
  return (
    <>
      <Modal
        destroyOnClose
        title={`${title}三方商户`}
        okText="确定"
        visible={show}
        onCancel={() => {
          hide();
        }}
        onOk={() => handleOpenModalOk()}
        confirmLoading={showLoading}
      >
        <p>确定{title}此三方商户吗？</p>
        <p className={styles.tipMessage}>
          注：商户开启后才可以在“出款配置及应用”中应用并上架，
          若是关闭则“出款配置及应用”中的商户为关闭状态；关闭后财务出款人员无法使用此三方商户出款
        </p>
      </Modal>
    </>
  );
};

export default C;
