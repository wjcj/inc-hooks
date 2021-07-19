import { useRequest } from 'ahooks';

const useChart = (service, config) => {
  const { chartConfig, ...requestOptions } = config || {};

  const { data, loading, ...requestProps } = useRequest(service, {
    mutate: false,
    ...requestOptions,
  });

  return {
    chartProps: {
      data: data || [],
      loading,
      ...chartConfig,
    },
    data,
    loading,
    ...requestProps,
  };
};

export default useChart;
