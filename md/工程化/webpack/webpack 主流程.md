# 流程分析

<img src="/Users/tal/Desktop/1519931-20190115140318767-2073164047.jpeg" alt="1519931-20190115140318767-2073164047" style="zoom: 200%;" />

compiler贯穿流程,compilation就是流程中打包编译的一个部分

### 一、步骤

1. webpack(options)里面实例化 compiler 对象
2. compiler.run

### 二、compiler 实例化操作

1. compiler 继承 tapable，因此它具备监听事件，触发事件的能力
2. 在实例化了 compiler 对象之后就往compiler身上挂载各种属性,他这里基于fs加了个读写能力
3. 具备了 fs 操作能力之后又将 plugins 中的插件都挂载到了 compiler 对象身上
4. 将自定义的和内置的plugins挂载到compiler身上,其中 EntryOptionPlugin 处理了入口模块的 id 
5. 在实例化 compiler 的时候只是监听了 make 钩子（SingleEntryPlugin)
   1.  在 SingleEntryPlugin 模块的 apply 方法中有二个钩子监听
   2. 其中 compilation 钩子就是让 compilation 具备了利用 normalModuleFactory 工厂创建一个普通模块的能力
   3.  compilation就是利用一个自己创建的模块来加载需要被打包的模块
   4. 其中 make 钩子 在 compiler.run 的时候会被触发，走到这里就意味着某个模块执行打包之前的所有准备工作就完成了
   5. addEntry 方法

### 三、run 方法执行（ 当前想看的是什么时候触发了 make 钩子 ）

1. run 方法里就是一堆钩子按着顺序触发（beforeRun run beforeCompile compile compilation make）
2. compile() 方法执行
       1.  准备参数(其中 normalModuleFactory 是我们后续用于创建模块的)
          2.  触发beforeCompile
          3.  beforeCompile里面创建一个 compilation
          4.  然后在调用 newCompilation
                 - 调用了 createCompilation 
              - 触发了 this.compilation 钩子 和 compilation 钩子的监听
3. 建了 compilation 对象之后触发 make 钩子, 将 compilation 对象传递了过去 

### 四、make方法执行

1. make 钩子在被触发的时候，接收到了 compilation 对象实现，它的身上挂载了很多内容
2. 从 compilation 当中解构了三个值 
   - entry : 当前需要被打包的模块的相对路径（./src/index.js)
   - name: main 
   - context: 当前项目的根路径 
3. dep 是对当前的入口模块中的依赖关系进行处理 (SingleEntryPlugin.createDependency(entry, name);)
4. 调用了 addEntry() 方法 
5. 在 compilation实例的身上有一个 addEntry 方法，然后内部调用了 _addModuleChain 方法，去处理依赖
6. 在 compilation 当中我们可以通过 NormalModuleFactory 工厂来创建一个普通的模块对象  
7. 在 webpack 内部默认启了一个 100 并发量的打包操作， normalModule.create()
8. 在 beforeResolve 里面会触发一个 factory 钩子监听【 这个部分的操作其实是处理 loader 】
9. 上述操作完成之后获取到了一个函数被存在 factory 里，然后对它进行了调用  
10. 在这个函数调用里又触发了一个叫 resolver 的钩子（ 处理 loader的，拿到了 resolver方法就意味着所有的Loader 处理完毕 ）
11. 调用 resolver() 方法之后，就会进入到  afterResolve 这个钩子里，然后就会触发  new NormalModule 
12. 在完成上述操作之后就将module 进行了保存和一些其它属性的添加  
13. 调用 buildModule 方法开始编译---》 调用 build ---》doBuild ，打包之前会把loader处理好

# 流程片段

## 一. 实例化过程

```js
// 测试文件
let webpack = require('webpack')
let options = require('./webpack.config')

let compiler = webpack(options)

compiler.run((err, stats) => {
  console.log(err)
  console.log(stats.toJson({
    entries: true,
    chunks: false,
    modules: false,
    assets: false
  }))
})
```

- 开始
- 合并配置
- 实例化compiler
- 设置Node文件读写能力
- 循环挂载自定义插件
- 处理webpack内部默认的插件，还有入口文件

 *compiler.beforerun => compiler.run => compiler.beforeCompile => compiler.compile => compiler.make*

