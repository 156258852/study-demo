const utils = {
  isArray: (data) => Array.isArray(data),
  isObject: (data) => Object.prototype.toString.call(data) === '[object Object]'

}
function cloneDeep(data) {
  let clone
  if (utils.isArray(data) || utils.isObject(data)) {
    clone = utils.isArray(data) ? [] : {}
    for (let key in data) {
      let val = data[key]
      if (utils.isArray(val) || utils.isObject(val)) {
        clone[key] = cloneDeep(val)
      } else {
        clone[key] = val
      }
    }


  } else {
    clone = data
  }
  return clone

}

function formatThousand(nums) {
  nums = nums.toString()
  const [integer, pointer] = nums.split('.')
  let res = ''
  let count = 0
  for (let i = integer.length - 1; i >= 0; i--) {
    if (count === 3 && i !== 0) {
      res = `,${res}`
      count = 0
    }
    count++
    res = `${integer[i]}${res}`
  }
  return pointer ? `${res}.${pointer}` : res

}



function curry(fn) {

  return curried = (...args) => {
    if (fn.length <= args.length) {
      return fn(...args)
    } else {
      return (...nextArgs) => {
        const allArgs = [...args, ...nextArgs]
        return curried(...allArgs)
      }

    }
  }

}

function test(x, y, z) {
  return x + y + z

}

// const total = curry(test)(1)(6)(7)
// console.log('🚀 >>> total', total)

const add = (...args) => {

  return (...nextArgs) => {
    if (!nextArgs.length) {
      return args.reduce((a, b) => a + b)
    }
    return add(...args, ...nextArgs)
  }

}
// const sum = add(1)(2)()
// console.log('🚀 >>> sum', sum)


function sum(...args) {
  return (...nextArgs) => {
    if (nextArgs.length === 0) {
      const total = args.reduce((a, b) => a + b)

      return total
    }
    const allArgs = [...args, ...nextArgs]
    return sum(...allArgs)
  }

}
// sum(1)(2)()

function longStr(str1 = '', str2 = '') {
  let max = ''
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      let k = 0
      let temp = ''
      while (
        str1[i + k] &&
        str2[j + k] &&
        str1[i + k] === str2[j + k]
      ) {
        temp += str1[i + k]
        k++
      }
      if (temp.length > max.length) max = temp
    }

  }

  return max
}


function myPromiseAll(promises = []) {
  let finish = 0
  let result = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = Promise.resolve(promises[i])
      promise.then(res => {
        result[i] = res
        finish++
        if (finish === promises.length) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })

    }

  })

}




///函数是解决最小长度子数组问题的，使用了滑动窗口（双指针）算法。
/**
console.log(test(7, [2, 3, 1, 2, 4, 3])); 
 * /输出: 2 (子数组 [4,3] 满足和≥7，长度为2)
 */
function test(targets, nums = []) {
  let left = 0
  let res = Infinity
  let sum = 0
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]
    while (sum >= targets) {
      const curLen = right - left + 1
      res = Math.min(res, curLen)
      sum -= sum[left]
      left++
    }

  }
  return res === Infinity ? 0 : res
}


function minLength(nums = []) {
  let left = 0
  let res = 0
  const map = new Map()
  for (let right = 0; i < nums.length; right++) {
    if (map.has(nums[right]) && map.get(nums[right]) >= left) {
      left = map.get(nums[right]) + 1
    }
    map.set(nums[right], right)
    res = Math.max(res, right - left + 1)
  }
  return res
}




function debounce(fn, wait = 1000) {
  let timer = null
  return (...args) => {
    const ctx = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(ctx, args)
    }, wait)
  }
}


function  throttle(fn, wait = 1000) {
  let isThrottle = false
  return (...args)=>{
    const ctx= this
    if (isThrottle) return
    fn.apply(this, args)
    isThrottle = true
    setTimeout(() => {
      isThrottle = false
    }, wait);
  }
}


function findMaxCountStr(str = '') {
  const map = new Map()
  let max = 0
  let maxChar = ''
  
  // 在统计每个字符出现次数的同时，更新最大值
  for(const char of str){
    const count = map.has(char) ? map.get(char) + 1 : 1
    map.set(char, count)
    
    // 如果当前字符计数更大，更新最大值和对应字符
    if(count > max) {
      max = count
      maxChar = char
    }
  }
  
  return {
    char: maxChar,
    count: max
  }
}
