##  loader使用

1. loader 本质上就是一个导出内容为函数的JS模块。

2. loader 默认就可以接收上游传递过来的资源文件或者结果

3. compiler会拿到最后一个 loader 的产出结果，这个结果应该是 **string 或者 buffer**

4. 从入口文件出发，找到所有依赖的模块，直到所有依赖模块也都被 loader 处理之后返回结果

   file-loader 处理图片的时候是怎么做？

   - 返回一个字符串形式的图片名称 （路径）

   - 资源拷贝一份到指定目录

```javascript
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  }, 
  module: {
    rules: [
      {
        test: /\.js$/, 
        use: [
          {
            loader:'babel-loader', 
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  }
}
```

```javascript
module.exports = {
  mode: 'development',
  devtool: false,
  resolveLoader: { // 这样找loader就先去你的loaders文件里找，没有就去node_modules
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules']
  },
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // loader: path.resolve(__dirname, 'loaders/test-loader.js')
            loader: 'test-loader'
          }
        ]
      }
    ]
  }
}
```



## loader 分类-----pre/post/inline

> 对于 loader 默认都是一样的，只不过在使用的时候可以放在不同的位置或者进行了不同的修饰， 因此说清起来 loader 就有分类了

1. 普通loader：没有做任何的配置 

2. 前置loader：enforce 属性配置 pre 

3. 后置loader：enforce 属性配置 post

4. 行内loader：使用 ! 进行分割

5. **pre > normal > inline > post** 

```js
module.exports = {
  mode: 'development',
  devtool: false,
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders'), 'node_modules']
  },
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['normal-loader']
      },
      {
        test: /\.js$/,
        enforce: 'post',
        use: ['post-loader']
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['pre-loader']
      }
    ]
  }
}
```

- !跳过了 normal loader 

- -!跳过了 normal + pre loader 

- !! 跳过了 normal pre post(只保留了 inline)

```javascript
// 行内loader
const title = require('/* ! -! !!*/inline-loader!./title');
```

## loader组成-----pitch

> 一个完整的 loader 有两部分组成 pitchLoader 与 normalLoader

```js
['post-loader', 'inline-loader', 'normal-loader', 'pre-loader']
//pitch加上之后流程
// plp => ilp => nlp => plp => pl => nl => il => pl
// 如果inline-loader.pitch里面加了一个return 执行顺序就是plp => ilp => pl,il自己的loader都不会执行
```

```javascript
function loader(source) {
  console.log('loader2执行了------')
  return source + '//loader2'
}
loader.pitch = function (data) { // 一般都是在这里加个pitch，没啥大用
  console.log('loader2-pitch')
  return '2222' // 可以不返回
}
module.exports = loader
```

## loader获取参数-----loader-utils

```javascript
// webpack.config.js>>>>>>>>>>
use: [
  {
    loader: 'test-loader',
    options: {
      name: '1231',
      xxx: 2222
    }
  }
]
// <<<<<<<<<loader.js
const { getOptions } = require('loader-utils') // 拿loader里面options的配置， getOptions是结构的方法
function loader(source) {
  console.log('test-loader执行了------')
  // loader里面的this就是loader运行时的执行上下文
  const options = getOptions(this) || {}
  console.log(options) // { name: '12312', xxx: 2222 }
  return source + '//test-loader'
}
module.exports = loader
```

## loader校验-----schema-utils

> 安装 `npm i schema-utils -D`

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "输入name"
    },
    "age": {
      "type": "number",
      "description": "输入年纪"
    }
  },
  "additionalProperties": true
}
```

```js
const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils') // 这玩意是校验的工具包
const schemaTestLoader = require('../test-loader.schema.json')

function loader(source) {
  // 默认情况下loader执行都是同步的，但是也可以是异步
  // 设置为异步
  const callback = this.async()
  // 获取参数 
  const options = getOptions(this)
  // 参数校验 
  validate(schemaTestLoader, options)
  setTimeout(() => {
    console.log('test-loader', source, options)
    callback(null, source)
  }, 5000)
}

module.exports = loader
```

## file-loader

> 生成一个新的文件名，让 webpack 将当前文件拷贝至指定的路径

```js
const imgSrc = require('./img/t1.jpg')
const oImg = document.createElement('img')
oImg.src = imgSrc
oImg.width = 180
document.body.appendChild(oImg)
// ---------------------------------------------------
const { getOptions, interpolateName } = require('loader-utils')

function loader(source) {
  const options = getOptions(this) || {}
  // 生成打包后输出的文件名 
 	// options.filename 有默认值
  // content 数据内容
  let filename = interpolateName(this, options.filename, { content: source })
  // 利用 webpack 内部实现的方法将上述文件名所对应的文件拷贝至指定的目录
  this.emitFile(filename, source)
  // 最终返回一个 buffer 或者字符串直接给 compiler 进行使用
  return `module.exports = ${JSON.stringify(filename)}`
}
loader.raw = true // false是默认按字符串处理，但是现在又是二进制，处理的东西是非字符串的就要改成true
module.exports = loader
```

1. 通过 loader-utils里的 interpolateName 方法可以配合 options.name 及文件内容生成一个唯一的文件名

2. 通过 this.emitFile(uri, content) 让 webpack依据参数创建对应的文件，放在指定目录下

3. 返回 module.exports=$(JSON.stringify(uri))， 这样就把原来的文件路径替换为编译后的路径

## url-loader 

> 建立在 file-loader 之上的一个 loader 

```js
const mime = require('mime')
const { getOptions } = require('loader-utils')

