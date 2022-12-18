import { useCallback, useEffect, useState } from 'react';
import { CurrencySelect } from './components/CurrencySelect';
import { RateChart } from './components/RateChart';
import { Card, Row } from './components/styled';
import { TextInput } from './components/TextInput';
import { convertCurrency, getCurrencies, getTimeSeries } from './providers/exchange-rates';
import { Currency } from './types/currency';
import { FormData } from './types/formData';
import { TimeSeries } from './types/timeSeries';
import { debounce } from './util/debounce';
import { toDateString } from './util/toDateString';

function App() {
	const [formData, setFormData] = useState<Partial<FormData>>({
		amount: '',
		baseCurrency: '',
		targetCurrency: '',
	});

	const [currencies, setCurrencies] = useState<Currency[]>([]);
	const [convertedValue, setConvertedValue] = useState<number | undefined>(undefined);
	const [timeSeries, setTimeSeries] = useState<TimeSeries | undefined>(undefined);

	useEffect(() => {
		getCurrencies().then(setCurrencies);
	}, []);

	useEffect(() => {
		convertValue(formData);

		const today = new Date();
		const priorDate = new Date(new Date().setDate(today.getDate() - 30));

		getTimeSeries(priorDate, today, formData.baseCurrency || '', formData.targetCurrency || '').then(setTimeSeries);
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
					<RateChart timeSeries={timeSeries} />
				</>
			)}
		</Card>
	);
}

export default App;
