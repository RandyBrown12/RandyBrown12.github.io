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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const data = {
    labels: undefined,
    datasets: [{
        label: 'Test Data',
        data: undefined,
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 1,
        fill: false
    }]
}

const options = {
    plugins: {
        datalabels: {
            align: 'top',
            font: {
                size: 15,
            }
        }
    }
}

export function DebtChart(props) {
    
    return (
        <div className="canvas__center">
            <Line className="canvas__lineChart" data={data} options={options} width="400" height="700" />
        </div>
    );
}

