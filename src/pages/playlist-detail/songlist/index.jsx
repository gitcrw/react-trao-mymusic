import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import "./index.scss";
import { setSonglist, setCurrentIndex } from "../../../store/actions/actions";
import { connect } from "react-redux";

@connect()
export default class SongList extends Component {
  handleClick = (songlist, index) => {
    console.log(this);
    this.props.dispatch(setSonglist(songlist));
    this.props.dispatch(setCurrentIndex(index));
    Taro.navigateTo({
      url: `/pages/player/player`
    });
  };
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { songlist } = this.props;

    return (
      <View className="SongList">
        {songlist.songs &&
          songlist.songs.map((song, index, songs) => (
            <View
              key={song.id}
              className="song-item flex-a-c"
              onClick={() => {
                this.handleClick(songs, index);
              }}
            >
              <Text className="index">{index + 1}</Text>
              <View className="song-con">
                <View className="song-t">
                  <Text className="name">{song.name}</Text>
                </View>
                <View className="song-b">
                  <Text className="art">{song.singer}</Text>
                </View>
              </View>
            </View>
          ))}
      </View>
    );
  }
}
