//inputVariablesObject = {income: income, debtList:debtList[]}
export const debtList = inputVariablesObject => {
    let income = inputVariablesObject.income;
    const currentDebts = [...inputVariablesObject.debtsList];
    currentDebts.sort((a, b) => a[0] - b[0]);
    //currentDebts = [{},{}]
    for(let i = 0; i < currentDebts.length; i++) {
        currentDebts[i] = {principal:parseFloat(currentDebts[i][0]), 
            interest:parseFloat(currentDebts[i][1]), mMP:parseFloat(currentDebts[i][2]), sumInterest:0};
    }
    // Perform calculations
    income = Number((income / 12).toFixed(2));

    let date = new Date();
    const dateList = [];
    const debtList = [];
    let extraMoney = 0, debtsSum = 0;
    try 
    {
        while(currentDebts.length !== 0)
        {
            extraMoney = income;
            debtsSum = 0;

            //Pay off minimums and then pay off interest.
            for(const {principal, mMP} of currentDebts)
            {
                extraMoney -= mMP;
                debtsSum += principal;
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
    }
    return {dateList, debtList};
}