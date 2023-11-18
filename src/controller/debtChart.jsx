import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

const data = {
    labels: undefined,
    datasets: [{
        label: 'Sum of Debt',
        data: undefined,
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 0.5,
        fill: false,
    }]
}

const options = {
    responsive: true, 
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            align: 'top',
            font: {
                size: 15,
            }
        },
        title: 
        {
            display: true, 
            text:'Amount of months to pay off debt',
            font: {
                family: 'Arial',
                size: 16,
            },
            colors: 'rgba(0, 0, 0, 1)',
        }
    }
}

export function DebtChart(props) {
    data.labels = props.chartData.dateList;
    data.datasets[0].data = props.chartData.debtList;
    return (
        <div className="canvas__center">
            <Line className="canvas__donutChart" data={data} options={options} width="400" height="700" />
        </div>
    );
}

