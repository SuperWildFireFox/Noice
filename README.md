### Installation

```shell
npm install
```

### 启动

以浏览器启动:
```shell
npm start
```

以 electron 客户端启动：
```shell
# 终端1
npm start

# 终端2
npm run electron-start
```

### 打包成 electron 客户端

TODO

### 使用限制
- 目前背景视频和音频虽然可以选择目录，但是由于 chrome 本地文件保护的原因，只能选择项目目录下的文件，请将音频文件放置 `sounds` 目录中，背景视频文件放置 `img` 文件中，再进行选择；
- 暂时无法控制每个白噪音项的播放时长，虽然开放了5分钟及以上的选项，但是都是以音频文件时长为准。
- 建议暂时先使用浏览器端启动。客户端 bug to be fix.