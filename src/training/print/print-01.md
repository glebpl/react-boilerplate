### Strings
#### 290. Word Pattern
```javascript
var wordPattern = function(pattern, s) {
    const words = s.split(' ');
    
    if (words.length === pattern.length) {
        const n = words.length;
        const dictPattern = new Map();
        const dictWords = new Map();
        for(let i = 0; i < n; i++) {
            const p = pattern[i];
            const w = words[i];
            if(dictPattern.has(p) || dictWords.has(w)) {
                if(dictWords.has(w) && dictWords.get(w) !== p) {
                    return false
                } else if(dictPattern.has(p) && dictPattern.get(p) !== w) {
                    return false
                }
            } else {
                dictPattern.set(p, w)
                dictWords.set(w, p)
            }
        }
        return true;
    }

    return false;
};
```
#### 71. Simplify Path https://leetcode.com/problems/simplify-path/description/
```javascript
var simplifyPath = function(path) {
  const paths = path.split('/');
  const result = [];
  for (let i = 0; i < paths.length; i++) {
    if (paths[i] === '..') {
      result.pop();
    } else if (paths[i] === '' || paths[i] === '.') {
      continue;
    } else {
      result.push(paths[i]);
    }
  }
  return '/' + result.join('/');
};
```
#### 5. Longest Palindromic Substring 
```javascript
/*
There are even-length palindromes and odd-length palindromes. We have to handle them a little bit differently.
Even-length palindrome starts by comparing current character and right character.
Odd-length palindrome starts by comparing left character and right character.
(however, for odd-length palindromes, we will both pointers at current character so we don't miss out one-character palindromes)

We will iterate through given string and at every character we will find the longest odd-length palindrome and
even-length palindrome and store the indices of longer one.

After iteration is done, we will take a substring using indices stored and return it.
*/
var longestPalindrome = function(s) {
    let maxLen = 0, maxStart = -1, maxEnd = -1;
    for (let i = 0; i < s.length; i++) {
        let [evenStart, evenEnd] = longest(i, i + 1, s);
        let [oddStart, oddEnd] = longest(i, i, s);
        if (evenEnd - evenStart + 1 > maxLen) {
            maxLen = evenEnd - evenStart + 1;
            maxStart = evenStart;
            maxEnd = evenEnd;
        }
        if (oddEnd - oddStart + 1 > maxLen) {
            maxLen = oddEnd - oddStart + 1;
            maxStart = oddStart;
            maxEnd = oddEnd;
        }
    }
    return s.substring(maxStart, maxEnd + 1);
    // T.C: O(N^2)
    // S.C: O(1)
};

function longest(start, end, s) {
    while (start >= 0 && end < s.length && s[start] === s[end]) {
        start--, end++;
    }
    return [start + 1, end - 1];
}
```
### Two pointers
#### 11. Container With Most Water
```typescript
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
      maxArea = Math.max(maxArea, Math.min(height[left], height[right]) * (right - left));
      if (height[left] < height[right]) left++;
      else right--;
    }
    
    return maxArea;
}
```
#### 35. Search Insert Position
```typescript
function searchInsertFaster(nums: number[], target: number) {
    let left = 0;
    let right = nums.length;
    
    while (left < right) {
      const mid = Math.floor((right + left) / 2);
      if (nums[mid] == target) return mid;
    
      if (nums[mid] < target) left = mid + 1;
      else right = mid;
    }
    return left;
}
```

