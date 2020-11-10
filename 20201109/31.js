// 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
//
// 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
//
// 必须原地修改，只允许使用额外常数空间。
//
// 以下是一些例子，输入位于左侧列，其相应输出位于右侧列
// 1,2,3 → 1,3,2
// 3,2,1 → 1,2,3
// 1,1,5 → 1,5,1
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/next-permutation
//     著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 字典序：从右往左，找到第一个左值小于右值的数，然后从右往左，找到第一个大于该左值的数，交换这两个值，
// 并将该左值(不包含)右边的进行从小到大进行排序(原来为降序，只需要改为升序)

var nextPermutation = function(nums) {
    let len = nums.length;
    if (len <= 1) return;

    for (let i = len - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            for (let j = len - 1; j > i; j--) {
                if (nums[i] < nums[j]) {
                    swap(i, j, nums)
                    break;

                }
            }
            let x = i + 1, y = len - 1;
            while (x < y) swap(x++, y--, nums)
            break;
        }
        if (i === 0) {
            let x = i, y = len - 1;
            while (x < y) swap(x++, y--, nums)
        }
    }
};