import { useEffect, useState } from 'react';
import './App.css';
import { CurrencySelect } from './components/CurrencySelect';
import { Card, Row } from './components/styled';
import { TextInput } from './components/TextInput';
import { getCurrencies } from './providers/exchange-rates';
import { Currency } from './types/currency';
import { FormData } from './types/formData';

function App() {
	const [formData, setFormData] = useState<Partial<FormData>>({
		amount: '',
		baseCurrency: '',
		targetCurrency: '',
	});

	const [currencies, setCurrencies] = useState<Currency[]>([]);

	useEffect(() => {
		getCurrencies().then((currencies) => setCurrencies(currencies));
	}, []);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

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

			<p>1.000 USD = 73,13 BRL</p>
		</Card>
	);
}

export default App;
