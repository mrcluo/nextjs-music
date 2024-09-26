import useSWR from "swr";
import { API_BASE_URL } from "@/api/config";
export default function useGetAlbums(id) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/playlist/detail?id=${id}`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
  };
}
