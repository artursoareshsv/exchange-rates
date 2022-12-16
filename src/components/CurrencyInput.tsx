import { InputGroup } from './styled';

type CurrencyInputProps = {
	label: string;
	name?: string;
};

export function CurrencyInput({ label, name }: CurrencyInputProps) {
	return (
		<InputGroup>
			<label htmlFor={name}>{label}</label>
			<input type='text' name={name} />
		</InputGroup>
	);
}
