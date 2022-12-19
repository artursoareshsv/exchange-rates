import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('chart.js', () => ({ Chart: { register: jest.fn } }));
jest.mock('react-chartjs-2', () => ({}));

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
