//hard


/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
var sortItems = function (n, m, group, beforeItems) {
  // let res = topSort([0,1,2,3,4],[0,0,0,1,0],{4:[3]})
  // console.log(res)

  //首先给Group中未分配给小组的项目分配一个新的小组，新小组的id从m开始
  let newId = m
  let groupToItem = new Array(n + m).fill(0).map(() => [])
  for (let i = 0; i < n; i++) {
    if (group[i] === -1) {
      group[i] = newId
      newId++
    }
    groupToItem[group[i]].push(i)
  }
  // 由于我们给未分配的项目添加了小组，现在的小组数目是newId+1
  const groupLen = newId + 1

  //根据新的group和beforeItem，分析出组间的依赖哈希以及组内的依赖哈希

  let inGrouphash = new Array(groupLen).fill(0).map(() => ({}))
  let betweenGrouphash = {}
  //在遍历的过程中还能获得组内任务的入度数组，以及组和组之间的入度数组
  let inGroupIncome = new Array(n).fill(0)
  let betweenGroupIncome = new Array(groupLen).fill(0) //组间优先级数组用一维数组即可
  //由于题目要求我们把属于同一组的任务放在一起，那么在考虑组间的优先级时，我们用组作为单位
  //例如：A组的a任务必须比B组的b任务先执行=>A组的任务列表整体比B组的任务列表优先级高
  for (let i = 0; i < n; i++) {
    let curGroup = group[i] //当前任务对应的小组
    let arr = beforeItems[i] //当前任务的前置任务，是一个数组
    for (let j = 0; j < arr.length; j++) {
      //找到这个前置任务对应的小组
      let preTaskGroup = group[arr[j]]
      if (curGroup === preTaskGroup) {
        //如果是同组任务，放入组内hash，同时当前任务的入度加1
        inGroupIncome[i]++
        let obj = inGrouphash[curGroup]
        if (!obj[arr[j]]) obj[arr[j]] = [i]
        else obj[arr[j]].push(i)
        //再次注意这个hash是从高优先级任务（前置任务）指向低优先级任务（后续任务）
      } else {
        //如果是不同组的任务，放入组间依赖hash,当前小组的入度加1
        betweenGroupIncome[curGroup]++
        if (!betweenGrouphash[preTaskGroup]) {
          betweenGrouphash[preTaskGroup] = [curGroup]
        } else {
          betweenGrouphash[preTaskGroup].push(curGroup)
        }
        //这里的键值使用的是小组号
      }
    }
  }
  //数据分析完毕，接下来进行小组优先级的拓扑排序
  let groupArr = new Array(groupLen).fill(0).map((val, index) => index)
  let sortedGroup = topSort(groupArr, betweenGroupIncome, betweenGrouphash)
  if (sortedGroup.length === 0) return [] //如果组间的依赖关系无法产生一个拓扑排序，直接返回[]
  let res = []
  //组间已经排好，接下来依次对每组进行组内排序即可
  for (gorupId of sortedGroup) {
    let items = groupToItem[gorupId]
    if (items.length === 0) continue
    let sortedTask = topSort(items, inGroupIncome, inGrouphash[gorupId])
    if (sortedTask.length === 0) return []
    res.push(...sortedTask)
  }
  return res
};

function topSort(items, income, relation) {

  //items :需要进行拓扑排序的一系列节点组成的数组
  //income ：二维数组，索引为需要进行排序的节点号，对应的值为这个节点的入度
  //relation: 表示节点之间依赖关系的哈希表，这里用对象表示，键为低入度节点（需要先完成的项目），值为高入度节点（有前置项目，且键是它前置项目的其中之一）
  const queue = []
  for (item of items) { //将所有入度为0的节点放入队列（入度为0，说明没有前置项目或者前置x）
    if (income[item] === 0) queue.push(item)
  }
  let res = []
  while (queue.length) {
    const n = queue.shift()
    res.push(n)
    //根据关系表，找到当前项目的后续项目
    let arr = relation[n]
    //如果有后续任务
    if (arr && arr.length > 0) {
      for (i of arr) {
        income[i]--
        if (income[i] === 0) {
          //如果后续任务的入度减为0了，就可以放入队列中执行了
          queue.push(i)
        }
      }
    }
  }
  return res.length === items.length ? res : [] //如果任务列表中不存在冲突，得到的res必然包含所有items中的节点
}

