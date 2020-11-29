// 给定由一些正数（代表长度）组成的数组 A，返回由其中三个长度组成的、面积不为零的三角形的最大周长。
//
// 如果不能形成任何面积不为零的三角形，返回 0。
/**
 * @param {number[]} A
 * @return {number}
 */
var largestPerimeter = function(A) {
  A.sort((a,b)=>b-a)
  while(A[0]&&A[1]&&A[2]){
    if(A[1]+A[2]>A[0]){
      return A[0]+A[1]+A[2]
    }else{
      A.shift()
    }
  }
  return 0
};
