let initState = {
  // 播放状态
  playing: false,
  // 播放列表
  playSongList: [],
  // 当前索引
  currentIndex: 0,
  // 播放模式// (列表循环，单曲，随机/sequence，loop,random)
  mode: "loop",
  // 当前歌曲
  currentSong: {}
};

export const player = (state = initState, action) => {
  switch (action.type) {
    case "setSonglist":
      return {
        ...state,
        playSongList: action.songlist
      };
    case "setCurrentIndex":
      return {
        ...state,
        currentIndex: action.index,
        currentSong: state.playSongList[action.index]
      };
    case "setPlaying":
      return {
        ...state,
        playing: action.playing
      };
    case "setMode":
      return {
        ...state,
        mode: action.mode
      };
    default: {
      return state;
    }
  }
};
