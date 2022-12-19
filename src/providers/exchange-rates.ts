import format from 'date-fns/format';
import { Conversion } from '../types/conversion';
import { Currency } from '../types/currency';
import { Symbols } from '../types/symbols';
import { TimeSeries } from '../types/timeSeries';
import { client } from '../util/client';
import { showErrorMessage } from '../util/toast';

const getHeaders = (): Headers => {
	const headers = new Headers();
	headers.append('apiKey', process.env.REACT_APP_API_KEY || '');

	return headers;
};

const apiUrl = process.env.REACT_APP_API_URL;

export const getCurrencies = async (): Promise<Currency[]> => {
	try {
		const data = await client<Symbols>(`${apiUrl}/symbols`, { method: 'GET', redirect: 'follow', headers: getHeaders() });

		const currency: Currency[] = Object.keys(data.symbols).map((key) => ({
			symbol: key,
			name: data.symbols[key],
		}));

		return currency;
	} catch (error) {
		showErrorMessage(error);
		return [];
	}
};

export const convertCurrency = async (baseCurrency: string, targetCurrency: string, amount: string): Promise<Conversion | undefined> => {
	try {
		const data = await client<Conversion>(`${apiUrl}/convert?to=${targetCurrency}&from=${baseCurrency}&amount=${amount}`, {
			method: 'GET',
			redirect: 'follow',
			headers: getHeaders(),
		});

		return data;
	} catch (error) {
		showErrorMessage(error);
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
		const data = await client<TimeSeries>(
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

		data.target = targetCurrency;

		return data;
	} catch (error) {
		showErrorMessage(error);
		return undefined;
	}
};
