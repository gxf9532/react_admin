##1.下载antd  
antd最新版为4.x版本  为了避免和其它模块冲突 我们暂时采用3.x系列的版本

npm i antd@3.26.0

##2.引入全部样式 
import 'antd/dist/antd.css'

##3.按需加载 
npm i react-app-rewired customize-cra babel-plugin-import

##4.加载配置的模块 根路径下创建 config-overrides.js
const {override, fixBabelImports, addLessLoader} = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#FC1'},
  }),
);

##5.修改package.json  
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },

##6.直接使用antd组件  无需额外引入css 


##7.自定义antd主题
npm i less less-loader@5.0.0  这里安装新版本6.1.0的less-loader会报错 



