import { useState} from "react";

const InputForm = (props) => {
  const [hours, setHours] = useState(() => '');
  const [salary, setSalary] = useState(() => '');
  const [salaryConversionRate, setSalaryConversionRate] = useState(() => "Hour");
  const [salaryConversionRateAfterCalculations, setsalaryConversionRateAfterCalculations] = useState(() => "Year");
  const [hoursDisabled, setHoursDisabled] = useState(() => false);
  const [hoursPlaceholder, setHoursPlaceholder] = useState(() => "Ex: 40");

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
          setHoursPlaceholder("Ex: 40");
        } else {
          setHoursDisabled(true);
          setHoursPlaceholder("");
          setHours("");
        }
        setSalaryConversionRate(e.target.value);
        break;
      case 'afterCalculationTime':
        setsalaryConversionRateAfterCalculations(e.target.value);
        break;
      default:
        window.alert("Input Update Error");
        break;
    }
    props.doNotShowAfterCompute();
  }

  const inputResetStates = () => {
    setHours('');
    setSalary('');
    setSalaryConversionRate("Hour");
    setsalaryConversionRateAfterCalculations("Year");
    setHoursDisabled(false);
    setHoursPlaceholder("Ex: 40");
    props.InvestmentCalculatorResetStates();
  }

  const performCalculations = () => {
    props.doNotShowDebtCalculator();
    props.doNotShowAdvancedOptions();
    props.setAfterCalculationInput({hours:parseFloat(hours), salary:parseFloat(salary), salaryConversionRate, salaryConversionRateAfterCalculations});
    props.showAfterCompute();
  }

  return (
    <>
      <h2 className="textCenter spacing"> Calculate your take home pay for the job </h2>
      <form className="form__bg calculateForm spacing" data-cy="inputForm">
        <label htmlFor="hours" className="textCenter wrap">
          Hours planning to Work per week:
        </label>
        <input id="hours" name="hours" value={hours} onChange={e => inputUpdate(e)} type="text" className="center removeHover form__input" maxLength="3" disabled={hoursDisabled} 
          placeholder={hoursPlaceholder} data-cy="inputHours"/>
        <label htmlFor="salary" className="textCenter wrap">
          Expected Salary before taxes:
        </label>
        <div className="center">
          <input id="salary" name="salary" value={salary} onChange={e => inputUpdate(e)} type="text" className="center removeHover form__input element__spacing" 
          maxLength="9" placeholder="Ex: 60000" data-cy="inputSalary"/>
          <select
            name="salaryConversionRate"
            className="selectDropDown"
            value={salaryConversionRate}
            onChange={e => inputUpdate(e)}>
            <option value="Hour">Hour</option>
            <option value="Week">Week</option>
            <option value="Biweek">Biweek</option>
            <option value="Semimonth">Semimonth</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>
        <label htmlFor="conversionRate" className="textCenter wrap" > Select Conversion Rate After Time: </label>
        <select id="conversionRate" className="center selectDropDown spacing" name="afterCalculationTime" 
        value={salaryConversionRateAfterCalculations} onChange={e => inputUpdate(e)} data-cy="inputAfterCalculationTime">
          <option value="Year">Year</option>
          <option value="Month">Month</option>
          <option value="Semimonth">Semimonth</option>
          <option value="Biweek">Biweek</option>
          <option value="Week">Week</option>
        </select>
        <div className="center">
          <button type="button" id="compute" className="calculateForm__button element__spacing" name="compute" onClick={performCalculations}>
            Calculate Pay
          </button>
          <button 
            type="button" 
            className="calculateForm__button element__spacing" 
            name="reset" 
            onClick={inputResetStates}
          >
            Reset
          </button>
          <button 
            type="button" 
            className="calculateForm__button element__spacing" 
            name="advanced" 
            onClick={props.showAdvanced}
          >
            Advanced
          </button>
        </div>
      </form>
    </>
  );
}

export default InputForm;