import format from 'date-fns/format';
import { Conversion } from '../types/conversion';
import { Currency } from '../types/currency';
import { Symbols } from '../types/symbols';
import { TimeSeries } from '../types/timeSeries';

const getHeaders = (): Headers => {
	const headers = new Headers();
	headers.append('apiKey', process.env.REACT_APP_API_KEY || '');

	return headers;
};

const apiUrl = process.env.REACT_APP_API_URL;

export const getCurrencies = async (): Promise<Currency[]> => {
	try {
		const response = await fetch(`${apiUrl}/symbols`, { method: 'GET', redirect: 'follow', headers: getHeaders() });
		const data: Symbols = await response.json();

		const currency: Currency[] = Object.keys(data.symbols).map((key) => ({
			symbol: key,
			name: data.symbols[key],
		}));

		return currency;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const convertCurrency = async (baseCurrency: string, targetCurrency: string, amount: string): Promise<Conversion | undefined> => {
	try {
		const response = await fetch(`${apiUrl}/convert?to=${targetCurrency}&from=${baseCurrency}&amount=${amount}`, {
			method: 'GET',
			redirect: 'follow',
			headers: getHeaders(),
		});
		const data: Conversion = await response.json();

		return data;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};

export const getTimeSeries = async (
	startDate: Date,
	endDate: Date,
	baseCurrency: string,
	targetCurrency: string
): Promise<TimeSeries | undefined> => {
	try {
		const response = await fetch(
			`${apiUrl}/timeseries?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(
				endDate,
				'yyyy-MM-dd'
			)}&base=${baseCurrency}&symbols=${targetCurrency}`,
			{
				method: 'GET',
				redirect: 'follow',
				headers: getHeaders(),
			}
		);
		const data: TimeSeries = await response.json();
		data.target = targetCurrency;

		return data;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
