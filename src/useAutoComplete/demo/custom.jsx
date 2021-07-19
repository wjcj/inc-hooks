/**
 * title: 自定义
 * desc: 通过设置 `fieldNames` 选项自定义 `Option` 的显示。
 */

import React from 'react';
import { AutoComplete } from 'antd';
import { useAutoComplete } from 'inc-hooks';
import Mock from 'mockjs';

const data = Mock.mock({
  'value|20': [{ name: '@name', userId: '@id', email: '@email' }],
}).value;

const service = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          keyword ? data.filter(({ name }) => name.includes(keyword)) : data,
        ),
      300,
    );
  });
};

const Index = () => {
  const { autoCompleteProps } = useAutoComplete(service, {
    fieldNames: {
      value: 'name',
      label: (user) => (
        <div key={user.userId}>
          <p>
            <b>{user.name}</b>
          </p>
          <p style={{ display: 'flex', justifyContent: 'space-between' }}>
            {user.userId}
            <span>{user.email}</span>
          </p>
        </div>
      ),
    },
  });

  const onChange = (value) => console.log('onChange', value);
  const onSelect = (value, option) => console.log('onSelect', value, option);

  return (
    <AutoComplete
      style={{ width: 500 }}
      {...autoCompleteProps}
      onChange={onChange}
      onSelect={onSelect}
      placeholder="input here"
    ></AutoComplete>
  );
};

export default Index;
