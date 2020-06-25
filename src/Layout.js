import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const overwrittenTheme = responsiveFontSizes(createMuiTheme({
	palette: {
		primary: {
			main: '#A1D900',
			light: '#C6DC85',
			dark: '#2C3022',
			contrastText: '#fff'
		},
		secondary: {
			main: '#F89C12',
			light: '#FFB13B',
			dark: '#E07800',
			contrastText: '#fff'
		}
	},
	typography: {
		useNextVariants: true,
		fontSize: 16,
		fontFamily: '"Poppins", sans-serif',
		h1: { fontFamily: '"Palanquin Dark", sans-serif' },
		h2: { fontFamily: '"Palanquin Dark", sans-serif' },
		h3: { fontFamily: '"Palanquin Dark", sans-serif' },
		h4: { fontFamily: '"Palanquin Dark", sans-serif' },
		h5: { fontFamily: '"Palanquin Dark", sans-serif' },
		h6: { fontFamily: '"Palanquin Dark", sans-serif' },
		body1: { fontFamily: '"Chivo", sans-serif' },
		button: { fontFamily: '"Chivo", sans-serif' }
	},
	overrides: {
		MuiButton: {
			root: {
				fontFamily: '"Chivo"',
				margin: 5,
				color: '#F89C12',
				background: 'white',
				fontSize: '1.1em',
				textTransform: 'none'
			},
			outlined: {
				borderRadius: '4px',
				color: '#F89C12',
				border: '2px solid #F89C12',
				transition: [
					'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					'border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
				].join(','),
				'&:hover': {
					border: '2px solid #A1D900',
					color: '#A1D900',
					backgroundColor: 'white'
				}
			},
			contained: {
				boxShadow: 'none',
				color: 'white',
				backgroundColor: '#F89C12',
				'&:hover': {
					backgroundColor: '#A1D900',
					color: 'white',
					boxShadow: 'none'
				}
			}
		},
		MuiIconButton: {
			root: {
				color: '#F89C12',
				background: 'white',
				margin: '5px',
				padding: '2px 6px',
				borderRadius: '4px',
				border: '2px solid #F89C12',
				transition: [
					'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					'border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
				].join(','),
				'&:hover': {
					border: '2px solid #A1D900',
					color: '#A1D900',
					backgroundColor: 'white'
				}
			}
		}
	}
}));

const Layout = ({ children }) => {
	return (
		<ThemeProvider theme={overwrittenTheme}>
			<Helmet>
				<link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700" rel="stylesheet"/>
				<link href="https://fonts.googleapis.com/css?family=Chivo:300,400|Palanquin+Dark|Palanquin" rel="stylesheet"/>
			</Helmet>
			<main>{children}</main>
		</ThemeProvider>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
