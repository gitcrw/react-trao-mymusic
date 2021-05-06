import { Component } from "react";

import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";
export default class Toplist extends Component {
  static defaultProps = {
    toplist: []
  };
  render() {
    const { toplist } = this.props;
    if (toplist.length < 4) {
      return false;
    }
    const getArt = ar => {
      let str = "-";
      ar.forEach(item => {
        str += item.name + "/";
      });
      console.log(ar, str);
      return str.slice(0, -1);
    };
    console.log(toplist);
    return (
      <View className="Toplist">
        <View className="home-title">
          <Text className="span">排行榜</Text>
          <AtButton className="btn">更多</AtButton>
        </View>
        <Swiper
          ref="swiper"
          className="swiper"
          circular={false}
          nextMargin="40px"
        >
          {toplist.map(item => (
            <SwiperItem key={item.id}>
              <View className="swiper-item">
                <View className="swiper-item-title">{item.name}</View>
                <View className="swiper-item-content">
                  {item.songlist.map((song, index) => (
                    <View key={song.id} className="song-item">
                      <Image
                        src={song.al.picUrl + "?param=120y120"}
                        className="image"
                      />
                      <View className="flex-a-c">
                        <Text className="index">{index + 1}</Text>
                        <Text className="name text-o-1">{song.name}</Text>
                        <Text className="art text-o-1">{getArt(song.ar)}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    );
  }
}
