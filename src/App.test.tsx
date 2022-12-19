import { fireEvent, render, screen, act } from '@testing-library/react';
import App from './App';

jest.mock('chart.js', () => ({ Chart: { register: jest.fn } }));
jest.mock('react-chartjs-2', () => ({}));

jest.mock('./providers/exchange-rates', () => ({
	getCurrencies: () =>
		Promise.resolve([
			{ symbol: 'EUR', name: 'EUR' },
			{ symbol: 'BRL', name: 'BRL' },
		]),
	getTimeSeries: () =>
		Promise.resolve({
			success: true,
			timeseries: true,
			start_date: '2012-05-01',
			end_date: '2012-05-03',
			base: 'EUR',
			targe: 'BRL',
			rates: {
				'2012-05-01': {
					BRL: 1.302303,
				},
				'2012-05-02': {
					BRL: 1.315066,
				},
				'2012-05-03': {
					BRL: 1.280135,
				},
			},
		}),
	convertCurrency: () =>
		Promise.resolve({
			date: '2022-12-17',
			info: { rate: 0.872809, timestamp: 1671297122 },
			query: { amount: 1, from: 'EUR', to: 'BRL' },
			result: 0.872809,
			success: true,
		}),
}));

test('render base component', () => {
	render(<App />);

	const amountInput = screen.getByRole('spinbutton');
	const [baseCurrency, targetCurrency] = screen.getAllByRole('combobox');
	const additionalInformation = screen.queryByRole('contentinfo');
	const chart = screen.queryByRole('figure');

	expect(amountInput).toBeInTheDocument();
	expect(baseCurrency).toBeInTheDocument();
	expect(targetCurrency).toBeInTheDocument();
	expect(additionalInformation).not.toBeInTheDocument();
	expect(chart).not.toBeInTheDocument();
});

test('render additional information and chart', async () => {
	render(<App />);

	const [baseCurrency, targetCurrency] = screen.getAllByRole('combobox');

	fireEvent.keyDown(baseCurrency, { key: 'ArrowDown' });
	fireEvent.click(await screen.findByText('EUR - EUR'));

	fireEvent.keyDown(targetCurrency, { key: 'ArrowDown' });
	fireEvent.click(await screen.findByText('BRL - BRL'));

	const amountInput = screen.getByRole('spinbutton');
	fireEvent.change(amountInput, { target: { value: '20' } });

	const additionalInformation = await screen.findByRole('contentinfo');
	expect(additionalInformation).toBeInTheDocument();

	const chart = screen.queryByRole('figure');
	expect(chart).toBeInTheDocument();
});
