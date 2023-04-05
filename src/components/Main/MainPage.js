import React, { useState, useEffect, Component } from "react";
import AudioPlayer from "./AudioPlay";
const rootref = React.createRef();

class MainPage extends Component {
    constructor(props) {
        super(props);
        console.log(props.playIndex);
        const playINFO = JSON.parse(localStorage.getItem('playList'))[props.playIndex];
        console.log('playInfo', JSON.parse(localStorage.getItem('playList'))[props.playIndex].video_url);
        this.state = {
            id: JSON.parse(localStorage.getItem('playList'))[props.playIndex].id,
            title: JSON.parse(localStorage.getItem('playList'))[props.playIndex].title,
            audioSrc: JSON.parse(localStorage.getItem('playList'))[props.playIndex].audio_src,
            videoSrc: JSON.parse(localStorage.getItem('playList'))[props.playIndex].video_url,
            // 是否全屏
            isFullScreen: false,
            isPlaying: false,
            isMuted: false,
            allTime: 0,
            currentTime: 0,
            playControls_visible: true,
        };
    }
    componentDidMount() {
        window.onresize = () => {
            // 全屏
            if (document.fullscreenElement) {
                this.setState({ isFullScreen: true });
            }
            else {
                this.setState({ isFullScreen: false });
            }
        };
        window.addEventListener('mousemove', () => {
            this.setState({ playControls_visible: true });
            clearTimeout(this.hideTimer);
            this.hideTimer = setTimeout(() => {
                this.setState({ playControls_visible: false });
            }, 3000);
        });
    };

    // 展开全屏
    fullScreen = () => {
        if (!this.state.isFullScreen) {
            rootref.current.requestFullscreen();
        }
    }
    // 取消全屏
    exitFullScreen() {
        console.log("exitFullScreen");
        document.exitFullscreen();
    }

    // 进度条计算
    formatSecond(time) {
        const second = Math.floor(time % 60);
        let minite = Math.floor(time / 60);
        return `${minite}:${second >= 10 ? second : `0${second}`}`;
    }

    // 该视频已准备好开始播放
    onCanPlay = () => {
        const id = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].id;
        const audio = document.getElementById(`audio${id}`);
        // audio.duration = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].all_times;
        this.setState({
            allTime: audio.duration,
            // allTime: JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].all_times
        });
        console.log('play_status', localStorage.getItem('play_status'));
        if (parseInt(localStorage.getItem('play_status'))) {
            console.log('play_status true');
            this.playAudio();
        } else {
            console.log('play_status false');
        }
    };
    // 播放
    playAudio = () => {
        const id = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].id;
        const audio = document.getElementById(`audio${id}`);
        audio.play();
        const video = document.getElementById(`video${id}`);
        video.play();
        this.setState({
            isPlaying: true,
        });
        localStorage.setItem('play_status', 1);
    };
    // 暂停
    pauseAudio = () => {
        const id = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].id;
        const audio = document.getElementById(`audio${id}`);
        audio.pause();
        const video = document.getElementById(`video${id}`);
        video.pause();
        this.setState({
            isPlaying: false,
        });
    };

    changeTime = (e) => {
        const { value } = e.target;
        const id = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].id;
        const audio = document.getElementById(`audio${id}`);
        this.setState({
            currentTime: value,
        });
        audio.currentTime = value;
        if (value === audio.duration) {
            this.nextClick();
            this.setState({
                isPlaying: false,
            });
        }
    };

    // 当前播放位置改变时执行
    onTimeUpdate = () => {
        const id = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].id;
        const audio = document.getElementById(`audio${id}`);
        console.log(audio.duration);
        this.setState({
            currentTime: audio.currentTime,
        });
        if (audio.currentTime === audio.duration) {
            this.nextClick();
            this.setState({
                isPlaying: false,
            });
        }
    };

    // 音频播放结束时
    audioEnd = () => {
        console.log("audioEnd");
    };

    // 上一项
    preClick = () => {
        this.pauseAudio();
        this.props.preClick(1);
    };
    // 下一项
    nextClick = () => {
        this.pauseAudio();
        this.props.preClick(-1);
    };

    render() {
        const {
            // id,
            // title,
            // audioSrc,
            // videoSrc,
            isFullScreen,
            isPlaying,
            isMuted,
            allTime,
            currentTime,
            playControls_visible,
        } = this.state;
        // console.log(this.props.playIndex);
        // console.log(audioSrc);
        const id = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].id;
        const title = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].title;
        const audioSrc = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].audio_src;
        const videoSrc = JSON.parse(localStorage.getItem('playList'))[this.props.playIndex].video_url;
        return (
            <div ref={rootref} class="video-box w-full">
                {/* 背景视频 */}
                <video
                    id={`video${id}`}
                    class="video-background" preload="auto" loop playsInline tabIndex="-1"
                    src={videoSrc}
                    muted="muted">

                </video>
                {/* 音频 */}
                <audio
                    id={`audio${id}`}
                    src={audioSrc}
                    ref={(audio) => {
                        this.audioDom = audio;
                    }}
                    preload={"auto"}
                    onCanPlay={this.onCanPlay}
                    onTimeUpdate={this.onTimeUpdate}
                    onEnded={this.audioEnd}
                >
                    <track src={audioSrc} kind="captions" />
                </audio>

                <div class="layer flex flex-col-reverse">
                    <div class="flex items-center justify-center" style={{ display: playControls_visible ? 'block' : 'none' }}>
                        {/* 菜单 */}
                        <div
                            class="flex items-center justify-center">
                            {/* Prev */}
                            <div class="m-3">
                                <button
                                    onClick={this.preClick}
                                    class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">

                                    <svg class="rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                                    </svg>
                                    <span class="ml-2">上一个</span>
                                </button>
                            </div>
                            {/* 播放键 */}
                            <div class="m-3">
                                <button onClick={isPlaying ? this.pauseAudio : this.playAudio}
                                    class="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                                    {isPlaying ? (<span class="mr-2">暂停</span>) : (<span class="mr-2">开始</span>)}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                                    </svg>
                                </button>
                            </div>
                            {/* next */}
                            <div class="m-3">
                                <button
                                    onClick={this.nextClick}
                                    class="bg-white text-gray-800 font-bold rounded border-b-2 border-yellow-500 hover:border-yellow-600 hover:bg-yellow-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
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
                            {
                                isFullScreen ?
                                    <button onClick={this.exitFullScreen}
                                        class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                                    >退出全屏</button> :
                                    <button onClick={this.fullScreen}
                                        class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                                    >全屏</button>
                            }
                        </div >

                    </div>
                    {/* title */}
                    <div class="flex items-center justify-center my-3">
                        <h2 class="text-white text-4xl">
                            {title}
                        </h2>
                    </div>



                </div>
            </div>
        )
    }
}
export default MainPage;