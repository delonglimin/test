webpack编译流程：初始化配置=> 内容编译=> 输出编译后内容

事件驱动型事件流工作机制

负责编译的compiler，负责创建bundles的compilation

tapable本身是一个独立库

- 实例化hook注册事件监听
- 通过hook触发事件监听
- 执行懒编译生成的可执行代码

hook是tapable实例对象(Sync/Async)

- Hook：普通钩子，监听器之间互不影响
- BailHook： 熔断钩子，某个监听返回非undefined时后续不执行
- WaterfallHook：瀑布钩子，上一个监听的返回值可以传递给下一个
- LoopHook：循环钩子，如果当前未返回false则一直执行 //这个没有异步的

异步的还有两个并行钩子

- AsyncParalleHook
- AsyncParalleBailHook

```js
// 同步SyncHook
const { SyncHook } = require('tapable')
// 实例化hook注册事件监听
let hook = new SyncHook(['name', 'age'])
hook.tap('fn1', function (name, age) {
    console.log('fn1>>>>>>', name, age)
})
// 通过hook触发事件监听
hook.call('zoe', 18) // fn1>>>>>> zoe 18
```

```js
// 异步AsyncParallelHook
const { AsyncParallelHook } = require('tapable')

let hook = new AsyncParallelHook(['name'])

// 对于异步钩子的使用，在添加事件监听时会存在三种方式： tap tapAsync tapPromise
// ------------- tap -------------
hook.tap('fn1', function (name) {
  console.log('fn1--->', name)
})

hook.callAsync('zoe', function () {
  console.log('最后执行了回调操作')
})
// ------------- tapAsync -------------
console.time('time')
hook.tapAsync('fn1', function (name, callback) { // 这玩意待回调的
  setTimeout(() => {
    console.log('fn1--->', name)
    callback() // 不写callback()后面没发执行回调了
  }, 1000)
})

hook.tapAsync('fn2', function (name, callback) {
  setTimeout(() => {
    console.log('fn2--->', name)
    callback()
  }, 2000)
})

hook.callAsync('lg', function () {
  console.log('最后一个回调执行了')
  console.timeEnd('time')
})

// ------------- tapPromise -------------
console.time('time')
hook.tapPromise('fn1', function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log('fn1--->', name)
      resolve()
    }, 1000)
  })
})

hook.tapPromise('fn2', function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log('fn2--->', name)
      resolve()
    }, 2000)
  })
})

hook.promise('foo').then(() => { // 这里就是promise了
  console.log('end执行了')
  console.timeEnd('time')
})
```

```js
// 异步AsyncParallelBailHook
const { AsyncParallelBailHook } = require('tapable')

let hook = new AsyncParallelBailHook(['name'])

console.time('time')
hook.tapAsync('fn1', function (name, callback) {
  setTimeout(() => {
    console.log('fn1--->', name)
    callback()
  }, 1000)
})

hook.tapAsync('fn2', function (name, callback) {
  setTimeout(() => {
    console.log('fn2--->', name)
    callback('err') // 错误优先，加了这玩意就是1 2 time 3 3是因为有个settimeout
  }, 2000)
})

hook.tapAsync('fn3', function (name, callback) {
  setTimeout(() => {
    console.log('fn3--->', name)
    callback()
  }, 3000)
})

hook.callAsync('zce', function () {
  console.log('最后的回调执行了')
  console.timeEnd('time')
})
```

## Hook手写（Sync/AsyncParalleHook）

```js
/**
 * 01 实例化 hook
 * 02 实例调用 tap  taps = [{}, {}]
 * 03 调用 call 方法， HookCodeFactory setup create
 * 04 Hook SyncHook HookCodeFactory
 */
```

```js
// usehook.js call调用
const SyncHook = require('./SyncHook')

let hook = new SyncHook(['name', 'age'])

hook.tap('fn1', function (name, age) {
  console.log('fn1-->', name, age)
})

hook.tap('fn2', function (name, age) {
  console.log('fn2-->', name, age)
})

hook.call('zoe66', 18)
```

```js
// syncHook.js compile调用工厂函数的setup和create
let Hook = require('./Hook')

class HookCodeFactory {
  args() {
    return this.options.args.join(',')  // ["name", "age"]===> name, age
  }
  head() {
    return `var _x = this._x;`
  }
  content() {
    let code = ``
    for (var i = 0; i < this.options.taps.length; i++) {
      code += `var _fn${i} = _x[${i}];_fn${i}(${this.args()});`
      }
      console.log(code, '-----')
    return code
  }
  setup(instance, options) {  // 先准备后续需要使用到的数据
    this.options = options  // 这里的操作在源码中是通过 init 方法实现，而我们当前是直接挂在了 this 身上
    instance._x = options.taps.map(o => o.fn)   // this._x = [f1, f2, ....]
  }
  create() { // 核心就是创建一段可执行的代码体然后返回
    let fn
    // fn = new Function("name, age", "var _x = this._x, var _fn0 = _x[0]; _fn0(name, age);")
    fn = new Function(
      this.args(),
      this.head() + this.content()
    )
    return fn
  }
}

let factory = new HookCodeFactory()

class SyncHook extends Hook {
  constructor(args) {
    super(args)
  }

  compile(options) {  // {taps: [{}, {}], args: [name, age]}
    factory.setup(this, options)
    return factory.create(options)
  }
}

module.exports = SyncHook

```

```js
// hook.js taps保存对象信息
class Hook {
  constructor(args = []) {
    this.args = args
    this.taps = []  // 用于存放组装好的对象信息，就是type fn options {}
    this._x = undefined  // 将来在代码工厂函数中会给 _x = [f1, f2, f3....]
  }

  tap(options, fn) {
    if (typeof options === 'string') {
      options = { name: options }
    }
    options = Object.assign({ fn }, options)  // { fn:... name:fn1 }

    // 调用以下方法将组装好的 options 添加至 []
    this._insert(options)
  }

  _insert(options) {
    this.taps[this.taps.length] = options
  }

  call(...args) {
    // 01 创建将来要具体执行的函数代码结构
    let callFn = this._createCall()
    // 02 调用上述的函数（args传入进去）
    return callFn.apply(this, args)
  }

  _createCall() {
    return this.compile({
      taps: this.taps,
      args: this.args
    })
  }
}

module.exports = Hook

```

