import { useCallback, useEffect, useState } from 'react';

export function getErrorMessage(error, translate = (key) => key) {
  if (error?.code === 'ECONNABORTED') {
    return translate('requestTimeout');
  }
  if (error?.response?.status >= 500) {
    return translate('serviceUnavailable');
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return translate('genericError');
}

export default function useFetch(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [requestNumber, setRequestNumber] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setData(null);
    setError(null);
    setStatus('loading');

    apiCall(controller.signal)
      .then((result) => {
        if (!active) return;
        setData(result);
        const items = Array.isArray(result?.items) ? result.items : null;
        setStatus(result == null || (items && items.length === 0) ? 'not-found' : 'success');
      })
      .catch((requestError) => {
        if (!active || controller.signal.aborted) return;
        setError(requestError);
        setStatus(
          requestError?.code === 'NOT_FOUND' || requestError?.response?.status === 404
            ? 'not-found'
            : 'error',
        );
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [apiCall, requestNumber, ...dependencies]);

  const retry = useCallback(() => setRequestNumber((current) => current + 1), []);

  return { data, status, error, retry };
}
