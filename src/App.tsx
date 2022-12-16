import './App.css';
import { CurrencyInput } from './components/CurrencyInput';

function App() {
	return (
		<>
			<CurrencyInput label='Amount' name='amount' />

			<p>1.000 USD = 73,13 BRL</p>
		</>
	);
}

export default App;
