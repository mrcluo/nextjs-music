import useSWR from "swr";
import { API_BASE_URL } from "@/api/config";
export default function useSingerMutation(id) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/artists?id=${id}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}
