import { Request, Response } from 'express';

const thirdData: any[] = [
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
const editThirdData: { [propName: string]: any } = {
  code: 200,
  msg: '保存修改成功',
  status: 'success',
};

const bankData: any[] = [
  {
    id: 1,
    order: 1,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'xxxx',
  },
  {
    id: 2,
    order: 2,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy',
  },
  {
    id: 3,
    order: 3,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy2',
  },
  {
    id: 4,
    order: 4,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy',
  },
  {
    id: 5,
    order: 5,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy3',
  },
  {
    id: 6,
    order: 6,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy4',
  },
  {
    id: 7,
    order: 7,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy9',
  },
  {
    id: 8,
    order: 8,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy5',
  },
  {
    id: 9,
    order: 9,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy6',
  },
  {
    id: 10,
    order: 10,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy6',
  },
  {
    id: 11,
    order: 11,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy6',
  },
  {
    id: 12,
    order: 12,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy6',
  },
  {
    id: 13,
    order: 13,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy6',
  },
  {
    id: 14,
    order: 14,
    merchantName: '中国银行',
    merchantNumber: 18829382832,
    banlance: 1992334.0,
    pendingSettlement: 899.33,
    channelType: '特殊渠道',
    dailyLimit: 999999999.0,
    remainingToday: 18888.0,
    computerNumber: 1232333999,
    switchStatus: Math.ceil(Math.random() * 3),
    lastUpdateTime: '2018-03-20 20:11:46',
    orange: 'orange',
    username: 'yyyy6',
  },
];

const editBankCardData: { [propName: string]: any } = {
  code: 200,
  msg: '保存修改成功',
  status: 'success',
};

const addBankCardData: { [propName: string]: any } = {
  code: 200,
  msg: '保存修改成功',
  status: 'success',
};

const transferBankCardData: { [propName: string]: any } = {
  code: 200,
  msg: '保存修改成功',
  status: 'success',
};

export default {
  'POST /api/withdraw/third-data': (req: Request, res: Response) => {
    res.send(thirdData);
  },

  'POST /api/withdraw/third-edit': (req: Request, res: Response) => {
    res.send(editThirdData);
  },

  'POST /api/withdraw/bankCard-data': (req: Request, res: Response) => {
    res.send(bankData);
  },

  'POST /api/withdraw/bankCard-edit': (req: Request, res: Response) => {
    res.send(editBankCardData);
  },
  'POST /api/withdraw/bankCard-add': (req: Request, res: Response) => {
    res.send(addBankCardData);
  },
  'POST /api/withdraw/bankCard-transfer': (req: Request, res: Response) => {
    res.send(transferBankCardData);
  },
};