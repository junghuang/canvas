// 给定一个数组nums，如果i < j且nums[i] > 2*nums[j]我们就将(i, j)称作一个重要翻转对。
//
// 你需要返回给定数组中的重要翻转对的数量。
//
// 示例 1:
//
// 输入: [1,3,2,3,1]
// 输出: 2
// 示例 2:
//
// 输入: [2,4,3,5,1]
// 输出: 3


/**
 * @param {number[]} nums
 * @return {number}
 */

// 归并
var reversePairs = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  return mergeSort(nums, new Array(nums.length), 0, nums.length - 1);
};

function mergeSort(nums, temp, start, end) {
  if (start == end) {
    return 0;
  }
  let count = 0;
  const mid = start + ((end - start) >> 1);
  count += mergeSort(nums, temp, start, mid);
  count += mergeSort(nums, temp, mid + 1, end);

  let i = start;
  let j = mid + 1;
  while (i <= mid && j <= end) {
    if (nums[i] > 2 * nums[j]) {
      count += mid - i + 1;
      j++;
    } else {
      i++;
    }
  }
  i = start;
  j = mid + 1;

  let index = start;
  while (i <= mid && j <= end) {
    if (nums[i] < nums[j]) {
      temp[index] = nums[i];
      index++;
      i++;
    } else {
      temp[index] = nums[j];
      index++;
      j++;
    }
  }
  while (i <= mid) {
    temp[index] = nums[i];
    index++;
    i++;
  }
  while (j <= end) {
    temp[index] = nums[j];
    index++;
    j++;
  }
  for (let i = start; i <= end; i++) {
    nums[i] = temp[i];
  }
  return count;
}

// 树状数组
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
  const nums_copy = [...nums]
  nums_copy.sort((a, b) => a - b)
  const n = nums.length
  const bit = new Array(n + 1).fill(0)
  let ans = 0
  let i = 0
  while (i < n) {
    // 查询时， bit里存放的都是nums数组中下标在我前面的数的统计信息
    // 查询到的就是nums数组中下标在我前面但是比我两倍大的数的数量
    const index1 = b_sort(nums_copy, nums[i] * 2 + 1)
    const index2 = b_sort(nums_copy, nums[i])
    ans += get(bit, index1 + 1)
    update(bit, index2 + 1, 1)
    i++
  }
  return ans

  // 树状数组， 每一个位置存放从结尾到当前位置位置有多少个元素
  function get(bit, index) {
    let count = 0
    while (index < bit.length) {
      count += bit[index]
      //每次index二进制表示时末尾的加一个1
      index += (index & -index)
    }
    return count
  }

// 每次更新从当前位置开始到下标0的值
  function update(bit, index, val) {
    while (index > 0) {
      bit[index] += val
      // 末尾去一个1
      index -= (index & -index)
    }
  }

  function b_sort(arr, num) {
    let l = 0
    let r = arr.length
    while (l < r) {
      const mid = Math.floor((l + r) / 2)
      if (arr[mid] < num) {
        l = mid + 1
      } else if (arr[mid] > num) {
        r = mid
      } else return mid
    }
    return l
  }
};




// 超时
// var reversePairs = function(nums) {

//   let count = 0

//   for(let i = 0; i < nums.length; i++) {
//     for(let j = i + 1; j < nums.length; j++) {
//       if(nums[i] > nums[j] * 2) {
//         count ++
//       }
//     }
//   }

//   return count
// };
