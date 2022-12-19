export interface Input {
	label: string;
	name: string;
	value: string | undefined;
	onChange: (value: Record<string, string | undefined>) => void;
}
