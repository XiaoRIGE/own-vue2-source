*1.环境准备
    1.npm init -y 初始化一个package.json
    2.安装测试开发需要插件（Rollup 是一个 JavaScript 模块打包器,可以将小块代码编译成大块复杂的代码， rollup.js更专注于Javascript类库打包 （开发应用时使用Wwebpack，开发库时使用Rollup））
    3.配置package.json

2.数据双向绑定原理
    1.配置vue入口文件 （执行初始化，传入用户自定义options） index.js
    2.初始化操作 将_init方法挂载到原型 init.js
    3.逐个定义初始化方法 state.js
    4.对数据进行observe观测 通过defineproty 重写对象属性

    5.对数据进行检测时  数据如果是数组 ，需要采用数据劫持的方法，重写原型链实现对数组的监听
    6.如果数组的值是对象，也需要进行observe()

