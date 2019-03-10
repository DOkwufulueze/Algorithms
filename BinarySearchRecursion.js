/*
* Author: Daniel Okwufulueze
* Date: 10/03/2019
* Name: RecursiveBinarySearch
* Purpose: Recursively search a sorted array of numbers for an item in O(log(n)) time
*/

class RecursiveBinarySearch {
  search(array, item, left, right) {
    left = left !== undefined ? left : 0;
    right = right !== undefined ? right : array.length - 1;
    const midPoint = Math.floor((left + right) / 2);

    if (item === array[midPoint]) return midPoint;

    if (left >= right) return -1;

    if (item < array[midPoint]) {
      right = midPoint - 1;
    } else {
      left = midPoint + 1;
    }

    return this.search(array, item, left, right);
  }
}

/**
 *  const recursiveBinarySearch = new RecursiveBinarySearch();
 *  recursiveBinarySearch.search([1, 2, 3, 7, 8, 10, 11], 1); => 0
 *  recursiveBinarySearch.search([10, 12, 23, 27, 38, 110, 211], 1); => -1
 *  recursiveBinarySearch.search([1, 12, 43, 57, 82, 120, 121], 82); => 4
 *  recursiveBinarySearch.search([9, 21, 53, 59, 68, 90, 91], 91); => 6
 *  recursiveBinarySearch.search([29, 502, 631, 650, 800, 910, 1001], 2000); => -1
 */

