/**
 * title: 基本
 * desc: 略。
 */

import React from 'react';
import { AutoComplete, version } from 'antd';
import { useAutoComplete } from 'inc-hooks';

const service = (value) => {
  let res = [];
  if (!value || value.indexOf('@') >= 0) {
    res = [];
  } else {
    res = ['gmail.com', '163.com', 'qq.com'].map(
      (domain) => `${value}@${domain}`,
    );
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(res), 100);
  });
};

const Index = () => {
  const { autoCompleteProps } = useAutoComplete(service);

  return (
    <AutoComplete
      style={{ width: 200 }}
      {...autoCompleteProps}
      placeholder="input here"
    ></AutoComplete>
  );
};

export default Index;
