import { Input } from '../types/input';
import { InputGroup } from './styled';

export function TextInput({ label, name, value, onChange }: Input) {
	return (
		<InputGroup>
			<label htmlFor={name}>{label}</label>
			<input type='text' name={name} value={value} onChange={(event) => onChange({ [name]: event.target.value })} />
		</InputGroup>
	);
}
