<h1 style="text-align:center">
    Arco Design Web
</h1>

<p style="text-align:center">  
    <img src="https://img.shields.io/badge/-Vue3-02B340?logo=vue.j" alt="Vue3"/>
    <img src="https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" alt="Pinia"/>
    <img src="https://img.shields.io/badge/-ESLint-4b32c3?logo=eslint&logoColor=white" alt="ESLint"/>
    <img src="https://img.shields.io/badge/-Axios-008fc7?logo=axios.js&logoColor=white" alt="Axios"/>
    <img src="https://img.shields.io/badge/-Prettier-ef9421?logo=Prettier&logoColor=white" alt="Prettier">
    <img src="https://img.shields.io/badge/-Less-FF441A?logo=less&logoColor=white" alt="Less">
<p>

<p style="text-align:center">
基于 Arco Design Pro 简化，开箱即用的基础模板。
</p>

## ✨ 特点

- TypeScript - 代码完全使用 TypeScript 书写
- 移除 I18n - 内置国际化多语言解决方案
- 增加注册、登录、忘记密码页面，调整部分页面样式
- Mock - 内置 api 模拟方案，代码即注释，更加仿真线上环境。

## 🌈 目录结构

```sh
├── config                     # vite 配置文件
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 图片、字体等静态资源
│   ├── components             # 全局公用组件
│   ├── config                 # 页面配置信息
│   ├── directive              # 全局指令
│   ├── enums                  # 枚举类
│   ├── hooks                  # 全局 hooks
│   ├── layout                 # 全局 layout
│   ├── mock                   # 项目mock 模拟数据
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── types                  # 全局接口、类型
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.ts                # 入口文件 加载组件 初始化等
│   └── env.d.ts               # 声明文件
├── index.html                 # html模板
├── .eslintrc.js               # eslint配置文件         代码规范检查
├── .prettierrc.js             # prettier配置文件       代码样式检查
├── .stylelintrc.js            # stylelint配置文件      css样式规范
├── babel.config.js            # babel-loader配置文件
├── commitlint.config.js       # commitlint配置文件     仓库提交规范
├── package.json               # package.json
├── package-lock.json          # package-lock.json
└── tsconfig.json              # typescript配置文件
```

## 🪂 项目安装

```sh
# 克隆项目
git clone https://gitee.com/mayingfa/arco-design-web.git

# 进入项目目录
cd arco-design-web

# 安装依赖
yarn install

# 本地开发 启动项目
npm run dev
```

## 🧩 Vue 生态圈

- Vite2 下一代前端开发与构建工具 <https://cn.vitejs.dev>
- Vue3 渐进式 JavaScript 框架 <https://v3.cn.vuejs.org>
- TypeScript 中文手册 <https://typescript.bootcss.com>
- Pinia 下一代 Vuex5 <https://pinia.vuejs.org>
- Vue Router 官网 <https://router.vuejs.org>
- VueRequest 请求库 <https://www.attojs.com>
- Mock 拦截请求模拟数据 <http://mockjs.com>
- Arco Design 组件库 <https://arco.design/vue/docs/start>
