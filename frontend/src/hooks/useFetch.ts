import axiosInstance from "@/api/axiosInstance";
import useSWR from "swr";
import qs from "qs";

const fetcher = async (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export function useFetch<T>(url: string, params?: Record<string, any>) {
  const hasParams = params && Object.keys(params).length > 0;
  const queryString = hasParams
    ? `?${qs.stringify(params, { arrayFormat: "brackets", encode: false, indices: false })}`
    : "";

  // The key will change when `params` change, triggering a re-fetch
  const { data, error, isValidating } = useSWR<T>(
    `${url}${queryString}`,
    fetcher,
  );

  return {
    data,
    error,
    isLoading: !data && !error,
    isValidating,
  };
}

export default useFetch;
