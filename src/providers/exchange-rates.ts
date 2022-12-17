import { Conversion } from '../types/conversion';
import { Currency } from '../types/currency';
import { Symbols } from '../types/symbols';

const getHeaders = (): Headers => {
	const headers = new Headers();
	headers.append('apiKey', import.meta.env.VITE_API_KEY);

	return headers;
};

export const getCurrencies = async (): Promise<Currency[]> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/symbols`, { method: 'GET', redirect: 'follow', headers: getHeaders() });
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

export const convertCurrency = async (baseCurrency: string, targetCurrency: string, amount: string): Promise<number | undefined> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/convert?to=${targetCurrency}&from=${baseCurrency}&amount=${amount}`, {
			method: 'GET',
			redirect: 'follow',
			headers: getHeaders(),
		});
		const data: Conversion = await response.json();

		return data.result;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
