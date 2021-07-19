import { createService, useMentions } from 'inc-hooks';
import { Mentions } from 'antd';

const { Option } = Mentions;

const serviceConfigs = {
  getUsers: {
    url: 'search/users',
    method: 'get',
  },
};
const {
  instance,
  services: { getUsers },
} = createService(serviceConfigs, { baseURL: 'https://api.github.com' });
instance.interceptors.response.use((response) => response.data);

const Index = () => {
  const {
    data: users,
    mentionsProps: { loading, onSearch },
  } = useMentions((key) => {
    if (!key) return Promise.resolve([]);
    return getUsers({ q: key }).then((response) =>
      (response.items || []).slice(0, 10),
    );
  });
  return (
    <Mentions style={{ width: 300 }} loading={loading} onSearch={onSearch}>
      {(users || []).map(({ login, avatar_url: avatar }) => (
        <Option key={login} value={login}>
          <img
            src={avatar}
            alt={login}
            style={{ width: '25px', marginRight: '3px' }}
          />
          <span>{login}</span>
        </Option>
      ))}
    </Mentions>
  );
};

export default Index;
