/*
* Author: Daniel Okwufulueze
* Date: 09/07/2018
* Name: Factorial
* Purpose: Implement the Factorial function for very large numbers, eg 200!, 500!, 760!, etc.
*          Factorial for smaller numbers still works with this implementation..
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

function factorial (n) {
  if (n < 0 || isNaN(n)) return -1;

  let value = 1;

  for (let i = 1; i <= n; i++) {
    value = multiply(value, i)
  }

  return value;
}

// Examples
console.log("100! = ", factorial(100));
console.log("500! = ", factorial(500));
console.log("6! = ", factorial(6));
console.log("3100! = ", factorial(3100));
console.log("2400! = ", factorial(2400));
console.log("10! = ", factorial(10));
console.log("210! = ", factorial(210));
console.log("5000! = ", factorial(5000));
