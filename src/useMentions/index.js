import { useCallback, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { Mentions } from 'antd';

const { Option } = Mentions;

const useMentions = (service, config) => {
  const { formatResult, fieldNames, ...requestOptions } = config || {};

  const { label: labelProp, value: valueProp } = Object.assign(
    { label: 'label', value: 'value' },
    fieldNames || {},
  );

  const { data, run, loading, ...requestProps } = useRequest(service, {
    mutate: true,
    debounceInterval: 300,
    ...requestOptions,
  });

  const onSearch = useCallback(
    (search) => {
      return run(search);
    },
    [run],
  );

  const mentionsProps = { loading, onSearch };
  const children = useMemo(() => {
    if (Array.isArray(data) && Object.keys(fieldNames || {}).length) {
      return data.map((item, index, array) => {
        const label =
          typeof labelProp === 'function'
            ? labelProp(item, index, array)
            : item[labelProp];
        const value =
          typeof valueProp === 'function'
            ? valueProp(item, index, array)
            : item[valueProp];
        return (
          <Option key={value} value={value}>
            {label}
          </Option>
        );
      });
    }
    return null;
  }, [data, fieldNames]);

  if (children) {
    mentionsProps.children = children;
  }
  return {
    data,
    ...requestProps,
    mentionsProps,
  };
};

export default useMentions;
