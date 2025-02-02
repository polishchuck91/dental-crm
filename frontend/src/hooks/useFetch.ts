import axiosInstance from "@/api/axiosInstance";
import useSWR from "swr";
import qs from "qs";

const fetcher = async (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export function useFetch<T>(url: string, params?: Record<string, any>) {
  const hasParams = params && Object.keys(params).length > 0;
  const queryString = hasParams
    ? `?${qs.stringify(params, { arrayFormat: "brackets" })}`
    : "";

  const shouldFetch = hasParams; // Only fetch if params exist

  const { data, error, isValidating } = useSWR<T>(
    shouldFetch ? `${url}${queryString}` : null, // Dismiss request if no params
    fetcher,
  );

  return {
    data,
    error,
    isLoading: shouldFetch ? !data && !error : false,
    isValidating,
  };
}

export default useFetch;
