import { takeHomePay } from "../../controller/invest";

const InvestmentCalculatorAfterCalculation = (props) => {

    const object = takeHomePay(props.input.hours, 
        props.input.salary, props.input.salaryConversionRate, 
        props.input.salaryConversionRateAfterTax, props.input.selfEmployeed);
    if(object.hours === null || object.salary === null) {
        return;
    }
    
    return (
        <>
            <div class="canvas__center">
                <canvas height="400" width="700" class="canvas__donutChart hide" id="donutChart" />
            </div>
            <form id="afterCalculation" className="form__bg calculateForm spacing">
                <p className="center"> Before Tax: ${object.incomeBeforeTax} / {props.input.salaryConversionRateAfterTax} </p>
                <p className="center"> After Tax: ${object.incomeAfterTax} / {props.input.salaryConversionRateAfterTax} </p>
            </form>
            <p id="afterCalculationInfo" class="textCenter spacing hide">
            The IRS uses <a
                href="https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2022">tax
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