#!/usr/bin/ruby

def fibonacciSequence(n)
  sequence = [];
  f1 = 0
  f2 = 1
  sequence.push(f2)
  (n - 1).times do |i|
    temp = f1
    f1 = f2
    f2 = temp + f1
    sequence.push(f2)
  end
  
  return sequence
end

def fibonacciNumber(n)
  if n <= 0
    return -1
  end
  
  if n == 1 or n == 2
    return 1
  end
  
  return fibonacciNumber(n-1) + fibonacciNumber(n-2)
end

#Run fibonacciSequence and fibonacciNumber

print("Enter a number to get the fibonacciSequence up to that position: ")
number = gets.chomp.to_i
puts fibonacciSequence(number)

print("Enter a number to get the fibonacciNumber at that position: ")
number = gets.chomp.to_i
puts fibonacciNumber(number)

