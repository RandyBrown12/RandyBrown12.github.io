import { useState } from "react";
import InvestmentCalculatorAdvancedOptions from "./InvestmentCalculatorAdvancedOptions";
import InvestmentCalculatorDebtCalculator from "./InvestmentCalculatorDebtCalculator";
import InvestmentCalculatorAfterCalculation from "./InvestmentCalculatorAfterCalculation.jsx";
import DonutChart from "../../controller/taxChart.jsx";

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
  const [hoursPlaceholder, setHoursPlaceholder] = useState(() => "Ex: 15");

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

  return (
    <>
      <h2 className="textCenter spacing"> Calculate your take home pay for the job </h2>
      <form className="form__bg calculateForm spacing">
        <label for="hours" className="textCenter wrap">
          Hours planning to Work per week:
        </label>
        <input name="hours" value={hours} onChange={e => inputUpdate(e)} type="text" className="center removeHover form__input" maxlength="3" disabled={hoursDisabled} 
          placeholder={hoursPlaceholder}/>
        <label for="salary" className="textCenter wrap">
          Expected Salary before taxes:
        </label>
        <div className="center">
          <input name="salary" value={salary} onChange={e => inputUpdate(e)} type="text" className="center removeHover form__input" maxlength="9" placeholder="Ex: 60000" />
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
        <label for="salary" class="textCenter wrap"> Select Conversion Rate After Time: </label>
        <select class="center selectDropDown spacing" name="afterCalculationTime" value={salaryConversionRateAfterTax}
          onChange={e => inputUpdate(e)}>
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
        input={{ hours:parseFloat(hours), salary:parseFloat(salary), salaryConversionRate, salaryConversionRateAfterTax, selfEmployeed }} />}
      {visiblilityAdvancedOptions && <InvestmentCalculatorAdvancedOptions
        visibility={() => setDebtCalculatorVisibility(!debtCalculatorVisibility)}
        employed={e => inputUpdate(e)} />}
      {debtCalculatorVisibility && <InvestmentCalculatorDebtCalculator />}
    </>
  );
}

export default InvestmentCalculatorInputForm;