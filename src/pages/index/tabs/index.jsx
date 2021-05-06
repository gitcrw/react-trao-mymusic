import { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";
export default class Tabs extends Component {
  render() {
    const tabs = [
      { title: "歌单" },
      { title: "排行榜" },
      { title: "歌手" },
      { title: "歌单" },
      { title: "排行榜" },
      { title: "歌手" },
      { title: "歌单" }
    ];
    return (
      <View className="tabs web-font">
        {tabs.map((item, index) => (
          <View key={index} className="tab-item">
            <View className="cover"></View>
            <Text className="title">{item.title}</Text>
          </View>
        ))}
      </View>
    );
  }
}
