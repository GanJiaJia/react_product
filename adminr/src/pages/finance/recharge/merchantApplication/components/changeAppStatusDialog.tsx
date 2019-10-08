import { Icon, Modal } from 'antd';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

interface PropType {
  [propName: string]: any;
}

const ChangeAppStatusDialog = (props: PropType) => {
  const { visible, isSetUp } = props;
  const title = isSetUp
    ? formatMessage({ id: 'application.change-status-batch-up-str' })
    : formatMessage({ id: 'application.change-status-batch-down-str' });

  const warningStr = isSetUp
    ? formatMessage({ id: 'application.change-status-batch-up' })
    : formatMessage({ id: 'application.change-status-batch-down' });

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => {
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
        <span>{warningStr}</span>
      </p>
    </Modal>
  );
};

export default ChangeAppStatusDialog;
