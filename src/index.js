//入口文件
import {initMixin} from './init.js'
//1.定义入口方法 接收涌入传入参数
function Vue(options){
    console.log('用户传入参数',options);
    // 内部进行初始化的操作
    this._init(options) //初始化操作
}

//2.模块化执行初始化 （这个模块专职初始化操作 --data props ...）
initMixin(Vue)//添加原型的方法
export default Vue