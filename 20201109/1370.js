// 给你一个字符串s，请你根据下面的算法重新构造字符串：
//
// 从 s中选出 最小的字符，将它 接在结果字符串的后面。
// 从 s剩余字符中选出最小的字符，且该字符比上一个添加的字符大，将它 接在结果字符串后面。
// 重复步骤 2 ，直到你没法从 s中选择字符。
// 从 s中选出 最大的字符，将它 接在结果字符串的后面。
// 从 s剩余字符中选出最大的字符，且该字符比上一个添加的字符小，将它 接在结果字符串后面。
// 重复步骤 5，直到你没法从 s中选择字符。
// 重复步骤 1 到 6 ，直到 s中所有字符都已经被选过。
// 在任何一步中，如果最小或者最大字符不止一个，你可以选择其中任意一个，并将其添加到结果字符串。
//
// 请你返回将s中字符重新排序后的 结果字符串 。

/**
 * @param {string} s
 * @return {string}
 */

var sortString = function(s) {
  let res = ""

  let t = s.split("").sort()

  while(t.length){
    let prev, cur
    for(let i = 0; i < t.length; i++){
      cur = t[i]
      if(cur !== prev){
        prev = cur
        res += cur
        t.splice(i--,1)
      }
    }
    prev = undefined
    for(let i = t.length -1;i>=0;i--){
      cur = t[i]
      if(cur !== prev){
        prev = cur
        res += cur
        t.splice(i,1)
      }
    }
  }

  return res
};

// 官方解法
var sortString = function(s) {
  const num = new Array(26).fill(0);
  for (let ch of s) {
    num[ch.charCodeAt() - 'a'.charCodeAt()]++;
  }

  let ret = '';
  while (ret.length < s.length) {
    for (let i = 0; i < 26; i++) {
      if (num[i]) {
        ret += String.fromCharCode(i + 'a'.charCodeAt());
        num[i]--;
      }
    }
    for (let i = 25; i >= 0; i--) {
      if (num[i]) {
        ret += String.fromCharCode(i + 'a'.charCodeAt());
        num[i]--;
      }
    }
  }
  return ret;
};

