/**
 * title: 动态加载
 * desc: 使用 `lazy` 实现动态加载选项；如果 `option` 中无 `isLeaf` 属性，则还需添加 `isLeaf` 配置。
 */

import React from 'react';
import { Cascader } from 'antd';
import { useCascader } from 'inc-hooks';
import Mock from 'mockjs';

const getData = (id = null, level = 1) => {
  const template = {
    'value|5': [
      {
        id: '@id',
        parentId: id,
        level: level,
        name: level === 1 ? '@province' : level === 2 ? '@city' : '@county',
      },
    ],
  };
  return Mock.mock(template).value;
};

const service = (id, level) => {
  level = id ? level + 1 : level;
  return new Promise((resolve) => {
    setTimeout(() => resolve(getData(id, level)), 1000);
  });
};

const Index = () => {
  const { cascaderProps } = useCascader(
    (value, selectedOptions) => {
      if (value) {
        return service(value, selectedOptions.length);
      }
      return service();
    },
    {
      lazy: true,
      isLeaf: (option) => option.level >= 3,
      fieldNames: { label: 'name', value: 'id', children: 'children' },
    },
  );

  return <Cascader {...cascaderProps} placeholder="Please select" />;
};

export default Index;
