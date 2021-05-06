import Taro, { request } from "@tarojs/taro";

const BASE_URL = "http://192.168.2.196:3000";

export default function http({ url, method, data }) {
  let header = {};
  if (method == "post") {
    header["content-type"] = "application/json";
    // header["content-type"] = "application/x-www-form-urlencoded";
  }
  return new Promise((resolve, reject) => {
    Taro.request({
      url: BASE_URL + url,
      method,
      header,
      data,
      mode: "cors",
      success: res => {
        resolve(res);
      }
    }).catch(err => {
      console.log(err);
    });
  });
}
