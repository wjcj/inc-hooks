import { useCallback, useState, useEffect, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { TreeSelect } from 'antd';
import { isAntd3 } from '../common/utils';

const defaultFormatResult = (res) => res;
const defaultIsLeaf = (nodeData) => nodeData.isLeaf;

const useTreeSelect = (service, config = {}) => {
  const {
    lazy = false,
    treeDataSimpleMode = false,
    fieldNames,
    isLeaf = defaultIsLeaf,
    formatResult,
    ...requestOptions
  } = config;

  const FIELD_MAP = Object.assign(
    { title: 'title', value: 'value', children: 'children', pId: 'pId' },
    fieldNames || {},
  );
  FIELD_MAP.id = FIELD_MAP.id || FIELD_MAP.value;
  const {
    value: valueProp,
    children: childrenProp,
    title: titleProp,
    id: idProp,
  } = FIELD_MAP;

  const [treeData, setTreeData] = useState([]);
  const { data, ...requestProps } = useRequest(service, {
    mutate: false,
    formatResult,
    ...requestOptions,
  });

  const _formatResult = formatResult || defaultFormatResult;
  const transformSimpleModeData = useCallback((data) => {
    // 存在自定义配置
    if (
      Array.isArray(data) &&
      (Object.keys(fieldNames || []).length || isLeaf !== defaultIsLeaf)
    ) {
      return data.map((nodeData) => {
        ['id', 'pId', 'value', 'title', 'isLeaf'].forEach((fieldName) => {
          if (fieldName === 'isLeaf') {
            nodeData.isLeaf = isLeaf(nodeData);
          } else {
            nodeData[fieldName] = nodeData[FIELD_MAP[fieldName]];
          }
        });
        return nodeData;
      });
    }
    return data;
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTreeData(treeDataSimpleMode ? transformSimpleModeData(data) : data);
    }
  }, [data, treeDataSimpleMode]);

  const treeDataMap = useMemo(() => {
    const result = {};
    const loop = (list, _result) => {
      if ((list || []).length === 0) return;
      list.forEach((item) => {
        _result[item[valueProp]] = item;
        loop(item[childrenProp], _result);
      });
    };
    loop(treeData, result);
    return result;
  }, [treeData]);

  // 动态加载
  const loadData = useCallback(
    (node) => {
      const nodeProps = isAntd3 ? node.props : node;
      return service(node, treeDataMap[nodeProps.value]).then((data) => {
        data = _formatResult(data);
        if (treeDataSimpleMode) {
          setTreeData([...treeData.concat(transformSimpleModeData(data))]);
        } else {
          treeDataMap[nodeProps.value][childrenProp] = data;
          setTreeData([...treeData]);
        }
      });
    },
    [service, treeData, treeDataSimpleMode, treeDataMap],
  );

  const treeSelectProps = {
    treeDataSimpleMode,
    // treeNodeLabelProp: titleProp,
    treeNodeLabelProp: 'title',
  };

  const renderTreeNode = useCallback(
    (childs) => {
      return (childs || []).map((child) => {
        return (
          <TreeSelect.TreeNode
            key={child[idProp]}
            value={child[valueProp]}
            title={child[titleProp]}
            isLeaf={lazy ? isLeaf(child) : undefined}
          >
            {Array.isArray(child[childrenProp]) &&
              renderTreeNode(child[childrenProp])}
          </TreeSelect.TreeNode>
        );
      });
    },
    [lazy, isLeaf],
  );

  if (treeDataSimpleMode) {
    treeSelectProps.treeData = treeData;
  } else {
    treeSelectProps.children = renderTreeNode(treeData);
  }

  if (lazy) {
    treeSelectProps.loadData = loadData;
  }

  return {
    data: treeData,
    ...requestProps,
    treeSelectProps,
  };
};

export default useTreeSelect;
