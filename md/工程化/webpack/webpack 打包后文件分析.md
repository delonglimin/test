### webpack打包模块

```javascript
// expose the modules object (__webpack_modules__)
__webpack_require__.m = modules;

// expose the module cache 这玩意存缓存的
__webpack_require__.c = installedModules;
```

##### `__webpack_require__.d` 

判断你身上有没有某个属性，没有就给你加个访问器

```javascript
// define getter function for harmony exports
// 判断你身上有没有某个属性，没有就给你加个访问器
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, { enumerable: true, get: getter });
  }
};
```

##### `__webpack_require__.r`

主要是区分es模块的

```javascript
// define __esModule on exports 
// 主要是区分es模块的
__webpack_require__.r = function (exports) {
   if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
     Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
   }
   Object.defineProperty(exports, '__esModule', { value: true });
 };
```

##### `__webpack_require__.t`

这里是懒加载用的

```javascript
// create a fake namespace object
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 8|1: behave like require
__webpack_require__.t = function (value, mode) {
  // 不存怎样，调用t方法会拿到被加载模块内容
  // 可能直接返回也可能处理之后再返回
  if (mode & 1) value = __webpack_require__(value); 
  if (mode & 8) return value;
  if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  var ns = Object.create(null);
  __webpack_require__.r(ns);
  Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
  return ns;
};
```

##### `__webpack_require__.o`

判断里面有没有这个属性

```javascript
// Object.prototype.hasOwnProperty.call
__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
```



##### `__webpack_require__.n` 

返回一个default或者别的方法

```javascript
// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function (module) {
  var getter = module && module.__esModule ? function getDefault() { return module['default']; } : function getModuleExports() { return module; };
  __webpack_require__.d(getter, 'a', getter);
  return getter;
};
```

##### `__webpack_require__.p` 

配置里的public属性

```javascript
// __webpack_public_path__
__webpack_require__.p = "";
```

##### `__webpack_require__.t`

```js
__webpack_require__.t = function (value, mode) { // value 一般用于表示被加载的id， mode是二进制数值
  // 调用自定义的require方法加载value对应的模块导出，重新赋值给value
  // 8 4 2都是对value这个值进行加工处理然后返回使用
  if (mode & 1) value = __webpack_require__(value);  // 0001
  // 直接返回value cjs
  if (mode & 8) return value; // 1000
  // 还是直接返回value esm
  if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value; // 0100
  // 定义ns 如果value是可以直接使用的内容，例如string，将它挂载到default上
  // 如果value不是简单数据类型，比如是一个obj，就遍历他给他加getter
  var ns = Object.create(null);
  __webpack_require__.r(ns);
  Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  if (mode & 2 && typeof value != 'string') { // 0010
    for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
  }
  return ns;
};
```

`__webpack_require__.e` 

​	返回一个promise

```js
__webpack_require__.e = function requireEnsure(chunkId) {
  var promises = [];
  // JSONP chunk loading for javascript
  var installedChunkData = installedChunks[chunkId];
  if (installedChunkData !== 0) { // 0 means "already installed".

    // a Promise means "currently loading".
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      // setup Promise in chunk cache
      var promise = new Promise(function (resolve, reject) {
        installedChunkData = installedChunks[chunkId] = [resolve, reject]; // 保存目前的resolve和reject
      });
      promises.push(installedChunkData[2] = promise);

      // start chunk loading
      var script = document.createElement('script');
      var onScriptComplete;

      script.charset = 'utf-8';
      script.timeout = 120;
      if (__webpack_require__.nc) {
        script.setAttribute("nonce", __webpack_require__.nc);
      }
      script.src = jsonpScriptSrc(chunkId);

      // create error before stack unwound to get useful stacktrace later
      var error = new Error();
      onScriptComplete = function (event) {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var chunk = installedChunks[chunkId];
        if (chunk !== 0) {
          if (chunk) {
            var errorType = event && (event.type === 'load' ? 'missing' : event.type);
            var realSrc = event && event.target && event.target.src;
            error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
            error.name = 'ChunkLoadError';
            error.type = errorType;
            error.request = realSrc;
            chunk[1](error);
          }
          installedChunks[chunkId] = undefined;
        }
      };
      var timeout = setTimeout(function () {
        onScriptComplete({ type: 'timeout', target: script });
      }, 120000);
      script.onerror = script.onload = onScriptComplete;
      document.head.appendChild(script);
    }
  }
  return Promise.all(promises);
};
```



