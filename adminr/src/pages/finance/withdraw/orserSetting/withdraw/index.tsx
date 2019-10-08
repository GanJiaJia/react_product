import React from 'react';
import FormTab from './FormTab';
import styles from './style.less';

const C = () => (
  <div className={styles.box}>
    <div className={styles.header}>
      <span className={styles.title}>自动提现设置</span>
    </div>
    <div className={styles.main}>
      <FormTab></FormTab>
    </div>
  </div>
);

export default C;
