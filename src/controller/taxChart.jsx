import { Chart as ChartJS, ArcElement, Tooltip, Legend, Filler, Title} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Filler, Title);
ChartJS.register(ChartDataLabels);

const data = {
    labels: ['Federal Tax', 'State Tax', 'FICA', 'Remaining Income'],
    datasets: [{
        data: undefined,
        backgroundColor: ['#000000','#E18A18','#1912DB','#41AC1A'],
        borderWidth: 1
    }],
};

const options = {
    responsive: true, 
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            color: 'whitesmoke',
            formatter: function(value) {
                return (value / 1 * 100).toFixed(2) + "%";
            },
        },
        title: 
        {
            display: true, 
            text:'Amount of Money after Taxes annually',
            font: {
                family: 'Arial',
                size: 16,
            },
            colors: 'rgba(0, 0, 0, 1)',
        },
    }
}

export function TaxChart(props) {
    data.datasets[0].data = props.allTaxes;
    options.plugins.datalabels.formatter = function(value) {
        return (value / props.incomeBeforeTax * 100).toFixed(2) + "%";
    }
    return (
        <div className="canvas__center">
            <Doughnut className="canvas__donutChart" data={data} options={options} width="400" height="700" />
        </div>
    );
}