// 在柠檬水摊上，每一杯柠檬水的售价为5美元。
//
// 顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。
//
// 每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。
//
// 注意，一开始你手头没有任何零钱。
//
// 如果你能给每位顾客正确找零，返回true，否则返回 false
//
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
  const change = {}
  for(let i = 0; i < bills.length; i++) {
    if(bills[i] === 5) {
      change[5] = (change[5] || 0) + 1
    }else if(bills[i] === 10) {
      if(change[5]) {
        change[5]--
        change[10] = (change[10] || 0) + 1
      }else{
        return false
      }
    }else {
      if(change[10]){
        change[10] --
        if(change[5]) {
          change[5] --
        }else{
          return false
        }
      }else if(change[5]){
        if(change[5] >= 3) {
          change[5] -= 3
        }else {
          return false
        }
      }else{
        return false
      }
    }
  }
  return true
};
