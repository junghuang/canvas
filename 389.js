// 给定两个字符串 s 和 t，它们只包含小写字母。
//
// 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
//
// 请找出在 t 中被添加的字母。

var findTheDifference = function(s, t) {
  s = s.split("").sort()
  t = t.split("").sort()
  let i
  for(i = 0; i < s.length; i++) {
    console.log(i)
    if(s[i] !== t[i]) return t[i]
  }
  return t[i]
};
console.log(findTheDifference("ae", "aea"));
