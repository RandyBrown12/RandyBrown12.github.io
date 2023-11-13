import { takeHomePay } from "../../controller/invest";
import { TaxChart } from "../../controller/taxChart";

const InvestmentCalculatorAfterCalculation = (props) => {

    const object = takeHomePay(props.input.hours, 
        props.input.salary, props.input.salaryConversionRate, 
        props.input.salaryConversionRateAfterTax, props.input.selfEmployeed);

    if(!object) 
        return;

    return (
        <>
            <form id="afterCalculation" className="form__bg calculateForm spacing">
                <p className="center"> Before Tax: ${object.incomeBeforeTax} / {props.input.salaryConversionRateAfterTax} </p>
                <p className="center"> After Tax: ${object.incomeAfterTax} / {props.input.salaryConversionRateAfterTax} </p>
            </form>
            <TaxChart allTaxes={[object.stateTaxedIncome, object.federalTaxedIncome, object.ficaTaxedIncome, object.incomeAfterTax]}
                incomeBeforeTax={object.incomeBeforeTax} />
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
 
export default InvestmentCalculatorAfterCalculation;