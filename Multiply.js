

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
