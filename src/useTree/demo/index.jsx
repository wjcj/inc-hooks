/**
 * title: 基础
 * desc: 通过 `fieldNames` 自定义 `treeNodes` 渲染。
 */

import React from 'react';
import { Tree, Divider } from 'antd';
import { useTree } from 'inc-hooks';
import Mock from 'mockjs';

const data1 = Mock.mock({
  'value|5': [
    {
      key: '@id',
      level: 1,
      title: '@province',
      'children|0-5': [
        {
          key: '@id',
          level: 2,
          title: '@city',
          'children|0-5': [
            {
              key: '@id',
              level: 3,
              title: '@county',
            },
          ],
        },
      ],
    },
  ],
}).value;

const data2 = Mock.mock({
  'value|5': [
    {
      id: '@id',
      level: 1,
      name: '@province',
      'childs|0-5': [
        {
          id: '@id',
          level: 2,
          name: '@city',
          'childs|0-5': [
            {
              id: '@id',
              level: 3,
              name: '@county',
            },
          ],
        },
      ],
    },
  ],
}).value;

const service = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};

const Index = () => {
  const { treeProps: treeProps1 } = useTree(service.bind(null, data1));

  const { treeProps: treeProps2 } = useTree(service.bind(null, data2), {
    fieldNames: { key: 'id', title: 'name', children: 'childs' },
  });

  return (
    <div>
      <Tree {...treeProps1} checkable />
      <Divider orientation="left">自定义：</Divider>
      <Tree {...treeProps2} checkable />
    </div>
  );
};

export default Index;