function loader(content) {
  const options = getOptions(this) || {}
  let { limit, fallback = 'lg-file-loader' } = options
  // 判断是否存在 limit 
  if (limit) {
    limit = parseInt(limit, 10)
  }

  if (!limit || content.length < limit) {
    let mimeType = mime.getType(this.resourcePath)   // resourcePath就是需要加载的文件路径 
    // 按着规则将图片数据处理为 base64 
    let base64Str = `data:${mimeType};base64,${content.toString('base64')}`
    return `module.exports=${JSON.stringify(base64Str)}`
  } else {
    // 这里的 require 不会自动加载配置文件，需要手动设置
    let fileLoader = require(fallback)
    return fileLoader.call(this, content)
  }
}

loader.raw = true
module.exports = loader

// data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ
```

## less-loader 

> npm i less postcss css-selector-tokenizer -D

```js
// 将 less 编译成css字符串 
let less = require('less')

function loader(content) {
  // 通过调用 this.async 可以返回一个函数，它可以将 loader的执行变为异步，不会直接向后执行
  // loader 默认情况下是同步操作 
  let callback = this.async()
  less.render(content, { filename: this.resource }, (err, output) => {
    console.log(output.css)
    callback(err, output.css)
  })
}

module.exports = loader
```

## style-loader

```js
// 把 css 变成一个 JS 脚本
// 脚本就是动态创建一个 style 标签，并且把这个 style 标签插入到html的header里

function loader(content) {
  console.log(11111)
  return `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(content)}
    document.head.appendChild(style)
  `
}

module.exports = loader
```

## css-loader打包分析

### 普通 CSS无数组

```js
(function () {
  var modules = {
    './src/index.css': (module, exports, require) => {
      module.exports = `body{\r\n background-color: orange; \r\n}`
    }
  }

  var cache = {}

  function require(moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId].exports
    }

    var module = (cache[moduleId] = {
      id: moduleId,
      exports: {}
    })
    modules[moduleId](module, module.exports, require)
    return module.exports
  }
  const css = require('./src/index.css')
  console.log(css)
})()
```

### 添加数组

```js
(function () {
  var modules = {
    './src/index.css': (module, exports, require) => {
      var list = [] // 这里设置为数组就是为了后续处理 @import 
      list.push([
        module.id, 'body{\r\n background-color: red;\r\r}'
      ])
      // 定义一个映射函数，作用就是把第一个 css 描述对象转为CSS代码 
      let cssWithMappingToString = item => item[1]
      let css = list.map(cssWithMappingToString).join('')
      module.exports = css
    }
  }

  var cache = {}

  function require(moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId].exports
    }

    var module = (cache[moduleId] = {
      id: moduleId,
      exports: {}
    })
    modules[moduleId](module, module.exports, require)
    return module.exports
  }
  const css = require('./src/index.css')
  console.log(css)
})()
```

### 新增toString方法

```js
(function () {
  var modules = {
    'css-loader.js!./src/index.css': (module, exports, require) => {
      var api = require('api.js')
      let cssWithMappingToString = item => item[1]
      let EXPORT = api(cssWithMappingToString)
      EXPORT.push([
        module.id, 'body{\r\n background-color: blue;\r\r}'
      ])
      // 定义一个映射函数，作用就是把第一个 css 描述对象转为CSS代码 
      module.exports = EXPORT
    },
    'api.js': (module, exports, require) => {
      module.exports = function (cssWithMappingToString) {
        var list = [] // 这里设置为数组就是为了后续处理 @import 
        list.toString = function () {
          return this.map(cssWithMappingToString).join('')
        }
        return list
      }
    },
    './src/index.css': function (module, exports, require) {
      var result = require('css-loader.js!./src/index.css')
      module.exports = result.toString()
    }
  }

  var cache = {}

  function require(moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId].exports
    }

    var module = (cache[moduleId] = {
      id: moduleId,
      exports: {}
    })
    modules[moduleId](module, module.exports, require)
    return module.exports
  }
  const css = require('./src/index.css')
  console.log(css)
})()

```

### 支持import

```js
(function () {
  var modules = {
    'css-loader.js!./src/global.css': (module, exports, require) => {
      var api = require('api.js')
      let cssWithMappingToString = item => item[1]
      let EXPORT = api(cssWithMappingToString)
      EXPORT.push([
        module.id, 'body{\r\n color: blue;\r\r}'
      ])
      // 定义一个映射函数，作用就是把第一个 css 描述对象转为CSS代码 
      module.exports = EXPORT
    },
    'css-loader.js!./src/index.css': (module, exports, require) => {
      var api = require('api.js')
      let cssWithMappingToString = item => item[1]
      let EXPORT = api(cssWithMappingToString)

      // 需要在 index.css 当中导入 global.css
      let GLOBAL = require('css-loader.js!./src/global.css')
      // 将 global.css 当中的CSS描述信息添加到EXPORT 数组当中
      EXPORT.i(GLOBAL)

      EXPORT.push([
        module.id, 'body{\r\n background-color: blue;\r\r}'
      ])
      // 定义一个映射函数，作用就是把第一个 css 描述对象转为CSS代码 
      module.exports = EXPORT
    },
    'api.js': (module, exports, require) => {
      module.exports = function (cssWithMappingToString) {
        var list = [] // 这里设置为数组就是为了后续处理 @import 
        list.toString = function () {
          return this.map(cssWithMappingToString).join('')
        }
        list.i = function (otherList) {
          list.unshift(...otherList)
        }
        return list
      }
    },
    './src/index.css': (module, exports, require) => {
      var result = require('css-loader.js!./src/index.css')
      module.exports = result.toString()
    }
  }

  var cache = {}

  function require(moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId].exports
    }

    var module = (cache[moduleId] = {
      id: moduleId,
      exports: {}
    })
    modules[moduleId](module, module.exports, require)
    return module.exports
  }
  const css = require('./src/index.css')
  console.log(css)
})()
```

