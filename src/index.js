const Unit = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine"
};

const OriginalTen = {
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
  "13": "thirteen",
  "14": "fourteen",
  "15": "fifteen",
  "16": "sixteen",
  "17": "seventeen",
  "18": "eighteen",
  "19": "nineteen"
};

const Ten = {
  "2": "twenty",
  "3": "thirty",
  "4": "forty",
  "5": "fifty",
  "6": "sixty",
  "7": "seventy",
  "8": "eighty",
  "9": "ninety"
};

const Hundred = {
  "1": "one hundred",
  "2": "two hundred",
  "3": "three hundred",
  "4": "four hundred",
  "5": "five hundred",
  "6": "six hundred",
  "7": "seven hundred",
  "8": "eight hundred",
  "9": "nine hundred"
};

const getUnits = (number) => number % 10;
const getTens = (number, units) => ((number % 100) - units) / 10;
const getHundreds = (number, tens, units) => ((number % 1000) - tens * 10 - units) / 100;


const get2SymbDigit = (number) => {
  if (number > 9 && number < 20) {
    return OriginalTen[number];
  }

  const units = getUnits(number);
  const tens = getTens(number, units);

  if (units === 0) {
    return `${Ten[tens.toString()]}`;
  } else if (tens === 0) {
    return Unit[units.toString()];
  } else {
    return `${Ten[tens.toString()]} ${Unit[units.toString()]}`;
  }
};

const get3SymbDigit = (number) => {
  const units = getUnits(number);
  const tens = getTens(number, units);
  const hundreds = getHundreds(number, tens, units);
  const twoSymbDigit = get2SymbDigit(number - 100 * hundreds);

  if (units === 0 && tens ===0) {
    return `${Hundred[hundreds.toString()]}`;
  }

  return `${Hundred[hundreds.toString()]} ${twoSymbDigit}`;
};


module.exports = function toReadable(number) {
  const numberLength = number.toString().length;

  if (numberLength === 1) {
    return Unit[getUnits(number)];
  } else if (numberLength === 2) {
    return get2SymbDigit(number);
  } else if (numberLength === 3) {
    return get3SymbDigit(number);
  }
}
