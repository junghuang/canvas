// 给定两个字符串s和t，判断它们是否是同构的。
//
// 如果s中的字符可以被替换得到t，那么这两个字符串是同构的。
//
// 所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。
//
// 示例 1:
// 输入: s = "egg", t = "add"
// 输出: true
//
// 示例 2:
// 输入: s = "foo", t = "bar"
// 输出: false
//
// 示例 3:
// 输入: s = "paper", t = "title"
// 输出: true

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

var isIsomorphic = function(s, t) {
  const n = s.length
  for(let i = 0; i < n; i++) {
    if(s.indexOf(s[i]) !== t.indexOf(t[i])) return false
  }
  return true
};
// var isIsomorphic = function(s, t) {
//   const n = s.length
//   const mapS = new Map()
//   const mapT = new Map()
//   for(let i = 0; i < n; i++) {
//     if(!mapS.get(s[i])) mapS.set(s[i],t[i])
//     if(!mapT.get(t[i])) mapT.set(t[i],s[i])
//     if(mapS.get(s[i]) !== t[i] || mapT.get(t[i]) !== s[i]) return false
//   }
//   return true
// };
