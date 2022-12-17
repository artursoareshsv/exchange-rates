import { Currency } from '../types/currency';
import { Symbols } from '../types/symbols';

export const getCurrencies = async (): Promise<Currency[]> => {
	var headers = new Headers();
	headers.append('apiKey', import.meta.env.VITE_API_KEY);

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/symbols`, { method: 'GET', redirect: 'follow', headers });
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
