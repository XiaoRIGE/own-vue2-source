//响应式数据 
import {isObject} from '../src/utils.js'
class Observe{
    constructor(data){
        console.log('再构造器内通过defineproperty重写闯入的data',data);
        //对数据一步一步处理
        this.walk(data)
    }
    walk(data){
        Object.keys(data).forEach(key=>{
            defineReactive(data,key,data[key])
        })
    }
}
//todo vue2里性能问题 通过递归重写属性的get和set  再3.0通过proxy实现
function defineReactive(data,key,value){
    //递归判断对象某个属性是不是对象，递归出口为 不是对象时  能便利实现给所有属性增加observe监测
    observe(value)
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newValue){
            //新设置值时 值也可能为对象  所以也需要进行observe操作
            observe(newValue)
            if(newValue === value) return
            value = newValue
        }
    })
}

export function observe(data){
    console.log("响应式模块",data)
    //如果这个数据不是对象 或者是Null 就不用监控
    if(!isObject(data)){
        console.log('传入不是对象');
        return
    }
    //对数据通过defineproperty重写
    return new Observe(data)
}