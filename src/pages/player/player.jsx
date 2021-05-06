import React, { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { AtSlider } from "taro-ui";
import "./player.scss";
import Navbar from "../../components/Navbar/Navbar";
import utils from "../../utils/utils";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

let audio =
  process.env.TARO_ENV == "weapp"
    ? Taro.getBackgroundAudioManager()
    : Taro.createInnerAudioContext();
let timer = null;
@connect(state => state.player, { ...actions })
export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      currentTime: 0,
      showTime: "00:00",
      sliderValue: 0,
      draging: false,
      xzInit: false
      // song: {
      //   album: "可爱的粉丝们想听的！",
      //   duration: 44,
      //   id: 1498967596,
      //   image:
      //     "https://p1.music.126.net/Yp70Ja5mA2g-oFKIIixW4Q==/109951165294853376.jpg",
      //   name: "一吻天荒",
      //   playCount: "",
      //   score: "",
      //   singer: "弋凡",
      //   time: "00:44",
      //   url: "https://music.163.com/song/media/outer/url?id=1498967596.mp3"
      // }
    };
  }
  static defaultProps = {
    title: ""
  };
  getCurrentTime(e) {
    clearTimeout(timer);
    // let { duration } = this.state.song;
    let { duration } = this.props.currentSong;

    let time = (duration / 100) * e;

    audio.seek(time);
    // timer = setTimeout(() => {
    //   this.setState({ draging: false });
    // }, 1500);
    // 没效果
    audio.onSeeked(() => {
      console.log("onSeeked");
      this.setState({ draging: false });
    });
  }
  // 切换模式
  changeMode() {
    let { mode } = this.props;
    let m = mode == "loop" ? "sequence" : "loop";
    this.props.setMode(m);
  }
  // 上一首
  playPrev() {
    this.setState({
      playing: false
    });
    this.playerInit();
    let index = this.props.currentIndex - 1;
    this.props.setCurrentIndex(index);
    setTimeout(() => {
      this.audioInit();
    });
  }
  // 下一首
  playNext() {
    this.setState({
      playing: false
    });
    this.playerInit();
    let index = this.props.currentIndex + 1;
    this.props.setCurrentIndex(index);
    setTimeout(() => {
      console.log(this.props.currentIndex, "n", index);
      this.audioInit();
    });
  }
  // 暂停
  audioPause() {
    this.setState({ playing: false });
    audio.pause();
  }
  // 播放
  audioPlay() {
    this.setState({ playing: true });
    audio.play();
  }
  //播放结束
  audioPlayEnd() {
    this.setState({ playing: false });
    if (this.props.mode == "loop") {
      // 单曲循环
      this.audioInit();
    } else {
      // 列表
      this.playNext();
    }
  }
  //audio初始化
  audioInit() {
    this.setBackground();
    process.env.TARO_ENV == "weapp" && this.setState({ playing: true });
    const { name, image, url, singer } = this.props.currentSong;
    // const { name, image, url, singer } = this.state.song;
    audio.title = name;
    audio.epname = name;
    audio.singer = singer;
    audio.coverImgUrl = image;
    audio.src = url;
    audio.onEnded(() => {
      this.audioPlayEnd();
    });
    audio.onTimeUpdate(e => {
      let showTime = utils.getSongTime(audio.currentTime * 1000);
      let { draging } = this.state;
      console.log(draging);

      this.setState({
        currentTime: audio.currentTime,
        showTime
      });
      // console.log(draging, process);
      let sliderValue = (audio.currentTime / audio.duration) * 100;
      draging !== true &&
        this.setState({
          sliderValue: isNaN(sliderValue) ? 0 : sliderValue
        });
      // console.log(audio.currentTime);
    });
    this.setState({
      xzInit: false
    });
    setTimeout(() => {
      this.setState({
        xzInit: true
      });
    });
  }
  playerInit() {
    this.setState({
      currentTime: 0,
      showTime: "00:00",
      sliderValue: 0,
      draging: false
    });
  }
  onProcessChange(e) {
    this.setState({ sliderValue: e });
    this.getCurrentTime(e);
  }
  onProcessChangeing(e) {
    this.setState({ sliderValue: e });
  }
  touchstart() {
    this.setState({ draging: true });
  }
  setBackground() {
    let bg = document.getElementsByClassName("player-bg")[0];
    const { image } = this.props.currentSong;
    bg.style.background = `url("${image}?param=100y100") no-repeat`;
  }
  componentDidMount() {
    this.audioInit();
  }
  componentWillMount() {}
  render() {
    const { playing, sliderValue, showTime, xzInit } = this.state;
    const song = this.props.currentSong;
    const mode = this.props.mode;
    let animation = {
      animation: "turn 15s linear infinite"
    };

    // const song = this.state.song;

    console.log(this);
    // console.log(this.props.currentIndex, "n");
    //
    return (
      <View className="Player">
        {process.env.TARO_ENV == "weapp" && (
          <Navbar title={song.name} back={true} />
        )}
        <View className="player-bg"></View>
        <View>
          <View className="cover">
            <View
              className={`cd ${playing ? "xz" : "zt"} `}
              style={xzInit && song.image && animation}
            >
              <Image
                src={song.image + "?param=300y300"}
                className="image"
              ></Image>
            </View>
          </View>
        </View>
        <View className="player-bar">
          <View className="process" onTouchStart={this.touchstart.bind(this)}>
            <Text className="time">{showTime}</Text>
            <AtSlider
              className="slider"
              blockSize={12}
              blockColor="#c82519"
              activeColor="#c82519"
              value={sliderValue}
              onChange={this.onProcessChange.bind(this)}
              onChanging={this.onProcessChangeing.bind(this)}
            ></AtSlider>
            <Text className="time">{song.time}</Text>
          </View>
          <View className="crontal">
            <View className="l">
              <Text
                onClick={this.changeMode.bind(this)}
                className={
                  mode == "loop"
                    ? "icon iconfont icon-danquxunhuan"
                    : "icon iconfont icon-liebiaoxunhuan"
                }
              ></Text>
            </View>
            <View className="c">
              <Text
                onClick={this.playPrev.bind(this)}
                className=" iconfont icon-shangyiqu icon"
              ></Text>
              {playing ? (
                <Text
                  onClick={this.audioPause.bind(this)}
                  className="iconfont icon-bofangzhong icon1"
                ></Text>
              ) : (
                <Text
                  onClick={this.audioPlay.bind(this)}
                  className="iconfont icon-zanting icon1"
                ></Text>
              )}
              <Text
                onClick={this.playNext.bind(this)}
                className="iconfont icon-xiayiqu icon"
              ></Text>
            </View>
            <View className="r">
              <Text className="icon iconfont icon-bofangliebiao"></Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
