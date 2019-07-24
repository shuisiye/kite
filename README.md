<h1 align="center" style="margin: 30px 0 35px;">Kite</h3>

<h3 align="center" style="margin: 30px 0 35px;">这是一个前台 vue ssr 服务端渲染  + 后台 react spa + 接口层 node koa 的项目</h3>

<p align="center">
<a href="https://github.com/maoxiaoquan/kite/stargazers">
<img src="https://camo.githubusercontent.com/29a8c9e6591608d822b0d6ae203b5791193b031b/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f6d616f7869616f7175616e2f6b6974652e7376673f7374796c653d706f706f75742d737175617265" alt="GitHub stars" data-canonical-src="https://img.shields.io/github/stars/maoxiaoquan/kite.svg?style=popout-square" style="max-width:100%;"></a>
<a href="https://github.com/maoxiaoquan/kite/issues"><img src="https://camo.githubusercontent.com/632a8a79287daf30bbe1080eaabd21e4e148f36b/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732f6d616f7869616f7175616e2f6b6974652e7376673f7374796c653d706f706f75742d737175617265" alt="GitHub issues" data-canonical-src="https://img.shields.io/github/issues/maoxiaoquan/kite.svg?style=popout-square" style="max-width:100%;"></a>
<a href="https://github.com/maoxiaoquan/kite/network"><img src="https://camo.githubusercontent.com/be451bca89325c1fbf2a5efd1271ebbff022de56/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f666f726b732f6d616f7869616f7175616e2f6b6974652e7376673f7374796c653d706f706f75742d737175617265" alt="GitHub forks" data-canonical-src="https://img.shields.io/github/forks/maoxiaoquan/kite.svg?style=popout-square" style="max-width:100%;"></a>
</p>

## ✨ kite

