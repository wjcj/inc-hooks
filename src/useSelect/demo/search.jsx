/**
 * title: 搜索
 * desc: 设置 `remoteSearch` 开启远程数据搜索。
 */

import React from 'react';
import { Select, Divider } from 'antd';
import { useSelect } from 'inc-hooks';
import Mock from 'mockjs';

const data = Mock.mock({
  'value|10': [{ label: '@name', 'value|+1': 1 }],
}).value;

const service = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          keyword ? data.filter(({ label }) => label.includes(keyword)) : data,
        ),
      1000,
    );
  });
};

const Index = () => {
  const { selectProps: selectProps1 } = useSelect(service);
  const { selectProps: selectProps2 } = useSelect(service, {
    remoteSearch: true,
  });

  return (
    <div>
      <Select {...selectProps1} />
      <Divider orientation="left">远程搜索：</Divider>
      <Select {...selectProps2} />
    </div>
  );
};

export default Index;
