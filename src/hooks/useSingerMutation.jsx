import useSWRMutation from "swr/mutation";
import { useSelector, useDispatch } from "react-redux";
import { API_BASE_URL } from "@/api/config";
import {
  changeSingerList,
  changePullUpLoading,
  changePullDownLoading,
  changeEnterLoading,
  changeListOffset,
} from "@/store/slices/singers";
export default function useSingerMutation() {
  const data = useSelector((state) => state.singers.singerDes);
  const { singerList } = data;
  const dispatch = useDispatch();
  const fetcher = (url, { arg }) => {
    url += `?cat=${arg.category}&initial=${arg.alpha.toLowerCase()}&offset=${
      arg.offset
    }`;
    return fetch(url).then((res) => res.json());
  };
  const { trigger, isMutating } = useSWRMutation(
    `${API_BASE_URL}/artist/list`,
    fetcher
  );

  const changeSinger = async (category = "", alpha = "", offset = "") => {
    const data = await trigger({
      category,
      alpha,
      offset,
    });
    let _data = data?.artists || [];
    dispatch(changeSingerList(_data));
    dispatch(changePullDownLoading(false));
    dispatch(changeEnterLoading(false));
    dispatch(changeListOffset(_data.length));
  };

  const loadMoreSinger = async (category = "", alpha = "", offset = "") => {
    const data = await trigger({
      category,
      alpha,
      offset,
    });
    let _data = data?.artists || [];
    _data = [...singerList, ..._data];
    dispatch(changeSingerList(_data));
    dispatch(changePullUpLoading(false));
    dispatch(changeListOffset(_data.length));
  };
  // isMutating: 远程数据变更是否正在进行
  return { changeSinger, loadMoreSinger, isMutating };
}
