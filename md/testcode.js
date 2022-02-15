// // function add () {
// //     let args = [...arguments];
// //     let fn = function () {
// //         args.push(...arguments);
// //         return fn
// //     }
// //     fn.toString=function(){
// //         return args.reduce((a, b) => {
// //             return a + b
// //         })
// //     }
// //     return fn
// // }
// // console.log(add(1, 2)(3).toString()) // 6
// // console.log(add(1)(1,2,3)(2).toString()) // 9
// // console.log(add(1)(2, 3, 4)(5).to) // 15

// function add() {
//     let args = [...arguments]
//     let fn = function() {
//         args.push(...arguments)
//         return fn
//     }
//     fn.toString = function() {
//         return args.reduce((pre, val) => {
//             return pre + val
//         }, 0)
//     }
//     return fn
// }
// console.log(add(1)(2,3,4) + '')
function track(...args) {
    console.log([...arguments].length)
    console.log(args.length)
}
console.log(track(1,2,3,4))