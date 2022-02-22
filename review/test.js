function lengthOfLongestStr(str) {
    let rightIndex = 0;
    let max = 0
    let temp = new Set()
    for (let i = 0; i < str.length; i++) {
        if (i != 0) {
            temp.delete(str.charAt(i - 1))
        }
        while (rightIndex < str.length && !temp.has(str.charAt(rightIndex))) {
            temp.add(str.charAt(rightIndex))
            rightIndex++

        }
        console.log(temp)
        max = Math.max(max, rightIndex - i)
    }
    return max
}
console.log(lengthOfLongestStr('abccasda'))
//无重复字符的最长字符串
function maxLength(str) {
    let i =0;j=0;max=0
    let set = new Set()
    if(str.length == 0){
        return 0
    }
    for(i;i<str.length;i++){
        if(!set.has(str[i])){
            set.add(str[i])
             max = Math.max(max,set.size())
        }else{
            while(set.has(str[i])){
                set.delete(str[j])
                j++
            }
            set.add(str[i])
        }
    }
    return max
}
//最长回文字符串
function longestHuiwen(str) {
    let max = 0;
    let start =0
    for(let i=0;i<str.length;i++){
        helper(i,i+1)
        helper(i-1,i+1)
    }
    function helper(left,right) {
        while(left>=0&& right <str.length&& str[left]== str[right]){
            if(right-left +1 >max){
                max = right - left +1
                start  = left
            }
            left --
            right++
        }
    }
    return str.subString(start,max)
}

function sum3(arr) {
    let result =[]
    arr.sort((a,b)=>{return a-b})
    for(let i =0;i<arr.length-2;i++){
        if(i ==0 || arr[i] !== arr[i-1]){
            let start = i+1,end = arr.length-1
            while(start<end){
                if(arr[i]+arr[start]+arr[end]==0){
                    result.push([arr[i],arr[start],arr[end]])
                    start ++
                    end --
                    //新移动的start 有可能和之前重复
                    while(start<end && arr[start] == arr[start-1]){
                        start ++
                    }
                    while(start<end && arr[end] == arr[start+1]){
                        end --
                    }
                }else if(arr[i]+arr[start]+arr[end]<0){
                    start++
                }else{
                    end--
                }
            }
        }
    }
    return result
}
//删除链表倒数第n个节点
function delLink(head) {
    let dummy = new listNode()
    dummy.next = head
    let n1 = dummy
    let n2 = dummy
    for(let i=0;i<=n;i++){
        n2= n2.next
    }
    while(n2!=null){
        n2 = n2.next
        n1= n1.next
    }
    n1.next = n1.next.next
    return dummy.next
}
// int[]
// 1. 所有元素都出现两次
// 2. 有且仅有一个元素出现一次，其余元素出现两次
// 写一个函数，判断有没有出现一次的元素？如果有，返回这个元素
// 要求：空间复杂度O(1)
// int[] = {1, 5, 5, 3, 8, 1, 8}，找到3
// int[] = {1, 5, 5, 8, 1, 8}，没有出现一次的元素

//查找一个数组里面只出现了一次的数，【1，2，3，2，3，4，4】或没有
function find(arr){
    let result = arr[0]
    let num = 0
      for(let i =1;i<arr.length;i++){
      if(arr[i]==0){
          num++
      }else{
          result ^= arr[i]
      }
    }
    return num != 1 ? null : result;
  }
  