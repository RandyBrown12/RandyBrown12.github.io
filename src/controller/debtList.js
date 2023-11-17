import { convertPercentToDecimal } from "./utility";
//inputVariablesObject = {income: income, debtsList:debtsList[]}
export const debtList = inputVariablesObject => {
    let monthlyIncome = inputVariablesObject.income;
    const currentDebts = [...inputVariablesObject.debtsList];
    currentDebts.sort((a, b) => a[0] - b[0]);
    //currentDebts = [{},{}]
    for(let i = 0; i < currentDebts.length; i++) {
        currentDebts[i] = {principal:parseFloat(currentDebts[i][0]),
            interest:convertPercentToDecimal(parseFloat(currentDebts[i][1]), 100),
            loanMonths:parseFloat(currentDebts[i][2])}
        currentDebts[i] = {...currentDebts[i], 
                        monthlyPayment: currentDebts[i].principal * currentDebts[i].interest / currentDebts[i].loanMonths,
                        interestSum: 0}
    }
    // Perform calculations
    console.table(currentDebts);
    monthlyIncome = convertPercentToDecimal(monthlyIncome, 12);

    let date = new Date();
    let freedUpIncome = 0;
    const dateList = [];
    const debtList = [];
    try {
        while(currentDebts.length !== 0) {
            let currentIncome = monthlyIncome + freedUpIncome;

            for(const {monthlyPayment} of currentDebts) {
                currentIncome -= monthlyPayment;
            }

            if(currentIncome < 0) {
                throw new Error("Can't pay off minimum payments!");
            }

            currentIncome = Number(currentIncome.toFixed(2));

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
            } else {
                freedUpIncome = 0;
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
            debtList.push(sumPrincipals.toFixed(2));

            //Flag
            if(debtList.length >= 100) {
                throw new Error("Can't pay off debts!");
            }
        }
    } catch(e) {
        window.alert(e);
        return null;
    }

    return {dateList, debtList};
}

/* try 
{
    while(currentDebts.length !== 0)
    {
        debtsSum = 0;
        //Pay off minimums
        for(const {monthlyPayment} of currentDebts) {
            extraMoney -= monthlyPayment;
        }

        //Flag
        if(extraMoney < 0) {
            throw new Error("Can't pay off minimum payments!");
        }

        extraMoney = Number(extraMoney.toFixed(2));
        debtsSum = Number(debtsSum.toFixed(2));

        //Use extra money toward the principal of first debt
        if(currentDebts[0].sumInterest > 0.00)
        {
            currentDebts[0].sumInterest -= extraMoney;
            currentDebts[0].sumInterest = Number(currentDebts[0].sumInterest.toFixed(2))
            if(currentDebts[0].sumInterest <= 0.00) 
            {
                currentDebts[0].principal -= Math.abs(currentDebts[0].sumInterest);
                currentDebts[0].sumInterest = 0.00
            }
        } else {
            currentDebts[0].principal -= extraMoney;
        }
        currentDebts[0].principal = Number(currentDebts[0].principal.toFixed(2));

        while(currentDebts.length !== 0 && currentDebts[0].principal <= 0.00)
        {
            if(currentDebts.length >= 2)
            {
                currentDebts[1].principal -= Math.abs(currentDebts[0].principal);
                currentDebts[1].principal = Number(currentDebts[1].principal.toFixed(2));
            }
        currentDebts.shift();
        }

        dateList.push(new Intl.DateTimeFormat("en-US",{year: 'numeric', month:"long"}).format(date));
        date.setMonth(date.getMonth() + 1);
        debtList.push(debtsSum);
        
        //Add interest toward debts using simple.
        for(var i = 0; i < currentDebts.length; i++) 
        {
            currentDebts[i].sumInterest = currentDebts[i].principal * currentDebts[i].interest * (1/12);
            currentDebts[i].sumInterest = Number(currentDebts[i].sumInterest.toFixed(2));
        }

        //Last point
        if(currentDebts.length === 0) 
        {
            dateList.push(new Intl.DateTimeFormat("en-US",{year: 'numeric', month:"long"}).format(date));
            debtList.push(0.00);
        }

        //Flag
        if(debtList.length >= 100) {
            throw new Error("Can't pay off debts!");
        }
    }
} catch(e) {
    window.alert(e);
    return null;
} */