webpack(options) => node_modules/webpack/lib/webpack.js

```js
let compiler;
// 调用webpack的默认配置， 就是这里做到0配置的
options = new WebpackOptionsDefaulter().process(options); 
// 
compiler = new Compiler(options.context);
compiler.options = options;
// webpack里面所有的插件都是类，类里都有apply方法,这玩意就是添加文件读写能力
new NodeEnvironmentPlugin({
  infrastructureLogging: options.infrastructureLogging
}).apply(compiler);
// 可以文件读写再挂载其他插件到这里面方便执行
if (options.plugins && Array.isArray(options.plugins)) {
  for (const plugin of options.plugins) {
    if (typeof plugin === "function") {
      plugin.call(compiler, compiler);
    } else {
      plugin.apply(compiler);
    }
  }
}
compiler.hooks.environment.call();
compiler.hooks.afterEnvironment.call();
// 挂载默认插件，确定当前打包入口
compiler.options = new WebpackOptionsApply().process(options, compiler);

return compiler;
```

compiler.run => 15_wp_hand1/node_modules/webpack/lib/Compiler.js

```js
// >>>>>>>>>>
  this.hooks = {
			/** @type {SyncBailHook<Compilation>} */
			shouldEmit: new SyncBailHook(["compilation"]),
			/** @type {AsyncSeriesHook<Stats>} */
			done: new AsyncSeriesHook(["stats"]),
			/** @type {AsyncSeriesHook<>} */
			additionalPass: new AsyncSeriesHook([]),
			.......
		};
// Object.key(this.hooks).forEach(hookName => {
//	console.log(hookName);
// })
/**
 * beforeRun
 * run
 * thisCompilation 创建一个本次的compilation, compilation这玩意是专门负责本次编译的对象
 * compilation
 * beforeCompile
 * compile 编译
 * make 正在编译
 * afterCompile 编译完成
 */
```

入口执行流程WebpackOptionsApply => node_modules/webpack/lib/WebpackOptionsApply.js

```js
// 又是一个插件
new EntryOptionPlugin().apply(compiler);
compiler.hooks.entryOption.call(options.context, options.entry);
```

EntryOptionPlugin => ]node_modules/webpack/lib/EntryOptionPlugin.js

```js
//compiler.hooks.entryOption.call(options.context, options.entry); 就是这个触发
apply(compiler) {
  compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
    if (typeof entry === "string" || Array.isArray(entry)) {
      itemToPlugin(context, entry, "main").apply(compiler);
    } else if (typeof entry === "object") {
      for (const name of Object.keys(entry)) {
        itemToPlugin(context, entry[name], name).apply(compiler);
      }
    } else if (typeof entry === "function") {
      new DynamicEntryPlugin(context, entry).apply(compiler);
    }
    return true;
  });
}
```

执行call => node_modules/tapable/lib/Hook.js

```js
// 这里就是tapable里面那个_create了
return function lazyCompileHook(...args) {
  this[name] = this._createCall(type);
  return this[name](...args);
};
```

tapable又开始执行一大堆create, setup，然后去tap里面的回调

itemToPlugin => node_modules/webpack/lib/EntryOptionPlugin.js

```js
// 开始区分单入口多入口了
const itemToPlugin = (context, item, name) => {
	if (Array.isArray(item)) {
		return new MultiEntryPlugin(context, item, name);
	}
	return new SingleEntryPlugin(context, item, name);
};
```

SingleEntryPlugin => node_modules/webpack/lib/SingleEntryPlugin.js

```js
//有一个构造函数，负责接收上文中的 context entry name 
// compilation 钩子监听
// make 钩子监听
apply(compiler) {
  compiler.hooks.compilation.tap(
    "SingleEntryPlugin",
    (compilation, { normalModuleFactory }) => {
      compilation.dependencyFactories.set(
        SingleEntryDependency,
        normalModuleFactory
      );
    }
  );

  compiler.hooks.make.tapAsync(
    "SingleEntryPlugin",
    (compilation, callback) => {
      const { entry, name, context } = this;

      const dep = SingleEntryPlugin.createDependency(entry, name);
      // 在这里呢，make阶段添加的入口文件
      compilation.addEntry(context, dep, name, callback);
    }
  );
}
```

