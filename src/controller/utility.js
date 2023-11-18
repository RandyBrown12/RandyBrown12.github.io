export const isNumber = number => typeof number === "number" && !isNaN(number);

export const convertPercentToDecimal = (part, whole, decimalPlaces = 2) => Number((part / whole).toFixed(decimalPlaces));

export const sumOfArray = (array) => array.reduce((total, currentValue) => total + currentValue, 0);