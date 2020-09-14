/**
 * HeapTypes
 *
 * the types of Heap that can be initialised - MAX and/or MIN
 */
enum HeapTypes {
  MAX = 'MAX',
  MIN = 'MIN',
};

/**
* ChildNodeTypes
*
* the Child Nodes that a Heap Node can have (LEFT and/or RIGHT)
*/
enum ChildNodeTypes {
  LEFT,
  RIGHT,
};

/**
 * IHeap
 *
 * the interface specifying methods for Heap to implement
 */
interface IHeap<T> {
  insert(element: T): void;
  delete(): T;
  heapifyUp(): void;
  heapifyDown(): void;
}

/**
 * Heap - implements the Heap data structure
 */
class Heap<T> extends Array<T> implements IHeap<T> {
  type: string;
  insertComparisonCounter: number = 0;
  deleteComparisonCounter: number = 0;

  constructor(type: string, items?: T[]) {
    super(...items);
    (<any>Object).setPrototypeOf(this, Object.create(Heap.prototype));
    this.type = type;
  }

  /**
   * getParentNodeIndex
   *
   * gets the index of the current item's parent
   *
   * @param currentIndex the position of the current item whose parent index is needed
   * @return number
   */
  getParentNodeIndex(currentIndex: number): number {
    return Math.floor((currentIndex - 1) / 2);
  }

  /**
   * getChildNodeIndex
   *
   * gets the index of the current item's child node as
   * specified by the childNodeType argument (LEFT or RIGHT)
   *
   * @param currentIndex the position of the current item whose child node index is needed
   * @param childNodeType the type of the current item's child node that is needed - LEFT or RIGHT
   * @return number
   */
  getChildNodeIndex(currentIndex: number, childNodeType: ChildNodeTypes): number {
    return childNodeType === ChildNodeTypes.LEFT
    ? (currentIndex * 2) + 1
    : (currentIndex * 2) + 2;
  }

  /**
   * isHeapTypeConditionSatisfiedForHeapifyUp
   *
   * determines whether the Heap's (MIN or MAX) condition is satisified
   *
   * @param currentIndex the index of the current item
   * @return boolean
   */
  isHeapTypeConditionSatisfiedForHeapifyUp(currentIndex: number): boolean {
    const parentNodeIndex = this.getParentNodeIndex(currentIndex);

    return this.type === HeapTypes.MAX
      ? this[parentNodeIndex] >= this[currentIndex]
      : this[parentNodeIndex] <= this[currentIndex]
  }

  /**
   * isHeapTypeConditionSatisfiedForHeapifyUp
   *
   * determines whether the Heap's (MIN or MAX) condition is satisified
   *
   * @param currentIndex the index of the current item
   * @return boolean
   */
  isHeapTypeConditionSatisfiedForHeapifyDown(currentIndex: number): boolean {
    const childNodeIndex = this.getChildNodeIndexThatSatisfiesHeapCondition(currentIndex);

    return this.type === HeapTypes.MAX
      ? this[childNodeIndex] <= this[currentIndex]
      : this[childNodeIndex] >= this[currentIndex]
  }

  swapItems(firstIndex: number, secondIndex: number) {
    const temp: T = this[firstIndex];
    this[firstIndex] = this[secondIndex];
    this[secondIndex] = temp;
  }

  /**
   * swapCurrentItemWithParentItem
   *
   * swaps the current item with its parent item and returns the parent's index
   *
   * @param currentIndex the index of the current item
   * @return number
   */
  swapCurrentItemWithParentItem(currentIndex: number): number {
    const parentNodeIndex = this.getParentNodeIndex(currentIndex);
    this.swapItems(currentIndex, parentNodeIndex);

    return parentNodeIndex;
  }

  /**
   * getChildNodeIndexThatSatisfiesHeapCondition
   * gets the node index of the child node that satisfies the Heap's condition
   *
   * @param currentIndex the index of the current item
   *
   * @return number
   */
  getChildNodeIndexThatSatisfiesHeapCondition(currentIndex: number): number {
    const leftChildNodeIndex = this.getChildNodeIndex(currentIndex, ChildNodeTypes.LEFT);
    const rightChildNodeIndex = this.getChildNodeIndex(currentIndex, ChildNodeTypes.RIGHT);
    const childNodeIndex = this.type === 'MAX'
    ? (
      this[leftChildNodeIndex] >= this[rightChildNodeIndex]
      ? leftChildNodeIndex : rightChildNodeIndex
    ) : (
      this[leftChildNodeIndex] <= this[rightChildNodeIndex]
      ? leftChildNodeIndex : rightChildNodeIndex
    );

    return childNodeIndex;
  }

