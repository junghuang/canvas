// 给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。
//
// 若可行，输出任意可行的结果。若不可行，返回空字符串。
//
// 示例1:
//
// 输入: S = "aab"
// 输出: "aba"
// 示例 2:
//
// 输入: S = "aaab"
// 输出: ""


/**
 * @param {string} S
 * @return {string}
 */

var reorganizeString = function(S) {
  // "abbaa" -> ["a","a","a","b","b"] -> ["aaa","bb"]
  let templist = S.split("")
    .sort()
    .reduce((prev, curr) => {
      if (prev.length > 0 && curr === prev[0][0]) {
        prev[0] += curr;
      } else {
        prev.unshift(curr);
      }
      return prev;
    }, [])
    .sort((a, b) => b.length - a.length);
  let res = new Array(S.length);
  // 如果第一个元素的超过其总长度的一半，无法生成字符串，则返回 0
  if (templist[0].length >= S.length / 2 + 1) return "";

  // ["aaa","bb"] -> "aaabb"
  templist = templist.join("");
  // 进行重排，先插入偶数位置，再插入奇数位置
  for (let i = 0; i < templist.length; i++) {
    if (i * 2 < S.length) {
      res[i * 2] = templist[i];
    } else {
      res[(i - (S.length + (S.length % 2)) / 2) * 2 + 1] = templist[i];
    }
  }
  return res.join("");
};


// 解法2
/**
 * @param {string} S
 * @return {string}
 * 思路：
 * 1.如果每个都是一个的话自然是直接通过的
 * 2.如果需要满足条件，需要其中重复最高的数字不能超过ceil(len/2)的个数（数学归纳法），否则就一定会有相邻字符
 * 3.字符串转换成对象，记录每个字符出现次数，最高的超过了边界值，直接返回空字符串，记录出现次数最多的值
 * 4.最高数没超过边界值，按照5的规则插入，保证不重复
 * 5.具体逻辑:以出现次数最多的字符初始化数组，可插入的位置为一号位到length位，不可以从0号位插入，否则abb这种测试用例不能通过
 * 也不能在length-1号位置结束，否则aaaabbbb这种测试用例不能通过
 *
 *
 */
var reorganizeString = function (S) {
  if (S.length < 2) {
    return ''
  }
  let obj = {}
  let maxkey = ''
  let maxnum = 0
  for (let item of S) {
    if (obj[item]) {
      obj[item]++
      if (obj[item] > maxnum) {
        maxnum = obj[item]
        maxkey = item
      }
      //重复最高的数字不能超过ceil(len/2)的个数
      if (obj[item] > Math.ceil(S.length / 2)) {
        return ''
      }
    } else {
      obj[item] = 1
    }
  }
  //最高数没超过边界值，按照顺序进行插入，保证不重复
  //起始插入位置只能是一号位，不能从0号位置开始，否则abb这种测试用例不会通过
  //插入位置初始化的条件需要在数组末尾，也就是length的位置，初始化的length为最多字符个数的长度
  let temparr = new Array(maxnum).fill(maxkey)
  delete obj[maxkey]
  let insertindex = 1
  while (temparr.length < S.length) {
      for (let [key, value] of Object.entries(obj)) {
      for (let i = 0; i < value; i++) {
        temparr.splice(insertindex, 0, key);
        //隔着位插入
        insertindex += 2
        maxnum--
        //插槽满了
        if (maxnum == 0) {
          //初始化插入位置和更新当前数组插槽数
          insertindex = 1
          maxnum = temparr.length
        }
      }
    }
  }
  return temparr.join('')
};

