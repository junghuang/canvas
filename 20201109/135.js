// 老师想给孩子们分发糖果，有 N个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。
//
// 你需要按照以下要求，帮助老师给这些孩子分发糖果：
//
// 每个孩子至少分配到 1 个糖果。
// 相邻的孩子中，评分高的孩子必须获得更多的糖果。
// 那么这样下来，老师至少需要准备多少颗糖果呢？
//
// 示例1:
//
// 输入: [1,0,2]
// 输出: 5
// 解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
//
// 示例2:
//
// 输入: [1,2,2]
// 输出: 4
// 解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。
//      第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
/**
 * @param {number[]} ratings
 * @return {number}
 */

var candy = function (ratings) {
  if (!ratings || !ratings.length) return 0;

  // 每个孩子都有至少一颗糖果
  const candies = Array(ratings.length).fill(1);

  // 先考虑每个孩子左边的孩子，如果他比左边的分数高，就把他的糖果改成左边孩子糖果+1
  for (let i = 1; i < ratings.length; i++) {
    // 因为初始糖果数都是 1，所以 candies[i] <= candies[i - 1] 这个判断条件就没必要啦
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  }

  // 再考虑每个孩子右边的孩子，如果他比右边的分数高，而且他的糖果比右边的少，
  // 就将他的糖果数在右边孩子糖果的基础上加一
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1])
      candies[i] = candies[i + 1] + 1;
  }

  // 求和
  return candies.reduce((a, b) => a + b, 0);
};

