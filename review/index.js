/**
 * 最有难度的项目：区块链
 * 最有成就感的项目：rs232串口通信娃娃机
 * 
 */
///**************************************************** */
/**
 * 只能new
 * cache方法（闭包）
 * 确保函数执行一次（闭包）
 */

/**
 * 
 * @param {数字转千分位} val 
 * @returns 
 */
function numToMoney(val) {
    let temp = val.split('')
    var cur = 1
    var result = ''
    while (cur <= temp.length) {
        result = temp[temp.length - cur] + result
        if (cur % 3 == 0 && cur != temp.length) {
            result = ',' + result
        }
        cur++
    }
    return '$' + result
}
function numToMoney1(val) {
    return val.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
        return s + ','
    })
}
// var test = numToMoney1('12345')
// console.log(test)
///**************************************************** */
/**
 * 装饰器，分方法和class
 * A = decorator(A) || A
 */
function decorator(func) {
    return function () {
        console.log("pre")
        var result = func.apply(this, [...arguments])
        console.log("after")
        return result
    }
}
function needDec(name, age) {
    console.log(name, age)
    return name
}
// var result = decorator(needDec)('name','age')
// console.log(result)

///**************************************************** */
/**
 * ...扩展运算符
 * 对象的扩展（相当于object.assign）和数组的扩展(将数组转换为参数 add(...[1,2]))
 * 1.扩展运算符是用来取出对象中可遍历的属性，拷贝到当前对象
 * 2.扩展运算符和解构赋值 const {a,b}={a:1,b;1}
 */

///**************************************************** */

/**
 * 数组 shift 第一项 pop 最后一项  splice 开始，多少，元素，删除 添加 元素 slice 开始结束 返回新数组 （map slice ）
 * every some  true false ,reduce:total\cur initial val
 * filter map forEach（全部遍历，不支持break，return，删除自身元素后，自身的index不会重制更新）
 */
///**************************************************** */
/**
 * apply call bind apply:数组，bind 返回函数 func.bind(this)
 * 手写apply
 */
function myApply() {
    Function.prototype.apply = function (context, args) {
        if (typeof this != 'function') {
            throw new TypeError("not a function")
        }
        const fn = Symbol()
        context[fn] = this
        context[fn](...rgs)
        delete context[fn]
    }
}

// func.apply(obj, [])
///**************************************************** */
/**
 * break continue return 
 */
///**************************************************** */
/**
 * popSort 冒泡
 */
///**************************************************** */
/**
 * selectSort 选择
 */
///**************************************************** */
/**
 * qurSort 二分
 */
///**************************************************** */
/**
 * 深拷贝前拷贝,浅拷贝只是针对对象的地址引用复制，主要针对数组和Object
 */
function deployCopy(obj) {
    //不可以拷贝function undefined RegExp 等。类似的还有Object.assign 但是只能复制一层，深层次还是引用类型
    var temp = JSON.stringify(obj)
    var result = JSON.parse(temp)
    return result
}
function deployCopy2(obj) {
    let result
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            result = []
            for (let item in obj) {
                result.push(deployCopy2(item))
            }
        } else if (target == null) {
            return result = null
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            result = {}
            for (let i in obj) {
                result[i] = deployCopy2(obj[i])
            }
        }
    } else {
        result = obj
    }
    return result
}
///**************************************************** */
/**
 * 继承
 * b.__proto__ => person.prototype => person.prototype.__proto__ =>Object.prototype == >null
 * constructor 一般指类的prototype.constructor person.prototype.constrctor === person
 * 静态方法是直接写到person.staticFun
 * 借用原型链 借用构造函数
 */

function person(name) {
    this.name = name
}
person.prototype.say = function () {
    console.log(this.name)
}
function man(name) {
    person.call(this, name)
    // man.prototype = new person(name)
    // man.prototype.constructor = man //重制构造函数
    this.sex = 'mail'
}
man.prototype = new person()
man.prototype.constructor = man //重制构造函数
// man.prototype.__proto__ = person.prototype  //这个时候person的构造方法没执行
// man.prototype.__proto__ = new person()
// var myMan = new man('xiaohong')
// console.log(myMan.sex,myMan.name,myMan.say)
function myNew(func, ...args) {
    //创建一个空对象
    const obj = {}
    //执行构造方法
    func.call(obj, ...args)
    //设置原型链
    obj.__proto__ = func.prototype
    //如果构造函数有返回值，需要把返回值返回，这里省略掉
    return obj
}
//var b = myNew(func,'name')
//var b = new person()

function myInstanceOf(obj, type) {
    let temp = obj
    while (temp) {
        // if(temp.__proto__.constructor == type){
        if (temp.__proto__ == type.prototype) {
            return true
        }
        temp = temp.__proto__
    }
    return false
}
// console.log(myInstanceOf(new man(),person))
///**************************************************** */
/**
 * 原型链
 */
///**************************************************** */
/**
 * 防抖截流
 */

/**
 * 只执行最后一次
 * @param {*} fn 
 * @param {*} time 
 */
function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        } else {
            timer = setTimeout(() => {
                fn.apply(this, [...arguments])
                timer = null
            }, delay)
        }

    }
}
//window.addEventListener('resize',debounce(fn,1000))
/**
 * 每隔多长时间执行一次,缺陷，delay之后才执行
 */
