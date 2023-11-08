const InvestmentCalculatorDebtCalculator = () => {
    return ( 
        <form id="debtCalculator" class="form__bg calculateForm spacing">
            <p class="center">Debt Calculator: <br/> Find out how fast debt can be paid off with simple interest.</p>
            <p class="center">Add Debts:</p>
            <div class="center">
                <label for="principal" class="textCenter wrap">Principal: </label>
                <input type="text" id="principal" class="center removeHover form__input" maxlength="9"
                placeholder="Ex: 15000" />
            </div>
            <div class="center">
                <label for="interest" class="textCenter wrap">Interest: </label>
                <input type="text" id="interest" class="center removeHover form__input" maxlength="6"
                    placeholder="Ex: 4.05%" />
            </div>
            <div class="center">
                <label for="mMP" class="textCenter wrap">Monthly Minimum <br/> Payments: </label>
                <input type="text" id="mMP" class="center removeHover form__input" maxlength="9" placeholder="Ex: 500" />
            </div>
            <button type="button" id="addDebt" class="calculateForm__button center__small spacing" name="addDebt">Add Debt</button>
            <button type="button" id="test" class="calculateForm__button center__small spacing" name="test">Test</button>
            <hr class="border" />
            <ul id="debtInfo" class="removeBulletPointIcons center"> </ul>
        </form>
    );
}
 
export default InvestmentCalculatorDebtCalculator;