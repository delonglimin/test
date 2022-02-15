/**
 * 全排列 回朔
 */

/**
 * 字符流中第一个不重复的字符 google  ggg#ll
 */
function testStr(str) {
    let map = new Map()
    let i = 0
    let result = ""
    function check(map) {
        for (let i of map.keys()) {
            if (map.get(i) == 1)
                return i
        }
        return '#'
    }
    while (i < str.length) {

        let cur = str.charAt(i)
        if (!map.has(cur)) {
            map.set(cur, 1)
        } else {
            map.set(cur, map.get(cur) + 1)
        }

        result += check(map)
        console.log(result)
        i++
    }
    return result

}
// testStr('google')

/**
 * 所有组合、k个数的和是n、矩阵查找字符串、动态规划
 * 123
 * getIndex 存储已经取过的下标，arr 存储之前选取的指
 * result = []
def trackback(路径， 选择列表)：
    if 满足结束条件：
        result.add(路径)
        return
    for 选择 in 选择列表：
        //做选择
        路径.add(选择)
        //进入下一层决策
        trackback(路径，选择列表)
        //撤销选择
        路径.remove(选择)
for 选择 in 选择列表:
    # 做选择
    将该选择从选择列表移除
    路径.add(选择)
    backtrack(路径, 选择列表)
    # 撤销选择
    路径.remove(选择)
    将该选择再加入选择列表
 */
//打印所有组合
function allZH(nums) {
    let ret = []
    const dfs = (arr, getIndex) => {
        if (arr.length === nums.length) {
            ret.push(arr);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (!!getIndex[i]) continue; // 如果存在，则代表已经有这个值了
            getIndex[i] = 1;
            dfs([...arr, num], getIndex);
            getIndex[i] = 0;
        }
    }
    const getIndexArr = new Array(nums.length)
    dfs([], getIndexArr);
    return ret;
}
//[1,2,3,4,5,6,7] => k=3 n=9 [126,135,234]
//所有k个数相加等于n的组合
var combinationSum3 = function (num, k, n) {
    const ret = [];
    const dfs = (start, arr, sum) => {
        if (arr.length === k && sum === n) {
            ret.push(arr);
            return;
        }
        if (arr.length > k || sum > n) {
            return;
        }

        for (let i = start + 1; i < num.length; i++) {
            dfs(i, [...arr, i], sum + i);
        }
    };
    dfs(0, [], 0);
    return ret
};
// console.log(combinationSum3(15,3, 20))
/**
 *矩阵查找字符串,['a','b','c','d'],['e','f','g','h'],['i','g','k','l']
 回朔 边界，路径和待选择列表，上下 左右',bcgh
 */
