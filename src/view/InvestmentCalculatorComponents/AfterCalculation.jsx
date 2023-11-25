import { takeHomePay, conversionRatiosToYear } from "../../controller/invest";
import { TaxChart } from "../../controller/taxChart";
import { debtList } from "../../controller/debtList";
import { DebtChart } from "../../controller/debtChart";
import { fixedDecimalPlaces } from "../../controller/utility";
const AfterCalculation = (props) => {
    
    const taxData = takeHomePay(props.input.hours,
        props.input.salary,
        props.input.salaryConversionRate,
        props.input.salaryConversionRateAfterCalculations,
        props.input.selfEmployeed);

    if(!taxData) 
        return;

    let chartData = null;
    let income = fixedDecimalPlaces(taxData.incomeAfterTax * conversionRatiosToYear[props.input.salaryConversionRateAfterCalculations]);
    if(props.debtInfo.length > 0) {
        chartData = debtList({income, debtsList:props.debtInfo});
    }

    return (
        <>
            <form id="afterCalculation" className="form__bg calculateForm spacing" data-cy="afterCalculation">
                <p className="center"> Before Tax: ${taxData.incomeBeforeTax} / {props.input.salaryConversionRateAfterCalculations} </p>
                <p className="center"> After Tax: ${taxData.incomeAfterTax} / {props.input.salaryConversionRateAfterCalculations} </p>
            </form>
            <TaxChart allTaxes={[taxData.federalTaxedIncome, taxData.stateTaxedIncome, taxData.ficaTaxedIncome, taxData.incomeAfterTax]}
                incomeBeforeTax={taxData.incomeBeforeTax} />
            {chartData && <DebtChart chartData={chartData}/>}
            <p id="afterCalculationInfo" className="textCenter spacing hide">
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