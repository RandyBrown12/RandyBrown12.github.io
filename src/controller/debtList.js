import { isNumber } from "./utility.js"

//inputVariablesObject = {income: income, debtsList:debtsList[]}
function debtList(inputVariablesObject) {
    const currentDebts = [].concat(inputVariablesObject.debtsList);

    currentDebts.sort(function(a, b) {return a[0] - b[0];});

    // Perform calculations
    givenIncome /= 12;
    givenIncome = Number(givenIncome.toFixed(2));

    let date = new Date();
    const dateList = [];
    const debtList = [];
    let extraMoney = 0, debtsSum = 0;
    try 
    {
        while(currentDebts.length !== 0)
        {
            extraMoney = givenIncome;
            debtsSum = 0;

            //Pay off minimums and then pay off interest.
            for(const [principal, interestRate, mmp, interest] of currentDebts)
            {
                extraMoney -= mmp
                debtsSum += principal;
            }

            //Flag
            if(extraMoney < 0) {
                throw "Can't pay off minimum payments!";
            }

            extraMoney = Number(extraMoney.toFixed(2));
            debtsSum = Number(debtsSum.toFixed(2));

            //Use extra money toward the principal of first debt
            if(currentDebts[0][3] > 0.00) 
            {
                currentDebts[0][3] -= extraMoney;
                currentDebts[0][3] = Number(currentDebts[0][3].toFixed(2))
                if(currentDebts[0][3] <= 0.00) 
                {
                    currentDebts[0][0] -= Math.abs(currentDebts[0][3]);
                    currentDebts[0][3] = 0.00
                }
            } else {
                currentDebts[0][0] -= extraMoney;
            }
            currentDebts[0][0] = Number(currentDebts[0][0].toFixed(2));

            while(currentDebts.length != 0 && currentDebts[0][0] <= 0.00)
            {
                if(currentDebts.length >= 2)
                {
                    currentDebts[1][0] -= Math.abs(currentDebts[0][0]);
                    currentDebts[1][0] = Number(currentDebts[1][0].toFixed(2));
                }
            currentDebts.shift();
            }

            dateAndDebtsSumList[0].push(new Intl.DateTimeFormat("en-US",{year: 'numeric', month:"long"}).format(date));
            date.setMonth(date.getMonth() + 1);
            dateAndDebtsSumList[1].push(debtsSum);
            
            //Add interest toward debts using simple.
            for(var i = 0; i < currentDebts.length; i++) 
            {
                currentDebts[i][3] = currentDebts[i][0] * currentDebts[i][1] * (1/12);
                currentDebts[i][3] = Number(currentDebts[i][3].toFixed(2));
            }

            //Last point
            if(currentDebts.length === 0) 
            {
                dateAndDebtsSumList[0].push(new Intl.DateTimeFormat("en-US",{year: 'numeric', month:"long"}).format(date));
                dateAndDebtsSumList[1].push(0.00);
            }

            //Flag
            if(dateAndDebtsSumList[1].length >= 100) {
                throw "Can't pay off debts!";
            }
        }
    } catch(e) {
        window.alert(e);
        return;
    }

}