function findStrFromMatrix(matrix, word) {
    const [m, n] = [matrix.length, matrix[0].length];
    const dfs = (i, j, index) => {
        if (i < 0 || i > m || j < 0 || j > n || matrix[i][j] !== word[index]) return false
        if (index === word.length - 1) return true;
        const temp = board[i][j];
        board[i][j] = '';
        const res =
            dfs(i + 1, j, index + 1) ||
            dfs(i, j + 1, index + 1) ||
            dfs(i - 1, j, index + 1) ||
            dfs(i, j - 1, index + 1);
        board[i][j] = temp;
        return res;
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    return false
}
//* @param {多个字符串数组，全排列组合} arr 
function allArr(arr) {
    let result = []
    let [m, n] = [arr.length, arr[0].length]
    const dfs = (temp, num) => {
        if (num > m) { return }
        if (temp.length == m) {
            result.push(temp)
            return
        }
        for (let j = 0; j < n; j++) {
            dfs([...temp, arr[num][j]], num + 1)
        }
    }
    dfs([], 0)
    return result
}

function node(val) {
    this.val = val
    this.left = null
    this.right = null
}
function binaryTree() {
    this.root = null
    this.insert = function (node) {
        if (this.root == null) {
            this.root = node
        } else {
            this.insertNode(this.root, node)
        }
    }
    this.insertNode = function (parentNode, childNode) {
        if (childNode.val < parentNode.val) {
            if (parentNode.left === null) {
                parentNode.left = childNode;
            } else {
                this.insertNode(parentNode.left, childNode);
            }
        } else {
            if (parentNode.right === null) {
                parentNode.right = childNode;
            } else {
                this.insertNode(parentNode.right, childNode);
            }
        }
    }
}
var tree = new binaryTree()
var l = [2, 5, 4, 1, 3, 6]
l.forEach(i => {
    tree.insert(new node(i))
});

function preOrderPrint(root) {
    if (root == null) {
        return
    }
    console.log(root.val)
    preOrderPrint(root.left)
    preOrderPrint(root.right)
}
//宽度优先遍历
function widPrint(root) {
    let quene = []
    quene.unshift(root)
    while (quene.length != 0) {
        let temp = quene.shift()
        console.log(temp.val)
        if (temp.left) {
            quene.push(temp.left)
        }
        if (temp.right) {
            quene.push(temp.right)
        }
    }
}
// preOrderPrint(tree.root)
// widPrint(tree.root)
//打印二叉树每一层的节点个数
function printTreeNodesNum(node) {
    let layerMap = new Map()
    curLayer = 1
    curLayerNodes = 0

    function p(root) {
        let quene = []
        quene.unshift(root)
        layerMap.set(root, 1)
        while (quene.length != 0) {
            let temp = quene.shift()
            let curNodeLayer = layerMap.get(temp)
            if (curNodeLayer != curLayer) {
                //说明遍历到下一层
                // console.log(`第${curNodeLayer}层`,curLayerNodes)
                curLayerNodes = 1
                console.log(`第${curNodeLayer}层第一个`, curLayerNodes)
                curLayer++
            } else {
                //说明是同一层
                curLayerNodes++
                console.log(`第--${curNodeLayer}层`, curLayerNodes)
            }
            if (temp.left) {
                quene.push(temp.left)
                layerMap.set(temp.left, curNodeLayer + 1)
            }
            if (temp.right) {
                quene.push(temp.right)
                layerMap.set(temp.right, curNodeLayer + 1)
            }
        }
    }
    p(node)
}
// printTreeNodesNum(tree.root)
//二叉树深度
function getDeepth(node) {
    if (node == null) {
        return 0
    }
    return process(node)
    function process(node) {
        if (node == null) {
            return 0
        }
        let leftDeepth = process(node.left)
        let rightDeepth = process(node.right)
        // console.log("===", node.val)
        return Math.max(rightDeepth, leftDeepth) + 1
    }
}
//叶子结点的个数
function getleafNum(node) {
    let total = 0
    process(node)
    return total
    function process(node) {
        if (node == null) {
            return 0
        }
        if (node.left == null && node.right == null) {
            total++
        }
        process(node.left)
        process(node.right)

    }
}
//判断两个二叉树结构是否一样
function checkTree(node1, node2) {
    if (node1 == null && node2 == null) {
        return true
    }
    if (node1 == null || node2 == null)
        return false
    let temp1 = checkTree(node1.left, node2.left)
    let temp2 = checkTree(node1.right, node2.right)
    return temp1 && temp2
}
//二叉树镜像
function treeMirror(node) {
    if (node == null) {
        return null
    }
    let left = treeMirror(node.left)
    let right = treeMirror(node.right)
    node.left = right
    node.left = left
    return node
}
//二叉树两个节点的最近公共父节点，查找一个节点是否在树里，
//深度遍历，直到
function sameParent(node1, node2) {

}
function getNodePath(root, node) {
    let path = []
    function process(root, node) {
        if (root == node) {
            path.push(root)
            return true
        }
        if (root == null) {
            return false
        }
        path.push(root)
        let result = false
        result = process(root.left, node)
        if (!result)
            result = process(root.right, node)
        if (!result)
            path.pop()
        return result
    }
    process(root, node)
    return path
}
//二叉树中相距最远的两个节点之间的距离,最大距离和深度，求出每个节点左子树的高度加上右子树的高度加2

function getMaxDistance(head) {
    let result = 0
    process()
    return result
    function process(head) {
        if (head == null) {
            return 0
        }
        let leftHeight = process(head.left)
        let rightHeight = process(head.right)
        result = Math.max(result, leftHeight + rightHeight + 2)
        return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1

    }

}
//  判断是否是完全二叉树，左节点不为空，右节点为空的话，已经出现了有空子树的节点了，后面出现的必须为叶节点（左右子树都为空
// 写个开关标注是否出现了左节点不为空，右节点为空
//是不是平衡二叉树,如果左树右树都是平衡树，并且高度差不大于1，则返回true
function checkBalance(node) {
    let result = process(node)
    function process(node) {
        if (node == null) {
            return {
                flag: true,
                height: 0
            }
        }
        let leftData = process(node.left)
        let rightData = process(node.right)
        if (leftData.flag && rightData.flag && Math.abs(leftData.height - rightData.height) <= 1) {
            return {
                flag: true,
                height: Math.max(leftData.height, rightData.height) + 1
            }
        } else {
            return {
                flag: false,
                height: Math.max(leftData.height, rightData.height) + 1
            }
        }
    }
    return result.flag
}

//二叉树序列化 反序列化
function seriolizeTree(head){
    let result = ""
    process(head)
    function process(head){
        if(head == null){
            result+='#_'
            return
        }
        result = result+head.val+'_'
        process(head.left)
        process(head.right)
    }
    return result
}
function unSeriolizeTree(str){
    let result = str.split('_')
    let index = 0
    return process(result)

    function process(result){
        if(result[index]=='#'){
            index++
            return null
        }else{
            var node = new Node(result[index])
            index++
            node.left = process(str)
            node.right = process(str)
            return node
        }

    }
}
console.log(seriolizeTree(tree.root))
//判断t是不是s的异位字符串
function checkDiff(s, t) {
    //charCodeAt-charCodeAt('a')
    //或者map
    let temp = new Array(26).fill(0)
    for (let i = 0; i < s.length; i++) {
        temp[s.charCodeAt(i) - 97] += 1
    }
    for (let i = 0; i < t.length; i++) {
        temp[t.charCodeAt(i) - 97] -= 1
    }
    console.log(temp)

    let result = temp.filter((item) => { return item != 0 })
    console.log(result)
    return result.length == 0
}
//需要等待多久 温度可以升高
//栈如何解决：处理后的元素从栈里弹出
function tempDay(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let index = i + 1
        while (index < arr.length && arr[index] <= arr[i]) {
            index++
        }
        if (index == arr.length) {
            result.push(0)
        } else {
            result.push(index - i)

        }
    }
    return result
}
//没个k窗口大小的最大值
function winMax(arr,k){
    let head = 0;tail=k-1
    let result = []
    while(tail<arr.length){
        result.push(Math.max.apply(null,arr.slice(head,tail+1)))
        tail++
        head++
    }
    return result
    
}
// console.log(winMax([1,3,-1,-3,5,3,6,7],3))