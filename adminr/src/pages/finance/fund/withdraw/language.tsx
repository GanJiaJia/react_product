import React from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

export const LAN = {
  merchantName: <FormattedMessage id="finance.fund.withdraw.form.label.merchantName" />,
  merchantNamePlaceholder: formatMessage({
    id: 'finance.fund.withdraw.form.label.merchantName.placeholder',
  }),
  merchantNumber: <FormattedMessage id="finance.fund.withdraw.form.label.merchantNumber" />,
  merchantNumberPlaceholder: formatMessage({
    id: 'finance.fund.withdraw.form.label.merchantNumber.placeholder',
  }),
  btnSearch: <FormattedMessage id="finance.fund.recharge.btn.search" />,
  btnReset: <FormattedMessage id="finance.fund.recharge.btn.reset" />,
};
