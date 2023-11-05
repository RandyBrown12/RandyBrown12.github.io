const InvestmentCalculatorAdvancedOptions = () => {
    return (
        <form id="advancedForm" className="form__bg calculateForm spacing">
            <h1>
                <p className="center">Advanced Options:</p>
                <div className="center">
                    <input type="checkbox" name="selfEmployeed" id="selfEmployeed" />
                    <label for="selfEmployeed">Self Employeed?</label>
                </div>
                <div className="center">
                    <label for="filingStatus">Filing Status:</label>
                    <select id="filingStatus" className="selectDropDown" name="timeConverter">
                        <option value="Single">Single</option>
                        <option value="MFJ">Married Filing Jointly</option>
                        <option value="MFS">Married Filing Seperately</option>
                        <option value="HOH">Head Of Household</option>
                    </select>
                </div>
                <div className="center">
                    <input type="checkbox" name="isDebtCalculator" id="isDebtCalculator" />
                    <label for="isDebtCalculator">Add Debt Calculator?</label>
                </div>
            </h1>
        </form> 
    );
}
 
export default InvestmentCalculatorAdvancedOptions;