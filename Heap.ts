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
 * IHeap
 *
 * the interface specifying methods for Heap to implement
 */
interface IHeap<T> {
  insert(element: T): void;
  heapify(): void;
}

/**
 * Heap - implements the Heap data structure
 */
class Heap<T> extends Array<T> implements IHeap<T> {
  type: string;
  comparisonCounter: number = 0;

  constructor(type: string, items?: T[]) {
    super(...items);
    (<any>Object).setPrototypeOf(this, Object.create(Heap.prototype));
    this.type = type;
  }

  /**
   * getParentIndex
   *
   * gets the index of the current item's parent
   *
   * @param currentIndex the position of the current item whose parent index is needed
   * @return number
   */
  getParentIndex(currentIndex: number): number {
    return Math.floor((currentIndex - 1) / 2);
  }

  /**
   * isHeapTypeConditionSatisfied
   *
   * determines whether the Heap's (MIN or MAX) condition is satisified
   *
   * @param currentIndex the index of the current item
   * @return boolean
   */
  isHeapTypeConditionSatisfied(currentIndex: number): boolean {
    const parentIndex = this.getParentIndex(currentIndex);

    return this.type === HeapTypes.MAX
      ? this[parentIndex] >= this[currentIndex]
      : this[parentIndex] <= this[currentIndex]
  }

  /**
   * swapCurrentItemWithParent
   *
   * swaps the current item with its parent item and returns the parent's index
   *
   * @param currentIndex the index of the current item
   * @return number
   */
  swapCurrentItemWithParent(currentIndex: number): number {
    const parentIndex = this.getParentIndex(currentIndex);
    const temp: T = this[currentIndex];
    this[currentIndex] = this[parentIndex];
    this[parentIndex] = temp;

    return parentIndex;
  }

  /**
   * heapify
   *
   * rearranges the Heap to satisfy its heap condition
   *
   * @return void
   */
  heapify(): void {
    let currentIndex = this.length - 1;

    while (!this.isHeapTypeConditionSatisfied(currentIndex) && !(currentIndex <= 0)) {
      currentIndex = this.swapCurrentItemWithParent(currentIndex);

      this.comparisonCounter += 1;
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
    this.heapify();
  }
}

console.log("\nGenerate MAX Heap and MIN Heap for the entries 50, 5, 12, 27, 43, 4, 10, 1\n");

// Max Heap
const maxHeap = new Heap<number>("MAX");

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
console.log(`For all the entries, it did ${maxHeap.comparisonCounter} comparisons >>>>> ${maxHeap.comparisonCounter} <= 24 is ${maxHeap.comparisonCounter <= 24 } as expected.\n\n`);

//===================================================================

// Min Heap
const minHeap = new Heap<number>("MIN");

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
console.log(`For all the entries, it did ${minHeap.comparisonCounter} comparisons >>>>> ${minHeap.comparisonCounter} <= 24 is ${minHeap.comparisonCounter <= 24 } as expected\n\n`);