function throttle(fn, dealy) {
    let timer = null
    return function () {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
function throttle1(fn, dealy) {
    let flag = true
    return function () {
        if (flag) {
            flag = !flag
            fn.apply(this, arguments)
            setTimeout(() => {
                flag = false
            }, delay)
        }
    }
}
///**************************************************** */
/**
 * 闭包:函数和 函数内部访问的变量的总和 closure 作用  间接来访问一个变量，不使用全局变量 或者隐藏一个变量
 * 自执行函数写法很多，就是立即执行函数 （fun(){}）() +func(){}()   -func(){}() ~func(){}() !func(){}()
 */
function clusure() {
    let val = ""
    return function () {
        console.log(val)
        return val
    }
}
///**************************************************** */
/**
 * 驼峰 下划线互转
 */
function toHumb(name) {
    name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase()
    })
}
function toLine(name) {
    // name.replace(/[A-Z]/g,function(all){
    //     return '_'+all.toLowerCase()
    // })
    name.replace(/[A-Z]/g, '_$1').toLowerCase()
}
///**************************************************** */
/**
 * promise:为了解决hiu diao
 */

var p = new Promise(function (resolve, reject) {
    console.log("start")
    setTimeout(() => { resolve(1) }, 2000)
})
p.then(function (res) {
    console.log(res)
}, function (err) { }).then()

const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"
function MyPromise(func) {
    var _this = this
    this.state = PENDING
    this.promiseResult = undefined
    this.onFulfilled = []
    this.onRejected = []
    function reslove(value) {
        if (_this.state == PENDING) {
            _this.state = FULFILLED
            _this.promiseResult = value
            _this.onresolved.forEach(fn => {
                fn(value)
            });
        }
    }
    function reject(reason) {
        if (_this.state == PENDING) {
            _this.state = REJECTED
            _this.promiseResult = reason
            _this.onRejected.forEach(fn => {
                fn(reason)
            });
        }
    }
    try {
        func(reslove, reject)
    } catch (e) {
        reject(e)
    }
}
MyPromise.prototype.then = function (onresolved, onrejected) {
    //如果不是函数  指定默认函数
    var _this = this
    if (typeof onresolved !== 'function') {
        onresolved = (value) => { return value }
    }
    if (typeof onrejected !== 'function') {
        onrejected = (reason) => { throw reason }
    }
    function handle(callback, reslove, reject) {
        try {
            let result = callback(_this.promiseResult)
            if (result instanceof MyPromise) {
                result.then((v) => {
                    reslove(v)
                }, (e) => {
                    reject(e)
                })
            } else {
                reslove(result)
            }
        } catch (e) {
            reject(e)
        }

    }

    return new MyPromise((reslove, reject) => {
        if (_this.state == FULFILLED) {
            //因为then的回调是异步执行，把onresolved、onrejected放到异步
            setTimeout(() => {
                handle(onresolved, reslove, reject)
            })


        }
        if (_this.state == REJECTED) {
            setTimeout(() => {
                handle(onrejected, reslove, reject)
            })
        }
        if (_this.state == PENDING) {
            _this.onresolved.push(onresolved => { handle(onresolved, reslove, reject) })
            _this.onrejected.push(onrejected => { handle(onrejected, reslove, reject) })
        }
    })

}
MyPromise.prototype.catch=function(onRejected){
    return this.then(undefined,onRejected)
}
MyPromise.resolve = function(value){
    return new MyPromise((reslove,reject)=>{
        if (result instanceof MyPromise) {
            result.then((v) => {
                reslove(v)
            }, (e) => {
                reject(e)
            })
        } else {
            reslove(result)
        }
    })
}
MyPromise.reject = function(reason){
    return new MyPromise((resolve))
}
MyPromise.all=function(promises){
    return new MyPromise((resolve,reject)=>{
        let count = 0
        let result=[]
        for(let i =0;i<promises.length;i++){
            promises[i].then((res)=>{
                count++
                result[i]=res
                if(count == promises.length){
                    resolve(result)
                }
            },function(err){
                reject(err)
            })
        }
    })
}
MyPromise.race = function(promises){
    return new MyPromise((resolve,reject)=>{
        for(let i =0;i<promises.length;i++){
            promises[i].then((res)=>{
                resolve(res)
            },function(err){
                reject(err)
            })
        }
    })
}
// Promise.any
function listNode(val){
    this.val = val
    this.next = null
}
function list(){
    this.head = null 
    this.size = 0
    this.cur = null
}
list.prototype.append=function(node){
    if(!this.head){
        this.head = node
    }else{
        this.cur.next = node
    }
    this.cur = node
    this.size++
}

list.prototype.print = function(){
    let cur = this.head
    while(cur){
        console.log(cur.val)
        cur = cur.next
    }
}
list.prototype.reverse= function(){
    let prev = null;
    let curr = this.head;
    while (curr !== null) {
        let cnext = curr.next;
        //如果是开头，next等于null，否则就指向前一个
        curr.next = prev === null ? null : prev
        prev = curr;

        curr = cnext;
    }
    this.head = prev
}
// var test = new list()
// test.append(new listNode('a'))
// test.append(new listNode('b'))
// test.append(new listNode('c'))

// test.print()
// test.reverse()
// test.print()

/**
 * 回文字符串
 */

function testHW(str){
    let i = 0;
    let j = str.length-1

    while(i<=j-1){
        if(str.charAt(i) == str.charAt(j)){
            i++;
            j--;
        }else{
            return false
        }
    }
    return true
}
// console.log(testHW("abcncba"))
/**
 * 斐波那契 fn = fn-1 + fn-2
 */
function fbnq(n){
    if(n<=2)return 1
    return fbnq(n-1)+fbnq(n-2)
}
// console.log(fbnq(8))

//除了归并排序NlogN，其他都是N平方
/**
 * 冒泡排序 ：
 */
function popSort(arr){

}

/**
 * 选择排序
 */

function selectSort(arr){

}
console.log(popSort([6,3,6,8,4,2,0,7]))
//substr 是开始和长度，substring 是开始和结束位置 slice 和substring 差不多 可以使用负数

