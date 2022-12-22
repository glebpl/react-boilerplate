import each from 'jest-each';
import { TreeNode } from './TreeNode';

describe('113. Path Sum II', () => {
  // https://leetcode.com/problems/path-sum-ii/

  const cases = [
    {
      tree: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1],
      targetSum: 22,
      expected: [
        [5, 4, 11, 2],
        [5, 8, 4, 5]
      ]
    },
    {
      tree: [1, 2, 3],
      targetSum: 5,
      expected: []
    },
    {
      tree: [1, 2],
      targetSum: 0,
      expected: []
    },
    {
      tree: [3],
      targetSum: 3,
      expected: [[3]]
    }
  ];

  const walk = (root: TreeNode | null, path: number[], callback: (path: number[]) => void) => {
    if (root) {
      const nextPath = path.concat([root.val]);
      if (!root.left && !root.right) {
        callback(nextPath);
      } else {
        walk(root.left, nextPath, callback);
        walk(root.right, nextPath, callback);
      }
    }
  };

  function pathSum(root: TreeNode | null, targetSum: number): number[][] {
    const result: number[][] = [];
    walk(root, [], (values: number[]) => {
      const sum = values.reduce((s, v) => (s += v), 0);
      if (sum === targetSum) {
        result.push(values);
      }
    });
    return result;
  }

  function pathSumFaster(root: TreeNode | null, targetSum: number): number[][] {
    const paths: number[][] = [];

    if (!root) return paths;

    const traverse = (node: TreeNode, path: number[], pathTotal: number) => {
      if (pathTotal === targetSum && node.left === null && node.right === null) {
        paths.push(path);
        return;
      }

      if (node.left === null && node.right === null) {
        return;
      }

      if (node.left) traverse(node.left, path.concat([node.left.val]), pathTotal + node.left.val);
      if (node.right) traverse(node.right, path.concat([node.right.val]), pathTotal + node.right.val);
    };

    traverse(root, [root.val], root.val);

    return paths;
  }

  each(cases).it('$tree, targetSum = $targetSum', ({ tree, targetSum, expected }) => {
    expect(pathSum(TreeNode.fromArray(tree), targetSum)).toStrictEqual(expected);
  });
});
