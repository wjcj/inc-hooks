/**
 * title: 自定义 Options
 * desc: 略。
 */

import React from 'react';
import { Mentions } from 'antd';
import { useMentions } from 'inc-hooks';

const { Option } = Mentions;

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
  const {
    data: users,
    mentionsProps: { loading, onSearch },
  } = useMentions(service);
  return (
    <Mentions style={{ width: 300 }} loading={loading} onSearch={onSearch}>
      {(users || []).map(({ login, avatar_url: avatar }) => (
        <Option key={login} value={login}>
          <img
            src={avatar}
            alt={login}
            style={{ width: '25px', marginRight: '3px' }}
          />
          <span>{login}</span>
        </Option>
      ))}
    </Mentions>
  );
};

export default Index;
