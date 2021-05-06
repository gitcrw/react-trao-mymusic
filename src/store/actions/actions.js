export const setSonglist = songlist => {
  return {
    type: "setSonglist",
    songlist
  };
};
export const setCurrentIndex = index => {
  return {
    type: "setCurrentIndex",
    index
  };
};
export const setPlaying = playing => {
  return {
    type: "setCurrentIndex",
    playing
  };
};

export const setMode = mode => {
  return {
    type: "setMode",
    mode
  };
};
