/**
 * title: 自定义异步校验
 * desc: 略。
 */

import React from 'react';
import { Form, Input } from 'antd';
import { useValidator } from 'inc-hooks';
import Mock from 'mockjs';

const service = () => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(Mock.mock({ data: false, msg: '密码错误' })),
      1000,
    );
  });
};

const Index = () => {
  const { validator, ...rest } = useValidator(
    (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      service(value)
        .then(({ data, msg }) => (data ? callback() : callback(new Error(msg))))
        .catch(() => callback(new Error('校验失败')));
    },
    { debounceInterval: 300 },
  );

  return (
    <Form>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, validator }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default Index;