  /**
   * swapCurrentItemWithChildItem
   * swaps the current item with its qualified child item and returns the child's index
   *
   * @param currentIndex the index of the current item
   *
   * @return number
   */
  swapCurrentItemWithChildItem(currentIndex: number): number {
    const childNodeIndex = this.getChildNodeIndexThatSatisfiesHeapCondition(currentIndex);
    this.swapItems(currentIndex, childNodeIndex);
    return childNodeIndex;
  }

  /**
   * heapifyUp
   *
   * rearranges the Heap to satisfy its heap condition by
   * taking the inserted item to its final position
   *
   * @return void
   */
  heapifyUp(): void {
    let currentIndex = this.length - 1;

    while (!this.isHeapTypeConditionSatisfiedForHeapifyUp(currentIndex) && !(currentIndex <= 0)) {
      currentIndex = this.swapCurrentItemWithParentItem(currentIndex);

      this.insertComparisonCounter += 1;
    }
  }

  /**
   * heapifyDown
   *
   * rearranges the Heap to satisfy its heap condition by
   * taking the root item to its final position
   *
   * @return void
   */
  heapifyDown(): void {
    let currentIndex = 0;
    while (!this.isHeapTypeConditionSatisfiedForHeapifyDown(currentIndex) && !(currentIndex > length - 2)) {
      currentIndex = this.swapCurrentItemWithChildItem(currentIndex);

      this.deleteComparisonCounter += 1;
    }
  }

  /**
   * insert
   *
   * inserts a new item into the heap
   *
   * @param element the new element to insert into the heap
   * @return void
   */
  insert(element: T): void {
    this[this.length] = element;
    this.heapifyUp();
  }

  delete(): T {
    const rootIndex = 0;
    const leafIndex = this.length - 1;
    this.swapItems(leafIndex, rootIndex);
    this.heapifyDown();
    return this[leafIndex];
  }
}

