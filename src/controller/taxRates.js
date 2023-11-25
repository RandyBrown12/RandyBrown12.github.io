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
export const setBracketMaximum = (salary) => {
    yearlyRates.set("Federal", [[0.10, 10275], [0.12, 41775], [0.22, 89075], [0.24, 170050], [0.32, 215950], [0.35, 539900], [0.37, salary]])
    yearlyRates.set("State", [[0, 6350], [0.0025, 7350], [0.0075, 8850], [0.0175, 10100], [0.0275, 11250], [0.0375, 13550], [0.0475, salary]])
}

export function getTaxRate(grossIncome, chosenTaxBracket) 
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
    return parseFloat(taxes, 2);
}

export function getFicaTaxRate(grossIncome, isSelfEmployed) 
{
    let totalTaxIncome = 0;
    ficaTaxRate = isSelfEmployed ? 0.144 : 0.072;
    totalTaxIncome += (grossIncome > ficaMaximumRate ? 0 : grossIncome) * ficaTaxRate;
    totalTaxIncome += (grossIncome > medicareMaxiumRate ? medicareTaxRate[1] : medicareTaxRate[0]) * grossIncome;
    return parseFloat(totalTaxIncome, 2);
}