import { Button, Icon, Input } from 'antd';
import React from 'react';

const getEffectParams = (values: any) => {
  const keys = Object.keys(values);
  const effectParams: any = {};
  keys.forEach(key => {
    if (Array.isArray(values[key]) && key === 'range-time-picker') {
      const [startTime = '', endTime = ''] = Array.isArray(values[key])
        ? values[key].map((item: any) => item.format('YYYY-MM-DD HH:mm:ss'))
        : [];
      effectParams.startTime = startTime;
      effectParams.endTime = endTime;
    } else if (Array.isArray(values[key]) && key !== 'range-time-picker') {
      effectParams[key] = values[key].join();
    } else if (!Array.isArray(values[key]) && values[key] !== 'undefind') {
      effectParams[key] = values[key];
    }
  });
  return effectParams;
};

export function setCommonFun(target: any): any {
  return class extends target {
    // 表单提交处理
    setSubmitFormatParams = (values: any) => {
      const effectParams = getEffectParams(values);
      if (this.name === 'PaymentComponent' || this.name === 'HistoryComponent') {
        if (this.handleSelectTabHeader) {
          this.handleSelectTabHeader(effectParams);
        }
        if (effectParams.orderId) {
          delete effectParams.startTime;
          delete effectParams.endTime;
        }
      }
      return effectParams;
    };

    // 重置表单查询
    resetForm = () => {
      this.props.form.resetFields();
      this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
        const effectParams = getEffectParams(values);
        await this.setState({
          effectParams,
        });
        await this.refMtable.bindEffects();
      });
    };
  };
}

export const getColumnSearchProps = (
  dataIndex: string,
  self: any,
  placeholder: string = '搜索',
) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          self.searchInput = node;
        }}
        placeholder={placeholder}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ width: 188, margin: '0 auto', marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={async () => {
          confirm();
        }}
        icon="search"
        size="small"
        style={{ width: 90, margin: 0 }}
      >
        搜索
      </Button>
      <Button
        onClick={() => {
          clearFilters();
          confirm();
        }}
        size="small"
        style={{ width: 90, marginLeft: 8 }}
      >
        重置
      </Button>
    </div>
  ),
  filterIcon: (filtered: any) => (
    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
});

export const withdrawStatusMap = {
  '-3': '风险待审核',
  '-2': '风险审核拒绝',
  0: '风险审核通过（待出款）',
  1: '出款成功',
  2: '拒绝出款（出款失败）',
  3: '申请退回中',
  4: '退回成功',
  5: '拒绝退回',
  6: '申请强制成功中',
  7: '自动出款失败',
  8: '通过强制成功',
  9: '拒绝强制成功',
  10: '三方自动出款中',
  11: '出款专员处理中',
};
