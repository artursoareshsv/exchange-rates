import { useCallback, useEffect, useState } from 'react';
import { CurrencySelect } from './components/CurrencySelect';
import { Card, Row } from './components/styled';
import { TextInput } from './components/TextInput';
import { convertCurrency, getCurrencies } from './providers/exchange-rates';
import { Currency } from './types/currency';
import { FormData } from './types/formData';
import { debounce } from './util/debounce';

function App() {
	const [formData, setFormData] = useState<Partial<FormData>>({
		amount: '',
		baseCurrency: '',
		targetCurrency: '',
	});

	const [currencies, setCurrencies] = useState<Currency[]>([]);
	const [convertedValue, setConvertedValue] = useState<number | undefined>(undefined);

	useEffect(() => {
		getCurrencies().then(setCurrencies);
	}, []);

	useEffect(() => {
		convertValue(formData);
	}, [formData]);

	const convertValue = useCallback(
		debounce((value: Partial<FormData>) => {
			const { baseCurrency, targetCurrency, amount } = value;

			if (baseCurrency && targetCurrency && amount) {
				convertCurrency(baseCurrency, targetCurrency, amount).then(setConvertedValue);
			}
		}, 350),
		[]
	);

	const handleUpdateForm = (value: Partial<FormData>): void => {
		setFormData((previous) => ({ ...previous, ...value }));
	};

	return (
		<Card>
			<Row>
				<CurrencySelect
					label='Base currency'
					name='baseCurrency'
					options={currencies}
					value={formData.baseCurrency}
					onChange={handleUpdateForm}
				/>

				<CurrencySelect
					label='Target currency'
					name='targetCurrency'
					options={currencies}
					value={formData.targetCurrency}
					onChange={handleUpdateForm}
				/>
			</Row>

			<TextInput label='Amount' name='amount' value={formData?.amount} onChange={handleUpdateForm} />

			{convertedValue && (
				<>
					{formData.amount} {formData.baseCurrency} = {convertedValue} {formData.targetCurrency}
				</>
			)}
		</Card>
	);
}

export default App;
