/* snap imports */
import { filters as tools } from '@athoscommerce/snap-toolbox';

/* language for breadcrumbs */
export const lang = {
	en: {
		home: `Home`,
		results: (query) => {
			const parsedQuery = query?.string ? tools.stripHTML(query.string) : '';
			if (parsedQuery) {
				return `Search results for "${parsedQuery}"`;
			} else {
				return `Search results`;
			}
		},
	},
};
