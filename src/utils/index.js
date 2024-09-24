export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

//处理歌手列表拼接歌手名字
export const getName = (list) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

//判断一个对象是否为空对象
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机算法
export function shuffle(arr) {
  let new_arr = [];
  arr.forEach((item) => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song, list) => {
  return list.findIndex((item) => {
    return song.id === item.id;
  });
};

//拼接出歌曲的url链接
export const getSongUrl = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
//除去手机号码的空格符号

export const trimPhone = (val) => val.replace(/(^\s+)|(\s+$)|\s+/g, "");

//处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};
