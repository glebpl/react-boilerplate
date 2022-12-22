import { TreeNode, dfsPreOrderRecursive } from './TreeNode';

describe('938. Range Sum of BST', () => {
  // https://leetcode.com/problems/range-sum-of-bst/

  // The number of nodes in the tree is in the range [1, 2 * 10^4].
  // 1 <= Node.val <= 105
  // 1 <= low <= high <= 105
  // All Node.val are unique.

  /**
   * @param {TreeNode} root
   * @param {number} low
   * @param {number} high
   * @return {number}
   */
  function rangeSumBST(root: TreeNode, low: number, high: number): number {
    let sum = 0;
    dfsPreOrderRecursive(root, node => {
      if (node.val >= low && node.val <= high) {
        sum += node.val;
      }
    });
    return sum;
  }

  // var rangeSumBST = function(root, low, high) {
  //     let sum = 0
  //     const dfs = function(node){
  //         if (!node){
  //             return
  //         }
  //         if (node.val <= high && node.val >= low){
  //             sum += node.val
  //         }
  //         if (node.left){
  //             dfs(node.left)
  //         }
  //         if (node.right){
  //             dfs(node.right)
  //         }
  //     }
  //     dfs(root)
  //     return sum
  // };
});
