export const debounce = (fn: Function, ms: number) => {
	let timeoutId: NodeJS.Timeout;

	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};
