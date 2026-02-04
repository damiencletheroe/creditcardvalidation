// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

/*
Create a function, validateCred() that has a parameter of an array.
The purpose of validateCred() is to return true when an array contains digits of a valid credit card number and false when it is invalid.
This function should NOT mutate the values of the original array.
The function will need to be an instantation of the Luhn algorithm.
*/

// helper functions
const numTransform = (digit) => {
    let sum = digit * 2;
    if (sum > 9) {
        sum = sum - 9;
    }
    return sum;
}

const reducer = (accumulator, currentValue, index) => {
    const reducerSum = accumulator + currentValue;
    return reducerSum;
}

const findCheckDigit = (array) => {
    return array[array.length -1]
}

const findPayload = (array) => {
    let payload = array.slice(0,array.length - 1);
    return payload;
}

const findIdealCheckDigit = (array) => {
    let revPayload = findPayload(array).slice().reverse();
    // calculate and replace the value based on the position in the array (2nd value doubled, -9 if >9)
    for (let i = 0; i < revPayload.length; i++) {
        if  (i%2 !== 0) {
            continue;
        } else {
            revPayload[i] = numTransform(revPayload[i]);
        }
    }
    // sum digits, work out %10 and then find value check digit needs to be to make total %10 === 0
    let sumPayload = revPayload.reduce(reducer);
    let idealCheckDigit = (10 - (sumPayload % 10)) % 10;
    return idealCheckDigit;
}

// main function
const validateCred = (array) => {
    // split the array into a check digit and the payload and reverse order of the payload for iteration
    let checkDigit = findCheckDigit(array);
    let idealCheckDigit = findIdealCheckDigit(array);
    // compare theoretical check digit value against actual check digit value
    if (idealCheckDigit === checkDigit) {
        return true;
    } else {
        return false
    }; 
}


/*
Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers.
The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.
*/


const findInvalidCards = (arrays) => {
    let invalidArray = [];
    arrays.forEach(
        (array) => {if (!validateCred(array)) {invalidArray.push(array)}}
    )
    return invalidArray;
}

/*
After finding all the invalid credit card numbers, it’s also necessary to identify the credit card companies that have possibly issued these faulty numbers. 
Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers and returns an array of companies.

Currently, there are 4 accepted companies which each have unique first digits. The following table shows which digit is unique to which company:
First Digit	Company
3	Amex (American Express)
4	Visa
5	Mastercard
6	Discover
If the number doesn’t start with any of the numbers listed, print out a message like: “Company not found”.

idInvalidCardCompanies() should return an array of companies that have mailed out cards with invalid numbers.
This array should NOT contain duplicates, i.e. even if there are two invalid Visa cards, "Visa" should only appear once in the array.
*/

const idInvalidCardCompanies = (arrays) => {
    let companies = new Set();
    let companyNames = [];
    
    arrays.forEach(
        (array) => {
            switch (array[0]) {
                case 3:
                    companies.add('Amex (American Express)')
                    break;
                case 4:
                    companies.add('Visa')
                    break;
                case 5:
                    companies.add('Mastercard')
                    break;
                case 6:
                    companies.add('Discover')
                    break;
                default:
                    console.log('Company not found');
                    break;
            }
        }
    )

    companies.forEach(
        (val1, val2, set) => {
            companyNames.push(val1);
        }
    )
    return companyNames;

}


/*
Create a function that will convert invalid numbers into valid numbers.
*/
const convertInvalid = (array) => {
    let convertedCard = array.slice(0, array.length);
    let newCheckDigit = findIdealCheckDigit(convertedCard);
    convertedCard[convertedCard.length-1] = newCheckDigit;
    return convertedCard;
}
