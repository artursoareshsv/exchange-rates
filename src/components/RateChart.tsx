import { CategoryScale, Chart, Filler, Legend, LinearScale, LineElement, plugins, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TimeSeries } from '../types/timeSeries';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

type RateChartProps = {
	timeSeries: TimeSeries | undefined;
};

export function RateChart({ timeSeries }: RateChartProps) {
	if (!timeSeries) {
		return null;
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
	};

	const labels = Object.keys(timeSeries.rates);
	const rates = labels.map((label) => {
		const rate = timeSeries.rates[label];
		return rate[timeSeries.target];
	});

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: timeSeries.target,
				data: rates,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return <Line options={options} data={data} />;
}
