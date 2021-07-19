import axios from 'axios';
import { warn, mock } from '../common/utils';

const packingMockResponse = (data) => ({
  data,
  status: 200,
  statusText: '',
  config: {},
  headers: {},
  request: {},
});
const packingMockData = (mockData) => {
  return packingMockResponse(mockData);
};

const createService = (serviceConfigs, _axiosConfig) => {
  const axiosConfig = _axiosConfig || {};
  const instance = axios.create(axiosConfig);

  const services = Object.keys(serviceConfigs).reduce((result, cKey) => {
    const serviceConfig = Object.assign(
      {},
      {
        withCredentials: true,
      },
      serviceConfigs[cKey],
    );

    const mockRuleKey = Object.keys(serviceConfig).find((key) =>
      key.startsWith('mockRule'),
    );
    const mockRuleValue = serviceConfig[mockRuleKey];
    if (mockRuleKey) {
      delete serviceConfig[mockRuleKey];
    }
    const requestConfig = serviceConfig;
    const service = (params) => {
      // 数据 mock
      if (mockRuleKey) {
        const value = mock(mockRuleKey, mockRuleValue);
        return new Promise((resolve) => {
          const response = packingMockData(value);
          const interceptorManager = instance.interceptors.response;
          const mockData = interceptorManager.handlers.reduce(
            (result, { fulfilled }) => {
              return typeof fulfilled === 'function'
                ? fulfilled(result)
                : result;
            },
            response,
          );
          setTimeout(() => resolve(mockData), 500);
        });
      }

      const { method = 'get', url = '', data = {} } = requestConfig;
      requestConfig.method = method.toLowerCase();

      const _params = Object.assign({}, data, params);
      if (['put', 'post', 'patch'].includes(requestConfig.method)) {
        requestConfig.data = _params;
      } else {
        requestConfig.params = _params;
      }
      if (url) {
        requestConfig.url = url.replace(
          /\{(.*?)\}/g,
          (match, key) => _params[key.trim()],
        );
      }

      return instance.request(requestConfig);
    };

    result[cKey] = service;

    return result;
  }, {});

  return {
    instance,
    services,
  };
};

export default createService;
