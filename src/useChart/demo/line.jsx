import React from 'react';
import { Line } from '@ant-design/charts';
import { useChart } from 'inc-hooks';

const service = () => {
  return fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
  ).then((response) => response.json());
};

const DemoLine = () => {
  const { chartProps } = useChart(service, {
    chartConfig: {
      xField: 'Date',
      yField: 'scales',
    },
  });

  return <Line {...chartProps} />;
};

export default DemoLine;
