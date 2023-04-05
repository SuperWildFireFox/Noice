import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();s

// let DATA = [
//   { id: "todo-0", text: "Eat", completed: true, level: "1" },
//   { id: "todo-1", text: "Sleep", completed: false, level: "2" },
//   { id: "todo-2", text: "Repeat", completed: false, level: "3" }
// ];

// localStorage.removeItem('todo-tasks');
// let sd = localStorage.getItem('todo-tasks');
// if (sd) {
//   console.log(sd);
//   DATA = JSON.parse(sd);
//   console.log("has local data",DATA);
// }else{
//   localStorage.setItem('todo-tasks', JSON.stringify(DATA));
//   console.log("not local data");
// }

let playList =[
  {id: "re-0", title: "雨夜", video_url:"/img/Rain.mp4", audio_src:"/sounds/2-minutes-of-rain-and-thunder-sounds.mp3", all_times:"126", isOriginnal_duration:0},
];
let sd = localStorage.getItem('playList');
if (sd) {
  console.log(sd);
  playList = JSON.parse(sd);
  console.log("has local data",playList);
}else{
  localStorage.setItem('playList', JSON.stringify(playList));
  console.log("not local data");
}

root.render(
  <React.StrictMode>
    <App rendata={playList}/>
  </React.StrictMode>
);

