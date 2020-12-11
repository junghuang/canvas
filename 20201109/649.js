// Dota2 的世界里有两个阵营：Radiant(天辉)和Dire(夜魇)
//
// Dota2 参议院由来自两派的参议员组成。现在参议院希望对一个 Dota2 游戏里的改变作出决定。他们以一个基于轮为过程的投票进行。在每一轮中，每一位参议员都可以行使两项权利中的一项：
//
// 禁止一名参议员的权利：
//
// 参议员可以让另一位参议员在这一轮和随后的几轮中丧失所有的权利。
//
// 宣布胜利：
//
// 如果参议员发现有权利投票的参议员都是同一个阵营的，他可以宣布胜利并决定在游戏中的有关变化。
//
//
// 给定一个字符串代表每个参议员的阵营。字母 “R” 和 “D” 分别代表了Radiant（天辉）和Dire（夜魇）。然后，如果有 n 个参议员，给定字符串的大小将是n。
//
// 以轮为基础的过程从给定顺序的第一个参议员开始到最后一个参议员结束。这一过程将持续到投票结束。所有失去权利的参议员将在过程中被跳过。
//
// 假设每一位参议员都足够聪明，会为自己的政党做出最好的策略，你需要预测哪一方最终会宣布胜利并在 Dota2 游戏中决定改变。输出应该是Radiant或Dire。


/**
 * @param {string} senate
 * @return {string}
 */

// 我们以天辉方的议员为例。当一名天辉方的议员行使权利时：
//
// 如果目前所有的议员都为天辉方，那么该议员可以直接宣布天辉方取得胜利；
//
// 如果目前仍然有夜魇方的议员，那么这名天辉方的议员只能行使「禁止一名参议员的权利」这一项权利。
// 显然，该议员不会令一名同为天辉方的议员丧失权利，所以他一定会挑选一名夜魇方的议员。那么应该挑选哪一名议员呢？
// 容易想到的是，应该贪心地挑选按照投票顺序的下一名夜魇方的议员。这也是很容易形象化地证明的：既然只能挑选一名夜魇方的议员，
// 那么就应该挑最早可以进行投票的那一名议员；如果挑选了其它较晚投票的议员，那么等到最早可以进行投票的那一名议员行使权利时，
// 一名天辉方议员就会丧失权利，这样就得不偿失了。
//
// 由于我们总要挑选投票顺序最早的议员，因此我们可以使用两个队列 radiant 和 dire 分别按照投票顺序存储天辉方和夜魇方每一名议员的投票时间。
// 随后我们就可以开始模拟整个投票的过程：
//
// 如果此时 radiant 或者 dire 为空，那么就可以宣布另一方获得胜利；
//
// 如果均不为空，那么比较这两个队列的首元素，就可以确定当前行使权利的是哪一名议员。如果 radiant 的首元素较小，那说明轮到天辉方的议员行使权利，
// 其会挑选 dire 的首元素对应的那一名议员。因此，我们会将 dire 的首元素永久地弹出，并将 radiant 的首元素弹出，增加 nn 之后再重新放回队列，
// 这里 nn 是给定的字符串 senate 的长度，即表示该议员会参与下一轮的投票。
//
// 为什么这里是固定地增加 nn，而不是增加与当前剩余议员数量相关的一个数？读者可以思考一下这里的正确性。
//
// 同理，如果 dire 的首元素较小，那么会永久弹出 radiant 的首元素，剩余的处理方法也是类似的。
// 这样一来，我们就模拟了整个投票的过程，也就可以得到最终的答案了。


var predictPartyVictory = function(senate) {
  const n = senate.length;
  const radiant = [], dire = [];

  for (const [i, ch] of Array.from(senate).entries()) {
    if (ch === 'R') {
      radiant.push(i);
    } else {
      dire.push(i);
    }
  }

  while (radiant.length && dire.length) {
    if (radiant[0] < dire[0]) {
      radiant.push(radiant[0] + n);
    } else {
      dire.push(dire[0] + n);
    }
    radiant.shift();
    dire.shift();
  }
  return radiant.length ? "Radiant" : "Dire";
};



// 直接模拟
// var predictPartyVictory = function(senate) {
//   let numR = 0, numD = 0
//   const arr = Array.from(senate)
//   while(arr.length > 1 && numR < arr.length && numD < arr.length){
//     for(let i = 0; i < arr.length; i++) {
//
//     }
//     for(let i = 0; i < arr.length; i++) {
//       if(arr[i] === "R"){
//         if(numD) {
//           numD--
//           arr.splice(i--,1)
//         }else{
//           numR ++
//         }
//       }else{
//         if(numR) {
//           numR --
//           arr.splice(i--,1)
//         }else{
//           numD ++
//         }
//       }
//     }
//   }
//   return arr[0] === "R" ? "Radiant" : "Dire"
// };

// var predictPartyVictory = function(senate) {
//   let numR = 0, numD = 0
//   while(senate.length > 1 && numR < senate.length && numD < senate.length){
//     for(let i = 0; i < senate.length; i++) {
//
//     }
//     for(let i = 0; i < senate.length; i++) {
//       if(senate[i] === "R"){
//         if(numD) {
//           numD--
//           senate = senate.substring(0,i).concat(senate.substring(i+1))
//           i --
//         }else{
//           numR ++
//         }
//       }else{
//         if(numR) {
//           numR --
//           senate = senate.substring(0,i).concat(senate.substring(i+1))
//           i --
//         }else{
//           numD ++
//         }
//       }
//     }
//   }
//   return senate[0] === "R" ? "Radiant" : "Dire"
// };
console.log(predictPartyVictory('RDD'));
console.log(predictPartyVictory('RRDDD'));
console.log(predictPartyVictory('DDDDD'));
