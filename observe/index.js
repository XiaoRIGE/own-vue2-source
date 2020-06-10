//响应式数据 
import {isObject} from '../src/utils.js'
import {arrayMethods} from './array.js'
class Observe{
    constructor(data){
        console.log('再构造器内通过defineproperty重写闯入的data',data);

        //通过这个方法可以让data的__ob__变为不可枚举
        Object.defineProperty(data,'__ob__',{
            enumerable:false,//不可枚举
            configurable:false,//不可配置
            value:this
        })
        // data.__ob__ = this;//将内部方法挂载到__ob__属性  那么后面oberse实例中的data就可以通过__ob__属性访问对应方法（这里为了使用observeArray）

        //这里需要考虑值为数组的情况  如果直接对数组索引进行拦截 性能差而且直接更改索引的方式不多
        if(Array.isArray(data)){
            //在vue2.0中通过重写数组方法 在执行数组方法时我们就可以检测到改变 函数劫持
            data.__proto__ = arrayMethods //通过原型链 向上查找的方式 实现重写
        }else{
            //对数据一步一步处理
            this.walk(data)
        }

        
    }
    observeArray(data){
            for(var i =0;i<data.length;i++){
                observe(data[i])
            }
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
            console.log('注意注意，我要在这里设置新值拉！！！！！！！！！！！！！');
            
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