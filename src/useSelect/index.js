import { useMemo, useCallback } from 'react';
import { useRequest } from 'ahooks';
import { Select } from 'antd';
import { isAntd3 } from '../common/utils';

const { Option } = Select;

const useSelect = (service, config) => {
  const {
    mode,
    remoteSearch = false,
    fieldNames,
    ...requestOptions
  } = config || {};

  const { label: labelProp, value: valueProp } = Object.assign(
    { label: 'label', value: 'value' },
    fieldNames || {},
  );

  const { data, run, loading, ...requestProps } = useRequest(service, {
    mutate: false,
    ...requestOptions,
  });

  const selectProps = {
    loading,
    style: { width: 300 },
    mode,
  };

  const options = useMemo(() => {
    if (Array.isArray(data)) {
      return data.map((item, index, array) => {
        const label =
          typeof labelProp === 'function'
            ? labelProp(item, index, array)
            : item[labelProp];
        const value =
          typeof valueProp === 'function'
            ? valueProp(item, index, array)
            : item[valueProp];
        return { label, value };
      });
    }
    return null;
  }, [data]);

  const children = useMemo(() => {
    if (options) {
      return options.map(({ label, value }) => (
        <Option value={value}>{label}</Option>
      ));
    }
    return null;
  }, [options]);

  if (options) {
    selectProps.options = options;
    // antd3.x 不支持 options
    if (isAntd3) {
      selectProps.children = children;
    }
  }

  // 远程搜索
  const onSearch = useCallback(
    (value) => {
      if (remoteSearch) run(value);
    },
    [remoteSearch],
  );
  if (remoteSearch) {
    Object.assign(selectProps, {
      showSearch: true,
      onSearch,
      filterOption: false,
      showArrow: false,
    });
  } else {
    // 选项搜索
    Object.assign(selectProps, {
      showSearch: true,
      showArrow: false,
      filterOption: (input, option) => {
        const opt = isAntd3 ? option.props : option;
        const label = opt.label || opt.children;
        return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    });
  }

  return {
    data,
    loading,
    run,
    ...requestProps,
    selectProps,
  };
};

export default useSelect;
