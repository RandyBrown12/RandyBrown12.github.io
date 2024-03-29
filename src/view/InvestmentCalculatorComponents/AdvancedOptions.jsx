/* Types of Filing Status:
            <div className="center">
                <label htmlFor="filingStatus" className="element__spacing">Filing Status:</label>
                <select id="filingStatus" className="selectDropDown" name="timeConverter">
                    <option value="Single">Single</option>
                    <option value="MFJ">Married Filing Jointly</option>
                    <option value="MFS">Married Filing Seperately</option>
                    <option value="HOH">Head Of Household</option>
                </select>
            </div>
*/
const AdvancedOptions = (props) => {

    const inputUpdate = e => {
        switch (e.target.name) {
          case 'selfEmployed':
            props.switchSetSelfEmployeed();
            props.doNotShowAfterCompute();
            break;
          default:
            window.alert("Input Update Error");
            break;
        }
    }

    return (
        <form id="advancedForm" className="form__bg calculateForm spacing" data-cy="advancedForm">
            <p className="center">Advanced Options:</p>
            <div className="center">
                <input onChange={e => inputUpdate(e)} type="checkbox" name="selfEmployed" id="selfEmployed" className="element__spacing"/>
                <label htmlFor="selfEmployed" data-cy="isSelfEmployed" >Self Employed?</label>
            </div>
            <div className="center">
                <input type="checkbox" name="isDebtCalculator" id="isDebtCalculator" className="element__spacing" onChange={props.switchShowDebtCalculator} />
                <label htmlFor="isDebtCalculator" data-cy="addDebtCalculator">Add Debt Calculator?</label>
            </div>
        </form> 
    );
}
 
export default AdvancedOptions;