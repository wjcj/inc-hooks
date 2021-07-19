/**
 * title: 基本
 * desc: 略。
 */

import React, { useState } from 'react';
import { Button, DatePicker, Divider } from 'antd';
import { useDownload } from 'inc-hooks';

const { RangePicker } = DatePicker;

const Index = () => {
  const [dates, setDates] = useState([]);
  const { href, buttonProps } = useDownload({
    url: 'https://some-domain.com/api/',
    params: {
      type: 'user',
      start_dt: dates[0],
      end_dt: dates[1],
      size: 2000,
    },
    ready: dates.length,
    // https://www.npmjs.com/package/qs
    qsStringifyConfig: { arrayFormat: 'brackets' },
  });
  return (
    <div>
      <RangePicker onChange={(dates, dateStrings) => setDates(dateStrings)} />
      <Divider />
      <Button {...buttonProps} type="primary">
        Download
      </Button>
      <hr />
      href：<a href={href}>{href}</a>
    </div>
  );
};

export default Index;
