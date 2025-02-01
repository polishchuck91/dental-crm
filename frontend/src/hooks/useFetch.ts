import axiosInstance from "@/api/axiosInstance";
import useSWR from "swr";
import qs from "qs";

const fetcher = async (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export function useFetch<T>(url: string, params?: Record<string, any>) {
  const queryString = params
    ? `?${qs.stringify(params, { arrayFormat: "brackets" })}`
    : "";
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
