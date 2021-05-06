import { Component } from "react";
import Taro from "@tarojs/taro";
// import Taro, { Component } from "@tarojs/taro";
import { Provider } from "react-redux";
import "taro-ui/dist/style/index.scss";
import "./assets/css/common.scss";
import "./app.scss";
import "./assets/iconfont/iconfont.css";
// import "default-passive-events";
import apis from "./apis";
import store from "./store";
Taro.$api = apis;

// 设置全局状态栏高度
process.env.TARO_ENV == "weapp" &&
  Taro.getSystemInfo().then(res => {
    let BoundingRect = Taro.getMenuButtonBoundingClientRect();
    let height =
      (BoundingRect.top - res.statusBarHeight) * 2 + BoundingRect.height;
    Taro.$navBar = {
      top: res.statusBarHeight || 0,
      right: res.screenWidth - BoundingRect.left,
      height,
      width: BoundingRect.left
    };
    console.log(Taro.$navBar);
  });

class App extends Component {
  componentDidMount() {
    console.log(Taro);
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
