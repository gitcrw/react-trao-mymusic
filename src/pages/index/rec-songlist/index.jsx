import { View, Text, Image, Button } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { Component } from "react";
import Taro from "@tarojs/taro";
import rec from "./index.scss";
export default class RecSongList extends Component {
  static defaultProps = {
    songlist: []
  };
  handleClick = item => {
    Taro.navigateTo({
      url: `/pages/playlist-detail/playlist-detail?itemId=${item.id}`
    });
  };
  render() {
    const { songlist } = this.props;
    return (
      <View className="RecSongList">
        <View className="home-title">
          <Text className="span">推荐歌单</Text>
          <AtButton className="btn">更多</AtButton>
        </View>
        <View className={`songlist`}>
          {songlist.map((item, index) => (
            <View
              key={index}
              className="songlist-item"
              onClick={() => {
                this.handleClick(item);
              }}
            >
              <View className="cover">
                <Image lazyLoad src={item.picUrl} className="image" />
              </View>
              <Text className="name text-o-2">{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
