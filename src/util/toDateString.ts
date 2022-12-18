export const toDateString = (date: Date): string => {
	const iso = date.toISOString();
	return iso.slice(0, iso.indexOf('T'));
};
