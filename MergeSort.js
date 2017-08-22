/*
* Author: Daniel Okwufulueze
* Date: 23/08/2017
* Name: MergeSort
* Purpose: Sorts an array in O(n log n) worst case performance
*/

function MergeSort(arrayObject) {
  if (arrayObject.length === 1) return arrayObject;
  let leftIndex = 0; rightIndex = Math.floor(arrayObject.length / 2);
  let leftSubArray = arrayObject.slice(0, rightIndex), rightSubArray = arrayObject.slice(rightIndex);
  return merge(MergeSort(leftSubArray), MergeSort(rightSubArray));
}

function merge(leftSubArray, rightSubArray) {
  let sortedArray = [];
  while (leftSubArray.length > 0 && rightSubArray.length > 0) {
    if (leftSubArray[0] <= rightSubArray[0]) {
      sortedArray.push(leftSubArray[0]);
      leftSubArray.shift();
    } else {
      sortedArray.push(rightSubArray[0]);
      rightSubArray.shift();    
    }
  }
  
  while (rightSubArray.length > 0) {
    sortedArray.push(rightSubArray[0]);
    rightSubArray.shift(); 
  }
  
  while (leftSubArray.length > 0) {
    sortedArray.push(leftSubArray[0]);
    leftSubArray.shift(); 
  }
  
  return sortedArray;
}

