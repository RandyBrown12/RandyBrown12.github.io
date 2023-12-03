import { convertPercentToDecimal, sumOfArray, fixedDecimalPlaces } from "./utility";

//inputVariablesObject = {income: income, debtsList:debtsList[]}
export const debtList = inputVariablesObject => {
    let monthlyIncome = inputVariablesObject.income;
    const currentDebts = JSON.parse(JSON.stringify(inputVariablesObject.debtsList));
    currentDebts.sort((a, b) => a.principal - b.principal);
    // a ÷ { [ (1 + r) ^ n ] - 1 } ÷ [ r (1 + r) ^ n]
    // a / (1+r)^n - 1 / r * (1+r)^n
    // a / x / y;
    let x = null;
    let y = null;
    for(let i = 0; i < currentDebts.length; i++) {
        currentDebts[i].interest = convertPercentToDecimal(currentDebts[i].interest, 100, 6);
        x = Math.pow(1 + (currentDebts[i].interest / 12), currentDebts[i].loanMonths) - 1;
        y = (currentDebts[i].interest / 12) * Math.pow(1 + (currentDebts[i].interest / 12), currentDebts[i].loanMonths);
        currentDebts[i].monthlyPayment = fixedDecimalPlaces(currentDebts[i].principal / (x / y));
        currentDebts[i].interestSum = 0;
    }
    monthlyIncome = convertPercentToDecimal(monthlyIncome, 12);

    let date = new Date();
    let freedUpIncome = 0;
    let dateList = [];
    let debtList = [];
    try {
        //Flag
        if(currentDebts.length === 0) {
            throw new Error("No Debts have been inputed!");
        } else {
            dateList.push(new Intl.DateTimeFormat("en-US",{year: 'numeric', month:"long"}).format(date));
            date.setMonth(date.getMonth() + 1);
            debtList.push(sumOfArray(currentDebts.map(object => object.principal)));
        }

        while(currentDebts.length > 0) {
            let currentIncome = monthlyIncome;

            for(const {monthlyPayment} of currentDebts) {
                currentIncome -= monthlyPayment;
            }

            if(currentIncome < 0) {
                throw new Error("Can't pay off minimum payments!");
            }

            currentIncome = Number(currentIncome.toFixed(2));

            while(currentIncome !== 0 && currentDebts.length > 0) {
                //Interest not paid off
                if(currentIncome < currentDebts[0].interestSum) {
                    currentDebts[0].interestSum -= currentIncome;
                //Interest paid off
                } else {
                    currentIncome -= currentDebts[0].interestSum;
                    currentDebts[0].interestSum = 0;
                }

                //Principal not paid off
                if(!currentDebts[0].interestSum && currentIncome < currentDebts[0].principal) {
                    currentDebts[0].principal -= currentIncome;
                //Principal paid off
                } else if(!currentDebts[0].interestSum) {
                    freedUpIncome = currentIncome - currentDebts[0].principal;
                    currentDebts.shift();
                }
                currentIncome = freedUpIncome;
            }

            for(var i = 0; i < currentDebts.length; i++) 
            {
                currentDebts[i].sumInterest = currentDebts[i].principal * currentDebts[i].interest * (1/12);
                currentDebts[i].sumInterest = Number(currentDebts[i].sumInterest.toFixed(2));
            }

            let sumPrincipals = 0;
            for(const {principal} of currentDebts) {
                sumPrincipals += principal;
            }

            dateList.push(new Intl.DateTimeFormat("en-US",{year: 'numeric', month:"long"}).format(date));
            date.setMonth(date.getMonth() + 1);
            debtList.push(Number(sumPrincipals.toFixed(2)));

            //Flag
            if(debtList.length >= 200) {
                throw new Error("Can't pay off debts!");
            }
        }
    } catch(err) {
        window.alert(err.message);
        return null;
    }

    //Formatting large amount of data
    if(debtList.length >= 60) {
        debtList = debtList.filter((_, index) => index % 6 === 0 || index === debtList.length - 1);
        dateList = dateList.filter((_, index) => index % 6 === 0 || index === dateList.length - 1);
    } else if(debtList.length >= 20) {
        debtList = debtList.filter((_, index) => index % 3 === 0 || index === debtList.length - 1);
        dateList = dateList.filter((_, index) => index % 3 === 0 || index === dateList.length - 1);
    }

    return {dateList, debtList};
}