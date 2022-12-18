import { createGlobalStyle } from 'styled-components';
import RobotoRegular from './assets/fonts/Roboto-Regular.ttf';

export const theme = {
	primary: '#7D9D9C',
	darkNeutral: '#2f4f4f',
	mediumNeutral: '#B2B2B2',
	background: '#EAEAEA',
	white: '#FFFFFF',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular}) format('truetype');
  }

  body {
    font-family: 'Roboto';
    font-size: 1rem;
    color: ${theme.darkNeutral};
    background-color: ${theme.background};
  }
`;

export default GlobalStyle;
