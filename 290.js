// 给定一种规律 pattern和一个字符串str，判断 str 是否遵循相同的规律。
//
// 这里的遵循指完全匹配，例如，pattern里的每个字母和字符串str中的每个非空单词之间存在着双向连接的对应规律。
//
// 示例1:
//
//   输入: pattern = "abba", str = "dog cat cat dog"
// 输出: true
// 示例 2:
//
// 输入:pattern = "abba", str = "dog cat cat fish"
// 输出: false
// 示例 3:
//
// 输入: pattern = "aaaa", str = "dog cat cat dog"
// 输出: false
// 示例 4:
//
// 输入: pattern = "abba", str = "dog dog dog dog"
// 输出: false
//
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */

var wordPattern = function(pattern, str) {
  var arr = str.split(' ');
  if(pattern.length!=arr.length) return false;
  for(var i=0;i<pattern.length;i++){
    if(pattern.indexOf(pattern[i])!=arr.indexOf(arr[i])){
      return false;
    }
  }
  return true;
};

// 方法2
// var wordPattern = function(pattern, s) {
//   const arr = s.split(" ").map(a=>a.toUpperCase())
//   if(arr.length !== pattern.length) return false
//   const map = new Map()
//   for(let i = 0; i < pattern.length; i++) {
//     if(map.get(pattern[i])) {
//       if(arr[i] !== map.get(pattern[i])) return false
//     }else if(map.get(arr[i])){
//       if(pattern[i] !== map.get(arr[i])) return false
//     }else{
//       map.set(pattern[i],arr[i])
//       map.set(arr[i],pattern[i])
//     }
//   }
//   return true
// };
