import { getTaxRate, getFicaTaxRate, setBracketMaximum } from "./taxRates.js";
import { isNumber } from "./utility.js"
const conversionRatiosToYear = new Map([["Week", 52.1429], ["Biweek", 26.07145], ["Semimonth", 24], ["Month", 12], ["Year", 1]]);

export const takeHomePay = (workHours, incomeBeforeTax, salaryTimeOption, afterCalculationTimeOption, selfEmployed) =>
{
    let federalTaxedIncome = 0, stateTaxedIncome = 0, ficaTaxedIncome = 0, incomeAfterTax = 0;
    try 
    {
        if((!isNumber(workHours) && salaryTimeOption === "Hour") || !isNumber(incomeBeforeTax)) {
            throw new Error("Please enter numbers in the textboxes!");
        } else if((workHours <= 0 && salaryTimeOption === "Hour") || incomeBeforeTax <= 0) {
            throw new Error("Please enter positive numbers in the textboxes!");
        } else if((workHours > 168 && salaryTimeOption === "Hour")) {
            throw new Error("You can't work over 168 hours every week!");
        }

        if (salaryTimeOption === "Hour") {
            incomeBeforeTax *= workHours;
            salaryTimeOption = "Week";
        }
        
        if(conversionRatiosToYear.get(salaryTimeOption) === undefined || conversionRatiosToYear.get(afterCalculationTimeOption) === undefined)
            throw new Error("No Conversion Found");

        incomeBeforeTax *= conversionRatiosToYear.get(salaryTimeOption);
        setBracketMaximum(incomeBeforeTax);
    
        federalTaxedIncome = getTaxRate(incomeBeforeTax, "Federal");
        stateTaxedIncome = getTaxRate(incomeBeforeTax, "State");
        ficaTaxedIncome = getFicaTaxRate(incomeBeforeTax, selfEmployed);
    
        incomeAfterTax = (incomeBeforeTax - (federalTaxedIncome + stateTaxedIncome + ficaTaxedIncome)).toFixed(2);
        incomeBeforeTax = parseFloat((incomeBeforeTax / conversionRatiosToYear.get(afterCalculationTimeOption)).toFixed(2));
        incomeAfterTax = parseFloat((incomeAfterTax / conversionRatiosToYear.get(afterCalculationTimeOption)).toFixed(2));
    } catch (exception) {
        window.alert(exception);
        return null;
    }

    return { incomeBeforeTax, incomeAfterTax, federalTaxedIncome, stateTaxedIncome, ficaTaxedIncome};
}