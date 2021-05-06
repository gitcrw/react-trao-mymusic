import { Component } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import Songlist from "./songlist";
import "./playlist-detail.scss";
import { createSong } from "../../model/song";
import Navbar from "../../components/Navbar/Navbar";

export default class PlaylistDetail extends Component {
  constructor() {
    super();
    this.state = {
      songlist: [],
      fixed: false
    };
  }
  setBackground(image) {
    let bg = document.getElementsByClassName("bg-image")[0];
    bg.style.background = `url("${image}?param=100y100") no-repeat`;
  }
  onScroll(e) {
    const { fixed } = this.state;
    let { scrollTop } = e.target;
    if (scrollTop > 150 && fixed == false) {
      this.setState({
        fixed: true
      });
    }
    if (scrollTop <= 150 && fixed) {
      this.setState({
        fixed: false
      });
    }
    console.log(scrollTop, fixed);
  }
  componentWillMount() {
    const {
      router: { params }
    } = getCurrentInstance();
    const { itemId } = params;
    this.getSonglist(itemId);
  }

  componentDidMount() {}

  componentWillUnmount() {
    console.log("det");
  }

  componentDidShow() {}

  componentDidHide() {}

  async getSonglist(id) {
    let res = await Taro.$api.getPlaylistDet(id);
    let ids = [];
    res.data.playlist.trackIds.forEach(e => {
      ids.push(e.id);
    });
    this.setBackground(res.data.playlist.coverImgUrl);
    let { data } = await Taro.$api.getSongDetail(ids);
    let songsArr = [];
    data.songs.forEach(song => {
      songsArr.push(createSong(song));
    });
    let songlist = {
      id,
      detail: res.data.playlist,
      songs: songsArr
    };
    this.setState({
      songlist,
      detail: res.data.playlist
    });
    console.log(this.state.songlist);
  }
  render() {
    const { songlist, detail, fixed } = this.state;
    const style = {
      background: "#000",
      transform: "all 1s"
    };
    console.log(songlist);
    return (
      <ScrollView
        onScroll={this.onScroll.bind(this)}
        style="height:100vh"
        scrollY
      >
        <View className="PlaylistDetail">
          {process.env.TARO_ENV == "weapp" && (
            <Navbar title={"歌单"} back={true} fixedstyle={fixed && style} />
          )}
          <View className="playlist-cover">
            <View className="bg">
              <View className="bg-image"></View>
            </View>
            <Text className="playlist-name text-o-1">
              {detail && detail.name}
            </Text>
            <Image className="image" src={detail && detail.coverImgUrl}></Image>
          </View>
          <View className="playlist">
            <View className="playlist-content">
              {songlist.songs && <Songlist songlist={songlist}></Songlist>}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
