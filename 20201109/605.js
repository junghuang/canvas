// 假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
//
// 给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数n。能否在不打破种植规则的情况下种入n朵花？
// 能则返回True，不能则返回False。
//
// 示例 1:
// 输入: flowerbed = [1,0,0,0,1], n = 1
// 输出: True
//
// 示例 2:
// 输入: flowerbed = [1,0,0,0,1], n = 2
// 输出: False

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
  if(flowerbed.length == 0) return n == 0 ? true:false
  let count = 0
  for(let i = 0; i < flowerbed.length; i++) {
    if(!flowerbed[i] && (i-1 < 0 ||!flowerbed[i-1]) && (i+1>flowerbed.length || !flowerbed[i+1])) {
      flowerbed[i] = 1
      count++
      i++ // 相当于i+=2少判断一些
    }

  }
  return count >= n ? true:false
};

console.log(canPlaceFlowers([0, 0, 1, 0, 0], 1));
