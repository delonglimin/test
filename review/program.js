/**
 * 万般皆是命 半点不由人，尘世人皆苦，唯有人自渡
 * 最有难度的项目：区块链，综合性项目 外教
 * 最有成就感的项目：rs232串口通信娃娃机
 * 全局视角，优化建议：在线教师 课件复原，产品复原一个，实现成类似chrome的恢复
 * csrf:只接受json数据，不接受form，ajax跨域，http refer，随机token验证
 * 自我介绍：面试官你好，7年工作经验，4年创业经验，主要涉及领域，没有固定技术栈，最近一份工作在好未来，主要负责在线课堂，技术栈vue，以上是我的个人介绍，面试官,
 * 优点：在技术上：（有着偏全栈的技术体系）（比前端偏全栈一些  比全栈篇前端一些，）有多次0到1开发经验，在软性素质上：创业经历让我有了稍微还不错的沟通协调能力
 * 缺点：在技术上，算法一直很差，（做的项目大都偏工程，在深度上也欠缺不少），软性素质上：不是一个特别强势的人，我会很容易妥协，
 * 最难的项目：新外教
 * for in更适合遍历对象，遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性
 * for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值 不要使用for in遍历数组。
 * nodejs 事件循环机制：先说整体架构，再说lubuv的6大阶段：每个阶段执行全部微任务
 *  timers、io 、idle prepar、poll、check、close（主要timers、poll、check：setImmediate）
 * Promise.then Object.observe MutationObserver process.nextTick
 * 前端性能优化：请求和相应、渲染优化（渲染路径、js执行优化、计算样式优化）资源加载优化（图片延迟、压缩）
 * 
 * amd 和 cmd 的区别，commonjs，esmodule
 * 函数柯力化
 * symbol
 * nodejs 模块加载过程，exports 和 module.exports的区别，
 * 先转化为绝对路径，如果有缓存，读缓存，没有，就创建一个new Module,并缓存起来，取出模块后缀，如果是json直接复制给exoprts 返回，。查找顺序，内置模块-当前文件夹nodemodules，上级文件夹nodemodules
 * exoprts 是mudole.export的引用，如果直接修改了指向之后，就导不出所要的东西，默认是{}
 * 个人规划
 * 如何做技术管理：首先是心态转换，从运动员到教练，有级别更高的手下，（从自己 和对方的角度出发）从共赢的角度聊，
 * 从做事到做人，别人为什么听你的，不听怎么办，从双赢的角度去聊，提高团队的离职成本
 * 从提升自己技术到业务思维，
 * 项目介绍：工程角度，和业务角度，技术角度
 * 
 * babel 插件 ：只转译语法，解析 转换 生成，visitor属性，比如把变量a 替换成b ，转换成按需打包等
 * export  default  function({ types: t }) {
   return {
     visitor: {
      VariableDeclarator(path, state) {
         if (path.node.id.name ==  'a') {
          path.node.id = t.identifier( 'b')
        }
 */
