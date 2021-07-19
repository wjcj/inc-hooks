/**
 * title: 基础
 * desc: 略。
 */

import React from 'react';
import { TreeSelect } from 'antd';
import { useTreeSelect } from 'inc-hooks';
import Mock from 'mockjs';

const data = Mock.mock({
  'value|5': [
    {
      value: '@id',
      level: 1,
      title: '@province',
      'children|0-5': [
        {
          value: '@id',
          level: 2,
          title: '@city',
          'children|0-5': [
            {
              value: '@id',
              level: 3,
              title: '@county',
            },
          ],
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
  const { treeSelectProps } = useTreeSelect(service);

  return (
    <TreeSelect
      {...treeSelectProps}
      style={{ width: '100%' }}
      placeholder="Please select"
    />
  );
};

export default Index;
