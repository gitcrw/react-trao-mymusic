import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

export default class Player extends Component {
  static defaultProps = {
    title: ""
  };
  render() {
    return <View className="Player">player</View>;
  }
}
