import axiosInstance from '@/api/axiosInstance';
import useSwr, { mutate } from 'swr';

const fetcher = async ([url, params]: [
  string,
  Record<string, any> | undefined,
]) => {
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

interface UseFetchOptions {
  minQueryLength?: number; // optional condition to trigger fetching
}

function useFetch<T>(
  url: string,
  params?: Record<string, any>,
  options?: UseFetchOptions
) {
  const { minQueryLength } = options || {};

  const shouldFetch =
    !params || !minQueryLength
      ? true
      : typeof params.q === 'string'
        ? params.q.length > minQueryLength
        : true;

  const { data, error, isValidating } = useSwr<T>(
    shouldFetch ? [url, params] : null,
    fetcher
  );

  const refetch = async () => {
    await mutate([url, params], fetcher([url, params]), { revalidate: true });
  };

  return {
    data,
    error,
    isLoading: shouldFetch && !data && !error,
    isValidating,
    refetch,
  };
}

export default useFetch;
