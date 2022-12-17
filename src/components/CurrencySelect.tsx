import { useState } from 'react';
import { SingleValue } from 'react-select';
import { CustomSelect, InputGroup } from './styled';

type CurrencySelectProps = {
	label: string;
	name?: string;
	options: { label: string; value: string }[];
};

export function CurrencySelect({ label, name, options }: CurrencySelectProps) {
	const [selectedOption, setSelectedOption] = useState<SingleValue<{ value: string; label: string }>>(null);

	return (
		<InputGroup>
			<label htmlFor={name}>{label}</label>
			<CustomSelect classNamePrefix='select' options={options} />
		</InputGroup>
	);
}
