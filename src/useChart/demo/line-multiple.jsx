import React from 'react';
import { Line } from '@ant-design/charts';
import { useChart } from 'inc-hooks';

const service = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Liquid fuel', hh: '1', value: 99 },
        { name: 'Liquid fuel', hh: '2', value: 21 },
        { name: 'Solid fuel', hh: '1', value: 87 },
        { name: 'Solid fuel', hh: '2', value: 72 },
      ]);
    }, 500);
  });

const DemoLine = () => {
  const { chartProps } = useChart(service, {
    chartConfig: {
      xField: 'hh',
      yField: 'value',
      seriesField: 'name',
    },
  });

  return <Line {...chartProps} />;
};

export default DemoLine;
