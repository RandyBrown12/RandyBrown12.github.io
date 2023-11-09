import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Federal Tax', 'State Tax', 'FICA', 'Remaining Income'],
    datasets: [{
            data: null,
            backgroundColor: ['#000000','#E18A18','#1912DB','#41AC1A'],
            borderWidth: 1
    }],
    options: 
    {
        responsive: true, maintainAspectRatio: false,
        title: 
        {
            display: true, 
            text: 'Amount of Money after Taxes annually',
            font: {
                family: 'Arial',
                size: 150,
                style: 'basic',
            },
            colors: 'rgba(0, 0, 0, 1)',
        },
        plugins: {
            datalabels:
            {
                color: 'whitesmoke',
                formatter: function(value) {
                    if(value)
                        return null;
                    return (value / 1 * 100).toFixed(2) + "%";
                }
            },
        }
    }
};

export function TaxChart(props) {
    data.datasets[0].data = props.allTaxes;
    data.options.plugins.datalabels.formatter = function(value) {
        if(value)
        return null;
        return (value / props.incomeBeforeTax * 100).toFixed(2) + "%";
    }
    // props.input.allTaxes , props.input.incomeBeforeTax
    return (
        <Doughnut data={data} width="700" height="400" className="canvas__donutChart canvas__center" />
    );
}