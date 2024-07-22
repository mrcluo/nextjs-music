import useSWRMutation from "swr/mutation";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "@/api/config";
import { changeSingerList } from "@/store/slices/singers";
export default function useSingerMutation() {
  const dispatch = useDispatch();
  const fetcher = (url, { arg }) => {
    url += `?cat=${arg.category}&initial=${arg.initial}&offset=${arg.offset}`;
    return fetch(url).then((res) => res.json());
  };
  const { trigger, isMutating } = useSWRMutation(
    `${API_BASE_URL}/artist/list`,
    fetcher
  );

  const changeSinger = async (category, alpha, offset) => {
    const data = await trigger({
      category,
      initial: alpha,
      offset,
    });
    console.log("🚀 ~ handleUpdateCategory ~ data:", data);
    dispatch(changeSingerList(data?.artists || []));
  };
  // isMutating: 远程数据变更是否正在进行
  return { changeSinger, isMutating };
}
