/**
 * title: 异步加载
 * desc: 使用 `lazy` 选项实现动态加载，此模式下可能需要配置 `fieldNames` 和 `isLeaf` 选项。
 */

import React from 'react';
import { TreeSelect } from 'antd';
import { useTreeSelect } from 'inc-hooks';
import Mock from 'mockjs';

const getData = (id = null, level) => {
  level = id ? level + 1 : level;
  const template = {
    'value|5': [
      {
        id: '@id',
        pId: id,
        level: level,
        name: level === 1 ? '@province' : level === 2 ? '@city' : '@county',
        isLeaf: level >= 3,
      },
    ],
  };
  return Mock.mock(template).value;
};

const service = (id, level = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getData(id, level)), 2000);
  });
};

const Index = () => {
  const { treeSelectProps } = useTreeSelect(
    (node, nodeData) => {
      if (node) {
        return service(nodeData.id, nodeData.level);
      }
      return service();
    },
    {
      lazy: true,
      fieldNames: { value: 'id', children: 'childs', title: 'name' },
      isLeaf: (nodeData) => nodeData.level >= 3,
    },
  );
  return (
    <div>
      <TreeSelect
        {...treeSelectProps}
        style={{ width: '100%' }}
        placeholder="Please select"
      ></TreeSelect>
    </div>
  );
};

export default Index;