///**************************************************** */
/**
 * 只能new
 * cache方法（闭包）
 * 确保函数执行一次（闭包）
 * webpack性能优化：（打包时间优化、打包大小优化）
 * 优化loader test逻辑（文件搜索范围）、babel转译缓存、
 * happypack  同步转并列执行、DllPlugin 特定的类库提前打包然后引入、
 * treeShaking
 * 
 * diff
 *  old 有子节点  new 没有
 * old 没有 new 有
 * 都只有文本
 * 都有子节点 updateChildren（首尾指针法）（移动还是删除 新建，key的作用）
 * 微服务
 * iframe问题：内存占用、状态共享、资源重复加载
 * 通信：自定义事件、自上而下传递回调和属性、使用地址栏
 * vuex原理：如何响应式 内部new vue实例，拦截store
 * 
 * http2
 * 1.0 请求响应断开 1.1：keep-alive请求响应请求响应 之后pipline 请求请求请求响应响应响应（排队响应，谁先到达服务器，谁先响应）
 * 问题：每次大量请求头：头部压缩HPACK
 * 文本格式         二进制格式：更易解析和扩展
 * 队头堵塞：前面的请求服务器在接收响应时，要求必须按照发送请求的顺序返回。若第一个请求被堵塞了，则后面的请求即使处理完毕了，也需要等待
 *          多路复用；有序号：相对于接受端和服务端，如果并发a、b、c，服务端处理a比较慢，他不能先返回b、c，只能按照abc顺序返回，因为返回了，浏览器不知道是哪个响应，就乱了
 * 单向请求，只能由客户端发起。 服务端推送
 * 请求报文与响应报文首部信息冗余量大
 * 数据未压缩，导致数据的传输量大
 * 
 * v-model 
 * 你们想招一个什么样的人
 * 你对公司的评价 或者工作体验
 * 您对我的评价
 * 
 * css 会阻塞js的加载和执行，js会阻塞dom解析和渲染，css加载不会阻塞dom解析
 * 
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
    Function.prototype.bind = function (context,...args) {
        let fn = this
        return function () {
            fn.apply(context,[...args,...arguments])
        }
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
 * selectSort 选择:从i d到n-1 选择最小的值 放到i的位置
 */
function swap(arr, i, j) {
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t

}
function swap1(arr, i, j) {
    arr[i] = arr[i] ^ arr[j]
    arr[j] = arr[i] ^ arr[j]
    arr[i] = arr[i] ^ arr[j]

}
function selectSort(arr) {
    console.log("start")
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                swap(arr, i, j)
            }
        }
    }
    return arr
}

///**************************************************** */
//除了归并排序NlogN，其他都是N平方
/**
 * 冒泡排序 ：谁大谁往后移动
 */
function popSort(arr) {
    for (let i = arr.length; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
            }
        }
    }
    return arr
}
///**************************************************** */
/**
 * 
 * @param {插入排序}  :分别做到0到1、2、3、n 位置有序,往前对比,抓牌插入
 * @returns 
 */
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
            swap(arr, j, j + 1)
        }
    }
    return arr
}
// console.log(insertSort([3,4,2,1,5,6,2,8,3]))

///**************************************************** */
/**
 * qurSort 二分
 */
///**************************************************** */
/**
 * mergeSort 归并排序
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
 * b.__proto__ => person.prototype => person.prototype.__proto__ =>Object.prototype.__proto__ == >null
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
        }
        timer = setTimeout(() => {
            fn.apply(this, [...arguments])
            timer = null
        }, delay)

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
function throttle1(fn, delay) {
    let flag = true
    return function () {
        if (flag) {
            flag = !flag
            fn.apply(this, arguments)
            setTimeout(() => {
                flag = true
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
    name.replace(/([A-Z])/g, '_$1').toLowerCase()
}
///**************************************************** */
/**
 * promise:为了解决回调深渊
 */

// var p = new Promise(function (resolve, reject) {
//     console.log("start")
//     setTimeout(() => { resolve(1) }, 2000)
// })
// p.then(function (res) {
//     console.log(res)
// }, function (err) { }).then()

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
            _this.onFulfilled.forEach(fn => {
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
MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}
MyPromise.resolve = function (value) {
    return new MyPromise((reslove, reject) => {
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
MyPromise.reject = function (reason) {
    return new MyPromise((resolve))
}
MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        let count = 0
        let result = []
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((res) => {
                count++
                result[i] = res
                if (count == promises.length) {
                    resolve(result)
                }
            }, function (err) {
                reject(err)
            })
        }
    })
}
MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((res) => {
                resolve(res)
            }, function (err) {
                reject(err)
            })
        }
    })
}
// Promise.any
///**************************************************** */

function listNode(val) {
    this.val = val
    this.next = null
}
function list() {
    this.head = null
    this.size = 0
    this.cur = null
}
list.prototype.append = function (node) {
    if (!this.head) {
        this.head = node
    } else {
        this.cur.next = node
    }
    this.cur = node
    this.size++
}

