/* snap imports */
import { filters as tools } from '@athoscommerce/snap-toolbox';

/* language for autocomplete */
export const lang = {
	en: {
		terms: `Search Suggestions`,
		trending: `Popular Searches`,
		history: `Recent Searches`,
		termsAriaLabel: `Suggestions`,
		termAriaLabel: (index, length, value) => {
			return `Item ${index} of ${length}, ${value}`;
		},
		facets: false,
		results: `Product Suggestions`,
		tryAgain: `Please try another search.`,
		noResults: (query) => {
			const parsedQuery = query ? tools.stripHTML(query) : '';
			const hasQuery = parsedQuery ? ` for "${parsedQuery}"` : ``;
			return `No results found${hasQuery}.`;
		},
		seeMore: (filtered, num, query) => {
			const parsedQuery = query ? tools.stripHTML(query) : '';
			const filteredText = filtered && filtered !== 0 ? ' filtered' : '';
			if (num === 1) {
				return `See 1${filteredText} result for "${parsedQuery}"`;
			} else {
				return `See ${num}${filteredText} results for "${parsedQuery}"`;
			}
		},
	},
};
