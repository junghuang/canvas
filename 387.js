// 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
//
//
// 示例：
//
// s = "leetcode"
// 返回 0
//
// s = "loveleetcode"
// 返回 2


/**
 * @param {string} s
 * @return {number}
 */
// var firstUniqChar = function(s) {
//   for(let i = 0 ; i < s.length; i++) {
//     if(s.indexOf(s[i]) === s.lastIndexOf(s[i])) return i
//   }
//   return -1
// };

// 他解1
var firstUniqChar = function (s) {
  const counts = new Array(26).fill(0); // 长度为26的数组，存放字符的出现次数

  for (const c of s) { // 遍历s的每个字符，统计出现次数
    counts[c.charCodeAt(0) - 97]++; // 97是 a 的Unicode值
  }
  for (let i = 0; i < s.length; i++) { // 再次遍历s
    if (counts[s[i].charCodeAt(0) - 97] == 1) { // 找出第一个频次为1的字符的索引
      return i;
    }
  }
  return -1;  // 没有只出现1次的字符，返回-1
};


// 他解2
/**
 * @param {string} s
 * @return {number}
 */
// var firstUniqChar = function(s) {
//     const map = new Map()
//     for (const c of s) {
//         map.set(c, (map.get(c) || 0) + 1)
//     }
//     for (let i = 0; i < s.length; i++) {
//         if (map.get(s[i]) === 1) return i
//     }
//     return -1
// }
