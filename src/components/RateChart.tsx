import { CategoryScale, Chart, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import format from 'date-fns/format';
import { Line } from 'react-chartjs-2';
import { theme } from '../GlobalStyle';
import { TimeSeries } from '../types/timeSeries';
import { ChartWrapper } from './styled';

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
		labels: labels.map((date) => format(new Date(date), 'MMM dd, yyyy')),
		datasets: [
			{
				fill: true,
				label: `${timeSeries.base}: 1 = ${timeSeries.target}`,
				data: rates,
				borderColor: theme.primary,
				backgroundColor: theme.chartBackgroundColor,
			},
		],
	};

	return (
		<ChartWrapper>
			<h3>Historical rates</h3>
			<h5>past 30 days</h5>

			<Line options={options} data={data} />
		</ChartWrapper>
	);
}
