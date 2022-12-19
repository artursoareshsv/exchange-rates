import { toast } from 'react-toastify';
import { ApiError } from '../types/api-error';

export const showErrorMessage = (error: unknown): void => {
	const apiError = error as ApiError;

	toast.error(apiError.message || apiError.error.message, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	});
};
