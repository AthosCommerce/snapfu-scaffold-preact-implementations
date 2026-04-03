/* snap imports */
import { filters as tools } from '@athoscommerce/snap-toolbox';

/* parse query strings */
const parseString = (query) => {
	const parsed = query ? tools.stripHTML(query) : '';
	return parsed;
};

/* language for header */
export const lang = {
	en: {
		results: (query, matchType) => {
			const parsedQuery = parseString(query?.string);
			if (parsedQuery && matchType && matchType == 'expanded') {
				return `We couldn't find an exact match for "<span class="ss__query">${parsedQuery}</span>", but here's something similar:`;
			} else if (parsedQuery) {
				return `Search results for "<span class="ss__query">${parsedQuery}</span>"`;
			} else {
				return `Search results`;
			}
		},
		noResults: (query) => {
			const parsedQuery = parseString(query?.string);
			if (parsedQuery) {
				return `No results for "<span class="ss__query">${parsedQuery}</span>" found`;
			} else {
				return `No results found`;
			}
		},
		oq: (totalResults, isIntegratedSpellCorrection, oq, query) => {
			const parsedQuery = parseString(query?.string);
			const parsedOq = parseString(oq?.string);
			if (isIntegratedSpellCorrection) {
				return `No results for "${parsedOq}" were found; showing results for "${parsedQuery}" instead.`;
			} else if (totalResults !== 0) {
				return `Search instead for "<a class="ss__oq__link" href="${oq?.url?.href}">${parsedOq}</a>".`;
			}
		},
		dym: (dym) => {
			const parsedDym = parseString(dym?.string);
			return `Did you mean "<a class="ss__did-you-mean__link" href="${dym?.url?.href}">${parsedDym}</a>"?`;
		},
	},
};
