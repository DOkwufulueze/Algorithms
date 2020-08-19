"use strict";

/**
 * Karatsuba(x, y) Multiplies two numbers of variable-length
 * digits using the recursive Karatsuba Algorithm
 *
 * @param {string} x the digits of the first number in the multiplication
 * @param {string} y the digits of the second number in the multiplication.abs
 */
function Karatsuba(x, y) {
  const diff = x.length - y.length;
  let entryToPad = diff < 0 ? x : y;

  for (let i = 0; i < Math.abs(diff); i++) {
    entryToPad = `0${entryToPad}`;
  }

  if (diff < 0) x = entryToPad;
  else y = entryToPad;

  if (x.length === 1 && y.length === 1)
      return (parseInt(x, 10) * parseInt(y, 10));

  const divPointX = Math.floor(x.length / 2);
  const xLeft = x.substring(0, divPointX);
  const xRight = x.substring(divPointX);

  const divPointY = Math.floor(y.length / 2);
  const yLeft = y.substring(0, divPointY);
  const yRight = y.substring(divPointY);

  const topSum = (parseInt(xLeft, 10) + parseInt(xRight, 10)).toString();
  const bottomSum = (parseInt(yLeft, 10) + parseInt(yRight, 10)).toString();

  // Recursively compute a.c, b.d, (a+b).(c+d)

  // a.c
  const left = Karatsuba(xLeft, yLeft);

  // b.d
  const right = Karatsuba(xRight, yRight);

  // (a+b).(c+d)
  const topBottomSumProduct = Karatsuba(topSum, bottomSum);

  const middle = topBottomSumProduct - left - right;

  const product = (Math.pow(10, x.length) * left) + (Math.pow(10, Math.ceil(x.length/2)) * middle) + right;

  return product;
}

// Karatsuba("1234", "5678") => 7006652;
// Karatsuba("123456", "78") => 9629568;
// Karatsuba("12", "345678") => 4148136;
