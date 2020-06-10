import {observe} from '../observe/index.js'
export function initState(vm){
    const opt = vm.$options
    //获取到用户传入的所有参数 依次执行对应初始化方法
    if(opt.props){
        initProps(vm)
    } 
    if(opt.methods){
        initMethods(vm)
    }
    if(opt.data){
        initData(vm)
    }
}
function initProps(){}
function initMethods(){}
function initData(vm){
    console.log('用户传过来的data',vm.$options.data);
    console.log('这里执行data的初始化');
    //响应式数据原理在这里
    let data = vm.$options.data
    data = vm.$data = typeof data === 'function'?data.call(vm) : data
    observe(data)
}