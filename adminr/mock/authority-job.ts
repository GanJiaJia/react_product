import { Request, Response } from 'express';

const jobData: any[] = [
  {
    id: 1,
    order: 1,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '关闭',
  },
  {
    id: 2,
    order: 2,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 3,
    order: 3,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 4,
    order: 4,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 5,
    order: 5,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 6,
    order: 6,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 15,
    order: 15,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 7,
    order: 7,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 8,
    order: 8,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 9,
    order: 9,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 10,
    order: 10,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 11,
    order: 11,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 12,
    order: 12,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
  {
    id: 13,
    order: 13,
    lastUpdateTime: '2018-03-20 20:11:46',
    newTime: '2018-03-20 20:11:46',
    merchantName: '虎云聚合支付',
    jobName: '财务经理',
    jobCount: 10,
    status: '开启',
  },
];

const addData: { [propName: string]: any } = {
  code: 200,
  msg: '添加岗位成功',
  status: 'success',
};

const changeData: { [propName: string]: any } = {
  code: 200,
  msg: '修改状态成功',
  status: 'success',
};

const copyData: { [propName: string]: any } = {
  code: 200,
  msg: '复制权限成功',
  status: 'success',
};

export default {
  'POST /api/authority/job-data': (req: Request, res: Response) => {
    res.send(jobData);
  },
  'POST /api/authority/job-data-add': (req: Request, res: Response) => {
    res.send(addData);
  },
  'POST /api/authority/job-data-change': (req: Request, res: Response) => {
    res.send(changeData);
  },
  'POST /api/authority/job-data-copy': (req: Request, res: Response) => {
    res.send(copyData);
  },
};
