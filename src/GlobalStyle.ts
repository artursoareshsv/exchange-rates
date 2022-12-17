import { createGlobalStyle } from 'styled-components';
import RobotoRegular from './assets/fonts/Roboto-Regular.ttf';

export const theme = {
	primary: '#7D9D9C',
	darkNeutral: '#191A19',
	mediumNeutral: '#B2B2B2',
	lightNeutral: '#EAEAEA',
	white: '#FFFFFF',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular}) format('truetype');
  }

  body {
    font-family: 'Roboto';
    color: ${theme.darkNeutral};
    background-color: ${theme.lightNeutral};
  }
`;

export default GlobalStyle;
