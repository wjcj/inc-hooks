/**
 * title: 基础
 * desc: 略。
 */

import React from 'react';
import { Cascader } from 'antd';
import { useCascader } from 'inc-hooks';
import Mock from 'mockjs';

const data = Mock.mock({
  'value|10': [
    {
      code: '@name',
      name: '@name',
      'items|0-5': [
        {
          code: '@name',
          name: '@name',
        },
      ],
    },
  ],
}).value;

const service = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};

const Index = () => {
  const { cascaderProps } = useCascader(service);

  return (
    <Cascader
      {...cascaderProps}
      fieldNames={{ label: 'name', value: 'code', children: 'items' }}
      placeholder="Please select"
    />
  );
};

export default Index;
