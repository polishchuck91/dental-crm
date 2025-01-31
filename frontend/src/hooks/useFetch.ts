import axiosInstance from "@/api/axiosInstance";
import useSWR from "swr";

const fetcher = async (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export function useFetch<T>(url: string) {
  const { data, error, isValidating } = useSWR<T>(url, fetcher);

  return {
    data,
    error,
    isLoading: !data && !error,
    isValidating,
  };
}

export default useFetch;
