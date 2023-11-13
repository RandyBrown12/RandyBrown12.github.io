import { useState } from "react";
import InvestmentCalculatorAdvancedOptions from "./InvestmentCalculatorAdvancedOptions";
import InvestmentCalculatorDebtCalculator from "./InvestmentCalculatorDebtCalculator";
import InvestmentCalculatorAfterCalculation from "./InvestmentCalculatorAfterCalculation.jsx";

const InvestmentCalculatorInputForm = () => {

  const [visiblilityAdvancedOptions, setVisiblilityAdvancedOptions] = useState(() => false);
  const [debtCalculatorVisibility, setDebtCalculatorVisibility] = useState(() => false);
  const [afterCalcuations, setAfterCalcuations] = useState(() => false);
  const [salaryConversionRate, setSalaryConversionRate] = useState(() => "Hour");
  const [salaryConversionRateAfterTax, setSalaryConversionRateAfterTax] = useState(() => "Year");
  const [hoursDisabled, setHoursDisabled] = useState(() => false);
  const [selfEmployeed, setSelfEmployeed] = useState(() => false);
  const [hours, setHours] = useState(() => '');
  const [salary, setSalary] = useState(() => '');
  const [hoursPlaceholder, setHoursPlaceholder] = useState(() => "Ex: 199");
  // const [income, setIncome] = useState(() => 0);

  const inputUpdate = e => {
    switch (e.target.name) {
      case 'hours':
        setHours(e.target.value);
        break;
      case 'salary':
        setSalary(e.target.value);
        break;
      case 'salaryConversionRate':
        if(e.target.value === "Hour") {
          setHoursDisabled(false);
          setHoursPlaceholder("Ex: 15");
        } else {
          setHoursDisabled(true);
          setHoursPlaceholder("");
          setHours("");
        }
        setSalaryConversionRate(e.target.value);
        break;
      case 'afterCalculationTime':
        setSalaryConversionRateAfterTax(e.target.value);
        break;
      case 'selfEmployeed':
        setSelfEmployeed(!selfEmployeed);
        break;
      default:
        window.alert("Input Update Error");
        break;
    }

    if (afterCalcuations)
      setAfterCalcuations(false);
  }

  const resetStates = () => {
    setHours('');
    setSalary('');
    setSalaryConversionRate("Hour");
    setSalaryConversionRateAfterTax("Year");
    setHoursDisabled(false);
    setHoursPlaceholder("Ex: 15");
    setSelfEmployeed(false);
    setAfterCalcuations(false);
    setVisiblilityAdvancedOptions(false);
    setDebtCalculatorVisibility(false);
  }

  return (
    <>
      <h2 className="textCenter spacing"> Calculate your take home pay for the job </h2>
      <form className="form__bg calculateForm spacing">
        <label htmlFor="hours" className="textCenter wrap">
          Hours planning to Work per week:
        </label>
        <input id="hours" name="hours" value={hours} onChange={e => inputUpdate(e)} type="text" className="center removeHover form__input" maxLength="3" disabled={hoursDisabled} 
          placeholder={hoursPlaceholder}/>
        <label htmlFor="salary" className="textCenter wrap">
          Expected Salary before taxes:
        </label>
        <div className="center">
          <input id="salary" name="salary" value={salary} onChange={e => inputUpdate(e)} type="text" className="center removeHover form__input" maxLength="9" placeholder="Ex: 60000" />
          <select
            name="salaryConversionRate"
            className="selectDropDown"
            value={salaryConversionRate}
            onChange={e => inputUpdate(e)}
          >
            <option value="Hour">Hour</option>
            <option value="Week">Week</option>
            <option value="Biweek">Biweek</option>
            <option value="Semimonth">Semimonth</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>
        <label htmlFor="conversionRate" className="textCenter wrap" > Select Conversion Rate After Time: </label>
        <select id="conversionRate" className="center selectDropDown spacing" name="afterCalculationTime" value={salaryConversionRateAfterTax}
          onChange={e => inputUpdate(e)}>
          <option value="Year">Year</option>
          <option value="Month">Month</option>
          <option value="Semimonth">Semimonth</option>
          <option value="Biweek">Biweek</option>
          <option value="Week">Week</option>
        </select>
        <div className="center">
          <button type="button" id="compute" className="calculateForm__button" name="compute" onClick={() => setAfterCalcuations(true)}>
            Calculate Pay
          </button>
          <button type="button" className="calculateForm__button" onClick={resetStates}>
            Reset
          </button>
          <button type="button" className="calculateForm__button" onClick={() => setVisiblilityAdvancedOptions(!visiblilityAdvancedOptions)}>
            Advanced
          </button>
        </div>
      </form>
      {afterCalcuations && <InvestmentCalculatorAfterCalculation
        input={{ hours:parseFloat(hours), salary:parseFloat(salary), salaryConversionRate, salaryConversionRateAfterTax, selfEmployeed }} />}
      {visiblilityAdvancedOptions && <InvestmentCalculatorAdvancedOptions
        visibility={() => setDebtCalculatorVisibility(!debtCalculatorVisibility)}
        employed={e => inputUpdate(e)} />}
      {debtCalculatorVisibility && <InvestmentCalculatorDebtCalculator/>}
    </>
  );
}

export default InvestmentCalculatorInputForm;