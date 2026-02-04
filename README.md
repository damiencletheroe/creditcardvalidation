Solution to a codecademy intermediate challenge to instantiate the Luhn algorithm to validate credit card numbers.

Instructions:
* Create a function, validateCred() that has a parameter of an array. The purpose of validateCred() is to return true when an array contains digits of a valid credit card number and false when it is invalid. This function should NOT mutate the values of the original array. The function will need to be an instantation of the Luhn algorithm.

* Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers. The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.

* After finding all the invalid credit card numbers, it’s also necessary to identify the credit card companies that have possibly issued these faulty numbers.  Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers and returns an array of companies. Currently, there are 4 accepted companies which each have unique first digits. The following table shows which digit is unique to which company:
First Digit	Company
3	Amex (American Express)
4	Visa
5	Mastercard
6	Discover
If the number doesn’t start with any of the numbers listed, print out a message like: “Company not found”.
idInvalidCardCompanies() should return an array of companies that have mailed out cards with invalid numbers. This array should NOT contain duplicates, i.e. even if there are two invalid Visa cards, "Visa" should only appear once in the array.

* Create a function that will convert invalid numbers into valid numbers.
