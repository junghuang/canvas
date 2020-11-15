// LRU 是 Least Recently Used 的缩写，即最近最少使用，是一种常用的页面置换算法，选择内存中最近最久未使用的页面予以淘汰。
//
// 可用的 NodeJS 库见node-lru-cache
//
// 然怎么使用 JS 简单写一个？类似的题目见 LeetCode 146 LRU 缓存机制，进阶要求时间复杂度 O(1) 。
//
// 思路
// 解法：维护一个数组，提供 get 和 put 方法，并且限定 max 数量。
//
// 使用时，get 可以标记某个元素是最新使用的，提升它去第一项。put 可以加入某个key-value，但需要判断是否已经到最大限制 max
//
// 若未到能直接往数组第一项里插入
// 若到了最大限制 max，则需要淘汰数据尾端一个元素。
// LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );
//
// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // 返回  1
// cache.put(3, 3);    // 该操作会使得密钥 2 作废
// cache.get(2);       // 返回 -1 (未找到)
// cache.put(4, 4);    // 该操作会使得密钥 1 作废
// cache.get(1);       // 返回 -1 (未找到)
// cache.get(3);       // 返回  3
// cache.get(4);       // 返回  4

// 方案1 用数组
// var LRUCache = function (capacity) {
//   this.capacity = capacity;
//   this.cache = [];
// };
//
// /**
//  * @param {number} key
//  * @return {number}
//  */
// LRUCache.prototype.get = function (key) {
//   let index = this.cache.findIndex((item) => item.key === key);
//   if (index === -1) {
//     return -1;
//   }
//   // 删除此元素后插入到数组第一项
//   let value = this.cache[index].value;
//   this.cache.splice(index, 1);
//   this.cache.unshift({
//     key,
//     value,
//   });
//   return value;
// };
//
// /**
//  * @param {number} key
//  * @param {number} value
//  * @return {void}
//  */
// LRUCache.prototype.put = function (key, value) {
//   let index = this.cache.findIndex((item) => item.key === key);
//   // 想要插入的数据已经存在了，那么直接提升它就可以
//   if (index > -1) {
//     this.cache.splice(index, 1);
//   } else if (this.cache.length >= this.capacity) {
//     // 若已经到达最大限制，先淘汰一个最久没有使用的
//     this.cache.pop();
//   }
//   this.cache.unshift({ key, value });
// };

// 用map，时间复杂度O(1)
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    // 存在即更新
    let temp = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, temp);
    return temp;
  }
  return -1;
};

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    // 存在即更新（删除后加入）
    this.cache.delete(key);
  } else if (this.cache.size >= this.capacity) {
    // 不存在即加入
    // 缓存超过最大值，则移除最近没有使用的
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};