### Kth smallest/largest
```typescript
  function quickMedian(arr: number[]): number {
    const n = arr.length;
    // relates to findKthSmallest numbers starting from 1
    const mid = Math.ceil(n / 2);

    if (n % 2 === 1) {
      return findKthSmallest(arr, mid);
    } else {
      return 0.5 * (findKthSmallest(arr, mid) + findKthSmallest(arr, mid + 1));
    }
  }

  // Largest from the end!!! Starting from 1!!!! last has index 1 from the end
  const findKthLargest = (nums: number[], k: number): number => {
    return quickSelect(nums, 0, nums.length - 1, nums.length - k);
  };

  // k starts from 1 !!!
  const findKthSmallest = (nums: number[], k: number): number => {
    return quickSelect(nums, 0, nums.length - 1, k - 1);
  };

  const quickSelect = (nums: number[], left: number, right: number, index: number): number => {
    // int q = randomPartition(a, l, r);
    // finds index where most right element should be placed
    const qIndex = partition(nums, left, right);
    if (qIndex == index) {
      return nums[qIndex];
    } else {
      return qIndex < index
        ? // required element is greater
          quickSelect(nums, qIndex + 1, right, index)
        : quickSelect(nums, left, qIndex - 1, index);
    }
  };

  /**
   * Finds index where most right element should be placed
   */
  const partition = (nums: number[], left: number, right: number) => {
    const x = nums[right];
    let i = left - 1;
    for (let j = left; j < right; ++j) {
      if (nums[j] <= x) {
        // swap(a, ++i, j);
        i++;
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
    // swap(a, i + 1, r);
    const result = i + 1;
    // swap right and most left which is greater than most right
    [nums[result], nums[right]] = [nums[right], nums[result]];

    return result;
  };
```
#### 378. Kth Smallest Element in a Sorted Matrix
```java
// O(nlog(r-l))time
// O(1)space
public int kthSmallest(int[][] matrix, int k) {
    int lo = matrix[0][0], hi = matrix[matrix.length - 1][matrix[0].length - 1] + 1;//[lo, hi)
    while(lo < hi) {
        int mid = lo + (hi - lo) / 2;
        int count = 0,  j = matrix[0].length - 1;
        for(int i = 0; i < matrix.length; i++) {
            while(j >= 0 && matrix[i][j] > mid) j--;
            count += (j + 1);
        }
        if(count < k) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

```

### Linked lists
#### 206. Reverse Linked List
```typescript
  function reverseList(head) {
    if (!head) return null;
    let p2 = head.next;
    head.next = null;
    while (p2) {
      const n = p2.next;
      p2.next = head;
      head = p2;
      p2 = n;
    }
    return head;
  }
```
#### Middle of a linked list
```typescript
  function middleNode(head: ListNode): ListNode {
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (slow && fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
    }

    return slow as ListNode;
  }
```
#### Detect Cycle in a Linked list with element
```typescript
const detectCycle = (head: ListNode): ListNode | null => {
    if (head === null) {
      return null;
    }
    let fast: ListNode | null = head;
    let slow: ListNode | null = head;
    while (slow && fast.next && fast.next.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) {
        let slow2: ListNode = head;
        while (slow && slow2 !== slow) {
          slow = slow.next;
          slow2 = slow2.next as ListNode;
        }
        return slow;
      }
    }
    return null;
  };
```
#### Delete duplicated items from Linked list
```javascript
var deleteDuplicates = function(head) {
  const result = new ListNode(null, head);
  let last = result;
  let next = head?.next;
  let isStarted = false;
  
  while (next) {
    if (next.val === head.val) {
      isStarted = true;
    } else {
      if (isStarted) {
        last.next = next;
        isStarted = false;
      } else {
        last = head;
      }
    }
    head = next;
    next = next.next;
  }
  
  if (isStarted) {
    last.next = null;
  }
  
  return result.next;
};
``` 
#### 23. Merge k Sorted Lists
````java
//N is the total number of nodes. k is the number of linked lists.
//O(N*logk)time O(1)space
public ListNode res = new ListNode(0);
public ListNode mergeKLists(ListNode[] lists) {
    if (lists == null || lists.length == 0) {
        return null;
    }
    return partion(lists, 0, lists.length - 1);
}

public ListNode partion(ListNode[] lists, int s, int e) {
    if (s == e) return lists[s];
    if (s < e) {
        int q = (s + e) / 2;
        ListNode l1 = partion(lists, s, q);
        ListNode l2 = partion(lists, q + 1, e);
        return merge(l1, l2);
    } else
        return null;
}

public ListNode merge(ListNode node1, ListNode node2) {
    if (node1 == null) {
        return node2;
    }
    if (node2 == null) {
        return node1;
    }
    ListNode t = res;
    ListNode temp;
    while (node1 != null && node2 != null) {
        if (node1.val < node2.val) {
            temp = node1.next;
            node1.next = null;
            t.next = node1;
            node1 = temp;
        } else {
            temp = node2.next;
            node2.next = null;
            t.next = node2;
            node2 = temp;
        }
        t = t.next;
    }
    t.next = node1 == null ? node2 : node1;
    return res.next;
}
````