// ==================================================================
// SAMPLE RUN OF THE DATA STRUCTURE
// ==================================================================
function runSample() {
  // INSERT

  console.log("\nGenerate MAX Heap and MIN Heap for the entries 50, 5, 12, 27, 43, 4, 10, 1\n");

  // Max Heap
  const maxHeap: Heap<number> = new Heap<number>("MAX");

  maxHeap.insert(50);
  // parentPosition = Math.floor((0 - 1) / 2) => null ===== [50]

  maxHeap.insert(5);
  // parentPosition = Math.floor((1 - 1) / 2) => 0 ===== [50, 5]

  maxHeap.insert(12);
  // parentPosition = Math.floor((2 - 1) / 2) => 0 ===== [50, 5, 12]

  maxHeap.insert(27);
  // parentPosition = Math.floor((3 - 1) / 2) => 1 - swap with 5 ===== [50, 27, 12, 5]

  maxHeap.insert(43);
  // parentPosition = Math.floor((4 - 1) / 2) => 1 - swap with 27 ===== [50, 43, 12, 5, 27]

  maxHeap.insert(4);
  // parentPosition = Math.floor((5 - 1) / 2) => 2 ===== [50, 43, 12, 5, 27, 4]

  maxHeap.insert(10);
  // parentPosition = Math.floor((6 - 1) / 2) => 2 ===== [50, 43, 12, 5, 27, 4, 10]

  maxHeap.insert(1);
  // parentPosition = Math.floor((7 - 1) / 2) => 3 ===== [50, 43, 12, 5, 27, 4, 10, 1]

  console.log(`MAX HEAP: ${maxHeap}`); // [50, 43, 12, 5, 27, 4, 10, 1]
  console.log('Max Heap generation for all the entries did not do more than (n * log n) comparisons where n = 8, therefore, at most 24 comparisons - O(n * log n) = O(24).');
  console.log(`For all the entries, it did ${maxHeap.insertComparisonCounter} comparisons >>>>> ${maxHeap.insertComparisonCounter} <= 24 is ${maxHeap.insertComparisonCounter <= 24 } as expected.\n\n`);

  //===================================================================

  // Min Heap
  const minHeap: Heap<number> = new Heap<number>("MIN");

  minHeap.insert(50);
  // parentPosition = Math.floor((0 - 1) / 2) => null

  minHeap.insert(5);
  // parentPosition = Math.floor((1 - 1) / 2) => 0 - swap with 50 ===== [5, 50]

  minHeap.insert(12);
  // parentPosition = Math.floor((2 - 1) / 2) => 0 ===== [5, 50, 12]

  minHeap.insert(27);
  // parentPosition = Math.floor((3 - 1) / 2) => 1 - swap with 50 ===== [5, 27, 12, 50]

  minHeap.insert(43);
  // parentPosition = Math.floor((4 - 1) / 2) => 1 ===== [5, 27, 12, 50, 43]

  minHeap.insert(4);
  // parentPosition = Math.floor((5 - 1) / 2) => 2 - swap with 12 ===== [5, 27, 4, 50, 43, 12]
  // parentPosition = Math.floor((2 - 1) / 2) => 0 - swap with 5 ===== [4, 27, 5, 50, 43, 12]

  minHeap.insert(10);
  // parentPosition = Math.floor((6 - 1) / 2) => 2 ===== [4, 27, 5, 50, 43, 12, 10]

  minHeap.insert(1);
  // parentPosition = Math.floor((7 - 1) / 2) => 3 - swap with 50 ===== [4, 27, 5, 1, 43, 12, 10, 50]
  // parentPosition = Math.floor((3 - 1) / 2) => 1 - swap with 27 ===== [4, 1, 5, 27, 43, 12, 10, 50]
  // parentPosition = Math.floor((1 - 1) / 2) => 0 - swap with 4 ===== [1, 4, 5, 27, 43, 12, 10, 50]

  console.log(`MIN HEAP: ${minHeap}`); // [1, 4, 5, 27, 43, 12, 10, 50]
  console.log('Min Heap generation for all the entries did not do more than (n * log n) comparisons where n = 8, therefore, at most 24 comparisons - O(n * log n) = O(24).');
  console.log(`For all the entries, it did ${minHeap.insertComparisonCounter} comparisons >>>>> ${minHeap.insertComparisonCounter} <= 24 is ${minHeap.insertComparisonCounter <= 24 } as expected\n\n`);


  // ==================================================================
  //DELETE

  console.log("\nDelete from MAX Heap and MIN Heap generated above\n");
  console.log('MAX HEAP: [50, 43, 12, 5, 27, 4, 10, 1]');

  // Heap = [50, 43, 12, 5, 27, 4, 10, 1]
  const deleted: number = maxHeap.delete();
  // Run 1
  // current index = next current index = root index = 0
  // current item is always the item in the current index
  // leaf item = 1
  // swap leaf and current item ===== [1, 43, 12, 5, 27, 4, 10, 50]
  // left child index = (0 * 2) + 1 = 1
  // right child index = (0 * 2) + 2 = 2
  // left child = Heap[1] = 43
  // right child = Heap[2] = 12
  // max child = max(left child, right child) = 43
  // next current index = index of max child = 1
  // swap current item and max child ===== [43, 1, 12, 5, 27, 4, 10, 50]

  // Run 2
  // Heap = [43, 1, 12, 5, 27, 4, 10, 50]
  // current index = next current index = 1
  // left child index = (1 * 2) + 1 = 3
  // right child index = (1 * 2) + 2 = 4
  // left child = Heap[3] = 5
  // right child = Heap[4] = 27
  // max child = max(left child, right child) = 27
  // next current index = index of max child = 4
  // swap current item and max child ===== [43, 27, 12, 5, 1, 4, 10, 50]

  // Run 3
  // Heap = [43, 27, 12, 5, 1, 4, 10, 50]
  // current index = next current index = 4
  // left child index = (4 * 2) + 1 = 9
  // right child index = (4 * 2) + 2 = 10
  // left child = Heap[9] = undefined
  // right child = Heap[10] = undefined
  // max child = max(left child, right child) = undefined
  // next current index = index of max child = undefined
  // since no next current index item, stop and return [43, 27, 12, 5, 1, 4, 10, 50]

  console.log(`DELETED FROM MAX HEAP: ${deleted}`); // 50
  console.log(`MAX HEAP AFTER DELETE: ${maxHeap}\n`); // [43, 27, 12, 5, 1, 4, 10, 50]
}
