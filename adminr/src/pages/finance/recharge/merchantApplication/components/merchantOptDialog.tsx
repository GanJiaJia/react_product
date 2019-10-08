import { Icon, Modal } from 'antd';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { RECOMMEND_STATUS_OPEN, TOP_STATUS_OPEN } from '../../data';

interface PropType {
  [propName: string]: any;
}

function getTitle(dialogType: number, rowData: any) {
  // dialogType: 1.上架 2.下架 3.删除 4.置顶 5.推荐
  let str = '';
  switch (dialogType) {
    case 1:
      // 上架
      str = formatMessage({ id: 'application.opt-up' });
      break;
    case 2:
      // 下架
      str = formatMessage({ id: 'application.opt-down' });
      break;
    case 3:
      // 删除
      str = formatMessage({ id: 'application.opt-delete' });
      break;
    case 4:
      // 取消置顶 / 置顶商户
      str =
        rowData.topStatus === TOP_STATUS_OPEN
          ? formatMessage({ id: 'application.opt-cancel-top' })
          : formatMessage({ id: 'application.opt-top' });
      break;
    case 5:
      // 取消推荐 / 推荐
      str =
        rowData.recommendStatus === RECOMMEND_STATUS_OPEN
          ? formatMessage({ id: 'application.opt-cancel-recommend' })
          : formatMessage({ id: 'application.opt-recommend' });
      break;
    default:
      break;
  }
  return str;
}

const MerchantOptDialog = (props: PropType) => {
  const { isBatch, visible, cancel, confirm, dialogType, rowData } = props;

  const str = getTitle(dialogType, rowData);
  let title = '';

  const merchantStr = isBatch
    ? formatMessage({ id: 'application.opt-these' })
    : formatMessage({ id: 'application.opt-this' });
  if (dialogType !== 4) {
    // 批量、三方充值应用
    title = isBatch
      ? `${formatMessage({ id: 'application.opt-batch' })}${str}${formatMessage({
          id: 'application.opt-merchant-app',
        })}`
      : `${str}${formatMessage({ id: 'application.opt-merchant-app' })}`;
  } else {
    title = `${str}`;
  }

  const tipStr =
    rowData.topStatus === TOP_STATUS_OPEN
      ? formatMessage({ id: 'application.opt-cancel-top-tip' })
      : formatMessage({ id: 'application.opt-top-to-channel' });
  return (
    <Modal title={title} visible={visible} onOk={confirm} onCancel={cancel}>
      <p>
        <Icon
          type="exclamation-circle"
          theme="twoTone"
          twoToneColor="#e6a13c"
          style={{ marginRight: '5px' }}
        />
        {dialogType === 4 ? (
          <span>{tipStr}</span>
        ) : (
          <span>
            {formatMessage({ id: 'application.opt-str1' })}
            {str}
            {merchantStr}
            {formatMessage({ id: 'application.opt-str2' })}
          </span>
        )}
      </p>
    </Modal>
  );
};

export default MerchantOptDialog;
