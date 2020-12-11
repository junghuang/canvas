function solve( s ) {
  // write code here
  let max = -1
  for(let i = 0, j = s.length - 1 - i; i < s.length - 1; i++, j--) {
    let head = s.substring(0,i + 1)
    let tail = s.substring(j)
    if(head === tail){
      max = Math.max(max, head.length)
    }
    // console.log(head)
    // console.log(tail)
  }
  return max
}

console.log(solve("ABABA"));
console.log(solve("ABA"));
console.log(solve("ABC"));


function Maximumweight( v ,  g ,  V ) {
  // write code here
  v.unshift(0)
  g.unshift(0)

  const n = v.length
  const dp = new Array(n+1).fill(new Array(V+1).fill(0))
  for(let i = 1; i <= n; i++) {
    for(let j = V; j >= 0; j--) {
      if(j >= v[i]) {
        dp[i][j] = Math.max(dp[i - 1][j - v[i]]+g[i],dp[i - 1][j])
      }else{
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  // console.log(dp)
  return dp[n][V]
}

console.log(Maximumweight([1, 2, 3], [2, 3, 4], 3));
console.log(Maximumweight([1,3],[100,300],2));
