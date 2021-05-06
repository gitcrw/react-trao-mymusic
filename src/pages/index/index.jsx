import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Tabs from "./tabs";
import RecSonglist from "./rec-songlist";
import Toplist from "./toplist";
import { Swiper, SwiperItem } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import Taro from "@tarojs/taro";

import "./index.scss";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      recSonglist: [],
      banners: [],
      toplist: []
    };
  }
  onChange(value) {
    this.setState({
      value: value
    });
  }
  onActionClick() {
    this.props.dispatch(setName("xxx"));
    console.log("开始搜索", this);
  }
  async getBanner() {
    let res = await Taro.$api.getIndexBanner();
    this.setState({
      banners: res.data.banners
    });
  }
  async getRecSongList() {
    let res = await Taro.$api.getRecSongList(8);
    this.setState({
      recSonglist: res.data.result
    });
  }
  async getTopList() {
    let res = await Taro.$api.getTopList();
    let toplistArr = res.data.list.slice(0, 4);
    toplistArr.forEach(toplist => {
      this.getPlaylistDet(toplist.id);
    });
  }
  async getPlaylistDet(id) {
    let res = await Taro.$api.getPlaylistDet(id);
    let ids = [];
    res.data.privileges.slice(0, 3).forEach(e => {
      ids.push(e.id);
    });
    let data = await this.getSongDetail(ids);
    let toplist = {
      id,
      name: res.data.playlist.name,
      songlist: data.songs
    };
    this.setState({
      toplist: [...this.state.toplist, toplist]
    });
    console.log(1);
  }
  async getSongDetail(ids) {
    let res = await Taro.$api.getSongDetail(ids);
    return res.data;
  }

  componentWillMount() {
    this.getBanner();
    this.getRecSongList();
    this.getTopList();
    console.log(this, "index");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { banners, recSonglist, value, toplist } = this.state;
    return (
      <View className="index">
        <View className="index-nav-bg">
          {process.env.TARO_ENV == "weapp" && <Navbar title="首页" />}
          <AtSearchBar
            className="search-bar"
            actionName="搜索"
            value={value}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
          <Swiper
            className="banner"
            indicatorColor="#999"
            indicatorActiveColor="#333"
            circular
            indicatorDots
            autoplay
          >
            {banners.map((banner, index) => (
              <SwiperItem key={index}>
                <View className="banner-item">
                  <Image
                    className="image"
                    src={banner.imageUrl}
                    alt=""
                    mode="aspectFit"
                  />
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className="content">
          <Tabs></Tabs>
          <RecSonglist songlist={recSonglist}></RecSonglist>
          <Toplist toplist={toplist}></Toplist>
        </View>
      </View>
    );
  }
}
