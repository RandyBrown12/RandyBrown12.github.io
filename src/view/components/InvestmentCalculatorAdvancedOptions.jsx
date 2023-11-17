const InvestmentCalculatorAdvancedOptions = (props) => {
    return (
        <form id="advancedForm" className="form__bg calculateForm spacing">
            <p className="center">Advanced Options:</p>
            <div className="center">
                <input onChange={props.employed} type="checkbox" name="selfEmployeed" id="selfEmployeed" />
                <label htmlFor="selfEmployeed">Self Employeed?</label>
            </div>
            <div className="center">
                <label htmlFor="filingStatus">Filing Status:</label>
                <select id="filingStatus" className="selectDropDown" name="timeConverter">
                    <option value="Single">Single</option>
                    <option value="MFJ">Married Filing Jointly</option>
                    <option value="MFS">Married Filing Seperately</option>
                    <option value="HOH">Head Of Household</option>
                </select>
            </div>
            <div className="center">
                <input type="checkbox" name="isDebtCalculator" id="isDebtCalculator" onChange={props.visibility} />
                <label htmlFor="isDebtCalculator">Add Debt Calculator?</label>
            </div>
        </form> 
    );
}
 
export default InvestmentCalculatorAdvancedOptions;