"use client";

import React from "react";
import Link from "next/link";
import Scroll from "@/components/scroll";
import Loading from "@/components/loading";
import { filterIndex } from "@/utils";
import { EnterLoading } from "../../singer/style";
import { List, ListItem, SongList, Container } from "../style";
function Rank(props) {
  const { rankList, loading = false } = props;

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  const renderRankList = (list, global) => {
    return (
      <List globalrank={global}>
        {list.map((item, index) => {
          return (
            <Link
              key={`${item.coverImgId}${index}`}
              href={`/home/rank/${item.id}`}
            >
              <ListItem tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">
                    {item.updateFrequency}
                  </span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            </Link>
          );
        })}
      </List>
    );
  };

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);
  let displayStyle = loading ? { display: "none" } : { display: "" };
  return (
    <Container>
      <Scroll direction={"vertical"} refresh={true}>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
    </Container>
  );
}

export default React.memo(Rank);
