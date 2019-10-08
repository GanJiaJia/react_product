import { Modal } from 'antd';
import React from 'react';
import styles from './style.less';

const C = (props: any) => {
  const { show, showLoading, title, hide, tipParams, data, recoveryModalSubmit } = props;
  return (
    <>
      <Modal
        destroyOnClose
        width={600}
        title={title}
        okText="确定"
        visible={show}
        onCancel={() => {
          hide();
        }}
        onOk={recoveryModalSubmit}
        confirmLoading={showLoading}
      >
        {tipParams && (
          <div>
            共选择回收{tipParams.total}笔提现单，其中有{tipParams.num}笔并未分单，
            {tipParams.doingNum}笔处于“处理中”状态，剩余
            {tipParams.total - tipParams.num - tipParams.doingNum}
            笔可回收，是否确认回收这{tipParams.total - tipParams.num - tipParams.doingNum}
            笔提现单？
          </div>
        )}

        <br />
        <br />

        <div className={styles.tipMessage}>
          <p>注1：已回收的提现单“分单给/分单时间”显示为空</p>
          <p>注2：提现单状态为处理中时候，则不可进行回收</p>
          <p>注3：已回收的提现单，则不可重复回收</p>
        </div>
      </Modal>
    </>
  );
};

export default C;
