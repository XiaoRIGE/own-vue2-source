let oldArrayMethods = Array.prototype  //获取数组原型上的方法


//创建一个全新的对象 可以找到数组上原型的方法 并且不会影响之前的方法
export let arrayMethods = Object.create(oldArrayMethods)

//找到可以改变数组值的所有方法
let methods =['pop','push','shift','unshift','sort','reverse','splice']


methods.forEach(method=>{
    arrayMethods[method] = function(...args){//函数劫持 AOP
        //当用户调用数组方法时  先执行改造的方法 在执行默认的方法
       let result = oldArrayMethods[methods].apply(this,args)//result 原生方法有返回值 我们需要将对应值返回


        //通过__ob__属性调用父类observeArray方法
        let ob =this.__ob__
        let inserted //数组新增项
        //push unshift splice都可以实现新增数组项
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice (2)
                break;
            default:
                break;
        }
        //如果存在新增数组项 对新值进行observe操作 
        inserted && ob.observeArray(inserted)
        return result
    }
})