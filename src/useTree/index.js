import { useCallback, useState, useEffect, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { isAntd3 } from '../common/utils';

const defaultFormatResult = (res) => res;
const defaultIsLeaf = (nodeData) => nodeData.isLeaf;

const useTree = (service, config = {}) => {
  const {
    lazy = false,
    fieldNames,
    isLeaf = defaultIsLeaf,
    formatResult,
    ...requestOptions
  } = config;

  const FIELD_MAP = Object.assign(
    { title: 'title', key: 'key', children: 'children' },
    fieldNames || {},
  );

  const [treeData, setTreeData] = useState([]);
  const { data, ...requestProps } = useRequest(service, {
    mutate: false,
    formatResult,
    ...requestOptions,
  });

  const _formatResult = formatResult || defaultFormatResult;
  const transformData = useCallback(
    (data) => {
      if (
        Array.isArray(data) &&
        (Object.keys(fieldNames || []).length || isLeaf !== defaultIsLeaf)
      ) {
        return data.map((nodeData) => {
          nodeData.key = nodeData[FIELD_MAP.key];
          nodeData.value = nodeData[FIELD_MAP.key];
          nodeData.title = nodeData[FIELD_MAP.title];
          nodeData.children = transformData(nodeData[FIELD_MAP.children]);
          if (lazy) {
            nodeData.isLeaf = isLeaf(nodeData);
          }
          return nodeData;
        });
      }
      return data;
    },
    [lazy],
  );

  useEffect(() => {
    if (Array.isArray(data)) {
      setTreeData(transformData(data));
    }
  }, [data, transformData]);

  const treeDataMap = useMemo(() => {
    const result = {};
    const loop = (list, _result) => {
      if ((list || []).length === 0) return;
      list.forEach((item) => {
        _result[item.key] = item;
        loop(item.children, _result);
      });
    };
    loop(treeData, result);
    return result;
  }, [treeData]);

  // 动态加载
  const loadData = useCallback(
    (node) => {
      const nodeProps = isAntd3 ? node.props : node;
      const key = nodeProps[isAntd3 ? 'eventKey' : 'key'];
      return service(node, treeDataMap[key]).then((data) => {
        data = _formatResult(data);
        treeDataMap[key].children = transformData(data);
        setTreeData([...treeData]);
      });
    },
    [service, treeData, treeDataMap],
  );

  const treeProps = { treeData };
  if (lazy) {
    treeProps.loadData = loadData;
  }
  return {
    data: treeData,
    ...requestProps,
    treeProps,
  };
};

export default useTree;
