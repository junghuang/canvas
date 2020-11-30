// 给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。
//
// 若可行，输出任意可行的结果。若不可行，返回空字符串。
//
// 示例1:
//
// 输入: S = "aab"
// 输出: "aba"
// 示例 2:
//
// 输入: S = "aaab"
// 输出: ""


/**
 * @param {string} S
 * @return {string}
 */

var reorganizeString = function(S) {
  // "abbaa" -> ["a","a","a","b","b"] -> ["aaa","bb"]
  let templist = S.split("")
    .sort()
    .reduce((prev, curr) => {
      if (prev.length > 0 && curr === prev[0][0]) {
        prev[0] += curr;
      } else {
        prev.unshift(curr);
      }
      return prev;
    }, [])
    .sort((a, b) => b.length - a.length);
  let res = new Array(S.length);
  // 如果第一个元素的超过其总长度的一半，无法生成字符串，则返回 0
  if (templist[0].length >= S.length / 2 + 1) return "";

  // ["aaa","bb"] -> "aaabb"
  templist = templist.join("");
  // 进行重排，先插入偶数位置，再插入奇数位置
  for (let i = 0; i < templist.length; i++) {
    if (i * 2 < S.length) {
      res[i * 2] = templist[i];
    } else {
      res[(i - (S.length + (S.length % 2)) / 2) * 2 + 1] = templist[i];
    }
  }
  return res.join("");
};