### Trees
```typescript
export const dfsPreOrderRecursive = (node: TreeNode | null, callback: (node: TreeNode) => void): void => {
  if (node) {
    callback(node);
    dfsPreOrderRecursive(node.left, callback);
    dfsPreOrderRecursive(node.right, callback);
  }
};

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

```
#### Symmetric tree
```typescript
function isSymmetricRec(root: TreeNode | null): boolean {
    if (!root) return true;
    return isSymmetricTwo(root.left, root.right);
}

function isSymmetricTwo(left: TreeNode | null, right: TreeNode | null): boolean {
    if (!left || !right) return left === right;
    return left.val === right.val && isSymmetricTwo(left.left, right.right) && isSymmetricTwo(left.right, right.left);
}
```

### Video and intervals
#### 56. Merge Intervals
```typescript
function merge(intervals: number[][]): number[][] {
  const result: number[][] = [];
  let current: number[] | null = null;
  const sorted = [...intervals].sort((int1, int2) => int1[0] - int2[0]);
  
  for (const interval of sorted) {
    if (!current) {
      current = [...interval];
    } else {
      const [start, end] = interval;
      const [curStart, curEnd] = current;
      
      if (start <= curEnd) {
        current[0] = Math.min(curStart, start);
        current[1] = Math.max(curEnd, end);
      } else {
        result.push(current);
        current = [...interval];
      }
    }
  }
  
  result.push(current);
  
  return result;
};
```
#### 1024. Video Stitching
```typescript
  function videoStitching(clips: number[][], time: number): number {
    let res = 0;
    let st = 0;
    let et = 0;
    let i = 0;

    clips.sort((clip1, clip2) => clip1[0] - clip2[0]);

    while (st < time) {
      while (i < clips.length && clips[i][0] <= st) {
        et = Math.max(et, clips[i][1]);
        i++;
      }

      if (st === et) {
        // nothing changed: there is a gap ar not enough clips
        return -1;
      } else {
        // shift and process next portion of clips
        res++;
        st = et;
      }
    }

    return res;
  }
```
#### 986. Interval List Intersections
```typescript
  function intervalIntersectionBetter(firstList: number[][], secondList: number[][]): number[][] {
    if (firstList.length === 0 || secondList.length === 0) return [];

    const result = [];
    let i = 0;
    let j = 0;

    while (i < firstList.length && j < secondList.length) {
      const lo = Math.max(firstList[i][0], secondList[j][0]);
      const hi = Math.min(firstList[i][1], secondList[j][1]);

      if (lo <= hi) {
        result.push([lo, hi]);
      }

      if (firstList[i][1] < secondList[j][1]) {
        i++;
      } else {
        j++;
      }
    }

    return result;
  }
```
#### TODO (LC) 57. Insert Interval https://leetcode.com/problems/insert-interval/
```javascript
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    if (intervals.length === 0) {
        return [ newInterval ];
    }

    const result = [];
    let flag = 0;
    let i;

    for (i = 0; i < intervals.length; i++) {
        const interval = intervals[i];

        if (newInterval[0] > interval[1]) {
            // start gt than end, leave interval as is 
            result.push(interval);
        } else if (newInterval[1] < interval[0]) {
            // end lt start, add new
            result.push(newInterval);
            flag = 1;
            break;
        } else {
            // intersection
            newInterval[0] = Math.min(newInterval[0], interval[0]);
            newInterval[1] = Math.max(newInterval[1], interval[1]);
        }
    }

    if (flag === 0) {
        result.push(newInterval);
        return result;
    } else {
        return result.concat(intervals.splice(i));
    }
};
```

