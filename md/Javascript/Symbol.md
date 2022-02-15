用于创建独一无二的值，可做唯一key用于缓存等场景

Symbol类型的key是不能通过Object.keys()或者for…in来枚举的

```
// 防止对象属性名称冲突
let mySymbol = Symbol();
// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};
// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

用来重置对象的属性，比如 Symbol.toStringTag

```
class ValidatorClass {}

Object.prototype.toString.call(new ValidatorClass()); // "[object Object]"

但是 toStringTag可以重制属性

class ValidatorClass {
    get [Symbol.toStringTag]() {
        return 'Validator'
    }
}
Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
```

可实现 Symbol.iterator迭代器， 让普通对象变为可迭代对象

```
var obj = {};
obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}

// 使用Symbol.for(‘xxx’)获取全局的symbol值

// Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会
// 调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

//https://www.zhihu.com/pin/1010116698065764352
```



