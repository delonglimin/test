// function limitLoad(urls, handler, limit) {
//   const sequence = [].concat(urls)
//   let promise = []
//   promise = sequence.splice(0, limit).map((url, index) => {
//       return handler(url).then(()=>{
//           return index
//       })
//   })
//   let p = Promise.race(promise)
//   // for循环给p赋值相当于.then().then()链式调用
//   for (let i= 0; i< sequence.length; i++) {
//       p = p.then(res => {
//           promise[res] = handler(sequence[i]).then(()=>{
//               return res
//           })
//           return Promise.race(promise)
//       })
//   }
// }
// const urls =[
//   {info:'1', time:2000},
//   {info:'2', time:1000},
//   {info:'3', time:2000},
//   {info:'4', time:2000},
//   {info:'5', time:3000},
//   {info:'6', time:1000},
//   {info:'7', time:2000},
//   {info:'8', time:2000},
//   {info:'9', time:3000},
//   {info:'10', time:1000}
// ]
// function loadImg(url){
//   return new Promise((reslove, reject)=>{
//       setTimeout(()=>{
//           reslove()
//       }, url.time)
//   })
// }


// limitLoad(urls, loadImg, 3)




// class LimitPromise {
//   constructor (max) {
//     this._max = max
//     this._count = 0
//     this._taskQueue = []
//   }
//   call (handler, ...args) {
//     return new Promise((resolve, reject) => {
//       const task = this._createTask(handler, args, resolve, reject)
//       if (this._count >= this._max) {
//         this._taskQueue.push(task)
//       } else {
//         task()
//       }
//     })
//   }
//   _createTask (caller, args, resolve, reject) {
//     return () => {
//       handler(...args).then(resolve, reject).finally(() => {
//           this._count--
//           if (this._taskQueue.length) {
//             let task = this._taskQueue.shift()
//             task()
//           } else {
//           }
//         })
//       this._count++
//     }
//   }
// }
// function handler(url) {
//   return new Promise((resolve) => {
//     const time = Math.random() * 5000
//     setTimeout(() => {
//       resolve(url)
//     }, Math.random() * 5000)
//   })
// }
// const limit = new LimitPromise(3)
// function request(url) {
//   return limit.call(handler, url)
// }
// request('a1123123').then(res => console.log('1', res, '执行完毕'))
// request('a2得到的').then(res => console.log('2', res, '执行完毕'))
// request('a3').then(res => console.log('3', res, '执行完毕'))
// request('a4').then(res => console.log('4', res, '执行完毕'))
// request('a5').then(res => console.log('5', res, '执行完毕'))
// request('a6').then(res => console.log('6', res, '执行完毕'))
// request('a7').then(res => console.log('7', res, '执行完毕'))

class limitPromise {
	constructor(max) {
		this.max = max
		this.count = 0
		this.taskQueue = []
	}
	call(handler, url) {
		return new Promise((resolve, reject) => {
			const task = this.taskQ(handler, url, resolve, reject)
			console.log(handler, url, this.count)
			if (this.count === this.max) {
				this.taskQueue.push(task)
			} else {
				task()
			}
		})
	}
	taskQ(handler, url, resolve, reject) {
		return () => {
			handler(url).then((res) => resolve(res)).finally(() => {
				this.count--
				if (this.taskQueue.length > 0) {
					const nextQ = this.taskQueue.shift()
					nextQ()
				}
			})
			this.count ++ 
		}
	}
}

const limit = new limitPromise(3)
function handler(url) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(url, 'time')
			resolve(`url${url}`)
		}, 1000)
	})
}
function request(url) {
	return limit.call(handler, url)
}

request('a').then(res=>console.log(res));
request('b').then(res=>console.log(res));
request('c').then(res=>console.log(res));
request('d').then(res=>console.log(res));
request('e').then(res=>console.log(res));
request('r').then(res=>console.log(res));
request('g').then(res=>console.log(res));

