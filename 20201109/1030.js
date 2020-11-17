/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
var allCellsDistOrder = function(R, C, r0, c0) {
  const res = []
  for(let i = 0;i < R; i++){
    for(let j = 0; j < C; j++){
      res.push([i,j])
    }
  }
  // console.log(res)
  return res.map(item=>{// 这里要直接return,不能结束后再return res
    return{
      value:item,
      distance:Math.abs(item[0]-r0)+Math.abs(item[1]-c0)
    }
  }).sort((a,b)=>a.distance-b.distance).map(item=>item.value)
};

// test
console.log(allCellsDistOrder(2, 3, 1, 2));


// 更简洁一点
var allCellsDistOrder = function(R, C, r0, c0) {
  let arr = [];
  for(let r = 0; r< R;r++){
    for(let c = 0; c < C; c++){
      arr.push([r, c, Math.abs(r - r0) + Math.abs(c - c0)])
    }
  }
  arr.sort((a, b) => a[2] - b[2])
  return arr.map(item => ([item[0], item[1]]))
};

