// 给定一个整数数组prices，其中第i个元素代表了第i天的股票价格 ；非负整数fee 代表了交易股票的手续费用。
//
// 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
//
// 返回获得利润的最大值。
//
// 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
//
// 示例 1:
// 输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
// 输出: 8
// 解释: 能够达到的最大利润:
//   在此处买入prices[0] = 1
// 在此处卖出 prices[3] = 8
// 在此处买入 prices[4] = 4
// 在此处卖出 prices[5] = 9
// 总利润:((8 - 1) - 2) + ((9 - 4) - 2) = 8.

/*
  动态规划 124ms 击败37%
  主要参考liweiwei1419大佬思路
  JS二维数组的创建参考https://blog.csdn.net/Tsingsn/article/details/52518168
  思路：
  假设每次买股票的时候付手续费（题目是说每笔交易付手续费，即一次完整的买卖付一次手续费）；
  1.状态定义：定义一个变量dp[i][j]，表示第i天的时候用户的收益，j是一个枚举对象，j=1表示用户当天账户持股，j=0表示用户当天没持股。
  2.要让利润最大，只要确定每天的收益选择是最佳的选择，每天需要相比前一天比较选出最好的选择，即可得出最后的最佳选择。
  3.状态转移方程：
  dp[i][0]:代表当天不持股的收益，当天不持股可能由两种情况得来：
  A.昨天没持股B.昨天持股，今天卖了。那么dp[i][0]的最佳收益选择就是Math.max(dp[i-1][0],dp[i-1][1]+prices[i])
  dp[i][1]:代表当天持股的收益，当天持股可能由两种情况得来：
  A.昨天也持股B.昨天没持股，今天买了。那么dp[i][1]的最佳收益选择就是Math.max(dp[i-1][1],dp[i-1][0]-prices[i]-fee)
  4.思考初始状态值的收益：
  dp[0][0]:0;
  dp[0][1]:0-fee-price[i]
  5.最终要求的值是dp[prices.length-1][0],最后一天不持股的收益
 */
var maxProfit = function(prices, fee) {
  let dp=new Array(prices.length);//i行，对应i天
  for(let i = 0;i < dp.length; i++){
    dp[i] = new Array(2);    //每行有2列，对应2种持股状态
  }
  dp[0][0]=0;
  dp[0][1]=0-fee-prices[0];
  for(let i=1;i<prices.length;i++){
    dp[i][0]=Math.max(dp[i-1][0],dp[i-1][1]+prices[i]);
    dp[i][1]=Math.max(dp[i-1][1],dp[i-1][0]-prices[i]-fee);
  }
  return dp[prices.length-1][0]
};

// 超时
// var maxProfit = function(prices, fee) {
//   const res = [0, prices[1] - prices[0] - fee >= 0? prices[1] - prices[0] - fee: 0]
//   for(let i = 2; i < prices.length; i++) {
//     let max = (res[i - 1]>=0?res[i - 1]:0)
//     for(let j = 0; j < i; j++) {
//       if(j === 0 ) max = Math.max(max, prices[i] - prices[j] - fee)
//       else max = Math.max(max, res[j - 1] + prices[i] - prices[j] -fee)
//     }
//     res[i] = max
//   }
//   return res[res.length - 1]>=0?res[res.length - 1]:0
// };

