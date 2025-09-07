const { dfsRecursive, dfsIterative, bfs, sampleTree } = require('./tree-traversal');

console.log('原始树结构:');
console.log(JSON.stringify(sampleTree, null, 2));

console.log('\n=== 深度优先遍历 (递归) ===');
const dfsRecursiveResult = [];
dfsRecursive(sampleTree, (node) => {
  dfsRecursiveResult.push(node.value);
});
console.log('访问顺序:', dfsRecursiveResult);

console.log('\n=== 深度优先遍历 (迭代) ===');
const dfsIterativeResult = [];
dfsIterative(sampleTree, (node) => {
  dfsIterativeResult.push(node.value);
});
console.log('访问顺序:', dfsIterativeResult);

console.log('\n=== 广度优先遍历 ===');
const bfsResult = [];
bfs(sampleTree, (node) => {
  bfsResult.push(node.value);
});
console.log('访问顺序:', bfsResult);

// 创建图的 BFS 和 DFS 实现
console.log('\n\n=== 图的遍历实现 ===');

/**
 * 图的深度优先遍历
 * @param {Object} graph - 图的邻接表表示
 * @param {string} start - 起始节点
 * @returns {Array} 访问顺序数组
 */
function dfsGraph(graph, start) {
  const visited = new Set();
  const result = [];
  
  function dfs(node) {
    visited.add(node);
    result.push(node);
    
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }
  
  dfs(start);
  return result;
}

/**
 * 图的广度优先遍历
 * @param {Object} graph - 图的邻接表表示
 * @param {string} start - 起始节点
 * @returns {Array} 访问顺序数组
 */
function bfsGraph(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  visited.add(start);
  
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

// 图的示例数据
const sampleGraph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

console.log('图的邻接表表示:');
console.log(JSON.stringify(sampleGraph, null, 2));

console.log('\n=== 图的深度优先遍历 (从A开始) ===');
console.log('访问顺序:', dfsGraph(sampleGraph, 'A'));

console.log('\n=== 图的广度优先遍历 (从A开始) ===');
console.log('访问顺序:', bfsGraph(sampleGraph, 'A'));