#### TODO (LC) 435. Non-overlapping Intervals https://leetcode.com/problems/non-overlapping-intervals/
>  * `Runtime: 5 ms, faster than 25.57%, Memory Usage: 42.3 MB, less than 10.65% of Java online submissions`
>    ```
>    // O(N*logN)time
>    // O(N) or O(1)space depends on arrays.sort
>    public int eraseOverlapIntervals(int[][] intervals) {
>        if (intervals.length == 0) return 0;
>
>        Arrays.sort(intervals, (a, b) -> a[1] == b[1] ? b[0] - a[0] : a[1] - b[1]);
>
>        int minErase = 0;
>        int prevEnd = Integer.MIN_VALUE;
>        for (int[] interval : intervals) {
>            if (prevEnd > interval[0]) minErase++;
>            else prevEnd = interval[1];
>        }
>
>        return minErase;
>    }
>    ```
#### TODO (LC) 436. Find Right Interval https://leetcode.com/problems/find-right-interval/
**BinarySearch** Runtime: 9 ms, faster than 98.47%, Memory Usage: 48.2 MB, less than 45.11% of Java online submissions
```javascript
  //O(N*logN)time
  //O(N)space
const binSearch = (starts, end) => {
  if (end <= starts[0]) {
    return 0;
  } else if (end > starts[starts.length - 1]) {
    return -1;
  }
  
  let l = 0, r = starts.length;
  
  while (l < r) {
    const mid = (l + r) >>> 1;
    if (starts[mid] >= end) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  
  return l;
}

/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function(intervals) {
  const n = intervals.length;
  const res = Array(n);
  const map = new Map();
  const starts = Array(n);
  
  for (let i = 0; i < n; i++) {
    starts[i] = intervals[i][0];
    map.set(starts[i], i);
  }
  
  starts.sort((s1, s2) => s1 - s2);
  
  for (let i = 0; i < n; i++) {
    const startIndex = binSearch(starts, intervals[i][1]);
    res[i] = startIndex > -1 ? map.get(starts[startIndex]) : -1;
  }
  
  return res;
};
```
#### TODO 1288. Remove Covered Intervals https://leetcode.com/problems/remove-covered-intervals/
```java
class Solution {
    public int removeCoveredIntervals(int[][] intervals) {
        int n = intervals.length;
        Arrays.sort(intervals, new Comparator<int[]>(){
            public int compare(int[] e1, int[] e2){
                if(e1[0] < e2[0]) return -1;
                if(e2[0] < e1[0]) return 1;
                if(e1[1] > e2[1]) return -1;
                return 1;
            }
        });
        
        int count = 1;
        int[] prev = intervals[0];
        for(int i = 1; i < n; i++){
            if(intervals[i][0] >= prev[0] && intervals[i][1] <= prev[1]) continue;
            prev = intervals[i];
            count++;
        }
        return count;
    }
}
```
#### TODO 2406. Divide Intervals Into Minimum Number of Groups https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/
The idea behind the approach is that total number of minimum groups will be equal to
maximum number of intervals that intersect with each other. This is because the groups which are responsible 
for maximum intersection cannot be kept in common group, 
so at any cost we must have total groups at least equal to maximum number of intersecting interval.

Now regarding rest of intervals which do not contribute to the maximum intersection 
they can be kept in any of the above formed groups without causing intersection.

This maximum number of groups can be calculated by +1/-1 trick over intervals and then performing suffix sum over it.
// https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/solutions/2560101/java-c-python-meeting-room/
 At time point intervals[i][0],
 start using a meeting room(group).
 
 At time point intervals[i][1] + 1,
 end using a meeting room.
```javascript
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minGroups = function(intervals) {
    let arr = new Array(1000002);
    arr.fill(0);
    
	// +1/-1 trick
    intervals.forEach(vec => {
        arr[vec[1] + 1]--;
        arr[vec[0]]++;
    })
    
	// suffix sum
    // or //prefix sum for count of elements present in different range
    let max = 0;
    for(let i = 1; i < arr.length ;i++) {
        arr[i] += arr[i - 1];
        max = Math.max(max, arr[i]);
    }

    return max;
};
```
#### 1094. Car Pooling
Since its given that the number of location points is less than 1000, 
we can create a location array of size 1001, and for each location record the number of people being picked up and dropped off.

Then we can go over the entire locations array and see , if at any location, 
the total number of passengers (after subtracting for dropoff and adding for pickup) exceeds capacity or not.
```
def carPooling(self, trips, capacity):
        locations = [[0, 0] for _ in range(1001)]
        for num_pass, src, dest in trips:
            locations[src][0] += num_pass
            locations[dest][1] += num_pass
        
        total = 0
        for i in range(len(locations)):
            total = total + locations[i][0] - locations[i][1]
            if total > capacity:
                return False
        return True
```

