import { useState } from 'react';
import { SingleValue } from 'react-select';
import { Currency } from '../types/currency';
import { Input } from '../types/input';
import { CustomSelect, InputGroup } from './styled';

type CurrencySelectProps = Input & {
	options: Currency[];
};

export function CurrencySelect({ label, name, options, value, onChange }: CurrencySelectProps) {
	return (
		<InputGroup>
			<label htmlFor={name}>{label}</label>

			<CustomSelect
				classNamePrefix='select'
				options={options}
				getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
				getOptionValue={(option) => option.symbol}
				onChange={(value) => onChange({ [name]: value?.symbol })}
			/>
		</InputGroup>
	);
}
