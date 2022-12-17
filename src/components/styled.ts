import Select from 'react-select';
import styled from 'styled-components';
import { theme } from '../GlobalStyle';
import { Currency } from '../types/currency';

const borderRadius = '0.35rem';

export const InputGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;

	padding: 0.5rem;

	background-color: white;
	border: 0.1rem solid ${theme.darkNeutral};
	border-radius: ${borderRadius};

	input {
		font-size: 1rem;
		height: 1.5rem;
		border: none;
	}

	input:focus {
		outline: 0;
	}

	&:focus-within {
		label {
			color: ${theme.primary};
		}

		border-color: ${theme.primary};
	}
`;

export const CustomSelect = styled(Select<Currency>)`
	.select__control,
	.select__control--is-focused {
		border: none;
		box-shadow: none;
		outline: 0;
	}

	.select__value-container {
		padding: 0;
	}

	.select__indicator-separator {
		display: none;
	}
`;

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	max-width: 500px;
	margin: 0 auto;
	padding: 2rem;

	border: 2px solid ${theme.mediumNeutral};
	border-radius: ${borderRadius};
	background-color: ${theme.white};
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.2rem;

	& > div {
		width: 100%;
	}
`;
