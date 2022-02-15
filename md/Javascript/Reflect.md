## Reflect.construct()

```js
var obj = Reflect.construct(Foo, args)
var obj = new Foo(...args);
    // Reflect.construct() vs Object.create()
// 创建一个对象:
var obj1 = Reflect.construct(OneClass, args, OtherClass);

// 与上述方法等效:
var obj2 = Object.create(OtherClass.prototype);
OneClass.apply(obj2, args);
```

## Reflect.get()

```
Reflect.get(target, propertyKey[, receiver])
// Object
var obj = { x: 1, y: 2 };
Reflect.get(obj, "x"); // 1

// Array
Reflect.get(["zero", "one"], 1); // "one"
```

## Reflect.has()

```
// 作用与 in 操作符 相同。
Reflect.has({x: 0}, "x"); // true
Reflect.has({ x: 0 }, "y"); // false
```

## Reflect.ownKeys()

```js
const object1 = {
  property1: 42,
  property2: 13
};

const array1 = [];

console.log(Reflect.ownKeys(object1));
// expected output: Array ["property1", "property2"]

console.log(Reflect.ownKeys(array1));
// expected output: Array ["length"]


Reflect.ownKeys({z: 3, y: 2, x: 1}); // [ "z", "y", "x" ]
Reflect.ownKeys([]); // ["length"]

var sym = Symbol.for("comet");
var sym2 = Symbol.for("meteor");
var obj = {[sym]: 0, "str": 0, "773": 0, "0": 0,
           [sym2]: 0, "-1": 0, "8": 0, "second str": 0};
Reflect.ownKeys(obj);
// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]
Reflect.ownKeys([1, 2, 3, 4])
// ["0", "1", "2", "3", "length"]
```

### Reflect.ownKeys()与Object.keys()区别

```js
var obj = {}
Object.defineProperty(obj, 'method1', {
    value: function () {
        alert("Non enumerable property");
    },
    enumerable: false
})
 
console.log(Object.keys(obj)) // []
console.log(Reflect.ownKeys(obj)) // ["method1"]
```

- Object.keys()主要用于遍历对象自有的可枚举属性，不包括继承自原型的属性和不可枚举的属性。
- Reflect.ownKeys()返回***\*所有自有\****属性key，不管是否可枚举，但不包括继承自原型的属性

## Reflect.set()

```
// Object
var obj = {};
Reflect.set(obj, "prop", "value"); // true
obj.prop; // "value"

// Array
var arr = ["duck", "duck", "duck"];
Reflect.set(arr, 2, "goose"); // true
arr[2]; // "goose"

// It can truncate an array.
Reflect.set(arr, "length", 1); // true
arr; // ["duck"];

// With just one argument, propertyKey and value are "undefined".
var obj = {};
Reflect.set(obj); // true
```

