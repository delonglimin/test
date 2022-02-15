// // 快排
// /**
//  * @param {number[]} nums
//  * @return {number[]}
//  */
//  var sortArray = function(nums) {
//     quickSort(nums, 0, nums.length - 1)
//     return nums
// };
// function quickSort(nums, start, end) {
//     if (start >= end) return
//     let l = start;
//     let r = end;
//     let pivot = nums[Math.floor((l + r) /2)]
//     while(l <= r) {
//         while(l <= r && nums[l] < pivot) l++
//         while(l <= r && nums[r] > pivot) r--
//         if (l <= r) {
//             [nums[l], nums[r]] = [nums[r], nums[l]]
//             l++
//             r--
//         }
//     }
//     quickSort(nums, start, r)
//     quickSort(nums,l, end)
// }

// // 二分查找
// function binarySearch(nums, target) {
//     let l = 0; r = nums.length - 1, mid;
//     while (l <= r) {
//         mid = Math.floor((l + r) / 2);
//         if (target > nums[mid]) {
//             l = mid + 1;
//         } else {
//             r = mid - 1;
//         }
//     }
//     return l;
// }

// // 单调队列 单调递减
// // 当前值比q中最后一位小就pop一个p
// function main(arr, k) {
//     let q = []
//     for (let i = 0; i < arr.length; i++) {
//         while(q.length && arr[q[q.length - 1]] > arr[i]) q.pop();
//         q.push(i)
//         if(i - q[0] == k) q.shift()
//     }
// }

// /**
//  * @param {number} k
//  * @param {number[]} nums
//  */
//  var KthLargest = function(k, nums) {
//     this.k = k;
//     this.heap = new smallHeap()
//     for(let i = 0;i<nums.length;i++) {
//         this.add(nums[i])
//     }
// };

// // 最大堆
// /** 
//  * @val {number} 这里输入数字
//  * @return {number} 返回最大堆也就是小顶堆的头节点
//  */
// KthLargest.prototype.add = function(val) {
//     if (this.heap.size() < this.k) {
//         this.heap.push(val)
//     } else {
//         if (this.heap.top() < val) {
//             this.heap.pop()
//             this.heap.push(val)
//         }
//     }
//     return this.heap.top()
// };
// class smallHeap {
//     constructor() {
//         this.heap = []
//         this.tail = 0
//     }
//     push(val) {
//         this.heap[this.tail++] = val;
//         let cur = this.tail - 1;
//         while(cur && this.heap[cur] < this.heap[Math.floor((cur - 1) / 2)]) {
//             this.swap(cur, Math.floor((cur - 1) / 2)
//             cur = Math.floor((cur - 1) / 2)
//         }
//     }
//     pop() {
//         this.swap(0, this.tail - 1)
//         this.tail--
//         const pre = this.tail - 1;
//         let cur = 0;
//         while(cur * 2 + 1 <= pre) {
//             let temp = cur;
//             if (this.heap[cur] > this.heap[cur * 2 + 1]) temp = cur * 2 + 1;
//             if ((cur * 2 + 2) <= pre && this.heap[temp] > this.heap[cur * 2 + 2]) {
//                 temp = cur * 2 + 2
//             }
//             if (temp == cur) return
//             this.swap(cur, temp)
//             cur = temp
//         }
//     }
//     swap(n ,m) {
//         [this.heap[n], this.heap[m]] = [this.heap[m], this.heap[n]]
//     }
//     size() {
//         return this.tail
//     }
//     top() {
//         return this.heap[0]
//     }
// }

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// 单调栈 下一个最大元素，前一个最大元素

function main(arr) {
    let s = [];
    let pre = [], nxt = []
    for(let i = 0;i<arr.length;i++) {
        while(s.length && arr[i] > arr[s[s.length - 1]]) {
            nxt[s[s.length  -1]] = i;
            s.pop()
        }
        if (s.length == 0) {
            pre[i] = -1;   
        } else {
            pre[i] = s[s.length - 1]
        }
        s.push(i)
    }
    while(s.length) {
        nxt[s[s.length - 1]] = -1
        s.pop()
    }
    console.log(nxt, pre)
}
console.log(main([3,1,4,5,2,9,14,12]))
