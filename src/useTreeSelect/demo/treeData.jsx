/**
 * title: treeDataSimpleMode 模式
 * desc: 如 `treeData` 数据格式不符合则需要配置 `fieldNames` 选项。
 */

import React from 'react';
import { TreeSelect, Divider } from 'antd';
import { useTreeSelect } from 'inc-hooks';
import Mock from 'mockjs';

const service1 = () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: 1, pId: 0, value: '1', name: 'name 1' },
          { id: 2, pId: 0, value: '2', name: 'name 2' },
          { id: 3, pId: 0, value: '3', name: 'name 3' },
          { id: 4, pId: 1, value: '4', name: 'name 1-1' },
          { id: 5, pId: 4, value: '5', name: 'name 1-1-1' },
          { id: 6, pId: 4, value: '6', name: 'name 1-1-2' },
        ]),
      300,
    );
  });
};

const service2 = (id, level = 1) => {
  level = id ? level + 1 : level;
  const getData = (id = null, level) => {
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
  return new Promise((resolve) => {
    setTimeout(() => resolve(getData(id, level)), 300);
  });
};

const Index = () => {
  const { treeSelectProps } = useTreeSelect(service1, {
    treeDataSimpleMode: true,
    fieldNames: { value: 'id', children: 'childs', title: 'name' },
  });

  const { treeSelectProps: lazyTreeSelectProps } = useTreeSelect(
    (node, nodeData) => {
      if (node) {
        return service2(nodeData.id, nodeData.level);
      }
      return service2();
    },
    {
      lazy: true,
      treeDataSimpleMode: true,
      fieldNames: { value: 'id', children: 'childs', title: 'name' },
    },
  );
  return (
    <div>
      <TreeSelect
        {...treeSelectProps}
        style={{ width: '100%' }}
        placeholder="Please select"
      ></TreeSelect>
      <Divider orientation="left">动态加载 ：</Divider>
      <TreeSelect
        {...lazyTreeSelectProps}
        style={{ width: '100%' }}
        placeholder="Please select"
      ></TreeSelect>
    </div>
  );
};

export default Index;
