// function makePromise (value) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(value, 'setTimeout')
//       resolve(value);
//     }, Math.random() * 1000)
//   })
// }

// function print (value) {
//   return value
// }
 
// let promises = [1, 3, 4, 5, 6].map((item, index) => {
//   return makePromise(item)
// });

 
// // 串行执行
// let parallelPromises = promises.reduce((pre, val) =>{
//   return pre.then(() => val.then(print))
// }, Promise.resolve())
 

// console.log(parallelPromises, '??????')
// parallelPromises
// .then((res) => {
//   console.log('done', res)
// })
// .catch(() => {
//   console.log('done')
// })
 
// // 顺带复习一下reduce方法
 
// // reduce((total, currentValue, currentIndex, arr) => {}, initialValue)
// // let arr1 = [1, 2, 3, 4, 5]
// // let res = arr1.reduce((total, currentValue, currentIndex, arr) => {
// //     return total + currentValue
// // });

const pub = new (class {
  // static obj = {};
  constructor() {}
  deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    // 获取到当前层对象的所有属性。
    let ownProperty = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
    for (let i in ownProperty) {
        console.log(ownProperty, i, '>>>.')
      if (obj.hasOwnProperty(ownProperty[i])) {
        if (typeof obj[ownProperty[i]] === 'object' && obj[ownProperty[i]] != null) {
          result[ownProperty[i]] = this.deepCopy(obj[ownProperty[i]]);
          console.log(result)
        } else {
          result[ownProperty[i]] = obj[ownProperty[i]];
          console.log(result)
        }
      }
    }
    return result;
  }
})();

const HEAD = Symbol('头顶');
const HAT = Symbol('帽子');
const CAUSE = Symbol('原因');
// 新建一个魔性的对象。
let obj = {
    // test: [12,3,4,5,6],
  origin: { name: '小明', [HEAD]: '?' },
//   [HAT]: { [CAUSE]: 'wife', color: 'green', background: '?', num: [1, 2, 3, 4, 5, 6, 7, 8, 9, [Infinity]] },
//   move: function() {}
};

// 接下来对这个魔性的对象进行深拷贝，太残忍了。
let objCopy = pub.deepCopy(obj);

// 验证
// obj[HAT].num[1] = 0;
console.log(objCopy);
// console.log('obj:', obj[HAT].num[1], ', objCopy:', objCopy[HAT].num[1]); // obj: 0 , objCopy: 2
