import http from "./http";

// 首页轮播图
export const getIndexBanner = () => {
  return http({ url: "/banner", method: "get" });
};
// 歌单
export const getRecSongList = (limit = 32) =>
  http({ url: `/personalized`, method: "get", data: { limit } });
//榜单
export const getTopList = () => http({ url: "/toplist", method: "get" });
export const getTopListDet = () =>
  http({ url: "/toplist/detail", method: "get" });
//歌单/榜单详情
export const getPlaylistDet = id => {
  return http({ url: "/playlist/detail", method: "get", data: { id } });
};
//歌曲详情
export const getSongDetail = ids => {
  let timestamp = new Date().valueOf();
  return http({
    url: `/song/detail?timestamp=${timestamp}`,
    method: "post",
    data: { ids: ids.join() }
  });
};