- webpack默认做的是cjs规范
- 重点是esm

### esm处理

(es导出chjs倒入)

```javascript
export default 'wtyfefe';
export const age = '32313123'

"use strict";
// r和d就是webpack特殊做的
__webpack_require__.r(__webpack_exports__); // r就是给esm模块加属性的
__webpack_require__.d(__webpack_exports__, "age", function() { return age; }); // 判断你身上有没有某个属性，没有就给你加个访问器
 __webpack_exports__["default"] = ('wtyfefe');
const age = '32313123'
// 所以这里就是给__webpack_require__加了一个age和default属性
```

```javascript
const name1312312312 = require('./login.js');
console.log('index执行中')
console.log(name1312312312.default, '-----')
console.log(name1312312312.age, '-----')

const name1312312312 = __webpack_require__(/*! ./login.js */ "./src/login.js");
console.log('index执行中')
console.log(name1312312312.default, '-----')
console.log(name1312312312.age, '-----')
```

（cjs导出esm导入）

```javascript
// 啥也没干
module.exports = 'name11111'

module.exports = 'name11111'
```

```javascript
import name from './login';
console.log('----12312312');
console.log(name, 'namexxx')

"use strict";
__webpack_require__.r(__webpack_exports__);
var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login */ "./src/login.js");
var _login__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_login__WEBPACK_IMPORTED_MODULE_0__);

console.log('----12312312');
console.log(_login__WEBPACK_IMPORTED_MODULE_0___default.a, 'namexxx')
```

### 懒加载

```js
let obt = document.getElementById('btn');
obt.addEventListener('click', function () {
    import(/* webpackChunkName: "login-------" */'./login.js').then(res => {
        console.log(res, '----->>>>>>>')
    });
})
console.log('index.js work<<<<<<')
```

```js
(function (module, exports, __webpack_require__) {
  let obt = document.getElementById('btn');
  obt.addEventListener('click', function () {
    __webpack_require__.e(/*! import() | login------- */ "login-------")
      .then(__webpack_require__.t.bind(null, /*! ./login.js */ "./src/login.js", 7))
      .then(res => {
      console.log(res, '----->>>>>>>')
    });
  })
  console.log('index.js work<<<<<<')
})
```



### 手写功能函数

