import { useCallback, useMemo } from 'react';
import qs from 'qs';

const useDownload = (config) => {
  const { url = '/', params, ready = true, stringifyConfig } = config;

  const href = useMemo(() => {
    if (!ready) return '';
    const search = qs.stringify(
      params,
      Object.assign({ arrayFormat: 'comma' }, stringifyConfig || {}),
    );
    const _url = url.replace(/\{(.*?)\}/g, (match, key) => params[key.trim()]);
    return `${_url}?${search}`;
  }, [params, url, ready]);

  const onClick = useCallback(
    (e) => {
      if (href) {
        window.open(href, 'target');
      }
    },
    [href],
  );

  return {
    href,
    handler: onClick,
    buttonProps: { onClick, disabled: !ready },
  };
};

export default useDownload;
