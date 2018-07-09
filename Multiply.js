/*
* Author: Daniel Okwufulueze
* Date: 09/07/2018
* Name: Multiply
* Purpose: Multiply numbers using the carry method with an array data store. This method is efficient for computing large multiplications [eg. factorial of 500 -- 500! whose value is very well beyond the capacity of a 64-bit machine to store] and not having memory-limit issues when storing the result of the mutiplication.
*/

function multiply (a, b) {
  let aArray = a.toString().split("").reverse(); // Bring the lsd to the left
  let result = [];
  let carry = 0;

  for (let j = 0; j < aArray.length; j++) {
    let numA = aArray[j];
    let multiple = b * numA + carry;
    result.push(multiple % 10);
    carry = parseInt(multiple / 10, 10);
  }

  while (carry > 0) {
    let resultSize = result.length;
    result[resultSize] = carry % 10;
    carry = parseInt(carry / 10, 10);
  }

  return result.reverse().join("");
}