## 二. run流程 直到触发make

之后看compiler.run方法 =>node_modules/webpack/lib/Compiler.js

```js
run(callback) {
  const finalCallback =() => return callback() // 就是调用callback
  const onCompiled = () => {}
  this.hooks.beforeRun.callAsync(this, err => {
    this.hooks.run.callAsync(this, err => {
      this.readRecords(err => {
        this.compile(onCompiled); // beforerun run
      });
    });
  });
}
```

compiler => node_modules/webpack/lib/Compiler.js

```js
// >>>>>>>>
newCompilationParams() {
  const params = {
    normalModuleFactory: this.createNormalModuleFactory(),
    contextModuleFactory: this.createContextModuleFactory(),
    compilationDependencies: new Set()
  };
  return params;
}
// <<<<<<<
const params = this.newCompilationParams();
this.hooks.beforeCompile.callAsync(params, err => { // 这玩意啥也没干，就是留个钩子万一要自定义呢
  this.hooks.compile.call(params);
  const compilation = this.newCompilation(params); // compilation出来了 就是new Compilation(this);
  // 拿到compilation开始执行make， finish， seal，afterCompile，这里的make就是SingleEntryPlugin里面的make了
  this.hooks.make.callAsync(compilation, err => {
				compilation.finish(err => {
					compilation.seal(err => {
						this.hooks.afterCompile.callAsync(compilation, err => {
							return callback(null, compilation);
						});
					});
				});
			});
})
```

## 三. make

node_modules/webpack/lib/Compiler.js

```js
this.hooks.make.callAsync(compilation, err => {
  if (err) return callback(err);

  compilation.finish(err => {
    if (err) return callback(err);

    compilation.seal(err => {
      if (err) return callback(err);

      this.hooks.afterCompile.callAsync(compilation, err => {
        if (err) return callback(err);

        return callback(null, compilation);
      });
    });
  });
});
```

Hook(make) => node_modules/webpack/lib/SingleEntryPlugin.js

```js
compiler.hooks.make.tapAsync(
  "SingleEntryPlugin",
  (compilation, callback) => {
    const { entry, name, context } = this;

    const dep = SingleEntryPlugin.createDependency(entry, name);
    compilation.addEntry(context, dep, name, callback);
  }
);
```

AddEntry => node_modules/webpack/lib/Compilation.js

```js
this._addModuleChain( // 给入口处理依赖
  context,
  entry,
  module => {
    this.entries.push(module);
  },
  (err, module) => {
    if (err) {
      this.hooks.failedEntry.call(entry, name, err);
      return callback(err);
    }

    if (module) {
      slot.module = module;
    } else {
      const idx = this._preparedEntrypoints.indexOf(slot);
      if (idx >= 0) {
        this._preparedEntrypoints.splice(idx, 1);
      }
    }
    this.hooks.succeedEntry.call(entry, name, module);
    return callback(null, module);
  }
);
```

 _addModuleChain => node_modules/webpack/lib/Compilation.js

```js
// 如果想要加载模块，先要创建一个模块
const Dep = /** @type {DepConstructor} */ (dependency.constructor);
const moduleFactory = this.dependencyFactories.get(Dep); // 让compilation通过NormalmoduleFactory创建一个钩子
this.semaphore.acquire(() => {
  moduleFactory.create(
    {
      contextInfo: {
        issuer: "",
        compiler: this.compiler.name
      },
      context: context,
      dependencies: [dependency]
    }, () => {}
  )
}) // 能够并发模块打包的操作
```

moduleFactory => node_modules/webpack/lib/NormalModuleFactory.js

```js
this.hooks.beforeResolve.callAsync(() => {
  const factory = this.hooks.factory.call(null); // 这都是处理loader的
  factory(result, (err, module) => {
    if (module && this.cachePredicate(module)) {
      for (const d of dependencies) {
        dependencyCache.set(d, module);
      }
    }
    callback(null, module);
  });
}) // loader路径编译操作
```

factory => node_modules/webpack/lib/NormalModuleFactory.js

```js
let resolver = this.hooks.resolver.call(null); // 处理loader，这玩意处理路径，还有那些行内loader，preloader,postloader
resolver(() => {
  this.hooks.afterResolve(() => {
	// createModule 这里开始创建模块了
    createdModule = new NormalModule(result);
})
})
```

