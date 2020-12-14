// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
//
// 示例:
//   输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
//   输出:
//   [
//     ["ate","eat","tea"],
//     ["nat","tan"],
//     ["bat"]
//   ]
/**
 * @param {string[]} strs
 * @return {string[][]}
 */

var groupAnagrams = function(strs) {
  const map = new Map();
  for (let str of strs) {
    let array = Array.from(str);
    array.sort();
    let key = array.toString();
    let list = map.get(key) ? map.get(key) : new Array();
    list.push(str);
    map.set(key, list);
  }
  return Array.from(map.values());//Map.values()返回一个包含集合中所有值的数组
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// var groupAnagrams = function(strs) {
//   if(!strs.length) return []
//   const res = []

//   strs = strs.map(a=>{
//     return {
//       before: a,
//       after: a.split("").sort().join("")
//     }
//   }).sort((a,b)=>a.after - b.after
//   )
//   console.log(strs)
//   let arr = [strs[0].before]
//   for(let i = 1; i < strs.length; i++) {
//     if(strs[i].after === strs[i - 1].after) {
//       arr.push(strs[i].before)
//     }else{
//       res.push(arr)
//       arr = [strs[i].before]
//     }
//   }
//   res.push(arr)
//   return res
// };
