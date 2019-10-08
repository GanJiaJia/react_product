import { Button, Modal } from 'antd';
import React, { CSSProperties } from 'react';

import styles from '../style.less';

const colorStyle: CSSProperties = { color: '#59c758', textAlign: 'center' };
const SuccessModal = (props: any) => {
  const { show, hide, showLoading, handleOk } = props;
  return (
    <div className={styles.successModal}>
      <Modal
        title="转账成功提示"
        okText="完成"
        visible={show}
        onOk={handleOk}
        onCancel={() => {
          hide();
        }}
        confirmLoading={showLoading}
        footer={null}
      >
        <div className={styles.successModalCont}>
          <h3 style={colorStyle}> 转账成功！</h3>
          <p>
            <span>订单号：</span> <i>TX20192283727337L82H9</i>
          </p>
          <p>
            <span>转账金额：</span> <i>10000.00</i>
          </p>
          <p>
            <span>收款人好好：</span> <i>TX20192283727337L82H9</i>
          </p>
          <p>
            <span>备注：</span> <i>这是备注这是备注</i>
          </p>
          <div>
            <Button onClick={handleOk}>完成</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SuccessModal;
