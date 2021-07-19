// 预发：https://pre-finesee.alibaba-inc.com/api/fs/protein/data/query?
// 线上：https://finesee.alibaba-inc.com/api/fs/protein/data/query?proteinCode=SDN8Qi3
// 日常：https://finesee.alibaba.net/api/fs/protein/data/query?proteinCode=SFwGSJI

import { createService, useSelect } from 'inc-hooks';
import { Select } from 'antd';

const { Option } = Select;
const baseURLMap = {
  dev: 'https://finesee.alibaba.net/',
  pre: 'https://pre-finesee.alibaba-inc.com/',
  prod: 'https://finesee.alibaba-inc.com/',
};

const serviceConfigs = {
  getActivitys: {
    url: 'api/fs/protein/data/query',
    method: 'get',
    withCredentials: true,
    data: {
      proteinCode: 'SDN8Qi3',
      resultType: 'list',
      // _resultFormat:'myreports'
    },
  },
};
const {
  instance,
  services: { getActivitys },
} = createService(serviceConfigs, { baseURL: baseURLMap.pre });
// instance.interceptors.response.use((response) => response.data);

const Index = () => {
  const { data, selectProps } = useSelect(getActivitys);
  console.log('data', data);
  return <div>Select</div>;
};

export default Index;
