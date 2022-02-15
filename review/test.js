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

        for (let i = start + 1; i < num; i++) {
            dfs(i, [...arr, i], sum + i);
        }
    };
    dfs(0, [], 0);
    return ret
};
console.log(combinationSum3(15,3, 20))