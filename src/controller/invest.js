import { getTaxRate, getFicaTaxRate, setBracketMaximum } from "./taxRates.js";

const conversionRatiosToYear = new Map([["Week", 52.1429], ["Biweek", 26.07145], ["Semimonth", 24], ["Month", 12], ["Year", 1]]);
const debtsHashMap = new Map([[0, null],[1, null],[2, null],[3, null],[4, null]]);
const deletionOrder = [];
const debtCount = 5;
let count = 0;

/* const addDebtToList = (count) => {
    let principal = parseFloat(principalInput.value), interest = parseFloat(interestInput.value), mmp = parseFloat(mMPInput.value);
    try {
        if(isNaN(principal) || isNaN(interest) || isNaN(mmp))
        {
            throw "Debt Calculator does not have correct format!";
        }
    } catch (exception) {
        window.alert(exception)
        return;
    }
    
    if(debtBulletPointsList.childNodes.length <= debtCount) 
    {
        count = debtBulletPointsList.childNodes.length - 1;
        let selectNum = 0;
        if(deletionOrder.length >= 1 || deletionOrder.length == debtCount) {
            selectNum = deletionOrder[0];
            deletionOrder.shift();
        } else {
            selectNum = count;
        }

        let listElement = document.createElement("li");
        listElement.textContent = `Principal: ${principal} Interest: ${interest} MMP: ${mmp}`;
        listElement.addEventListener('click', function () {
            window.alert('Clicked on: ' + listElement.innerText);
            debtsHashMap.set(selectNum, null);
            deletionOrder.push(selectNum);
            listElement.parentNode.removeChild(listElement);
            listElement = null;
        });
        debtBulletPointsList.append(listElement);
        debtsHashMap.set(selectNum, [principal, interest, mmp, 0.00]);
    } else {
        window.alert("Max Debts is 5!");
        return;
    }
} */
const isNumber = number => typeof number === "number" && !isNaN(number);

export const takeHomePay = (workHours, incomeBeforeTax, salaryTimeOption, afterCalculationTimeOption, selfEmployed) =>
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