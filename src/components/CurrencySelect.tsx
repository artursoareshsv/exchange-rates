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
				name={name}
				options={options}
				getOptionLabel={(option: Currency) => `${option.symbol} - ${option.name}`}
				getOptionValue={(option: Currency) => option.symbol}
				onChange={(value: SingleValue<Currency>) => onChange({ [name]: value?.symbol })}
			/>
		</InputGroup>
	);
}
