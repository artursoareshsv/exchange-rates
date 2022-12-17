import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import './App.css';
import { CurrencyInput } from './components/CurrencyInput';
import { CurrencySelect } from './components/CurrencySelect';
import { Card, Row } from './components/styled';

function App() {
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];

	return (
		<Card>
			<CurrencyInput label='Amount' name='amount' />

			<Row>
				<CurrencySelect label='Base currency' name='baseCurrency' options={options} />
				<CurrencySelect label='Target currency' name='targetCurrency' options={options} />
			</Row>

			<p>1.000 USD = 73,13 BRL</p>
		</Card>
	);
}

export default App;
