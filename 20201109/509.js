/**
 * @param {number} n
 * @return {number}
 */

var fib = function(n) {
  const res = {}
  return foo(n)
  function foo(n) {
    if(n == 0) return 0
    if(n == 1 || n == 2) return 1
    if(res[n]) return res[n]
    res[n] = foo(n-1) + foo(n-2)
    return res[n]
  }
}
// var fib = function(n) {
//   if(n == 0) return 0
//   if(n == 1) return 1
//   return fib(n-1)+fib(n-2)
// };
