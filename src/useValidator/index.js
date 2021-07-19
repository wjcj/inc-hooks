import { useState } from 'react';
import { useDebounceFn } from 'ahooks';

const useValidate = (validatorFn, config) => {
  const { debounceInterval = 100 } = config;
  const [loading, setLoading] = useState(false);
  const [validateStatus, setValidateStatus] = useState('init'); // 'success', 'error', 'validating'

  const { run: validator } = useDebounceFn((rule, value, callback) => {
    const _callback = (cb, error) => {
      if (error instanceof Error) {
        setLoading(false);
        setValidateStatus('error');
        cb(error);
        return;
      }
      setLoading(false);
      setValidateStatus('success');
      cb();
    };
    setLoading(true);
    setValidateStatus('validating');
    validatorFn(rule, value, _callback.bind(null, callback));
  }, debounceInterval);

  return {
    loading,
    validateStatus,
    validator,
  };
};

export default useValidate;