moduleFactory.create callback => node_modules/webpack/lib/Compilation.js

```js
const addModuleResult = this.addModule(module);
```



# 手写打包器

### run.js

```js
let webpack = require('./webpack')
let options = require('./webpack.config')

let compiler = webpack(options)

compiler.run((err, stats) => {
  console.log(err)
  console.log(stats.toJson(), '=====')
})
```

### webpack.js

```js
/**
 * compiler 贯穿编译过程，准备数据
 * compilation 通过compiler准备数据，进入具体编译过程中完成编译。这俩玩意非得名字起这么像
 */
const webpack = function (options) {
    // 省略校验options  
    // 01 实例化 compiler 对象 options.context就是webpack.config.js里面的process.cwd()
    let compiler = new Compiler(options.context)
    // 挂载用户的options
    compiler.options = options
    // 02 初始化 NodeEnvironmentPlugin(让compiler有文件读写能力)
    new NodeEnvironmentPlugin().apply(compiler)
    // 03 挂载所有 plugins 插件至 compiler 对象身上 
    if (options.plugins && Array.isArray(options.plugins)) {
        for (const plugin of options.plugins) {
            plugin.apply(compiler) // 记得把compiler传进去
        }
    }
    // 04 挂载所有 webpack 内置的插件（入口）
    compiler.options = new WebpackOptionsApply().process(options, compiler);
    // 05 返回 compiler 对象
    return compiler
}

module.exports = webpack
```

### Compiler 继承tapable

```js
const {
  Tapable,
  SyncHook,
  SyncBailHook,
  AsyncSeriesHook,
  AsyncParallelHook
} = require('tapable')

const NormalModuleFactory = require('./NormalModuleFactory')
const Compilation = require('./Compilation')

class NormalModuleFactory {
  create(data) {
    return new NormalModule(data)
  }
}

class Compiler extends Tapable {
  constructor(context) {
    super()
    this.context = context
    this.hooks = {
      done: new AsyncSeriesHook(["stats"]),
      entryOption: new SyncBailHook(["context", "entry"]),
      beforeRun: new AsyncSeriesHook(["compiler"]),
      run: new AsyncSeriesHook(["compiler"]),
      thisCompilation: new SyncHook(["compilation", "params"]),
      compilation: new SyncHook(["compilation", "params"]),
      beforeCompile: new AsyncSeriesHook(["params"]),
      compile: new SyncHook(["params"]),
      make: new AsyncParallelHook(["compilation"]),
      afterCompile: new AsyncSeriesHook(["compilation"]),
    }
  }
  /**
  * @param {*} callback 就是runjs里面那个回调
  */
  run(callback) {
    console.log('run 方法执行了~~~~')
    const finalCallback = function (err, stats) {
      callback(err, stats)
    }
    const onCompiled = function (err, compilation) {
      console.log('onCompiled~~~~')
      finalCallback(err, {
        toJson() {
          return {
            entries: [],
            chunks: [],
            modules: [],
            assets: []
          }
        }
      })
    }
    this.hooks.beforeRun.callAsync(this, (err) => {
      this.hooks.run.callAsync(this, (err) => {
        this.compile(onCompiled)
      })
    })
  }
	/**
  * @param {*} callback  onCompiled
  */
  compile(callback) {
    const params = {
      normalModuleFactory: new NormalModuleFactory()
    }
		// 这里其实是最重要的，compile里面经历了beforeRun，其中compile， compilation， make
    this.hooks.beforeRun.callAsync(params, (err) => {
      this.hooks.compile.call(params)
      const compilation = new Compilation(this)
      this.hooks.make.callAsync(compilation, (err) => {
        console.log('make钩子监听触发了~~~~~')
        callback()
      })
    })
  }
}

```

### NodeEnvironmentPlugin 提供环境

```js
const fs = require('fs')
class NodeEnvironmentPlugin {
    constructor(options) {
        this.options = options || {}
    }

    apply(complier) {
        // 就是node的读写能力
        complier.inputFileSystem = fs
        complier.outputFileSystem = fs
    }
}
```

### WebpackOptionsApply 提供入口插件应用

