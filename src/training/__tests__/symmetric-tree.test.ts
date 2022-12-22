import { TreeNode } from './TreeNode';

describe('symmetric tree', () => {
  function isSymmetricMy(root: TreeNode | null): boolean {
    if (!root) return false;
    const { left, right } = root;
    if (!right && !left) return true;
    if ((!left && right) || (!right && left)) return false;

    const leftQueue: (TreeNode | null)[] | null = [];
    const rightQueue: (TreeNode | null)[] = [];
    leftQueue.push(left ?? null);
    rightQueue.push(right ?? null);

    while (leftQueue.length || rightQueue.length) {
      const currentLeft = leftQueue.shift();
      const currentRight = rightQueue.shift();

      if (currentLeft?.val !== currentRight?.val) {
        return false;
      }

      if (currentLeft) {
        leftQueue.push(currentLeft.left);
        leftQueue.push(currentLeft.right);
      }

      if (currentRight) {
        rightQueue.push(currentRight.right);
        rightQueue.push(currentRight.left);
      }
    }

    return true;
  }

  function isSymmetricRec(root: TreeNode | null): boolean {
    if (!root) return true;
    return isSymmetricTwo(root.left, root.right);
  }

  function isSymmetricTwo(left: TreeNode | null, right: TreeNode | null): boolean {
    if (!left || !right) return left === right;
    return left.val === right.val && isSymmetricTwo(left.left, right.right) && isSymmetricTwo(left.right, right.left);
  }

  it('[1,2,2,null,3,null,3]', () => {
    expect(isSymmetricMy(TreeNode.fromArray([1, 2, 2, null, 3, null, 3]))).toBe(false);
  });
});
