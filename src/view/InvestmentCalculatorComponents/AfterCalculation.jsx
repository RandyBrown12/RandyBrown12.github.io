import { takeHomePay, conversionRatiosToYear } from "../../controller/invest";
import { TaxChart } from "../../controller/taxChart";
import { debtList } from "../../controller/debtList";
import { DebtChart } from "../../controller/debtChart";
import { fixedDecimalPlaces } from "../../controller/utility";
import { useMemo } from "react";
const AfterCalculation = (props) => {

    const taxData = useMemo(() => takeHomePay(props.input.hours, props.input.salary, props.input.salaryConversionRate, 
        props.input.salaryConversionRateAfterCalculations, props.input.selfEmployed), 
        [props.input.hours, props.input.salary, props.input.salaryConversionRate, 
        props.input.salaryConversionRateAfterCalculations, props.input.selfEmployed]);

    if(!taxData) 
        return;

    let chartData = null;
    if(props.debts.length > 0) {
        let income = fixedDecimalPlaces(taxData.incomeAfterTax * conversionRatiosToYear.get(props.input.salaryConversionRateAfterCalculations));
        chartData = debtList({income, debtsList:props.debts});
    }

    return (
        <>
            <form id="afterCalculation" className="form__bg calculateForm spacing" data-cy="afterCalculation">
                <p className="center"> Before Tax: ${taxData.incomeBeforeTax} / {props.input.salaryConversionRateAfterCalculations} </p>
                <p className="center"> After Tax: ${taxData.incomeAfterTax} / {props.input.salaryConversionRateAfterCalculations} </p>
            </form>
            <TaxChart allTaxes={[taxData.federalTaxedIncome, taxData.stateTaxedIncome, taxData.ficaTaxedIncome, taxData.incomeAfterTax]}
                incomeBeforeTax={taxData.incomeBeforeTax} />
            {chartData && <DebtChart chartData={chartData} />}
            <p id="afterCalculationInfo" className="textCenter spacing">
            The IRS uses <a
                href="https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-html-tax-year-2022">tax
                brackets</a> to calcuate the marginal federal tax <br/>
            Oklahoma State uses <a
                href="https://oklahoma.gov/content/dam/ok/en/tax/documents/resources/publications/businesses/withholding-tables/WHTables-2022.pdf">
                tax brackets </a> to calculate the marginal state tax <br/>
            FICA uses <a href="https://www.ssa.gov/oact/cola/cbb.html">tax brackets</a> to calcuate Federal Insurance
            Contributions Act taxes
            </p>
        </>
    );
}
 
export default AfterCalculation;