import React, { Component } from "react";

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateList: [1.0, 1.25, 1.5, 2.0],
            playRate: 1.0,
            isPlay: false,
            isMuted: false,
            volume: 100,
            allTime: 0,
            currentTime: 0,
        };
    }

    componentDidMount() { }

    formatSecond(time) {
        const second = Math.floor(time % 60);
        let minite = Math.floor(time / 60);
        return `${minite}:${second >= 10 ? second : `0${second}`}`;
    }

    // 该视频已准备好开始播放
    onCanPlay = () => {
        const { id } = this.props;
        const audio = document.getElementById(`audio${id}`);
        this.setState({
            allTime: audio.duration,
        });
    };

    playAudio = () => {
        const { id } = this.props;
        const audio = document.getElementById(`audio${id}`);
        audio.play();
        this.setState({
            isPlay: true,
        });
    };

    pauseAudio = () => {
        const { id } = this.props;
        const audio = document.getElementById(`audio${id}`);
        audio.pause();
        this.setState({
            isPlay: false,
        });
    };

    onMuteAudio = () => {
        const { id } = this.props;
        const audio = document.getElementById(`audio${id}`);
        this.setState({
            isMuted: !audio.muted,
        });
        audio.muted = !audio.muted;
    };

    changeTime = (e) => {
        const { value } = e.target;
        const { id } = this.props;
        const audio = document.getElementById(`audio${id}`);
        this.setState({
            currentTime: value,
        });
        audio.currentTime = value;
        if (value === audio.duration) {
            this.setState({
                isPlay: false,
            });
        }
    };

    // 当前播放位置改变时执行
    onTimeUpdate = () => {
        const { id } = this.props;
        const audio = document.getElementById(`audio${id}`);

        this.setState({
            currentTime: audio.currentTime,
        });
        if (audio.currentTime === audio.duration) {
            this.setState({
                isPlay: false,
            });
        }
    };

    changeVolume = (e) => {
        const { value } = e.target;
        const { id } = this.props;
        const audio = document.getElementById(`audio${id}`);
        audio.volume = value / 100;

        this.setState({
            volume: value,
            isMuted: !value,
        });
    };

    // 倍速播放
    changePlayRate = (num) => {
        this.audioDom.playbackRate = num;
        this.setState({
            playRate: num,
        });
    };

    render() {
        const { src, id, isFullScreen } = this.props;

        const {
            isPlay,
            isMuted,
            volume,
            allTime,
            currentTime,
            rateList,
            playRate,
        } = this.state;

        return (
            <div class="flex items-center justify-center">
                {/* Prev */}
                <div class="m-3">
                    <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">

                        <svg class="rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                        <span class="ml-2">上一个</span>
                    </button>
                </div>
                {/* 播放键 */}
                <div class="m-3">
                    <button onClick={isPlay ? this.pauseAudio : this.playAudio}
                        class="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        {isPlay ? (<span class="mr-2">暂停</span>) : (<span class="mr-2">开始</span>)}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                    </button>
                </div>
                {/* next */}
                <div class="m-3">
                    <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-yellow-500 hover:border-yellow-600 hover:bg-yellow-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                        <span class="mr-2">下一个</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                    </button>
                </div>
                {/* 进度条 */}
                <div>
                    <span>
                        {this.formatSecond(currentTime) + "/" + this.formatSecond(allTime)}
                    </span>
                    <input
                        type="range"
                        step="0.01"
                        max={allTime}
                        value={currentTime}
                        onChange={this.changeTime}
                    />
                </div>

            </div >
        );
        return (
            <div>
                <audio
                    id={`audio${id}`}
                    src={src}
                    ref={(audio) => {
                        this.audioDom = audio;
                    }}
                    preload={"auto"}
                    onCanPlay={this.onCanPlay}
                    onTimeUpdate={this.onTimeUpdate}
                >
                    <track src={src} kind="captions" />
                </audio>

                {isPlay ? (
                    <div onClick={this.pauseAudio}>暂停</div>
                ) : (
                    <div onClick={this.playAudio}>播放</div>
                )}

                <div>
                    <span>
                        {this.formatSecond(currentTime) + "/" + this.formatSecond(allTime)}
                    </span>
                    <input
                        type="range"
                        step="0.01"
                        max={allTime}
                        value={currentTime}
                        onChange={this.changeTime}
                    />
                </div>

                <div onClick={this.onMuteAudio}>静音</div>

                <div>
                    <span>音量调节：</span>
                    <input
                        type="range"
                        onChange={this.changeVolume}
                        value={isMuted ? 0 : volume}
                    />
                </div>

                <div>
                    <span>倍速播放：</span>
                    {rateList &&
                        rateList.length > 0 &&
                        rateList.map((item) => (
                            <button
                                key={item}
                                style={
                                    playRate === item
                                        ? {
                                            border: "1px solid #188eff",
                                            color: "#188eff",
                                        }
                                        : null
                                }
                                onClick={() => this.changePlayRate(item)}
                            >
                                {item}
                            </button>
                        ))}
                </div>
            </div>
        );
    }
}

export default AudioPlayer;