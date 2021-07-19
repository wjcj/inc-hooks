import { useCallback, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { AutoComplete } from 'antd';
import { isAntd3 } from '../common/utils';

const { Option } = AutoComplete;

const useAutoComplete = (service, config = {}) => {
  const { fieldNames, ...requestOptions } = config;

  const { data, loading, run, ...requestProps } = useRequest(service, {
    mutate: true,
    ...requestOptions,
  });

  const onSearch = useCallback(
    (value) => {
      run(value);
    },
    [run],
  );

  const isCustom = Object.keys(fieldNames || {}).length;

  const options = useMemo(() => {
    if (Array.isArray(data)) {
      if (isCustom) {
        const { label: labelProp, value: valueProp } = Object.assign(
          { label: 'label', value: 'value' },
          fieldNames,
        );
        return data.map((child, index, array) => {
          const value =
            typeof valueProp === 'function'
              ? valueProp(child, index, array)
              : child[valueProp];
          const label =
            typeof labelProp === 'function'
              ? labelProp(child, index, array)
              : child[labelProp];
          return { value, label, __data: child };
        });
      }
      return isAntd3 ? data : data.map((value) => ({ value, label: value }));
    }
    return null;
  }, [data, fieldNames, isCustom]);

  const children = useMemo(() => {
    if (options && isCustom) {
      return options.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ));
    }
    return null;
  }, [options, isCustom]);

  const autoCompleteProps = {
    onSearch,
    [isAntd3 ? 'dataSource' : 'options']: options,
  };

  if (isAntd3 && children) {
    autoCompleteProps.children = children;
    autoCompleteProps.optionLabelProp = 'value';
  }

  return {
    data,
    run,
    ...requestProps,
    autoCompleteProps,
  };
};

export default useAutoComplete;
