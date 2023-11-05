import { useState } from "react";
import InvestmentCalculatorAdvancedOptions from "./InvestmentCalculatorAdvancedOptions";

const InvestmentCalculatorInputForm = () => {

    const [visiblilityAdvancedOptions, setVisiblilityAdvancedOptions] = useState(false);

    return ( 
        <>
        <h2 className="textCenter spacing"> Calculate your take home pay for the job </h2>
        <form className="form__bg calculateForm spacing">
          <label for="hours" className="textCenter wrap">
            Hours planning to Work per week:
          </label>
          <input type="text" id="hours" className="center removeHover form__input" maxlength="3"
            placeholder="Ex: 15" />
          <label for="salary" className="textCenter wrap">
            Expected Salary before taxes:
          </label>
          <div className="center">
            <input
              type="text"
              id="salary"
              className="center removeHover form__input"
              maxlength="9"
              placeholder="Ex: 60000"
            />
            <select
              className="selectDropDown"
              name="timeConverter"
              id="timeConverter"
            >
              <option value="Hour">Hour</option>
              <option value="Week">Week</option>
              <option value="Biweek">Biweek</option>
              <option value="Semimonth">Semimonth</option>
              <option value="Month">Month</option>
              <option value="Year">Year</option>
            </select>
          </div>
          <label for="salary" class="textCenter wrap">
            Select Conversion Rate After Time:
          </label>
          <select
            class="center selectDropDown spacing"
            name="afterCalculationTime"
            id="afterCalculationTime"
          >
            <option value="Year">Year</option>
            <option value="Month">Month</option>
            <option value="Semimonth">Semimonth</option>
            <option value="Biweek">Biweek</option>
            <option value="Week">Week</option>
          </select>
          <div class="center">
            <button type="button" id="compute" class="calculateForm__button" name="compute">
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
        {visiblilityAdvancedOptions && <InvestmentCalculatorAdvancedOptions />}
      </>
    );
}
 
export default InvestmentCalculatorInputForm;