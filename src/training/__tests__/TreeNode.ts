export const getTreeDepth = (root: TreeNode | null): number => {
  if (!root) return 0;
  const maxLeft = getTreeDepth(root.left);
  const maxRight = getTreeDepth(root.right);
  return Math.max(maxLeft, maxRight) + 1;
};

const isBalanced = (root: TreeNode | null): boolean => {
  if (!root) return true;
  const ld = getTreeDepth(root.left);
  const rd = getTreeDepth(root.right);
  return Math.abs(ld - rd) <= 1;
};

export const dfsPreOrderRecursive = (node: TreeNode | null, callback: (node: TreeNode) => void): void => {
  if (node) {
    callback(node);
    dfsPreOrderRecursive(node.left, callback);
    dfsPreOrderRecursive(node.right, callback);
  }
};

export const dfsPostInOrderRecursive = (node: TreeNode | null, callback: (node: TreeNode) => void): void => {
  if (node) {
    dfsPostInOrderRecursive(node.left, callback);
    callback(node);
    dfsPostInOrderRecursive(node.right, callback);
  }
};

export const dfsPostOrderRecursive = (node: TreeNode | null, callback: (node: TreeNode) => void): void => {
  if (node) {
    dfsPostOrderRecursive(node.left, callback);
    dfsPostOrderRecursive(node.right, callback);
    callback(node);
  }
};

// An iterative function to do postorder traversal
// of a given binary tree
export function dfsPostOrderIterative(node: TreeNode | null, callback: (node: TreeNode) => void): void {
  // const result: number[] = [];
  const stack: TreeNode[] = [];
  // Check for empty tree
  // if (node == null) return result;
  if (node == null) return;
  stack.push(node);
  let prev = null;

  while (stack.length != 0) {
    const current = stack[stack.length - 1];

    /* go down the tree in search of a leaf an if so process it
    and pop stack otherwise move down */
    if (prev == null || prev.left == current || prev.right == current) {
      if (current.left != null) stack.push(current.left);
      else if (current.right != null) stack.push(current.right);
      else {
        stack.pop();
        callback(current);
        // result.push(current.val);
      }

      /* go up the tree from left node, if the child is right
      push it onto stack otherwise process parent and pop
      stack */
    } else if (current.left == prev) {
      if (current.right != null) stack.push(current.right);
      else {
        stack.pop();
        callback(current);
        // result.push(current.val);
      }

      /* go up the tree from right node and after coming back
      from right node process parent and pop stack */
    } else if (current.right == prev) {
      stack.pop();
      callback(current);
      // result.push(current.val);
    }

    prev = current;
  }

  // return result;
}

function preorderTraversalIterative(root: TreeNode | null): number[] {
  if (root == null) {
    return [];
  }

  const stack = [root];
  const result = [];

  while (stack.length > 0) {
    const cur = stack.pop();
    if (cur) {
      // process node
      result.push(cur.val);
      // !!! Attention: from right to left
      if (cur.right) {
        stack.push(cur.right);
      }
      if (cur.left) {
        stack.push(cur.left);
      }
    }
  }

  return result;
}

export const bfsIterative = (
  root: TreeNode | null,
  callback: (node: TreeNode | null, curLevel?: number) => void
): void => {
  if (!root) return;
  const nodeQueue: TreeNode[] = [];
  nodeQueue.push(root);
  const distanceFromRoot = new Map<TreeNode, number>();
  distanceFromRoot.set(root, 0);

  while (nodeQueue.length) {
    const currentNode = nodeQueue.shift();
    const curDist = distanceFromRoot.get(currentNode as TreeNode) as number;
    callback(currentNode ?? null, curDist);

    // childDist = distanceFromRoot.get(child)
    // if childDist === undefined process it, else it was already visited and here is not shortest way
    if (currentNode?.left) {
      nodeQueue.push(currentNode.left);
      distanceFromRoot.set(currentNode.left, curDist + 1);
      // prev[neighbor] = currentNode;   // save path to be able to restore
    }

    if (currentNode?.right) {
      nodeQueue.push(currentNode.right);
      distanceFromRoot.set(currentNode.right, curDist + 1);
    }
  }
};

export class TreeNode {
  // Modifies incomplete array !!!
  static fromArray = (values: (number | null)[], fromIndex = 0): TreeNode | null => {
    const n = values.length;
    if (!n || fromIndex >= n) return null;
    const value = values[fromIndex];
    const leftIndex = 2 * fromIndex + 1;
    const rightIndex = 2 * fromIndex + 2;
    if (value !== null) {
      return new TreeNode(value, TreeNode.fromArray(values, leftIndex), TreeNode.fromArray(values, rightIndex));
    } else if (leftIndex < n && rightIndex < n) {
      values.splice(leftIndex, 0, null, null);
    }
    return null;
  };

  static getDepth = getTreeDepth;

  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  toSimpleObject() {
    return JSON.parse(JSON.stringify(this)) as Record<string, any>;
  }

  getDepth() {
    return TreeNode.getDepth(this);
  }
}
