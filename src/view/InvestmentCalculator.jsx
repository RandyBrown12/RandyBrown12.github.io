import InputForm from "./InvestmentCalculatorComponents/InputForm";
import AdvancedOptions from "./InvestmentCalculatorComponents/AdvancedOptions";
import DebtCalculator from "./InvestmentCalculatorComponents/DebtCalculator";
import AfterCalculation from "./InvestmentCalculatorComponents/AfterCalculation";
import { useState } from "react";

const InvestmentCalculator = () => {
  const [showDebtCalculator, setShowDebtCalculator] = useState(() => false);
  const [showAfterCompute, setShowAfterCompute] = useState(() => false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(() => false);
  const [afterCalculationInput, setAfterCalculationInput] = useState(() => {});
  const [debts, setDebts] = useState(() => []);
  const [selfEmployed, setSelfEmployed] = useState(() => false);

  const InvestmentCalculatorResetStates = () => {
    setSelfEmployed(false);
    setShowAfterCompute(false);
    setShowAdvancedOptions(false);
    setShowDebtCalculator(false);
    setDebts([]);
  };

  return (
    <main>
        <InputForm
          InvestmentCalculatorResetStates={InvestmentCalculatorResetStates}
          showAdvanced={() =>setShowAdvancedOptions(!showAdvancedOptions)}
          showAfterCompute={() => setShowAfterCompute(true)}
          doNotShowAfterCompute={() => setShowAfterCompute(false)}
          doNotShowDebtCalculator={() => setShowDebtCalculator(false)}
          doNotShowAdvancedOptions={() => setShowAdvancedOptions(false)}
          setAfterCalculationInput={setAfterCalculationInput}
        />
      {showAdvancedOptions && 
        <AdvancedOptions
        switchShowDebtCalculator={() => setShowDebtCalculator(!showDebtCalculator)}
        switchSetSelfEmployeed={() => setSelfEmployed(!selfEmployed)}
        doNotShowAfterCompute={() => setShowAfterCompute(false)}
        />
      }
      {showAfterCompute &&
        <AfterCalculation
          input={{...afterCalculationInput, selfEmployed}}
          debts={debts}
        />
      }
      {showDebtCalculator && 
        <DebtCalculator
        debts={debts}
        setDebts={setDebts}
        doNotShowAdvancedOptions={() => setShowAdvancedOptions(false)}
        doNotShowAfterCompute={() => setShowAfterCompute(false)}
        />
      }
    </main>
  );
};

export default InvestmentCalculator;
