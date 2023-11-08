const conversionRatiosToYear = new Map([["Week", 52.1429], ["Biweek", 26.07145], ["Semimonth", 24], ["Month", 12], ["Year", 1]]);
const debtsHashMap = new Map([[0, null],[1, null],[2, null],[3, null],[4, null]]);
const deletionOrder = [];
const debtCount = 5;
let count = 0;

const yearlyRates = new Map([
    ["Federal", [[0.10, 10275], [0.12, 41775], [0.22, 89075], [0.24, 170050], [0.32, 215950], [0.35, 539900], [0.37, Infinity]]],
/*     ["Federal", [[0.10, 10275], [0.12, 41775], [0.22, 89075], [0.24, 170050], [0.32, 215950], [0.35, 539900], [0.37, Infinity]]],
    ["Federal", [[0.10, 10275], [0.12, 41775], [0.22, 89075], [0.24, 170050], [0.32, 215950], [0.35, 539900], [0.37, Infinity]]],
    ["Federal", [[0.10, 10275], [0.12, 41775], [0.22, 89075], [0.24, 170050], [0.32, 215950], [0.35, 539900], [0.37, Infinity]]], 
    ["State", [[0, 6350], [0.0025, 7350], [0.0075, 8850], [0.0175, 10100], [0.0275, 11250], [0.0375, 13550], [0.0475, Infinity]]],
    ["State", [[0, 6350], [0.0025, 7350], [0.0075, 8850], [0.0175, 10100], [0.0275, 11250], [0.0375, 13550], [0.0475, Infinity]]],
    ["State", [[0, 6350], [0.0025, 7350], [0.0075, 8850], [0.0175, 10100], [0.0275, 11250], [0.0375, 13550], [0.0475, Infinity]]], */
    ["State", [[0, 6350], [0.0025, 7350], [0.0075, 8850], [0.0175, 10100], [0.0275, 11250], [0.0375, 13550], [0.0475, Infinity]]],
]);
const ficaMaximumRate = 160200, medicareMaxiumRate = 200000;
const medicareTaxRate = [0.0145, 0.0235];
let ficaTaxRate = 0.072;
const setBracketMaximum = (salary) => {
    yearlyRates.set("Federal", [[0.10, 10275], [0.12, 41775], [0.22, 89075], [0.24, 170050], [0.32, 215950], [0.35, 539900], [0.37, salary]])
    yearlyRates.set("State", [[0, 6350], [0.0025, 7350], [0.0075, 8850], [0.0175, 10100], [0.0275, 11250], [0.0375, 13550], [0.0475, salary]])
}
//Margin Tax Rate: $10,275 goes to 10%, $31500 goes to 12%, until it reaches a bracket.
//1st additional money, 2nd number rate, 3rd number maxAllotedIncome

//Note: First input is 40 hours per week.
//Note 2: If in hours, convert hours to weeks otherwise convert [weeks,months,years] to years.
//Test: $7.25 hr with 40 hrs/week should be 290 per week.
//Test2: $290 week with 40 hrs/week should be 1256 per month.
function getTaxRate(grossIncome, chosenTaxBracket) 
{
    let prevMaxIncome = 0;
    let taxes = 0;
    for(const [marginalTaxRate, maxAllotedIncome] of yearlyRates.get(chosenTaxBracket))
    {
        if(grossIncome > maxAllotedIncome)
        {
            taxes += marginalTaxRate * (maxAllotedIncome - prevMaxIncome);
            prevMaxIncome = maxAllotedIncome;
        } else {
            taxes += marginalTaxRate * (grossIncome - prevMaxIncome);
            break;
        }
    }
    return parseFloat(taxes.toFixed(2));
}

function getFicaTaxRate(grossIncome, isSelfEmployed) 
{
    let totalTaxIncome = 0;
    ficaTaxRate = isSelfEmployed ? 0.144 : 0.072;
    totalTaxIncome += (grossIncome > ficaMaximumRate ? 0 : grossIncome) * ficaTaxRate;
    totalTaxIncome += (grossIncome > medicareMaxiumRate ? medicareTaxRate[1] : medicareTaxRate[0]) * grossIncome;
    return parseFloat(totalTaxIncome.toFixed(2));
}

const isNumber = number => typeof number === "number" && !isNaN(number);

const takeHomePay = (workHours, incomeBeforeTax, salaryTimeOption, afterCalculationTimeOption, selfEmployed) =>
{
    let federalTaxedIncome = 0, stateTaxedIncome = 0, ficaTaxedIncome = 0, incomeAfterTax = 0;
    try 
    {
        if((!isNumber(workHours) && salaryTimeOption === "Hour") || !isNumber(incomeBeforeTax)) {
            throw "Please enter numbers in the textboxes!";
        } else if((workHours <= 0 && (salaryTimeOption === "Hour") || incomeBeforeTax <= 0)) {
            throw "Please enter positive numbers in the textboxes!";
        } else if((workHours > 168 && salaryTimeOption === "Hour")) {
            throw "You can't work over 168 hours every week!";
        }

        if (salaryTimeOption === "Hour") {
            incomeBeforeTax *= workHours;
            salaryTimeOption = "Week";
        }
        
        if(conversionRatiosToYear.get(salaryTimeOption) === undefined)
            throw "No Conversion Found";

        incomeBeforeTax *= conversionRatiosToYear.get(salaryTimeOption);
        setBracketMaximum(incomeBeforeTax);
    
        federalTaxedIncome = getTaxRate(incomeBeforeTax, "Federal");
        stateTaxedIncome = getTaxRate(incomeBeforeTax, "State");
        ficaTaxedIncome = getFicaTaxRate(incomeBeforeTax, selfEmployed);
    
        incomeAfterTax = (incomeBeforeTax - (federalTaxedIncome + stateTaxedIncome + ficaTaxedIncome)).toFixed(2);
        if(conversionRatiosToYear.get(afterCalculationTimeOption) === undefined)
            throw "No Conversion Found";
        incomeBeforeTax = parseFloat((incomeBeforeTax / conversionRatiosToYear.get(afterCalculationTimeOption)).toFixed(2));
        incomeAfterTax = parseFloat((incomeAfterTax / conversionRatiosToYear.get(afterCalculationTimeOption)).toFixed(2));
    } catch (exception) {
        return null;
    }

    return { incomeBeforeTax, incomeAfterTax, federalTaxedIncome, stateTaxedIncome, ficaTaxedIncome};
}

module.exports = takeHomePay;