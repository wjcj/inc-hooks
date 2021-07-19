/**
 * title: 自定义 `TreeSelectNodes`
 * desc: 通过 `fieldNames` 或 `data` 自定义 `TreeSelectNodes` 渲染。
 */

import React, { useMemo } from 'react';
import { TreeSelect, Divider } from 'antd';
import { useTreeSelect } from 'inc-hooks';
import Mock from 'mockjs';

const { TreeNode } = TreeSelect;

const data = Mock.mock({
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

const service = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};

const Index = () => {
  // 定义 fieldNames 自动生成 TreeSelectNodes
  const { treeSelectProps: treeSelectProps1 } = useTreeSelect(service, {
    fieldNames: { value: 'id', title: 'name', children: 'childs' },
    treeData: false,
  });

  // 使用 data 手动生成 TreeSelectNodes
  const { data, treeSelectProps: treeSelectProps2 } = useTreeSelect(service, {
    fieldNames: { value: 'id' },
    treeData: false,
  });
  const getChilds = (childs) => {
    return (childs || []).map((child) => {
      return (
        <TreeNode
          key={child.id}
          value={child.id}
          title={`${child.name}-${child.level}`}
        >
          {(child.childs || []).length && getChilds(child.childs)}
        </TreeNode>
      );
    });
  };
  const children = useMemo(() => getChilds(data), [data]);

  return (
    <div>
      <TreeSelect
        {...treeSelectProps1}
        style={{ width: '100%' }}
        placeholder="Please select"
      />
      <Divider orientation="left">自定义：</Divider>
      <TreeSelect
        {...treeSelectProps2}
        style={{ width: '100%' }}
        placeholder="Please select"
      >
        {children}
      </TreeSelect>
    </div>
  );
};

export default Index;
