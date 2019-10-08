import { Button, Result } from 'antd';

import React from 'react';
import router from 'umi/router';

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    subTitle="对不起噢, 亲，你访问的当前页面不存在～@～"
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        返回首页
      </Button>
    }
  ></Result>
);

export default NoFoundPage;
