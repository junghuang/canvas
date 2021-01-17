// 在一个XY 坐标系中有一些点，我们用数组coordinates来分别记录它们的坐标，
// 其中coordinates[i] = [x, y]表示横坐标为 x、纵坐标为 y的点。
//
// 请你来判断，这些点是否在该坐标系中属于同一条直线上，是则返回 true，否则请返回 false


/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function(coordinates) {
  let y = coordinates[1][1] - coordinates[0][1]
  let x = coordinates[1][0] - coordinates[0][0]
  if(x == 0) {
    for(let [a,b] of coordinates) {
      if(a != coordinates[0][0]) return false
    }
  } else if(y == 0) {
    for(let [a,b] of coordinates) {
      if(b != coordinates[0][1]) return false
    }
  }else {
    for(let [a,b] of coordinates) {
      if((b-coordinates[0][1]) * x != (a - coordinates[0][0]) * y) return false
    }
  }
  return true
};
