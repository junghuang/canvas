给你两个数组，arr1 和 arr2，

// arr2 中的元素各不相同
// arr2 中的每个元素都出现在 arr1 中
// 对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。
//
//  
//
// 示例：
//
// 输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
// 输出：[2,2,2,1,4,3,3,9,6,7,19]
//
//
// 提示：
//
// arr1.length, arr2.length <= 1000
// 0 <= arr1[i], arr2[i] <= 1000
// arr2 中的元素 arr2[i] 各不相同
// arr2 中的每个元素 arr2[i] 都出现在 arr1 中

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
// 暴力
var relativeSortArray = function(arr1, arr2) {
  let res = []

  for(let i = 0; i < arr2.length; i++){
    for(let j = 0; j < arr1.length; j++){
      if(arr1[j] === arr2[i]){
        res.push(arr1.splice(j--,1)[0])
      }
    }
  }
  res = res.concat(arr1.sort((a,b)=>a-b))
  return  res
};


// // 写排序的方法
// var relativeSortArray = function(arr1, arr2) {
//     return arr1.sort((a, b) => {// 写一个排序
//         let ia = arr2.indexOf(a);
//         let ib = arr2.indexOf(b);
//         if(ia === -1 && ib === -1) { // 都不在arr2中，则升序排列
//             return a - b;
//         } else if (ia === -1) { // 一个在一个不在，则在的排前面
//             return 1;
//         } else if (ib === -1) { // 两个都在，则按arr2的顺序排列
//             return -1;
//         } else {
//             return ia - ib;
//         }
//     });
// };



