import { Request, Response } from 'express';

const data: any[] = [
  {
    id: 1,
    order: 1,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    red: 'red',
  },
  {
    id: 2,
    order: 2,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
  },
  {
    id: 3,
    order: 3,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    swithStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 4,
    order: 4,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 5,
    order: 5,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 6,
    order: 6,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 15,
    order: 15,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 7,
    order: 7,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 8,
    order: 8,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 9,
    order: 9,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    swithStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 10,
    order: 10,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 11,
    order: 11,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 12,
    order: 12,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
  {
    id: 13,
    order: 13,
    merchantName: '虎云聚合支付',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
  },
];
const editData: { [propName: string]: any } = {
  code: 200,
  msg: '保存修改成功',
  status: 'success',
};

export default {
  'POST /api/recharge/data': (req: Request, res: Response) => {
    res.send(data);
  },

  'POST /api/recharge/edit': (req: Request, res: Response) => {
    res.send(editData);
  },
};
