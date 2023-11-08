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
  const [selfEmployeed, setSelfEmployeed] = useState(() => false);
  const [hours, setHours] = useState(() => '');
  const [salary, setSalary] = useState(() => '');

  const inputUpdate = e => {
    if (e.target.name === 'hours')
      setHours(e.target.value);
    else if (e.target.name === 'salary')
      setSalary(e.target.value);
    if (afterCalcuations)
      setAfterCalcuations(false);
  }

  return (
    <>
      <h2 className="textCenter spacing"> Calculate your take home pay for the job </h2>
      <form className="form__bg calculateForm spacing">
        <label for="hours" className="textCenter wrap">
          Hours planning to Work per week:
        </label>
        <input value={hours} onChange={e => inputUpdate(e)} type="text" className="center removeHover form__input" maxlength="3"
          placeholder="Ex: 15" />
        <label for="salary" className="textCenter wrap">
          Expected Salary before taxes:
        </label>
        <div className="center">
          <input value={salary} onChange={e => inputUpdate(e)} type="text" className="center removeHover form__input" maxlength="9" placeholder="Ex: 60000" />
          <select
            className="selectDropDown"
            value={salaryConversionRate}
            onChange={e => setSalaryConversionRate(e.target.value)}
          >
            <option value="Hour">Hour</option>
            <option value="Week">Week</option>
            <option value="Biweek">Biweek</option>
            <option value="Semimonth">Semimonth</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>
        <label for="salary" class="textCenter wrap"> Select Conversion Rate After Time: </label>
        <select class="center selectDropDown spacing" name="afterCalculationTime" value={salaryConversionRateAfterTax}
          onChange={e => setSalaryConversionRateAfterTax(e.target.value)}>
          <option value="Year">Year</option>
          <option value="Month">Month</option>
          <option value="Semimonth">Semimonth</option>
          <option value="Biweek">Biweek</option>
          <option value="Week">Week</option>
        </select>
        <div class="center">
          <button type="button" id="compute" class="calculateForm__button" name="compute" onClick={() => setAfterCalcuations(true)}>
            Calculate Pay
          </button>
          <button type="button" class="calculateForm__button">
            Reset
          </button>
          <button type="button" class="calculateForm__button" onClick={() => setVisiblilityAdvancedOptions(!visiblilityAdvancedOptions)}>
            Advanced
          </button>
        </div>
      </form>
      {afterCalcuations && <InvestmentCalculatorAfterCalculation
        input={{ hours, salary, salaryConversionRate, salaryConversionRateAfterTax, selfEmployeed }} />}
      {visiblilityAdvancedOptions && <InvestmentCalculatorAdvancedOptions
        visibility={() => setDebtCalculatorVisibility(!debtCalculatorVisibility)}
        employed={() => setSelfEmployeed(!selfEmployeed)} />}
      {debtCalculatorVisibility && <InvestmentCalculatorDebtCalculator />}
    </>
  );
}

export default InvestmentCalculatorInputForm;