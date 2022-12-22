import {
  bfsIterative,
  dfsPostInOrderRecursive,
  dfsPostOrderIterative,
  dfsPostOrderRecursive,
  dfsPreOrderRecursive,
  getTreeDepth,
  TreeNode
} from './TreeNode';

describe('TreeNode', () => {
  describe('fromArray', () => {
    it('[]', () => {
      expect(TreeNode.fromArray([])).toStrictEqual(null);
    });

    it('[1]', () => {
      expect(TreeNode.fromArray([1])?.toSimpleObject()).toStrictEqual({ val: 1, left: null, right: null });
    });

    it('[1,2]', () => {
      expect(TreeNode.fromArray([1, 2])?.toSimpleObject()).toStrictEqual({
        val: 1,
        left: { val: 2, left: null, right: null },
        right: null
      });
    });

    it('[1,2,3,4,5]', () => {
      expect(TreeNode.fromArray([1, 2, 3, 4, 5])?.toSimpleObject()).toStrictEqual({
        val: 1,
        left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
        right: { val: 3, left: null, right: null }
      });
    });

    it('[3,9,20,null,null,15,7]', () => {
      expect(TreeNode.fromArray([3, 9, 20, null, null, 15, 7])?.toSimpleObject()).toStrictEqual({
        val: 3,
        left: { val: 9, left: null, right: null },
        right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } }
      });
    });

    it('[1,2,2,3,null,null,3,4,null,null,4]', () => {
      expect(TreeNode.fromArray([1, 2, 2, 3, null, null, 3, 4, null, null, 4])?.toSimpleObject()).toStrictEqual({
        val: 1,
        left: { val: 2, left: { val: 3, left: { val: 4, left: null, right: null }, right: null }, right: null },
        right: { val: 2, left: null, right: { val: 3, left: null, right: { val: 4, left: null, right: null } } }
      });
    });

    it('[5,4,8,11,null,13,4,7,2,null,null,5,1]', () => {
      expect(TreeNode.fromArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1])?.toSimpleObject()).toStrictEqual({
        val: 5,
        left: {
          val: 4,
          left: { val: 11, left: { val: 7, left: null, right: null }, right: { val: 2, left: null, right: null } },
          right: null
        },
        right: {
          val: 8,
          left: { val: 13, left: null, right: null },
          right: { val: 4, left: { val: 5, left: null, right: null }, right: { val: 1, left: null, right: null } }
        }
      });
    });
  });

  describe('getDepth', () => {
    it('[]', () => {
      expect(getTreeDepth(TreeNode.fromArray([]))).toStrictEqual(0);
    });

    it('[1]', () => {
      expect(TreeNode.fromArray([1])?.getDepth()).toStrictEqual(1);
    });

    it('[3,9,20,null,null,15,7]', () => {
      expect(TreeNode.fromArray([3, 9, 20, null, null, 15, 7])?.getDepth()).toStrictEqual(3);
    });

    it('[1,2,2,3,null,null,3,4,null,null,4]', () => {
      expect(TreeNode.fromArray([1, 2, 2, 3, null, null, 3, 4, null, null, 4])?.getDepth()).toStrictEqual(4);
    });
  });

  describe('dfs', () => {
    it('preorder recursive', () => {
      const nums: number[] = [];
      dfsPreOrderRecursive(TreeNode.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, null, null, 9, 10]), (node: TreeNode) => {
        nums.push(node.val);
      });
      expect(nums).toStrictEqual([0, 1, 3, 7, 8, 4, 2, 5, 9, 10, 6]);
    });

    it('inorder', () => {
      const nums: number[] = [];
      dfsPostInOrderRecursive(TreeNode.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, null, null, 9, 10]), (node: TreeNode) => {
        nums.push(node.val);
      });
      expect(nums).toStrictEqual([7, 3, 8, 1, 4, 0, 9, 5, 10, 2, 6]);
    });

    it('postorder recursive', () => {
      const nums: number[] = [];
      dfsPostOrderRecursive(TreeNode.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, null, null, 9, 10]), (node: TreeNode) => {
        nums.push(node.val);
      });
      expect(nums).toStrictEqual([7, 8, 3, 4, 1, 9, 10, 5, 6, 2, 0]);
    });

    it('postorder iterative', () => {
      const nums: number[] = [];
      dfsPostOrderIterative(TreeNode.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, null, null, 9, 10]), (node: TreeNode) => {
        nums.push(node.val);
      });
      expect(nums).toStrictEqual([7, 8, 3, 4, 1, 9, 10, 5, 6, 2, 0]);
    });
  });

  describe('bfs', () => {
    it('bfsIterative', () => {
      const numsWidthDepth: { val: number; level: number | undefined }[] = [];
      bfsIterative(TreeNode.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, null, null, 9, 10]), (node: TreeNode, level) => {
        numsWidthDepth.push({ val: node.val, level });
      });
      expect(numsWidthDepth).toStrictEqual([
        { val: 0, level: 0 },
        { val: 1, level: 1 },
        { val: 2, level: 1 },
        { val: 3, level: 2 },
        { val: 4, level: 2 },
        { val: 5, level: 2 },
        { val: 6, level: 2 },
        { val: 7, level: 3 },
        { val: 8, level: 3 },
        { val: 9, level: 3 },
        { val: 10, level: 3 }
      ]);
    });
  });
});
