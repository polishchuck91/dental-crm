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

function useFetch<T>(url: string, params?: Record<string, any>) {
  const { data, error, isValidating } = useSwr<T>(
    params ? [url, params] : null,
    fetcher
  );

  const refetch = async () => {
    await mutate([url, params], fetcher([url, params]), { revalidate: true });
  };

  return {
    data,
    error,
    isLoading: !data && !error,
    isValidating,
    refetch,
  };
}

export default useFetch;
