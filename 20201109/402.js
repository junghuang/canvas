// 给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。
//
// 注意:
//
//   num 的长度小于 10002 且 ≥ k。
// num 不会包含任何前导零。
// 示例 1 :
//
// 输入: num = "1432219", k = 3
// 输出: "1219"
// 解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。
// 示例 2 :
//
// 输入: num = "10200", k = 1
// 输出: "200"
// 解释: 移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
// 示例 3 :
//
// 输入: num = "10", k = 2
// 输出: "0"
// 解释: 从原数字移除所有的数字，剩余为空就是0。

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */

// 思路

// 我们肯定想挑高位的大的数删
// 从左遍历，还不知道要不要删当前遍历的数，先入栈暂存，保留对它的记忆
// 12345这样递增排列的数，我理解为“稳态”，只会删除它的末尾，不会考虑删除别的地方
// 所以，遇到比栈顶更大的数，依然“稳态”，入栈，维护栈的单调递增性
// 如果遇到比栈顶更小的，说明栈顶的数是要删的，为什么？也许后面还有更大的呢？
// 因为栈顶的数是在高位，删掉它，让高位数字变小，所带来的减小幅度更大。
//
// "1432219"   3
// bottom[1        ]top
// bottom[1 4      ]top
// bottom[1 3      ]top	4出栈
// bottom[1 2      ]top	3出栈
// bottom[1 2 2    ]top
// bottom[1 2      ]top	2出栈   出栈的个数满3个了，停止出栈
// bottom[1 2 1    ]top	1入栈
// bottom[1 2 1 9  ]top	9入栈


  // 还需要两步
// 如果k>0即未删除完，从尾部继续
// 去除前面无效的0

var removeKdigits = function(num, k) {
  let stack = []
  for(let i = 0; i < num.length; i++){
    let temp = num[i]
    //当遍历的元素比此时栈顶元素小，删除栈顶元素
    while(k > 0 && stack.length > 0 && temp < stack[stack.length - 1]){
      stack.pop();
      k--
    }
    stack.push(temp)
  }
  // 如果未删除，从尾部继续
  while(k > 0){
    stack.pop()
    k--;
  }
  // 去除无效的0
  while(stack.length > 0 && stack[0] === '0'){
    stack.shift()
  }

  return stack.length ? stack.join('') : '0'
};