list.prototype.print = function () {
    let cur = this.head
    while (cur) {
        console.log(cur.val)
        cur = cur.next
    }
}
list.prototype.reverse = function () {
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
///**************************************************** */
/**
 * 回文字符串
 */

function testHW(str) {
    let i = 0;
    let j = str.length - 1

    while (i <= j - 1) {
        if (str.charAt(i) == str.charAt(j)) {
            i++;
            j--;
        } else {
            return false
        }
    }
    return true
}
// console.log(testHW("abcncba"))
///**************************************************** */
/**
 * 斐波那契 fn = fn-1 + fn-2
 */
function fbnq(n) {
    if (n <= 2) return 1
    return fbnq(n - 1) + fbnq(n - 2)
}
// console.log(fbnq(8))

///**************************************************** */
//substr 是开始和长度，substring 是开始和结束位置 slice 和substring 差不多 可以使用负数

/**
 * 最长不重复子串
 */
function lengthOfLongestStr(str) {
    let rightIndex = 0;
    let max = 0
    let temp = new Set()
    for (let i = 0; i < str.length; i++) {
        if (i != 0) {
            temp.delete(str.charAt(i - 1))
        }
        while (rightIndex < str.length && !temp.has(str.charAt(rightIndex))) {
            temp.add(str.charAt(rightIndex))
            rightIndex++

        }
        max = Math.max(max, rightIndex - i)
    }
    return max
}
// console.log(lengthOfLongestStr('abccasda'))
/**
 * 
 * @param add(1)(2)(3)=6
 * @returns 
 */
function add2(a) {
    var num = function (b) {
        if (b) { //当后面传入有参数时，继续返回函数
            a = a + b;
            return num;
        } else { //当后面出入无参数时，返回值
            return a;
        }
    }
    num.valueOf = num.toString = function () { console.log(a); return a }
    return num;
}
function add3(){
    let args = [...arguments]
    var sum = function(){
        if(arguments.length!=0){
            args =args.concat([...arguments])
            return sum
        }else{
            return args.reduce((cur,next)=>{return cur+next},0)
        }
    }
    return sum
}
// add3(1,2)(2)

/**
 * flat 数组
 */

function flat(arr, num) {
    if (num > 0) {
        let result = []
        arr.forEach((item) => {
            if (Array.isArray(item)) {
                result = result.concat(arguments.callee(item, num - 1))
                // result = result.concat(flat(item, num--))
            } else {
                result.push(item)
            }
        })
        return result
    } else {
        return arr
    }

}
function flat1(arr, num = 1) {
    return num > 0 ? arr.reduce((cur, next) => {
        return cur.concat(Array.isArray(next) ? flat1(next, num - 1) : next)
    }, []) : arr.slice()
}

/** 
 * 就算reject或者报错，后面的then还会执行，最后的catch，如果前面的then没有rej的callback函数,则会执行，如果有，则不会在走catch
*/
// new Promise((res,rej)=>{
//     rej("rej")
// }).then((val)=>{console.log("val")}).catch((err)=>{console.log("err",err)})
// console.log(flat([1, 2, 3, [4, 5], 6, [7, [8, 9]], 10, [11, [12, 13]]], 2))

/**
 * 单例
 */
function createSingle(fn) {
    let instance
    return function (...args) {

        if (!instance) {
            instance = new fn(...args)
        }
        return instance
    }
}
// function person(name){
//     this.name = name
// }
// var P = createSingle(person)
// var P1 = new P("zhang san")
// var P2 = new P("lisi")
// console.log(P1 == P2,P1,P2)
const str1 = "<html><div>123</div></html>"; // true
const str2 = "<div><div>123</div><div></div></div>"; // true
const str3 = "<html><div>123</html></div>"; // false
/**
 * <html   <div   123</div   </html
 * @param {xml匹配} str 
 */
function checkStr(str) {
    let leftReg = /(\<html)|(\<div)/
    stack = []
    var arr = str.split('>')
    arr.pop()
    for (let i of arr) {
        if (leftReg.test(i)) {
            stack.push(i)
            console.log("push", i)
        } else {
            var top = stack.pop()
            if (/.*(\/div)$/.test(i)) {
                if (top !== '<div') {
                    return false
                }
            }
            if (/.*(\/html)$/.test(i)) {
                if (top !== '<html') {
                    return false
                }
            }
        }

    }
    return stack.length == 0
}
// console.log(checkStr(str1))

/**
 * 括号匹配(){}[] ({[]}) ([)]
 */

function checkKh(str) {
    var leftReg = /[\(\{\[]/
    stack = []
    var arr = str.split('')
    for (let i of arr) {
        if (leftReg.test(i)) {
            stack.push(i)
        } else {
            var top = stack.pop()
            switch (i) {
                case "]":
                    if (top != '[')
                        return false
                    break
                case "}":
                    if (top != '{')
                        return false
                    break
                case ")":
                    if (top != '(')
                        return false
                    break
            }
        }

    }
    return stack.length == 0
}

/**
 * 顺时针输出矩阵
 * 1  2  3  4
 * 5  6  7  8
 * 9 10 11 12
 * 13 14 15 16
 * x 行 y 列
 */
function printMatrix(matrix) {
    let minX = 0, minY = 0, maxX = matrix.length - 1, maxY = matrix.length - 1
    let a = 0
    while (minX <= maxX && minY <= maxY) {
        switch (a) {
            case 0: {//右
                for (let i = minY; i <= maxY; i++) {
                    console.log(matrix[minX][i])
                }
                a = 1
                minX++
                break
            }
            case 1: {//下
                for (let i = minX; i <= maxX; i++) {
                    console.log(matrix[i][maxY])
                }
                a = 2
                maxY--
                break
            }
            case 2: {//左
                for (let i = maxY; i >= minY; i--) {
                    console.log(matrix[maxX][i])
                }
                a = 3
                maxX--
                break
            }
            case 3: {//上
                for (let i = maxX; i >= minX; i--) {
                    console.log(matrix[i][minY])
                }
                a = 0
                minY++
                break
            }
        }
    }
}
// 先补齐长度，目的是：只需处理最后一个进位
function bigAdd(a, b) {
    let maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, 0);
    b = b.padStart(maxLength, 0);
    let t = 0;
    let f = 0;   //"进位"
    let sum = "";
    for (let i = maxLength - 1; i >= 0; i--) {
        t = parseInt(a[i]) + parseInt(b[i]) + f;
        f = Math.floor(t / 10);
        sum = t % 10 + sum;
    }
    if (f == 1) {
        sum = "1" + sum;
    }
    return sum
}
// console.log(bigAdd('9934', '88'))
//正则 需要保留什么信息， 就括号起来
// console.log("15010427490".replace(/(\d{3})\d{4}(\d{4})/g,'$1****$2'))
//task().eat().sleep(2000).eat().sleep(2000)函数
let index = 0
let stack = []
function next() {
    let fn = stack[index]
    index++
    if (typeof fn === 'function') {
        fn()
    }
}
function T(name) {
    stack.push(() => {
        console.log('Hi! This is' + name)
        next()
    })
}
function task(name) {
    return new T(name)
}
T.prototype.sleep = function (delay) {
    stack.push(function () {
        setTimeout(() => {
            console.log('sleep have run end')
            next()
        }, delay)
    })
    return this
}
T.prototype.eat = function () {
    stack.push(function () {
        console.log('eat have run end')
        next()
    })
    return this
}

// task('zhangsan').sleep(1000).eat().sleep(1000).eat()
// next()

function EventEmitter() {
    this.subs = {}
    this.$on = function (eventType, handler) {
        this.subs[eventType] = this.subs[eventType] || []
        this.subs[eventType].push(handler)
    }
    this.$off = function (eventType, callback) {
        let callbacks = this.subs[eventType]
        this.subs[eventType] = callbacks && callbacks.filter(fn => fn !== callback)
        return this
    }
    this.$emit = function (eventType, ...args) {
        if (this.subs[eventType]) {
            this.subs[eventType].forEach(handler => {
                handler.apply(this, [].slice.call(args, 1))
            })
        }
    }
    this.$once = function (eventType, handler) {
        let wrapFanc = (...args) => {
            handler.apply(this, args)
            this.$off(eventType, wrapFanc)
        }
        this.$on(eventType, wrapFanc)
    }
}

/**
 * 并发请求限制
 */
function myFetch(urls, max) {
    let count = 0
    let result = []
    return new Promise((resolve, reject) => {
        while (count < max) {
            next()
        }
        function next() {
            let current = count++;
            url = urls[current]
            fetch(url)
                .then(res => {
                    result[current] = res;
                })
                .catch(err => {
                    result[current] = err;
                })
                .finally(() => {
                    if (current < urls.length) {
                        next();
                    }else{
                        resolve(result)
                    }
                });
        }
    })

}
/**
 * 并发控制函数1,完成一个就 加入一个,最后把result[]返回
 */

 function asyncControl(urls, maxNum) {
    let total = urls.length
    const result = new Array(total).fill(false);
    let cur = 0
    return new Promise((resolve, reject) => {
        while (cur < maxNum) {
            next()
        }
        const next = () => {
            let finishedCount = cur++
            if (finishedCount >= total) {
                !result.includes(false) && resolve(result);
                return
            }
            fetch(urls[finishedCount]).then((res) => {
                result[finishedCount] = res
                next()
                // if (finishedCount < total) {
                //     next();
                //   }
            }).catch((err) => {
                result[finishedCount] = err
                next()
            })
        }
    })

}
/**
 * 并发控制2：相同的请求，fetch1，fetch1，fetch1，只请求一个，有结果就都返回，否则，下一次开始
 */

function asyncControl2(promiseGenerator) {
    let cache = new Map()
    const never = Symbol();
    return async (symbol) => {
        return new Promise((resolve, reject) => {
            let cacheCfg = cache.get(symbol);
            if (cacheCfg) {
                if (cacheCfg.hit !== never) {
                    return resolve(cacheCfg.hit)
                }
                cacheCfg.exector.push({ resolve, reject });
            } else {
                cacheCfg = {
                    hit: never,
                    exector: [{ resolve, reject }],
                }
                cache.set(symbol, cacheCfg)
            }
            const { exector } = cacheCfg;
            if (exector.length === 1) {
                const next = async () => {
                    try {
                        if (!exector.length) return;
                        const response = await promiseGenerator();
                        while (exector.length) { // 清空// 如果成功了，那么直接resolve掉剩余同样的请求
                            exector.shift().resolve(response);
                        }
                        cacheCfg.hit = response;
                    } catch (error) {
                        const { reject } = exector.shift();// 如果失败了 那么这个promise的则为reject
                        reject(error);
                        next(); // 失败重试，降级为串行
                    }
                };
                next();
            }
        })
    }
}
// console.log(allArr([['a', 'b', 'c'], ['d', 'f', 'g']]))

// function getData() {
//     return new Promise((res, rej) => {
//         setTimeout(Math.random() > 0.5 ? res('success') : rej('error'), 1000)
//     })
// }
// let test = asyncControl2(getData)
// test('symbol1')
// test('symbol1')

/**
 * arguments
 */

// function track(...args) {
//     console.log([...arguments].length)
//     console.log(args.length)
// }
/**
 * 数组去重复
 */
function removeRepeatEle(arr){
    // return Array.from(new Set([...arr]))
    let temp ={}
    for(let item of arr){
        if(!temp[item]){
            temp[item]=true
        }
    }
    return Object.keys(temp)
}
console.log(removeRepeatEle([1,2,3,5,4,2,3,1]))


//(a+b)*c+((d-e)+f)
function kuohao(str){
    let index = 0
    let stack = []
    let result = []
    while(index < str.length){
        if(str.charAt(index)=='('){
            stack.push(index)
        }
        if(str.charAt(index)==')') {
            let temp = stack.pop()
            result.push(str.slice(temp+1,index))
        }
        index++
    }
    return result 
}
// public int getHeight(TreeNode root){
//     if(root==null){
//         return 0;
//     }
//     int leftheight=getHeight(root.left);
//     int rightheight=getHeight(root.right);
//     return Math.max(leftheight, rightheight)+1;
// }
