import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import "taro-ui/dist/style/components/icon.scss";
import "./index.scss";

export default class Navbar extends Component {
  static defaultProps = {
    title: "",
    back: false,
    fixedstyle: ""
  };
  back() {
    Taro.navigateBack();
  }
  render() {
    console.log(this);
    let style = {
      paddingTop: Taro.$navBar.top + "px",
      height: Taro.$navBar.height + "px"
    };
    let { back, title } = this.props;
    return (
      <View>
        <View className="navbar" style={{ ...style, ...this.props.fixedstyle }}>
          {back && (
            <View
              className="at-icon at-icon-chevron-left flex-a-c backicon"
              onClick={this.back.bind(this)}
            ></View>
          )}
          <View className="navbar-content">
            <View className="title text-o-1">{title}</View>
          </View>
        </View>
      </View>
    );
  }
}
