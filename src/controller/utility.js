export const isNumber = number => typeof number === "number" && !isNaN(number);

export const convertPercentToDecimal = (part, whole, decimalPlaces = 2) => Number((part / whole).toFixed(decimalPlaces));

export const fixedDecimalPlaces = (number, decimalPlaces = 2) => parseFloat(number.toFixed(decimalPlaces));

export const sumOfArray = (array) => array.reduce((total, currentValue) => total + currentValue, 0);

export const conversionRatio = (income, conversionRate) => parseFloat(income / conversionRate, 2);