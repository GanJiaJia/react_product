import { Modal } from 'antd';
import React from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from '../style.less';
import { STATUS_CLOSE } from '../../data';

const StatusDialog = (props: any) => {
  let newStatus = 0;
  let merchantIds = '';
  const { visible, rowData, selectedRows, batchStatus, isBatch, onCancel, onOk } = props;
  if (isBatch) {
    const merchantIdList = _.map(selectedRows, item => item.merchantId);
    merchantIds = merchantIdList.join(',');
    newStatus = batchStatus;
  } else {
    const { merchantId, status } = rowData;
    merchantIds = merchantId;
    newStatus = status === STATUS_CLOSE ? 0 : 1;
  }
  const titleStr =
    newStatus === STATUS_CLOSE
      ? formatMessage({ id: 'merchant-set-status.merchant-close-str' })
      : formatMessage({ id: 'merchant-set-status.merchant-open-str' });

  const warningStr =
    newStatus === STATUS_CLOSE
      ? formatMessage({ id: 'merchant-set-status.merchant-close' })
      : formatMessage({ id: 'merchant-set-status.merchant-open' });

  return (
    <Modal
      title={titleStr}
      visible={visible}
      onOk={() => {
        onOk(merchantIds, newStatus);
      }}
      onCancel={() => {
        onCancel();
      }}
    >
      <p>{warningStr}</p>
      <p className={styles.footText}>{formatMessage({ id: 'merchant-set-status.tip' })}</p>
    </Modal>
  );
};

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(StatusDialog),
);
