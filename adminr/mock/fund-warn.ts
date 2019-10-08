// /api/warn-recharge/data
const warnRechargeData: any[] = [
  {
    id: 1,
    text: '三方账户金额 > 10000000.00；',
  },
  {
    id: 2,
    text: '三方账户金额 < 10000000.00；',
  },
];

const editData: { [propName: string]: any } = {
  code: 200,
  msg: '保存修改成功',
  status: 'success',
};

export default {
  'POST /api/warn-recharge/data': (req: Request, res: Response) => {
    res.send(warnRechargeData);
  },
};
