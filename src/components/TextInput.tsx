import { InputGroup } from './styled';

type TextInputProps = {
	label: string;
	name: string;
	value: string | undefined;
	onChange: (value: string) => void;
};

export function TextInput({ label, name, value, onChange }: TextInputProps) {
	return (
		<InputGroup>
			<label htmlFor={name}>{label}</label>
			<input type='text' name={name} value={value} onChange={(event) => onChange(event.target.value)} />
		</InputGroup>
	);
}
