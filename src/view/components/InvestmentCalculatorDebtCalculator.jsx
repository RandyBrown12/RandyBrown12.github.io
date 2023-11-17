import { useState, useContext } from "react";
import { isNumber } from "../../controller/utility";
import { mainAppContext } from "./InvestmentCalculatorInputForm";

const InvestmentCalculatorDebtCalculator = (props) => {
    
    const setDebtInfo = useContext(mainAppContext);
    const [principal, setPrincipal] = useState(() => 0);
    const [interest, setInterest] = useState(() => 0);
    const [loanMonths, setLoanMonths] = useState(() => 0);
    const maxDebts = 5;

    console.log("Debts Listed:" + props.debtInfo);
    const removeDebt = e => {
        setDebtInfo(props.debtInfo.filter((_, index) => index !== parseInt(e.target.id)));
    }

    const updateInput = e => {
        switch(e.target.id) {
            case 'principal':
                setPrincipal(e.target.value);
                break;
            case 'interest':
                setInterest(e.target.value);
                break;
            case 'loanMonths':
                setLoanMonths(e.target.value);
                break;
            default:
                window.alert("Input Update Error");
                break;
        }
    }

    const checkInputs = () => {
        try 
        {
            if(!isNumber(parseFloat(principal)) || !isNumber(parseFloat(interest)) || !isNumber(parseFloat(loanMonths)))
            {
                throw new Error("Debt Calculator does not have correct format!");
            }
        } catch (exception) {
            window.alert(exception)
            return;
        }

        if(props.debtInfo.length >= maxDebts) {
            window.alert("Debt Calculator has reached max amount of debts!");
            return;
        }

        setDebtInfo([...props.debtInfo, [principal, interest, loanMonths]]);
    }

    return (
        <form id="debtCalculator" className="form__bg calculateForm spacing">
            <p className="center">Debt Calculator: <br/> Find out how fast debt can be paid off with simple interest. <br/> 
            Once a debt has been added it will be calculated. </p>
            <p className="center">Add Debts:</p>
            <div className="center">
                <label htmlFor="principal" className="textCenter wrap">Principal: </label>
                <input type="text" id="principal" className="center removeHover form__input" maxLength="9"
                placeholder="Ex: 15000" onChange={e => updateInput(e)}/>
            </div>
            <div className="center">
                <label htmlFor="interest" className="textCenter wrap">Interest: </label>
                <input type="text" id="interest" className="center removeHover form__input" maxLength="6"
                    placeholder="Ex: 4.05%" onChange={e => updateInput(e)} />
            </div>
            <div className="center">
                <label htmlFor="loanMonths" className="textCenter wrap">Loan Months: </label>
                <input type="text" id="loanMonths" className="center removeHover form__input" maxLength="9" placeholder="Ex: 12" onChange={e => updateInput(e)}/>
            </div>
            <button type="button" id="addDebt" className="calculateForm__button center__small spacing" name="addDebt" onClick={checkInputs}>Add Debt</button>
            <hr className="border" />
            <ul id="debtInfo" className="removeBulletPointIcons center">
                {props.debtInfo.map((debt, index) => {
                    return <li onClick={e => removeDebt(e)} id={index} key={index}> Debt {index + 1}: Principal: {debt[0]} Interest: {debt[1]} Loan Term : {debt[2] + " months"} </li>
                })}
            </ul>
        </form>
    );
}
 
export default InvestmentCalculatorDebtCalculator;