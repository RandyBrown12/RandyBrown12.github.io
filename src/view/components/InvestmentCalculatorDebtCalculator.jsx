import { useState } from "react";
import { isNumber } from "../../controller/utility";
// import { debtList } from "../../controller/debtChart";

const InvestmentCalculatorDebtCalculator = (props) => {
    const [debtInfo, setDebtInfo] = useState(() => [ ]);
    const [principal, setPrincipal] = useState(() => 0);
    const [interest, setInterest] = useState(() => 0);
    const [mMP, setMMP] = useState(() => 0);
    const maxDebts = 5;
    //debtList({income, debtsList:debtInfo})
    const updateInput = e => {
        switch(e.target.id) {
            case 'principal':
                setPrincipal(e.target.value);
                break;
            case 'interest':
                setInterest(e.target.value);
                break;
            case 'mMP':
                setMMP(e.target.value);
                break;
            default:
                window.alert("Input Update Error");
                break;
        }
    }

    const checkInputs = () => {
        try 
        {
            if(!isNumber(parseFloat(principal)) || !isNumber(parseFloat(interest)) || !isNumber(parseFloat(mMP)))
            {
                throw new Error("Debt Calculator does not have correct format!");
            }
        } catch (exception) {
            window.alert(exception)
            return;
        }

        if(debtInfo.length >= maxDebts) {
            window.alert("Debt Calculator has reached max amount of debts!");
            return;
        }

        setDebtInfo([...debtInfo, {principal:principal, interest:interest, mMP:mMP}]);
    }

    const removeDebt = e => setDebtInfo(debtInfo.filter((_, index) => index !== parseInt(e.target.id)));     

    return ( 
        <form id="debtCalculator" className="form__bg calculateForm spacing">
            <p className="center">Debt Calculator: <br/> Find out how fast debt can be paid off with simple interest.</p>
            <p className="center">Add Debts:</p>
            <div className="center">
                <label htmlFor="principal" className="textCenter wrap">Principal: </label>
                <input type="text" id="principal" className="center removeHover form__input" maxlength="9"
                placeholder="Ex: 15000" onChange={e => updateInput(e)}/>
            </div>
            <div className="center">
                <label htmlFor="interest" className="textCenter wrap">Interest: </label>
                <input type="text" id="interest" className="center removeHover form__input" maxlength="6"
                    placeholder="Ex: 4.05%" onChange={e => updateInput(e)} />
            </div>
            <div className="center">
                <label htmlFor="mMP" className="textCenter wrap">Monthly Minimum <br/> Payments: </label>
                <input type="text" id="mMP" className="center removeHover form__input" maxlength="9" placeholder="Ex: 500" onChange={e => updateInput(e)}/>
            </div>
            <button type="button" id="addDebt" className="calculateForm__button center__small spacing" name="addDebt" onClick={checkInputs}>Add Debt</button>
            <button type="button" id="test" className="calculateForm__button center__small spacing" name="test" onClick={() => window.alert(props.income)}>Test</button>
            <hr className="border" />
            
            <ul id="debtInfo" className="removeBulletPointIcons center">
                {debtInfo.map((debt, index) => {
                    return <li onClick={e => removeDebt(e)} id={index}> Debt {index + 1}: Principal: {debt.principal} Interest: {debt.interest} MMP: {debt.mMP} </li>
                })}
            </ul>
        </form>
    );
}
 
export default InvestmentCalculatorDebtCalculator;