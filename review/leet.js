
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
 * @param {string[]} strs
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
    if(list1 == null && list2==null){
        return null
    }
    if(list1 == null && list2!==null){
        return list2
    }
    if(list1 !== null && list2==null){
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
            } else{
                temp.next = index1
                temp= temp.next
            }

            index1 = index1.next
        } else {
            if (!result) {
                result = index2
                temp= result
            } else {
                temp.next = index2
                temp= temp.next

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