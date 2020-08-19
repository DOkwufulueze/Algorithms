"use strict";

/**
 * SelectionSort: Sort an array in O(n^2)
 *
 * @param {any} array the array to be sorted
 * @param {number} order the ordering - >= 0 means ascending order, -1 means descending order
 */

function SelectionSort(array, order = 0) {
  for (let i = 0; i < array.length - 1; i++) {
    let pointer = i;
    for (let j = i + 1; j < array.length; j++) {
      // check for the smallest element if order >= 0
      // check for the largest element, otherwise
      if (order >= 0 ? array[j] < array[pointer] : array[j] > array[pointer]) pointer = j;
    }

    // swap the pointed element referenced by pointer with array[i]
    let pointed = array[pointer];
    array[pointer] = array[i];
    array[i] = pointed;
  }

  return array;
}
