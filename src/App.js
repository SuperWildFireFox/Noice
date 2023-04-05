import React, { useState, useRef, useEffect } from "react";
import Menu from "./components/menu"
import PlayList from "./components/PlayList/PlayList"
import App_Settings from "./components/Setting/AppSettings"
import MainPage from "./components/Main/MainPage";

const MENU_FILTER_MAP = {
  Main: () => true,
  PlayList: (task) => !task.completed,
  Settings: (task) => task.completed,
};
const MENU_FILTER_NAMES = Object.keys(MENU_FILTER_MAP);

export default function App(props) {
  // play index
  let play_index = localStorage.getItem('play_index');
  if (!play_index) {
    localStorage.setItem('play_index', 0);
  } else {
    console.log("play_index : " + play_index);
  }

  // 播放状态
  let play_status = localStorage.getItem('play_status');
  if (!play_status) {
    localStorage.setItem('play_status', 0);
  } else {
    console.log("play_status : " + play_status);
    // localStorage.removeItem('play_status');
  }

  // hooks
  const [menuChoose, setMunuChoose] = useState("Main");
  const [playIndex, setPlayIndex] = useState(localStorage.getItem('play_index'));

  // 上一项
  function preClick(e) {
    let playlen = 0;
    for ( var i in JSON.parse(localStorage.getItem('playList'))){
      playlen ++;
    }
    console.log("playIndex : " + playIndex);
    console.log(playlen);
    console.log(localStorage.getItem('play_index'));
    let tmp_index = parseInt(localStorage.getItem('play_index'), 10);
    console.log(tmp_index);
    tmp_index = (tmp_index + e + playlen) % playlen ;
    console.log(tmp_index);
    localStorage.setItem('play_index', tmp_index);
    setPlayIndex(localStorage.getItem('play_index'));
  }

  // 切换菜单选项
  function changeMunuChoose(change) {
    setMunuChoose(change);
  }

  const menuList = MENU_FILTER_NAMES.map((name) => (
    <Menu
      key={name}
      name={name}
      isPressed={name === menuChoose}
      setMunuChoose={setMunuChoose}
    />
  ));
  const menu = ((menuChoose === "PlayList") ? <PlayList /> :
    menuChoose === "Main" ?
      <MainPage playIndex={playIndex} preClick={preClick}/> :
      <App_Settings />)

  return (
    <div class="min-h-screen flex flex-row bg-gray-100">
      <div class="flex flex-col w-56 bg-slate-100 rounded-r-1xl overflow-hidden">
        <div class="flex items-center justify-center h-20 ">
          <h1 class="text-3xl uppercase text-indigo-500">Noice</h1>
        </div>
        <ul class="flex flex-col py-4">
          {menuList}
        </ul>
      </div>

      {menu}

    </div>
  )
}