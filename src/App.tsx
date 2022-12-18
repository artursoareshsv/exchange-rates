import { useCallback, useEffect, useState } from 'react';
import { CurrencySelect } from './components/CurrencySelect';
import { RateChart } from './components/RateChart';
import { Card, CardTitle, PrimaryText, Row } from './components/styled';
import { TextInput } from './components/TextInput';
import { convertCurrency, getCurrencies, getTimeSeries } from './providers/exchange-rates';
import { Conversion } from './types/conversion';
import { Currency } from './types/currency';
import { FormData } from './types/formData';
import { TimeSeries } from './types/timeSeries';
import { debounce } from './util/debounce';

function App() {
	const [formData, setFormData] = useState<Partial<FormData>>({
		amount: '',
		baseCurrency: '',
		targetCurrency: '',
	});

	const [currencies, setCurrencies] = useState<Currency[]>([]);
	const [convertedValue, setConvertedValue] = useState<Conversion | undefined>(undefined);
	const [timeSeries, setTimeSeries] = useState<TimeSeries | undefined>(undefined);

	useEffect(() => {
		getCurrencies().then(setCurrencies);
	}, []);

	useEffect(() => {
		convertValue(formData);
		getRates(formData);
	}, [formData]);

	const convertValue = useCallback(
		debounce((value: Partial<FormData>) => {
			const { baseCurrency, targetCurrency, amount } = value;
			const isFormFilled = baseCurrency && targetCurrency && amount;

			if (isFormFilled) {
				if (convertedValue && baseCurrency === convertedValue.query.from && targetCurrency === convertedValue.query.to && amount) {
					setConvertedValue((previous) => {
						if (previous) {
							const conversion = previous.info.rate * parseFloat(amount);

							return {
								...previous,
								...{ result: parseFloat(conversion.toFixed(5)) },
							};
						}

						return previous;
					});
				} else {
					convertCurrency(baseCurrency, targetCurrency, amount).then(setConvertedValue);
				}
			}
		}, 350),
		[convertedValue]
	);

	const getRates = useCallback(
		debounce((value: Partial<FormData>) => {
			const { baseCurrency, targetCurrency, amount } = value;

			if ((baseCurrency !== convertedValue?.query.from || targetCurrency !== convertedValue?.query.to) && amount) {
				const today = new Date();
				const priorDate = new Date(new Date().setDate(today.getDate() - 30));

				getTimeSeries(priorDate, today, baseCurrency || '', targetCurrency || '').then(setTimeSeries);
			}
		}, 350),
		[convertedValue]
	);

	const handleUpdateForm = (value: Partial<FormData>): void => {
		setFormData((previous) => ({ ...previous, ...value }));
	};

	return (
		<Card>
			<CardTitle>Exchange rate</CardTitle>

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
					<Row>
						<span>Converted amount:</span>
						<span>
							{formData.amount} {formData.baseCurrency} =
						</span>
						<PrimaryText>
							{convertedValue.result} {formData.targetCurrency}
						</PrimaryText>
					</Row>

					<RateChart timeSeries={timeSeries} />
				</>
			)}
		</Card>
	);
}

export default App;