前台演示网站地址： [小随笔 https://www.xiaosuibi.com/](https://www.xiaosuibi.com/ 'xiaosuibi')

后台演示网站地址： [小随笔 https://www.xiaosuibi.com/\_admin](https://www.xiaosuibi.com/_admin 'xiaosuibi')

后台演示网站账户：kitetest 密码：q123456 （资源有点大，可能要加载一段时间）

兼容方面会兼容大部分浏览器，过于古老的将放弃

## 😊 前台界面

<img alt="client" src="https://github.com/maoxiaoquan/kite/blob/master/docs/img/xiaosuibi.png">

## ☂️ 开发规范（以主文件夹开始）

```

vue以及react 开始时涉及的页面级文件夹、无状态组件文件夹、有状态组件文件夹、无状态组件、有状态组件、组件内部的类名、
文件夹内组件（只要是涉及 react 和 vue 的可用组件或者页面级组件） ----- 帕斯卡命名法 或者是 小驼峰 主要是为了提高辨识度

所有页面内变量名、组件内类的方法、文件内类的方法、函数、不属于上面的文件
其他文件夹 例如 src、admin、client、utils 都以小驼峰命名
不太清楚的就都以小驼峰来命名

涉及到以及数据库内查询出来的数据都以下划线分隔 _

index.js、index.vue、index.jsx、index.css、index.scss以 index.* 的文件都是小写单词

vuex action 都以大写开始下划线分隔例如：ARTICLE_COMMENT

admin 文件夹和 server 文件夹 变量多为下划线居多，主要是与mysql直接交互的多，mysql存储字段大部分都为下划线

以后的维护以及改版、开发规范都是如此，

```

## 💼 最新版本更新记录

2019.7.21 0:20:00

v0.10.3

1.优化评论回复

2.修改用户评论消息显示的字体为 14px

3.修改登录 cookie 的失效性为 7 天

4.前台多角色权限判断优化

5.首页移动端样式微调，移动端隐藏封面图片

[版本更新历史记录](https://github.com/maoxiaoquan/kite/blob/master/docs/VERSION.md 'version')

## 📦 Install

```bash

# npm install || cnpm install  安装所有的包，可能有些多，前台和后台是在一起的

打包后台界面 npm run admin-build

打包前台界面 npm run client-build

```

## ⌨️ Start

```bash

# 目前用的数据库只有mysql 本地开发的话，下一个phpstudy即可

初始化：npm run init 然后打开浏览器收入 localhost:8086 按照步骤操作即可

然后可以选择pro 或者 dev 开始


pro 生产环境

pro1.1 在cmd 中输入 npm run server 即可进入程序

pro1.2 (url或者ip)+ :8086端口即可看到客户端主页

pro1.3 (url或者ip)+ :8086/admin端口即可看到客户端后台页面



dev 本地开发环境

dev1.1 在cmd 中输入 npm run server-start 即可进开启接口服务

dev1.2 在cmd 中输入 npm run admin-start 即可进入后台开发预览（地址为：localhost:8083）

dev1.3 在cmd 中输入 npm run client-start 即可进入前台开发预览（地址为：localhost:8081）

dev1.4 开发环境下 一定要先运行dev1.1的情况下再运行 dev1.2 或者 dev1.3

本地开发预览，前端方面还有点问题，需要优化，必须等编译完成才能打开，否则会报错
目前cli部分代码写的比较乱，等后期有时间再继续优化，哈哈
cli 的邮箱一定要填写完成，否则前台无法发送注册的邮件
项目断断续续的写着，主体基本写完，目前就是优化和改bug，代码的逻辑啥的，能看则看，不能看就略过吧，也是自己学习的一个过程，
放心这个代码会一直优化的，已经坚持了很久了，可以看提交，哈哈

```

## 😊 前后台界面

<img alt="admin" src="https://github.com/maoxiaoquan/kite/blob/master/docs/img/xiaosuibi_admin.png">

## 🔨 初始化

<img alt="admin" src="https://github.com/maoxiaoquan/kite/blob/official/docs/img/init.png">

## 📁 目录结构

```
kite/
   |
   ├──admin/                     * 后台页面目录react
   |
   ├──client/                    * 前台ssr文件目录
   │   ├──build                  * vur ssr build 配置文件
   │   ├──config                 * 部分配置文件
   │   ├──public                 * index模版文件
   │   ├──request                * 请求配置文件
   │   ├──server                 * dev 模式下的开始文件
   │   ├──src                    * src ssr 主文件目录
   │   └──static                 * 静态资源目录
   │
   │──config/                    * 部分可配置文件
   │
   │──db/                        * mysql and lowdb
   |
   ├──server/                    * 服务层，所有前台后台接口
   │
   ├──static/                    * 静态资源目录
   |
   ├──views/                     * cli 模版目录
   │
   │──static/                    * 不经编译器处理的静态资源
   │
   │──store/                     * 全局数据状态管理
   │
   │──package.json               * 包信息
   │
   │──.eslintrc                  * Eslint配置
   │
   │──_nodemon.json              * _nodemon配置
   │
   │──.gitignore                 * Git忽略文件配置
   │
   └──pm2.json                   * pm2配置

```

## 👓 说明

使用的技术栈：

前台方面：vue 服务端渲染 + vuex + vue-router + vue-server-renderer

后台方面：react + redux + react-redux + react-router

server: koa + mysql

公共部分：webpack

其他详细的直接看 package.json 就可以了

前台界面目前是用的 vue 的 ssr，但是没有采用 nuxt.js 代码的阅读应该还是可以的，cli 比较乱，后台界面采用的是 react

前台目前比较简单，就是一个多人文章发布系统，用户可以注册账号，发布文章，关注用户，喜欢文章，评论等等

后台管理文章的发布、审核，评论的审核，管理员权限管理，系统配置等等，前后台用户管理员独立

初始化界面是对整个文章发布系统的一个初始化，包括初始管理员角色，mysql 等等

## LICENSE

MIT