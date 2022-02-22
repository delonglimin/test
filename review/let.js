
var twoSum = function (nums, target) {
    //将数组查找换成map.have()
    for (let i = 0; i < nums.length; i++) {
        var temp = nums.indexOf(target - nums[i], i + 1)
        if (temp != -1) {
            return [i, temp]
        }
    }
    return []
};

function tosum(nums,target) {
    let map = new Map()
    for(let i =0;i<nums.length;i++){
        let temp = target-nums[i]
        if(map.has(temp)){
            return [map.get(temp),i]
        }else{
            map.set(temp,i)
        }
    }
    return []
}

function linkSum(l1,l2) {
    let dummp = new listNode()
    let cur = dummp
    let jinwei = 0
    while(l1 != null || l2 != null){
        let sum = 0
        if(l1 != null){
            sum += l1.val
            l1 = l1.next
        }
        if(l2 != null){
            sum += l2.val
            l2 = l2.next
        }
        sum += jinwei
        jinwei = sum / 10 
        cur.next = new listNode(sum % 10 )
        cur = cur.next
    }
    if(jinwei != 0){
        cur.next= new listNode(jinwei)
    }
    return dummp.next
}



/**
 * @param {string} s罗马数字转整数
 * @return {number}
 */
var romanToInt = function (s) {
    let result = 0
    let str = s.split('')
    for (var i = 0; i < str.length; i++) {
        switch (str[i]) {
            case 'I':
                if (i < str.length && str[i + 1] == 'V') {
                    result += 4
                    i++
                    break
                } else if (i < str.length && str[i + 1] == 'X') {
                    result += 9
                    i++
                    break
                } else {
                    result += 1
                }
                break
            case 'V':
                result += 5
                break
            case 'X':
                if (i < str.length && str[i + 1] == 'L') {
                    result += 40
                    i++
                    break
                } else if (i < str.length && str[i + 1] == 'C') {
                    result += 90
                    i++
                    break
                } else {
                    result += 10
                }
                break
            case 'L':
                result += 50
                break
            case 'C':
                if (i < str.length && str[i + 1] == 'D') {
                    result += 400
                    i++
                    break
                } else if (i < str.length && str[i + 1] == 'M') {
                    result += 900
                    i++
                    break
                } else {
                    result += 100
                }
                break
            case 'D':
                result += 500
                break
            case 'M':
                result += 1000
                break
        }
    }
    return result
};