### Other
#### Stock series
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/discuss/75924/Most-consistent-ways-of-dealing-with-the-series-of-stock-problems

**Base cases**

T[-1][k][0] = 0, T[-1][k][1] = -Infinity | 
T[i][0][0] = 0, T[i][0][1] = -Infinity

**Recurrence relation:**

T[i][k][0] = max(T[i-1][k][0], T[i-1][k][1] + prices[i]) | 
T[i][k][1] = max(T[i-1][k][1], T[i-1][k-1][0] - prices[i])

```typescript
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/#/description
const maxProfit = (prices: number[]): number => {
  let T_i10 = 0;
  // let profitIfSell = 0;
  let T_i11 = -Infinity;
  // let profitIfBuy

  for (const price of prices) {
    // max between rest and sell on cur day
    T_i10 = Math.max(T_i10, T_i11 + price);
    // max between rest and buy on cur day
    // T[i-1][k-1][0] is 0 because k === 1 and T[i][0][0] is always 0
    T_i11 = Math.max(T_i11, -price);
  }

  return T_i10;
};
```
#### 1593. Split a String Into the Max Number of Unique Substrings
```java
// O(N^2)time
// O(N)space
int res = 0;
public int maxUniqueSplit(String s) {
    check(s ,new HashSet<>(), 0);
    return res;
}

void check(String s, Set<String> set, int index){
    int n = s.length();
    if(index == n){
        res = Math.max(set.size(), res);
        return;
    }
    int l = index;
    for(int i = index; i < n; i++){
        if(set.size() + n - i <= res ) return;

        String sub = s.substring(l, i + 1);
        if(set.contains(sub)) continue;

        set.add(sub);

        check(s, set, i + 1);
        set.remove(sub);
    }
}
```

#### 1044. Longest Duplicate Substring
````java
private String S;

// T = O(N*K), S = O(N), where N is length of S and K avg depth of trie.
public String longestDupSubstring(String S) {
    this.S = S;
    int maxLo = 0, maxLength = 0;
    TreeNode root = new TreeNode(0, 0);
    for (int i = 1; i + maxLength < S.length(); i++) {
        int len = addNew(root, i);
        if (len > maxLength) {
            maxLength = len;
            maxLo = i;
        }
    }
    return S.substring(maxLo, maxLo + maxLength);
}

private boolean isLeaf(TreeNode node) {
    return node.next == null;
}

private int getIndex(int i, int depth) {
    return S.charAt(i + depth) - 'a';
}

private int addNew(TreeNode node, int i) {
    int depth = node.depth;
    if (i + depth == S.length()) return depth;
    if (isLeaf(node)) {
        node.next = new TreeNode[26];
        node.next[getIndex(node.i, node.depth)] = new TreeNode(node.i, depth + 1);
    }
    int c = getIndex(i, node.depth);
    TreeNode x = node.next[c];
    if (x == null) {
        node.next[c] = new TreeNode(i, depth + 1);
        return depth;
    }
    return addNew(x, i);
}

private static class TreeNode {
    private TreeNode[] next;
    private int i;
    private int depth;

    public TreeNode(int i, int depth) {
        this.i = i;
        this.depth = depth;
    }
}
````

#### 330. Patching Array
Let miss be the smallest sum in [0,n] that we might be missing. Meaning we already know we can build all sums in [0,miss). 
Then if we have a number num <= miss in the given array, we can add it to those smaller sums to build all sums in [0,miss+num). 
If we don't, then we must add such a number to the array, and it's best to add miss itself, to maximize the reach.

Example: Let's say the input is nums = [1, 2, 4, 13, 43] and n = 100. We need to ensure that all sums in the range [1,100] are possible.

Using the given numbers 1, 2 and 4, we can already build all sums from 0 to 7, i.e., the range [0,8). 
But we can't build the sum 8, and the next given number (13) is too large. So we insert 8 into the array. Then we can build all sums in [0,16).

Do we need to insert 16 into the array? No! We can already build the sum 3, and adding the given 13 gives us sum 16. We can also add the 13 to the other sums, extending our range to [0,29).

