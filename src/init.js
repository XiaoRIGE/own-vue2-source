import { initState } from './state.js'
export function initMixin(Vue){
    // 3.将初始化方法挂载到原型上
    Vue.prototype._init = function(options){
        const vm = this
        vm.$options = options //另存用户传入的参数
        //4.对具体属性进行初始化
        initState(vm) //初始化状态
    }
}