/**
 * @param {string[]} strs最长公共前缀
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let result = ''

    if (strs.length == 0) {
        return result
    }
    if (strs.length == 1) {
        return strs[0]
    }
    result = lcp(strs[0], strs[1])
    for (let i = 2; i < strs.length; i++) {
        result = lcp(result, strs[i])
    }
    return result

    function lcp(str1, str2) {
        let result = ''
        if (str1 == '' || str2 == '') {
            return result
        }
        let ln = Math.min(str1.length, str2.length)
        let i = 0;
        while (i < ln && str1[i] == str2[i]) {
            result += str1[i]
            i++
        }
        return result
    }
};
//合并两个有序链表
var mergeTwoLists = function (list1, list2) {
    if (list1 == null && list2 == null) {
        return null
    }
    if (list1 == null && list2 !== null) {
        return list2
    }
    if (list1 !== null && list2 == null) {
        return list1
    }
    let index1 = list1
    let index2 = list2
    var result
    var temp
    while (index1 != null & index2 != null) {
        if (index1.val < index2.val) {
            if (!result) {
                result = index1
                temp = result
            } else {
                temp.next = index1
                temp = temp.next
            }

            index1 = index1.next
        } else {
            if (!result) {
                result = index2
                temp = result
            } else {
                temp.next = index2
                temp = temp.next

            }
            index2 = index2.next
        }
    }
    if (index1) {
        temp.next = index1
    }
    if (index2) {
        temp.next = index2
    }
    return result
};

//二叉树是否对称
//两棵树根节点一样，每个树的右子树与另一个树的左子树 对称

function check(node1, node2) {
    if (node1 == null && node2 == null) {
        return true
    }
    if (node1 == null || node2 == null) {
        return false
    }
    return (node1.val == node2.val && check(node1.left, node2.right) && check(node1.right, node2.left))
}
//开跟方
var mySqrt = function (x) {
    let result = 1
    let num = 1
    while (num <= x) {
        result++
        num = result * result
    }
    return result - 1
};
//爬楼梯
var climbStairs = function (n) {
    if (n < 1) {
        return 0
    }
    if (n == 1) {
        return 1
    }
    if (n == 2) {
        return 2
    }
    return climbStairs(n - 1) + climbStairs(n - 2)
    
};

var rotate = function(matrix) {
    let [m,n]=[matrix.length,matrix[0].length]
    let temp =  new Array()
    for(let i=m-1;i>=0;i--){
        for(let j =0;j<n;j++){
            console.log(matrix[i][j])
        }
    }
};

var reverseKGroup = function(head, k) {

    let copyHead = head
    let index =0
    while(copyHead){
        copyHead = copyHead.next
        index ++
    }
    if(index<k){
        return head
    }
    let pre = null
    let cur = head

    let n = k
    while(cur != null && n-->0){
        let temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    head.next = reverseKGroup(next,k)
    return head
}
// console.log(rotate([[1,2,3],[4,5,6],[7,8,9]]))
//两个字符串相乘
//num[i]*num[j]就是res[i+j] 和res[i+j+1]的位置
function xiangcheng(num1,num2) {
    let m = num1.length
    let n = num2.length
    let result = new Array(m+n).fill(0)
    for(let i =m-1;i>=0;i--){
        for(let j = n-1;j>=0;j--){
            let temp = (num1[i]-0)*(num2[j]-0)
            let p1 = i+j
            let p2 = i+j+1
            let sum = temp + result[p2]
            result[p2]=sum%10
            result[p1]+=parseInt(sum/10)
        }
    }
}

/**
 * 三数之和
 * @param {*} nums 
 */
var threeSum = function(nums) {
    let result = []
    function dfs(start,arr,sum) {
        if(arr.length==3 && sum ==0){
            result.push(arr)
        }
        if(arr.length>3){
            return
        }
        for(let i =start;i<nums.length;i++){
            dfs(i,[...arr,nums[i]],sum+nums[i])
        }
    }

    dfs(0,[],0)
    return result
};

var combinationSum3 = function (num, k, n) {
    const ret = [];
    const dfs = ( arr, sum,getIndex) => {
        if (arr.length === k && sum === n) {
            ret.push(arr);
            return;
        }
        if (arr.length > k || sum > n) {
            return;
        }

        for (let i = 0 ; i < num.length; i++) {
            if (!!getIndex[i]) continue; // 如果存在，则代表已经有这个值了
            getIndex[i] = 1;
            dfs([...arr, num[i]], sum + num[i],getIndex);
            getIndex[i] = 0;

        }
    };
    const getIndexArr = new Array(num.length)
    dfs([], 0,getIndexArr);
    return ret
};
console.log(combinationSum3([1,3,5,6,2],3,10))

function allZH(nums) {
    let ret = []
    const dfs = (arr, getIndex) => {
        if (arr.length === nums.length) {
            ret.push(arr);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (!!getIndex[i]) continue; // 如果存在，则代表已经有这个值了
            getIndex[i] = 1;
            dfs([...arr, nums[i]],getIndex);
            getIndex[i] = 0;
        }
    }
    const getIndexArr = new Array(nums.length)
    dfs([], getIndexArr);
    return ret;
}
// console.log(allZH([3,1,2]))

//
function add1(arr) {
    let cur = arr.length -1 
    let jinwei =0
    if(arr[cur]+1==10){
        arr[cur] =0
        jinwei = 1
        cur --
    }
    
    while(jinwei == 1 && cur>=0){
        if(arr[cur]+jinwei==10){
            arr[cur] =0
            jinwei = 1
        }else{
            jinwei = 0
            arr[cur] =arr[cur]+jinwei
        }
    }
    if(jinwei == 1){
        arr.unshift(1)
    }
    return arr
}