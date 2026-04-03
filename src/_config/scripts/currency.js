/* snap imports */
import { filters as tools } from '@athoscommerce/snap-toolbox';

/* curency object */
/* add new regions as needed for price formatting */
export const currency = {
	usd: {
		symbol: '$',
		thousandsSeparator: ',',
		decimalPlaces: 2,
		suffix: '', // for anything that needs to come after the price format
	},
	cad: {
		symbol: '$',
		thousandsSeparator: ',',
		decimalPlaces: 2,
		suffix: ' CAD',
	},
	aud: {
		symbol: '$',
		thousandsSeparator: ',',
		decimalPlaces: 2,
		suffix: ' AUD',
	},
	eu: {
		symbol: '',
		thousandsSeparator: '.',
		decimalSeparator: ',',
		decimalPlaces: 2,
		suffix: '\u20AC',
	},
	gbp: {
		symbol: '\u00A3',
		thousandsSeparator: ',',
		decimalPlaces: 2,
		suffix: '',
	},
	jpy: {
		symbol: '\uFFE5',
		thousandsSeparator: ',',
		decimalPlaces: 2,
		suffix: '',
	},
};

/* currency utils */
export const utils = {
	removeCents: (price, currency, split) => {
		// helper function to remove zero cents from prices
		return `${tools.currency(price, currency).split(split)[0]}${currency.suffix}`;
	},
};
