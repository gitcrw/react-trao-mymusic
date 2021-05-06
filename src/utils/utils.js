// 转换播放次数
function getPlayNum(params) {
  let number = params.toString();
  if (number.length > 4) {
    let newNumber = number.slice(0, -4);
    return newNumber + '万';
  } else {
    return number;
  }
}
// 补0
function formatZero(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}
// 获取时间
function getSongTime(dt) {
  let s = parseInt((dt % (1000 * 60)) / 1000);
  let m = parseInt(dt / (1000 * 60));
  let ns = formatZero(s, 2);
  let nm = formatZero(m, 2);
  return nm + ':' + ns;
}
// 日期格式化
function dateFormat(str, type) {
  let date = new Date(str);
  let year = date.getFullYear();
  let month = formatZero(date.getMonth() + 1, 2);
  let day = formatZero(date.getDate(), 2);
  let hour = formatZero(date.getHours(), 2);
  let minute = formatZero(date.getMinutes(), 2);
  let seconds = formatZero(date.getSeconds(), 2);
  if (type == 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else if (type == 'YYYY-MM-DD HH:MM:SS') {
    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
  } else if (type == 'MM/DD  HH:MM:SS') {
    return `${month}/${day} ${hour}:${minute}:${seconds}`;
  }
}
export default {
  getPlayNum,
  getSongTime,
  dateFormat,
};
