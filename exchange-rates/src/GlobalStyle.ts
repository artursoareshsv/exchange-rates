import { createGlobalStyle } from 'styled-components';

export const theme = {
	primary: '#37A65E',
	chartBackgroundColor: 'rgba(172, 242, 202, 0.5)',
	darkNeutral: '#5d7079',
	background: '#F2F2F2',
	white: '#FFFFFF',
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto';
    font-size: 1rem;
    color: ${theme.darkNeutral};
    background-color: ${theme.background};
  }
`;

export default GlobalStyle;
