import styled from 'styled-components';
import { theme } from '../GlobalStyle';

export const InputGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;

	padding: 0.5rem;

	background-color: white;
	border: 0.1rem solid ${theme.darkNeutral};
	border-radius: 0.35rem;

	input {
		font-size: 1.25rem;
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
