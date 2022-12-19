import { ApiError } from '../types/api-error';

export const client = async <T>(url: string, config?: RequestInit): Promise<T> => {
	const response = await fetch(url, config);

	if (!response.ok) {
		// eslint-disable-next-line no-throw-literal
		throw (await response.json()) as unknown as ApiError;
	}

	return (await response.json()) as T;
};
