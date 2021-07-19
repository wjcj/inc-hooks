import Mock from 'mockjs';
import clonedeep from 'lodash.clonedeep';

export const isAntd3 = true;

export const warn = (api, message) => {
  console.warn(`[inc-hooks] ${api}: ${message}`);
};

export const error = (api, message) => {
  console.error(`[inc-hooks] ${api}: ${message}`);
};

const packingPage = (list, total) => {
  return { total, list };
};

const resultTypes = ['page'];
export const mock = (mockRuleKey, mockRuleValue) => {
  const [keyAndResultType, rule] = mockRuleKey.split('|');
  const [key, resultType] = keyAndResultType.split('.');

  if (resultType && !resultTypes.includes(resultType)) {
    warn('mockRule', `不支持的 resultType 类型: ${resultType}！`);
  }
  let mockjsTemplate;
  if (resultType === 'page') {
    const [total = 99, pageSize = 10] = (rule || '').split('.');
    mockjsTemplate = {
      [`${key}|${pageSize}`]: clonedeep(mockRuleValue),
    };
    const list = Mock.mock(mockjsTemplate)[key];
    return packingPage(list, total, pageSize);
  } else {
    mockjsTemplate = {
      [`${key}${typeof rule === 'undefined' ? '' : `|${rule}`}`]:
        clonedeep(mockRuleValue),
    };
    return Mock.mock(mockjsTemplate)[key];
  }
};
