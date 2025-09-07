async function requestLimits({
  limit = 5,
  tasks = []
}) {
  return new Promise((resolve) => {
    const queue = []
    const results = []
    let requestNum = 0
    let completedCount = 0
    
    // 检查是否所有任务都已完成
    const checkCompletion = () => {
      if (completedCount === tasks.length) {
        resolve(results)
      }
    }
    
    const add = ({index, task}) => {
      queue.push({
        index,
        task
      })
      next()
    }
    
    const next = async () => {
      // 如果队列为空或已达到并发限制，则返回
      if (!queue.length || requestNum >= limit) return
      
      // 增加当前请求数
      requestNum++
      
      // 从队列中取出任务
      const {index, task} = queue.shift()
      
      // 执行请求
      request({
        task,
        index
      })
    }
    
    const request = ({task, index}) => {
      task().then(res => {
        results[index] = res
      })
      .catch(err => {
        results[index] = err
      })
      .finally(() => {
        // 减少当前请求数
        requestNum--
        // 增加完成计数
        completedCount++
        // 检查是否所有任务都已完成
        checkCompletion()
        // 尝试执行下一个任务
        next()
      })
    }
    
    // 将所有任务添加到队列中
    tasks.forEach((task, index) => {
      add({index, task})
    })
    
    // 如果没有任务，则直接完成
    if (tasks.length === 0) {
      resolve(results)
    }
  })
}
