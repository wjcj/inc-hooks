/**
 * title: 动态加载
 * desc: 通过 `lazy` 选项开启动态加载。
 */

import React from 'react';
import { Tree, Divider } from 'antd';
import { useTree } from 'inc-hooks';
import Mock from 'mockjs';

const getData = (id = null, level, isCustom) => {
  const template = {
    'value|5': [
      {
        key: '@id',
        level: level,
        title: level === 1 ? '@province' : level === 2 ? '@city' : '@county',
        isLeaf: level >= 3,
      },
    ],
  };
  const customTemplate = {
    'value|5': [
      {
        id: '@id',
        level: level,
        name: level === 1 ? '@province' : level === 2 ? '@city' : '@county',
        isLeaf: level >= 3,
      },
    ],
  };
  return Mock.mock(isCustom ? customTemplate : template).value;
};

const service1 = (id, level = 1) => {
  level = id ? level + 1 : level;
  return new Promise((resolve) => {
    setTimeout(() => resolve(getData(id, level)), 300);
  });
};
const service2 = (id, level = 1) => {
  level = id ? level + 1 : level;
  return new Promise((resolve) => {
    setTimeout(() => resolve(getData(id, level, true)), 300);
  });
};

const Index = () => {
  const { treeProps: treeProps1 } = useTree(
    (node, nodeData) => {
      if (node) {
        return service1(nodeData.key, nodeData.level);
      }
      return service1();
    },
    { lazy: true },
  );

  const { treeProps: treeProps2 } = useTree(
    (node, nodeData) => {
      if (node) {
        return service2(nodeData.key, nodeData.level);
      }
      return service2();
    },
    {
      lazy: true,
      fieldNames: { key: 'id', title: 'name', children: 'childs' },
    },
  );
  return (
    <div>
      <Tree {...treeProps1} checkable />
      <Divider orientation="left">自定义：</Divider>
      <Tree {...treeProps2} checkable />
    </div>
  );
};

export default Index;
