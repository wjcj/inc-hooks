import { createService, useMentions } from 'inc-hooks';
import { Mentions } from 'antd';

const serviceConfigs = {
  getUsers: {
    url: 'search/users',
    method: 'get',
    'mockRule|3': [{ login: '@name', id: '@id' }],
  },
};
const {
  instance,
  services: { getUsers },
} = createService(serviceConfigs, { baseURL: 'https://api.github.com' });
instance.interceptors.response.use((response) => response.data);

const Index = () => {
  const { mentionsProps } = useMentions(
    (key) => {
      if (!key) return Promise.resolve([]);
      return getUsers({ q: key });
    },
    { fieldNames: { label: 'login', value: 'login' } },
  );

  return <Mentions {...mentionsProps} style={{ width: 300 }}></Mentions>;
};

export default Index;
