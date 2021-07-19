/**
 * title: 基本
 * desc: 略。
 */

import React from 'react';
import { Mentions } from 'antd';
import { useMentions } from 'inc-hooks';

const service = (key) => {
  if (!key) {
    return Promise.resolve([]);
  }
  return fetch(`https://api.github.com/search/users?q=${key}`)
    .then((res) => res.json())
    .then(({ items = [] }) => {
      return items.slice(0, 10);
    });
};

const Index = () => {
  const { mentionsProps } = useMentions(service, {
    fieldNames: { label: 'login', value: 'login' },
  });
  console.log('mentionsProps', mentionsProps);

  return <Mentions {...mentionsProps} style={{ width: 300 }}></Mentions>;
};

export default Index;