And so on. The given 43 is too large to help with sum 29, so we must insert 29 into our array. This extends our range to [0,58). But then the 43 becomes useful and expands our range to [0,101). At which point we're done.
```java
public int minPatches(int[] nums, int n) {
    int patches = 0;
    long x = 1;
    int length = nums.length, index = 0;
    while (x <= n) {
        if (index < length && nums[index] <= x) {
            x += nums[index];
            index++;
        } else {
            x *= 2;
            patches++;
        }
    }
    return patches;
}
```

#### 621. Task Scheduler
https://leetcode.com/problems/task-scheduler/
* `Runtime: 3 ms, faster than 63.84%, Memory Usage: 55.2 MB, less than 10.27% of Java online submissions`
```
//O(M)time  M = task count
//O(1)space
public int leastInterval(char[] tasks, int n) {
    int[] map = new int[26];
    for (char c: tasks)
        map[c - 'A']++;
    Arrays.sort(map);
    int max_val = map[25] - 1, idle_slots = max_val * n;
    for (int i = 24; i >= 0 && map[i] > 0; i--) {
        idle_slots -= Math.min(map[i], max_val);
    }
    return idle_slots > 0 ? idle_slots + tasks.length : tasks.length;
}
```

#### 2141. Maximum Running Time of N Computers
The idea is to remove batteries (and their corresponding computers) from the equation 
which we know will be used continually till the end. We do this because it shows us what power will be wasted, 
and we can remove it from the equation. Once we get to the point that we cannot obviously remove any more, 
the answer will magically be the average, truncated. 
I do not understand the proof behind this math, it all seems very presumptive, but some research revealed it to be so.
```javascript
var maxRunTime = function(n, batteries) {
    let total = batteries.reduce((acc,x)=>acc+x,0)
    let batts = batteries.sort((a,b)=>b-a)
    let i = 0
    while(1){
        let average_truncated = parseInt(total / n)
        let cur = batts[i]
        if(cur > average_truncated){
            total -= cur // remove all of that batteries charge from the equation
            n --         // remove the computer from the equation
            i++
        } else {
            return average_truncated
        }
    }
};

var maxRunTime = function(n, batteries) {
    let total = batteries.reduce((acc, x)=>acc + x,0);
    batteries.sort((a, b) => b - a);// DESC!!!!
   
    for (const cur of batteries) {  
        const avg = parseInt(total / n);  
        if(cur > avg){
            total -= cur; // remove all of that batteries charge from the equation
            n--;         // remove the computer from the equation
        } else {
            return avg;
        }
    }
};


// greedy with reverse sort
const maxRunTime = (n, batteries) => {
    batteries.sort((x, y) => y - x);// DESC!!!!
    let sum = batteries.reduce((x, y) => x + y);

    for (const x of batteries) {
        if (sum >= n * x) {
            return parseInt(sum / n);
        } else {
            n--;
            sum -= x;
        }
    }
};
```

#### 2335. Minimum Amount of Time to Fill Cups
Necessary conditions (lower bound)

res >= max(A)
Because each time, one type can reduce at most 1 cup,
so the final result is bigger or equal to max(A)

res >= ceil(sum(A) / 2)
Because each time, we can fill up to 2 cups,
so the final result is bigger or equal to ceil(sum(A) / 2)

Sufficient condition (realizeable)
One strategy is to greedily fill up 2 cups with different types of water.
Each step, we pick the 2 types with the most number, until there is only one kind.

Conclusion
The lower bound is realizable, so it's proved as the minimum steps.
```javascript
var fillCups = function(amount) {
  return Math.max(...amount, Math.ceil(amount.reduce((a, b) => a + b) / 2));
};
// Explanation: We can only care about the largest 2 elements in the array and try to fill them at one time, 
// then dynamically find the largest 2 elements in the next loops, do the same thing until we fill all the cups.
/**
 * Greedy
 * @param {number[]} amount
 * @return {number}
 */
var fillCups = function (amount) {
  const [cold, warm, hot] = amount.sort((a, b) => b - a);
  
  if (hot === 0) {
    return Math.max(...amount);
  }

  return 1 + fillCups([cold - 1, warm - 1, hot]);
};
```
```java
public int fillCups(int[] amount) {
        Arrays.sort(amount);
        int res = 0;
        while (amount[2] != 0) {
            res++;
            amount[2]--;
            if (amount[1] > 0) {
                amount[1]--;
            }
            Arrays.sort(amount);
        }
        return res;
    }
```