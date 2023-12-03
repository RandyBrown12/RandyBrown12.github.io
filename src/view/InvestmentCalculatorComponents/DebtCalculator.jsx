import { useState } from "react";
import { isNumber } from "../../controller/utility";
const DebtCalculator = (props) => {
    
    const [principal, setPrincipal] = useState(() => 0);
    const [interest, setInterest] = useState(() => 0);
    const [loanMonths, setLoanMonths] = useState(() => 0);
    const maxDebts = 5;

    const removeDebt = e => {
        props.doNotShowAdvancedOptions();
        props.setDebts(props.debts.filter((_, index) => index !== parseInt(e.target.id)));
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
                throw new Error("Inputs does not have correct format!");
            } else if(parseFloat(principal) <= 0 || parseFloat(interest) <= 0 || parseFloat(loanMonths) <= 0) {
                throw new Error("Inputs must be greater than 0!");
            } else if(props.debts.length >= maxDebts) {
                throw new Error("Debt Calculator has reached max amount of debts!");
            }
        } catch (err) {
            window.alert(err.message)
            return;
        }

        props.doNotShowAfterCompute();
        props.setDebts([...props.debts, {principal:parseFloat(principal), interest:parseFloat(interest), loanMonths:parseFloat(loanMonths)}]);
    }

    return (
        <form id="debtCalculator" className="form__bg calculateForm spacing" data-cy="debtCalculator">
            <p className="center">Debt Calculator: <br/> Find out how fast debt can be paid off with simple interest. <br/> 
            Once a debt has been added it will be calculated. </p>
            <p className="center">Add Debts:</p>
            <div className="center">
                <label htmlFor="principal" className="textCenter wrap element__spacing">Principal: </label>
                <input type="text" id="principal" className="center removeHover form__input" maxLength="9"
                placeholder="Ex: 15000" onChange={e => updateInput(e)} data-cy="principal"/>
            </div>
            <div className="center">
                <label htmlFor="interest" className="textCenter wrap element__spacing">Interest: </label>
                <input type="text" id="interest" className="center removeHover form__input" maxLength="6"
                    placeholder="Ex: 4.05" onChange={e => updateInput(e)} data-cy="interest"/>
            </div>
            <div className="center">
                <label htmlFor="loanMonths" className="textCenter wrap element__spacing">Loan Months: </label>
                <input type="text" id="loanMonths" className="center removeHover form__input" maxLength="9" 
                placeholder="Ex: 12" onChange={e => updateInput(e)} data-cy="loanMonths"/>
            </div>
            <button type="button" id="addDebt" className="calculateForm__button center__small spacing" 
            name="addDebt" onClick={checkInputs} data-cy="addDebt">Add Debt</button>
            <hr className="border" />
            <ul id="debts" className="removeBulletPointIcons center" data-cy="debtList">
                {props.debts.map((debt, index) => {
                    return <li 
                            onClick={e => removeDebt(e)} 
                            id={index} 
                            key={index}
                            > 
                            Debt {index + 1}: Principal: {debt.principal} Interest: {debt.interest} Loan Term : {debt.loanMonths + " months"} 
                            </li>
                })}
            </ul>
        </form>
    );
}
 
export default DebtCalculator;