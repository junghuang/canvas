/**
 * 杨辉三角
 */

/**
 * @param {number} numRows
 * @return {number[][]}
 */


/**
 * @param {number} numRows
 * @return {number[][]}
 */
// 简洁一点
var generate = function(numRows) {
  let res = [];
  for(let i = 0; i < numRows; i++){
    let row = [];
    row[0] = 1;
    row[i] = 1;
    if(i > 1){
      for(let j = 1; j < i; j++){
        row[j] = res[i - 1][j - 1] + res[i - 1][j];
      }
    }
    res.push(row);
  }
  return res;
};


// 自己写得有点不简洁
var generate = function(numRows) {
  const res = []
  if(numRows === 0) return res

  res.push([1])
  if(numRows === 1) return res

  res.push([1,1])
  if(numRows === 2) return res

  for(let i = 2; i < numRows; i++) {
    let nx = new Array(2).fill(1)
    for(let j = 1; j < i; j++) {
      nx.splice(j, 0, res[i - 1][j - 1] + res[i - 1][j])
    }
    res.push(nx)
  }
  return res
};

