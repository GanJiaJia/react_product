import React from 'react';
import { Modal, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

interface PropType {
  status: number;
  visible: boolean;
  confirm: Function;
  cancel: Function;
  isDelete: boolean;
  rowData: { merchantId: string };
}

const StatusChangeDialog = (props: PropType) => {
  const { status, visible, isDelete, rowData } = props;
  const optStr =
    status === 0
      ? formatMessage({ id: 'merchant-set-change.close' })
      : formatMessage({ id: 'merchant-set-change.open' });

  return (
    <Modal
      visible={visible}
      onOk={() => {
        if (isDelete) {
          props.confirm({ merchantId: rowData.merchantId });
          return;
        }
        props.confirm();
      }}
      onCancel={() => {
        props.cancel();
      }}
    >
      <p>
        <Icon
          type="exclamation-circle"
          theme="twoTone"
          twoToneColor="#e6a13c"
          style={{ marginRight: '5px' }}
        />
        {isDelete ? (
          // 确定要删除该三方商户吗？
          <FormattedMessage id="merchant-set-change.delete-tip" />
        ) : (
          <span>{optStr}</span>
        )}
      </p>
    </Modal>
  );
};

export default StatusChangeDialog;
