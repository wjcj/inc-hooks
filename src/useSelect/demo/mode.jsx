/**
 * title: 多选
 * desc: 通过设置 `mode` 选项设置 `Select` 的模式为多选或标签。
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
  const { selectProps: selectProps1 } = useSelect(service, {
    remoteSearch: true,
    mode: 'multiple',
  });
  const { selectProps: selectProps2 } = useSelect(service, {
    mode: 'tags',
    fieldNames: { value: 'label' },
  });

  return (
    <div>
      <Select {...selectProps1} />
      <Divider orientation="left">标签：</Divider>
      <Select {...selectProps2} />
    </div>
  );
};

export default Index;
