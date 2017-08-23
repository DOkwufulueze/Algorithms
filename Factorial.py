#!/usr/bin/python3

#
# Author: Daniel Okwufulueze
# Date: 23/08/2017
# Name: Factorial
# Purpose: Solves the factorial of a non-negative integer n
#

def Factorial(n):
  if (n < 0): return -1
  if (n == 0): return 1
  return n * Factorial(n-1)


# Run Factorial(n)
number = input ("Enter a number to find the Factorial: ")
print (Factorial(number))

