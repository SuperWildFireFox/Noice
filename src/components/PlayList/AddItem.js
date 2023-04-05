import React, { useState, useEffect } from "react";

export default function AddItem(props) {
    // hooks
    const [nameText, setNameText] = useState("");
    const [video_src, setVideo_src] = useState(null);
    const [audio_src, setAudio_src] = useState(null);
    const [audioPlayTime, setAudioPlayTime] = useState("None");
    const [audiooriginal_duration, setAudioOriginalDuration] = useState("None");

    // 监听 input 事件
    function NameHandleChange(e) {
        setNameText(e.target.value);
        // console.log(e.target.value);
    }
    // 监听 MP4 事件
    function MP4fileNameHandleChange(e) {
        if (e.target.value === "") {
            return;
        }
        const file = e.target.files[0];
        setVideo_src('/img/'+file.name);
        // if (file && file.type.startsWith('video/')) {
        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         setVideo_src(e.target.result);
        //     };
        //     reader.readAsDataURL(file);
        // } else {
        //     setVideo_src(null);
        // }
    }
    // 监听 MP3 事件
    function MP3fileNameHandleChange(e) {
        if (e.target.value === "") {
            return;
        }
        const file = e.target.files[0];
        console.log(file);
        console.log(file.name);
        setAudio_src('/sounds/'+file.name);
        if (file && file.type.startsWith('audio/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const audio = new Audio(text);
                audio.load();
                audio.addEventListener("loadedmetadata",function(_event) {
                    console.log(audio.duration);
                    setAudioOriginalDuration(audio.duration);
                    console.log(audiooriginal_duration);
                });
                
            };
            reader.readAsDataURL(file);
        } else {
            
        }
    }
    // 监听 audioPlayTime 事件
    function PlayTimeHandleChange(e) {
        setAudioPlayTime(e.target.value);
        // console.log(e.target.value);
    }

    // 添加 Item
    function HandleAddItem(e) {
        if (nameText === "" | audio_src === null | video_src === null) {
            return;
        }
        if (audioPlayTime === "None") {
            console.log(audiooriginal_duration);
            props.addItem(nameText, video_src, audio_src, audiooriginal_duration, 1);
        }else{
            props.addItem(nameText, video_src, audio_src, audioPlayTime, 0);
        }
        console.log("Add Item");
        console.log(audioPlayTime);
        // const tempaudio = document.createElement("audio");
        // tempaudio.setAttribute("src", audio_src);
        // console.log(tempaudio);
        // return;
        
        setAudioPlayTime("None");
        setVideo_src(null);
        setAudio_src(null);
        setNameText("");
        props.changeShowAddTemplate(false);
    }
    const addView = (
        <div class=" w-full items-center h-full flex flex-col rounded-xl shadow-lg p-0 ">
            <div class="w-full h-full flex items-center justify-between mt-0">
                <button
                    onClick={props.changeShowAddTemplate.bind(this, true)}
                    class="text-2xl text-center w-full h-full bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2  ">
                    +
                </button>
            </div>
        </div>
    );
    const addTemp = (
        <div class=" w-full items-center h-full flex flex-col rounded-xl shadow-lg p-0 ">
            <div class="container mx-auto">
                <div class="bg-white p-6 rounded-md shadow-md ">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >名称:</label>
                        <input
                            onChange={NameHandleChange}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="请输入名称" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >选择本地视频文件:</label>
                        <input
                            onChange={MP4fileNameHandleChange}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="video" type="file" accept="video/*" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >选择本地MP3文件:</label>
                        <input
                            onChange={MP3fileNameHandleChange}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="audio" type="file" accept="audio/*" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" >选择时长:</label>
                        <select
                            onChange={PlayTimeHandleChange}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="duration">
                            <option value="None">默认音频时长</option>
                            <option value="300">5分钟</option>
                            <option value="600">10分钟</option>
                            <option value="1800">30分钟</option>
                            <option value="3600">1小时</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-between">
                        {/* 取消按钮 */}
                        <button
                            onClick={props.changeShowAddTemplate.bind(this, false)}
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >取消</button>
                        {/* 确认按钮 */}
                        <button
                            onClick={HandleAddItem}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">确认</button>
                    </div>
                </div>
            </div>
        </div>
    );
    return props.showAddTemplate ? addTemp : addView;
}