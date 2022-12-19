export interface ApiError {
	message: string;
	error: {
		code: string;
		message: string;
	};
}