```javascript
(function (modules) {
    // 定义对象来缓存模块
    let installedModules = {};
    // 定义对象用于标识某个chunId对应的chunk是否完成加载
    let installChunks = {
        main: 0
    } // 0 加载过，promise正在加载，undefined还没加载
    // 定义懒加载的webpackJsonpCallback,实现合并模块定义，改变promise状态执行后续行为
    function webpackJsonpCallback(data) {
        // 获取要被动态加载的模块id
        let _chunkIds = data[0];
        // 获取要被动态加载模块的依赖关系对象
        let _moreModules = data[1];
        // 循环判断chunkIds里对应的模块内容是否已经完成加载
        let chunkId, resolves = []
        for (let i = 0; i < _chunkIds.length; i++) {
            chunkId = _chunkIds[i];
            // 判断installChunks有没有，是否正在加载
            if (Object.property.hasOwnProperty.call(installChunks, chunkId) && installChunks[chunkId]) {
                resolves.push(installChunks[chunkId][0]) // 把resolve放进去
            }
            // 更新chunk状态
            installChunks[chunkId] = 0; // 整完了就完全加载了
        }
        for (moduleId in _moreModules) {
            if (Object.hasOwnProperty.call(_moreModules, moduleId)) {
                modules[moduleId] = _moreModules[moduleId];
            }
        }
        while (resolves.length) {
            resolves.shift()()
        }
    }
    // 定义jsonpScriptSrc实现src处理
       
    function jsonpScriptSrc(chunkId) {
        return __webpack_require__.p + '' + chunkId + '.built.js';
    }
    // 定义m来保存modules
    __webpack_require__.m = modules;
    // 定义c属性用来保存缓存
    __webpack_require__.c = installedModules;
    // 定义o方法用来判断对象身上是否存在执行属性
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty(object, prototype);
    }
    // 定义d方法用于在对象的身上添加指定的属性，同时给该属性提供getter
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperties(exports, name, {
                enumerator: true, // 枚举属性
                get: getter
            })
        }
    }
    // 定义r方法用于标识当前模块是es6
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== undefined && Symbol.toStringTag) {
            Object.defineProperties(exports, Symbol.toStringTag, { value: 'module' })
        }
        Object.defineProperties(exports, '__esModule', { value: true })
    }
    // 定义n方法用于设置具体的getter
    __webpack_require__.n = function (module) {
        let getter = module && module.__esModule ?
            function getDefault() {
                return module['default']
            } :
            function getModuleExports() {
                return module
            }
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    }
    // 定义p属性用于保存资源访问路径
    __webpack_require__.p = '';
    // 定义e方法用于实现jsonp来加载内容，利用promise实现异步加载
    __webpack_require__.e = function (chunkId) {
        // 定义数组存放promise
        let _promises = [];
        // 获取chunkId对应的chunk是否已经完成了加载
        let _installChunkData = installChunks[chunkId];
        // 依据当前是否完成加载执行后续逻辑
        if (_installChunkData !== 0) {
            if (_installChunkData) {
                _promises.push(_installChunkData[2])
            } else {
                let promise = new Promise((resolve,reject) => {
                    _installChunkData = installChunks[chunkId] = [resolve, reject]
                })
                _promises.push(_installChunkData[2] = promise);
                // 创建标签
                let script = document.createElement('script');
                script.src = jsonpScriptSrc(chunkId);
                // 写入script标签
                document.head.appendChild(script);
            }
        }
        // 执行promise
        return Promise.all(_promises)
    }
    // 定义t方法用于加载指定value的模块内容，之后对内容进行处理再返回
    __webpack_require__.t = function (value, mode) {
        // 加载value，加载后的内容又重新赋值
        if (mode & 1) {
            value = __webpack_require__(value)
        }
        // 直接返回内容
        if (mode & 8) {
            return value
        }
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) {
            return value // 当作esmodule
        }
        // 如果8 4都不成立，就自定义ns通过default返回内容
        let ns = Object.create(null)
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', { enumerable: true, value: value })
        if (mode & 2 && typeof value !== 'string') {
            for (var key in value) {
                __webpack_require__.d(ns, key, function (key) {
                    return value[key]
                }.bind(null, key)) // 为了安全，把key值绑定了
            }
        }
        return ns;
    }
    // 定义__webpack_require__来替换import， require操作
    function __webpack_require__(moduleId) {
        // 判断当前缓存中是否存在要被加载的模块内容，如果存在直接返回
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // 缓存如果不存在就自己定义对象{}，执行被导入的模块内容加载
        let module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        }
        // 调用对应模块完成加载
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // 当方法调用完成后，就可以修改l表示内容加载完成
        module.l = true;
        return module.exports;
    }
    // 定义变量，存放数组
    let jsonpArray = window['webpackJsonp'] = window['webpackJsonp'] || [];
    // 保存原生push 方法
    let oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    // 重写原生push方法
    jsonpArray.push = webpackJsonpCallback
    // 调用__webpack_require__方法执行模块导入和加载
    return __webpack_require__(__webpack_require__.s = './src/index.js')
})({
    "./src/index.js":
        (function (module, exports, __webpack_require__) {
            let obt = document.getElementById('btn');
            obt.addEventListener('click', function () {
                __webpack_require__.e(/*! import() | login------- */ "login-------")
                    .then(__webpack_require__.t.bind(null, /*! ./login.js */ "./src/login.js", 7))
                    .then(res => {
                        console.log(res, '----->>>>>>>')
                    });
            })
            console.log('index.js work<<<<<<')
        })
})
```

