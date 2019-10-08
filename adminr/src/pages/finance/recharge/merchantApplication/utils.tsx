import React, { CSSProperties, Fragment } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Tooltip } from 'antd';
import _ from 'lodash';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { StateType } from '../utils';
import * as tools from '@/utils/tools';
import {
  CHANNEL_TYPE,
  DEVICE_TYPE,
  RECOMMEND_TYPE,
  ESCROW_STATUS,
  TOPPING_TYPE,
  SWITCH_STATUS,
  ESCROW_OFF,
  TOP_STATUS_OPEN,
  TOP_STATUS_CLOSE,
  RECOMMEND_STATUS_OPEN,
  RECOMMEND_STATUS_CLOSE,
} from '../data';
import { checkPermission } from '@/utils/resolvePermission';

// 处理三方商户的状态操作 1.上架 2.下架 3.删除 4.置顶 5.推荐
export function setDispatchData(
  dialogType: number,
  isBatch: boolean,
  selectedRowKeys?: any[],
  rowData?: any,
) {
  let type = 'recharge/';
  const payload: any = {};

  switch (dialogType) {
    case 1:
      type += 'merchantStatusEffect';
      payload.merchantAppIds = isBatch ? selectedRowKeys : rowData.id;
      payload.status = 0;
      break;
    case 2:
      type += 'merchantStatusEffect';
      payload.merchantAppIds = isBatch ? selectedRowKeys : rowData.id;
      payload.status = 1;
      break;
    case 3:
      type += 'deleteMerchantEffect';
      payload.id = rowData.id;
      break;
    case 4:
      type += 'setMerchantTopEffect';
      payload.id = rowData.id;
      payload.topStatus =
        rowData.topStatus === TOP_STATUS_OPEN ? TOP_STATUS_CLOSE : TOP_STATUS_OPEN;
      break;
    case 5:
      type += 'setMerchantRecommendEffect';
      payload.id = rowData.id;
      payload.recommendStatus =
        rowData.recommendStatus === RECOMMEND_STATUS_OPEN
          ? RECOMMEND_STATUS_CLOSE
          : RECOMMEND_STATUS_OPEN;
      break;
    default:
      break;
  }
  return { type, payload };
}

