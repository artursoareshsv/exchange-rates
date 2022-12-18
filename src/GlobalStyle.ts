import { createGlobalStyle } from 'styled-components';
import RobotoRegular from './assets/fonts/Roboto-Regular.ttf';

export const theme = {
	primary: '#37A65E',
	chartBackgroundColor: 'rgba(172, 242, 202, 0.5)',
	darkNeutral: '#2f4f4f',
	background: '#F2F2F2',
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
