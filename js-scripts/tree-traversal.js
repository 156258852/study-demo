// 树的深度优先遍历和广度优先遍历实现

/**
 * 深度优先遍历 (DFS) - 递归实现
 * @param {Object} node - 树节点
 * @param {Function} callback - 访问节点时执行的回调函数
 */
function dfsRecursive(node, callback) {
  if (!node) return;
  
  // 访问当前节点
  callback(node);
  
  // 递归访问子节点
  if (node.children && node.children.length) {
    node.children.forEach(child => {
      dfsRecursive(child, callback);
    });
  }
}

/**
 * 深度优先遍历 (DFS) - 迭代实现（使用栈）
 * @param {Object} root - 树的根节点
 * @param {Function} callback - 访问节点时执行的回调函数
 */
function dfsIterative(root, callback) {
  if (!root) return;
  
  const stack = [root];
  
  while (stack.length) {
    const node = stack.pop();
    callback(node);
    
    // 将子节点逆序加入栈中，保证从左到右的访问顺序
    if (node.children && node.children.length) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
  }
}

/**
 * 广度优先遍历 (BFS) - 使用队列实现
 * @param {Object} root - 树的根节点
 * @param {Function} callback - 访问节点时执行的回调函数
 */
function bfs(root, callback) {
  if (!root) return;
  
  const queue = [root];
  
  while (queue.length) {
    const node = queue.shift();
    callback(node);
    
    // 将子节点加入队列
    if (node.children && node.children.length) {
      node.children.forEach(child => {
        queue.push(child);
      });
    }
  }
}

// 示例数据结构
const sampleTree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 4, children: [] },
        { value: 5, children: [] }
      ]
    },
    {
      value: 3,
      children: [
        { value: 6, children: [] },
        { 
          value: 7, 
          children: [
            { value: 8, children: [] }
          ] 
        }
      ]
    }
  ]
};

// 导出函数
module.exports = {
  dfsRecursive,
  dfsIterative,
  bfs,
  sampleTree
};