// 三方商户应用 - 列数据
export const getMerchantAppColumns = (self: any) => {
  const style: CSSProperties = {
    width: '90px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
  const btnStyle: CSSProperties = {
    marginLeft: '5px',
    padding: '0',
    cursor: 'pointer',
    color: '#1890FF',
    wordBreak: 'break-all',
  };
  const levelBtnStyle: CSSProperties = {
    ...style,
    width: '130px',
    color: '#1890FF',
    cursor: 'pointer',
  };
  const { levelList } = self.props.recharge.merchantAppData;
  const levelListData = _.map(levelList, item => ({ text: item.name, value: item.levelId }));

  const { limitType, clientType, recommendStatus, topStatus } = self.state.tableFilters;
  const limitTypeData = limitType ? [limitType] : ['-1'];
  const clientTypeData = clientType ? [clientType] : ['-1'];
  const recommendStatusData = recommendStatus ? [recommendStatus] : ['-1'];
  const topStatusData = topStatus ? [topStatus] : ['-1'];

  const columns: ColumnProps<StateType>[] = [
    // 支付类型
    {
      title: formatMessage({ id: 'application.table-pay-type' }),
      dataIndex: 'paymentName',
      key: 'paymentName',
      width: 80,
    },
    // 三方平台
    {
      title: formatMessage({ id: 'application.table-merchant' }),
      dataIndex: 'channelName',
      key: 'channelName',
      width: 90,
    },
    // 商户号
    {
      title: formatMessage({ id: 'application.table-merchant-code' }),
      dataIndex: 'merchantCode',
      key: 'merchantCode',
      width: 100,
      render: text => (
        <Tooltip title={text}>
          <div style={style}>{text}</div>
        </Tooltip>
      ),
    },
    // 渠道类型
    {
      title: formatMessage({ id: 'application.table-limit-type' }),
      dataIndex: 'limitType',
      key: 'limitType',
      width: 120,
      render: text => {
        const obj = _.find(CHANNEL_TYPE, { value: text });
        return obj ? obj.title : '';
      },
      filters: [
        // 全部
        { text: formatMessage({ id: 'application.table-status-all' }), value: '-1' },
        // 普通存款
        { text: formatMessage({ id: 'application.table-limit-type-normal' }), value: '0' },
        // 大额存款
        { text: formatMessage({ id: 'application.table-limit-type-large' }), value: '1' },
      ],
      filterMultiple: false,
      filteredValue: limitTypeData,
    },
    // 层级类型
    {
      title: formatMessage({ id: 'application.table-level-type' }),
      dataIndex: 'levelIds',
      key: 'levelIds',
      width: 140,
      render: (text, record) => (
        <div
          style={levelBtnStyle}
          onClick={() => {
            self.getLevel();
            self.setState({ levelDetailDialogVisible: true, rowData: record });
          }}
        >
          {record.levelName}
        </div>
      ),
      filters: levelListData,
    },
    // 应用端
    {
      title: formatMessage({ id: 'application.table-client' }),
      dataIndex: 'clientType',
      key: 'clientType',
      width: 100,
      render: text => {
        const obj = _.find(DEVICE_TYPE, { value: text });
        return obj ? obj.title : '';
      },
      filters: [
        // 全部
        { text: formatMessage({ id: 'application.table-status-all' }), value: '-1' },
        // PC端
        { text: formatMessage({ id: 'application.table-client-pc' }), value: '0' },
        // 移动端
        { text: formatMessage({ id: 'application.table-client-mobile' }), value: '1' },
      ],
      filterMultiple: false,
      filteredValue: clientTypeData,
    },
    // 日收款上限
    {
      title: formatMessage({ id: 'application.table-day-limit' }),
      dataIndex: 'dailyLimit',
      key: 'dailyLimit',
      width: 90,
      render: text => (
        <div style={{ width: '80px', wordWrap: 'break-word' }}>{tools.currency(text)}</div>
      ),
    },
    // 今日已收款
    {
      title: formatMessage({ id: 'application.table-today-amount' }),
      dataIndex: 'successAmount',
      key: 'successAmount',
      width: 90,
      render: text => (
        <div style={{ width: '80px', wordWrap: 'break-word' }}>{tools.currency(text)}</div>
      ),
    },
    // 推荐状态
    {
      title: formatMessage({ id: 'application.table-recommend-status' }),
      dataIndex: 'recommendStatus',
      key: 'recommendStatus',
      width: 110,
      render: text => {
        const obj = _.find(RECOMMEND_TYPE, { value: text });
        return obj ? obj.title : '';
      },
      filters: [
        // 全部
        { text: formatMessage({ id: 'application.table-status-all' }), value: '-1' },
        // 已推荐
        { text: formatMessage({ id: 'application.table-recommend-status-ready' }), value: '0' },
        // 未推荐
        { text: formatMessage({ id: 'application.table-recommend-status-not' }), value: '1' },
      ],
      filterMultiple: false,
      filteredValue: recommendStatusData,
    },
    // 上下架状态
    {
      title: formatMessage({ id: 'application.table-status' }),
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: text => {
        const obj = _.find(ESCROW_STATUS, { value: text });
        return obj ? obj.title : '';
      },
    },
    // 置顶状态
    {
      title: formatMessage({ id: 'application.table-top-tatus' }),
      dataIndex: 'topStatus',
      key: 'topStatus',
      width: 110,
      render: text => {
        const obj = _.find(TOPPING_TYPE, { value: text });
        return obj ? obj.title : '';
      },
      filters: [
        // 全部
        { text: formatMessage({ id: 'application.table-status-all' }), value: '-1' },
        // 已置顶
        { text: formatMessage({ id: 'application.table-top-tatus-ready' }), value: '0' },
        // 未置顶
        { text: formatMessage({ id: 'application.table-top-tatus-not' }), value: '1' },
      ],
      filterMultiple: false,
      filteredValue: topStatusData,
    },
    // 开关状态
    {
      title: formatMessage({ id: 'application.table-switch-status' }),
      dataIndex: 'openStatus',
      key: 'openStatus',
      width: 90,
      render: text => {
        const obj = _.find(SWITCH_STATUS, { value: text });
        return obj ? obj.title : '';
      },
    },
    // 最后修改人
    {
      title: formatMessage({ id: 'application.table-last-operator' }),
      dataIndex: 'lastOperator',
      key: 'lastOperator',
      width: 90,
    },
    // 最后修改时间
    {
      title: formatMessage({ id: 'application.table-last-time' }),
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      width: 110,
      render: text => tools.toTime(text),
    },
    // 备注
    {
      title: formatMessage({ id: 'application.table-remark' }),
      dataIndex: 'remark',
      key: 'remark',
    },
    // 操作
    {
      title: formatMessage({ id: 'application.table-opt' }),
      dataIndex: 'opt',
      key: 'opt',
      width: 260,
      fixed: 'right',
      render: (text, record) => {
        const { status } = record;
        const renderUpDown = (word: any) => (
          <span
            style={{ ...btnStyle, margin: '0', padding: '0' }}
            onClick={() => {
              self.setState({
                rowData: record,
                merchantOptDialogVisible: true,
                dialogType: status === ESCROW_OFF ? 1 : 2,
              });
            }}
          >
            {word}
          </span>
        );
        let eleUpDown: any = null;
        if (
          status === ESCROW_OFF &&
          checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-up')
        ) {
          // 上架
          eleUpDown = renderUpDown(formatMessage({ id: 'application.table-up' }));
        }
        if (
          status !== ESCROW_OFF &&
          checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-down')
        ) {
          // 下架
          eleUpDown = renderUpDown(formatMessage({ id: 'application.table-down' }));
        }
        return (
          <Fragment>
            {eleUpDown}
            {checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-edit') ? (
              // 编辑
              <span
                style={btnStyle}
                onClick={() => {
                  self.setState({
                    rowData: record,
                    editDialogVisible: true,
                  });
                  self.getShopList({ channelId: record.channelId });
                  self.getShopEffect();
                  self.getLevel();
                }}
              >
                <FormattedMessage id="application.edit-btn" />
              </span>
            ) : null}

            {checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-delete') ? (
              // 删除
              <span
                style={btnStyle}
                onClick={() => {
                  self.setState({
                    rowData: record,
                    merchantOptDialogVisible: true,
                    dialogType: 3,
                  });
                }}
              >
                <FormattedMessage id="application.delete-btn" />
              </span>
            ) : null}

            {checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-topping') ? (
              <span
                style={btnStyle}
                onClick={() => {
                  self.setState({
                    rowData: record,
                    merchantOptDialogVisible: true,
                    dialogType: 4,
                  });
                }}
              >
                {/* 取消置顶/置顶 */}
                {record.topStatus === TOP_STATUS_OPEN
                  ? formatMessage({ id: 'application.table-cancel-top' })
                  : formatMessage({ id: 'application.table-top' })}
              </span>
            ) : null}

            {checkPermission(self.props.btns, 'new-finance-recharge-merchant-apply-recommend') ? (
              <span
                style={btnStyle}
                onClick={() => {
                  self.setState({
                    rowData: record,
                    merchantOptDialogVisible: true,
                    dialogType: 5,
                  });
                }}
              >
                {/* 取消推荐/推荐 */}
                {record.recommendStatus === RECOMMEND_STATUS_OPEN
                  ? formatMessage({ id: 'application.table-cancel-recommend' })
                  : formatMessage({ id: 'application.table-recommend' })}
              </span>
            ) : null}
          </Fragment>
        );
      },
    },
  ];
  return columns;
};
