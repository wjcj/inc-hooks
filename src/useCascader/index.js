import { useCallback, useState } from 'react';
import { useRequest } from 'ahooks';

const defaultFormatResult = (res) => res;
const defaultIsLeaf = (nodeData) => nodeData.isLeaf;
const useCascader = (service, config) => {
  const {
    lazy = false,
    isLeaf = defaultIsLeaf,
    fieldNames,
    formatResult,
    ...requestOptions
  } = config || {};
  const _fieldNames = Object.assign(
    { label: 'label', value: 'value', children: 'children' },
    fieldNames || {},
  );

  const [options, setOptions] = useState([]);
  const formatOptions = useCallback(
    (options) => {
      if (lazy && typeof isLeaf === 'function') {
        options = options.map((option) => {
          option.isLeaf = isLeaf(option);
          return option;
        });
      }
      return options;
    },
    [isLeaf, lazy],
  );

  const { data, ...requestProps } = useRequest(service, {
    mutate: false,
    formatResult,
    ...requestOptions,
    onSuccess: (data) => setOptions(formatOptions(data)),
  });
  const _formatResult = formatResult || defaultFormatResult;

  const loadData = useCallback(
    (selectedOptions) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      service(targetOption[_fieldNames.value], selectedOptions)
        .then((res) => _formatResult(res))
        .then((data) => {
          targetOption.loading = false;
          targetOption[_fieldNames.children] = formatOptions(data);
          setOptions([...options]);
        });
    },
    [service, options, formatOptions],
  );

  const cascaderProps = { options };
  if (lazy) {
    cascaderProps.loadData = loadData;
  }
  if (fieldNames) {
    cascaderProps.fieldNames = _fieldNames;
  }
  return {
    ...requestProps,
    cascaderProps,
  };
};

export default useCascader;
