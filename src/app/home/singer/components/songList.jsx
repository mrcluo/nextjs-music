import React from "react";
import { getName } from "@/utils";
import { SongList, SongItem } from "../style";

function SongsList(props) {
  const { songs = [] } = props;

  const selectItem = (e, index) => {
    console.log("🚀 ~ selectItem ~ e, index:", e, index);
    // changePlayListDispatch(songs);
    // changeSequecePlayListDispatch(songs);
    // changeCurrentIndexDispatch(index);
    // musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  };
  const renderSongList = () => {
    return (
      <SongItem>
        {songs.map((item, i) => {
          return (
            <li key={item.id} onClick={(e) => selectItem(e, i)}>
              <span className="index">{i + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
                  {item.al ? item.al.name : item.album.name}
                </span>
              </div>
            </li>
          );
        })}
      </SongItem>
    );
  };
  return (
    <SongList showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部 <span className="sum">(共{songs.length}首)</span>
          </span>
        </div>
      </div>
      {renderSongList()}
    </SongList>
  );
}

export default React.memo(SongsList);
