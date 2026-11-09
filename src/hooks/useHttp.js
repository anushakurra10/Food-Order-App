import { useCallback, useEffect, useRef, useState } from 'react';
import { getApiUrl } from '../config/env.js';

export function useHttp(path, method = 'GET', body, headers = null, autoFetch = true) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(path));
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const sendRequest = useCallback(async (requestBody = body) => {
    if (!path) {
      const message = 'A request path is required.';
      setError(message);
      setIsLoading(false);
      return { data: null, error: message };
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const requestMethod = method.toUpperCase();
    const hasRequestBody =
      requestBody !== undefined && !['GET', 'HEAD'].includes(requestMethod);
    setIsLoading(true);
    setError(null);

    const requestHeaders = new Headers(headers || undefined);
    const options = {
      method: requestMethod,
      headers: requestHeaders,
      signal: controller.signal,
    };

    if (hasRequestBody) {
      requestHeaders.set('Content-Type', 'application/json');
      options.body = JSON.stringify(requestBody);
    }

    try {
      const response = await fetch(getApiUrl(path), options);
      const contentType = response.headers.get('content-type') || '';
      const responseData =
        response.status === 204
          ? null
          : contentType.includes('application/json')
            ? await response.json()
            : await response.text();

      if (!response.ok) {
        const message =
          responseData && typeof responseData === 'object' && 'message' in responseData
            ? responseData.message
            : response.statusText;
        throw new Error(message || `Request failed with status ${response.status}.`);
      }

      setData(responseData);
      return { data: responseData, error: null };
    } catch (requestError) {
      if (controller.signal.aborted) {
        return { data: null, error: null };
      }

      const message =
        requestError instanceof Error ? requestError.message : 'Something went wrong.';
      setError(message);
      return { data: null, error: message };
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [body, headers, method, path]);

  useEffect(() => {
    if (autoFetch) {
      sendRequest();
    }
  }, [autoFetch, sendRequest]);

  useEffect(
    () => () => controllerRef.current?.abort(),
    [],
  );

  return { data, isLoading, error, sendRequest };
}