```js
class WebpackOptionsApply {
  process(options, compiler) {
    new EntryOptionPlugin().apply(compiler)
    compiler.hooks.entryOption.call(options.context, options.entry)
  }
}
```

### EntryOptionPlugin 入口插件

```js
const itemToPlugin = function (context, item, name) {
  return new SingleEntryPlugin(context, item, name)
}
class EntryOptionPlugin {
  apply(compiler) {
    // 就是tap一个函数到entryOption钩子
    compiler.hooks.entryOption.tap('EntryOptionPlugin', (context, entry) => {
      itemToPlugin(context, entry, "main").apply(compiler)
    })
  }
}
```

### SingleEntryPlugin 单入口插件

```js

class SingleEntryPlugin {
  constructor(context, entry, name) {
    this.context = context
    this.entry = entry
    this.name = name
  }
  apply(compiler) {
    compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
      const { context, entry, name } = this
      console.log("make 钩子监听执行了~~~~~~")
      compilation.addEntry(context, entry, name, callback)
    })
  }
}
```

### Compilation

```js
// 实例化一个 normalModuleFactory parser 
const normalModuleFactory = new NormalModuleFactory()
const parser = new Parser()
class Compilation extends Tapable {
  constructor(compiler) {
    super()
    this.compiler = compiler
    this.context = compiler.context
    this.options = compiler.options
    // 让 compilation 具备文件的读写能力
    this.inputFileSystem = compiler.inputFileSystem
    this.outputFileSystem = compiler.outputFileSystem
    this.entries = []  // 存入所有入口模块的数组
    this.modules = [] // 存放所有模块的数据
    this.hooks = {
      succeedModule: new SyncHook(['module'])
    }
  }
  /**
   * 完成模块编译操作
   * @param {*} context 当前项目的根
   * @param {*} entry 当前的入口的相对路径
   * @param {*} name chunkName main 
   * @param {*} callback 回调
   */
  addEntry(context, entry, name, callback) {
    this._addModuleChain(context, entry, name, (err, module) => {
      callback(err, module)
    })
  }
  _addModuleChain(context, entry, name, callback) {
    let entryModule = normalModuleFactory.create({
      name,
      context,
      rawRequest: entry,
      resource: path.posix.join(context, entry),  // 当前操作的核心作用就是返回 entry 入口的绝对路径
      parser
    })
    const afterBuild = function (err) {
      callback(err, entryModule)
    }
    this.buildModule(entryModule, afterBuild)
    // 当我们完成了本次的 build 操作之后将 module 进行保存
    this.entries.push(entryModule)
    this.modules.push(entryModule)
  }
  /**
   * 完成具体的 build 行为
   * @param {*} module 当前需要被编译的模块
   * @param {*} callback 
   */
  buildModule(module, callback) {
    module.build(this, (err) => {
      // 如果代码走到这里就意味着当前 Module 的编译完成了
      this.hooks.succeedModule.call(module)
      callback(err)
    })
  }
}
```

### NormalModuleFactory

```js
class NormalModuleFactory {
  create(data) {
    return new NormalModule(data)
  }
}
```

### NormalModule

```js
class NormalModule {
  constructor(data) {
    this.name = data.name
    this.entry = data.entry
    this.rawRequest = data.rawRequest
    this.parser = data.parser // TODO: 等待完成
    this.resource = data.resource
    this._source  // 存放某个模块的源代码
    this._ast // 存放某个模板源代码对应的 ast 
  }

  build(compilation, callback) {
    /**
     * 01 从文件中读取到将来需要被加载的 module 内容，这个
     * 02 如果当前不是 js 模块则需要 Loader 进行处理，最终返回 js 模块 
     * 03 上述的操作完成之后就可以将 js 代码转为 ast 语法树
     * 04 当前 js 模块内部可能又引用了很多其它的模块，因此我们需要递归完成 
     * 05 前面的完成之后，我们只需要重复执行即可
     */
    this.doBuild(compilation, (err) => {
      this._ast = this.parser.parse(this._source)
      callback(err)
    })
  }

  doBuild(compilation, callback) {
    this.getSource(compilation, (err, source) => {
      this._source = source
      callback()
    })
  }

  getSource(compilation, callback) {
    compilation.inputFileSystem.readFile(this.resource, 'utf8', callback)
  }
}
```

