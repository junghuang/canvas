
// 204. 计数质数
// 统计所有小于非负整数 n 的质数的数量。
/**
 * @param {number} n
 * @return {number}
 */

// 线性筛
var countPrimes = function(n) {
  const isPrime = new Array(n).fill(1);
  const primes = [];
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      primes.push(i);
    }
    for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
      isPrime[i * primes[j]] = 0;
      if (i % primes[j] === 0) {
        break;
      }
    }
  }
  return primes.length;
};


// 埃氏筛 O(n log(log n))
// var countPrimes = function(n) {
//   const isPrime = new Array(n).fill(1);
//   let ans = 0;
//   for (let i = 2; i < n; ++i) {
//     if (isPrime[i]) {
//       ans += 1;
//       for (let j = i * i; j < n; j += i) {
//         isPrime[j] = 0;
//       }
//     }
//   }
//   return ans;
// };



// 暴力枚举，O(n * 根号n)
// var countPrimes = function(n) {
//   if(n <= 1) return 0
//
//   let count = 0
//   for(let i = 2; i < n; i++) {
//     if(test(i)) {
//       console.log(i)
//       count ++
//     }
//   }
//   return count
//
//   function test(num) {
//     for(let i = 2; i * i <= num; i++) {
//       if(num % i === 0) {
//         return false
//       }
//     }
//     return true
//   }
// };


