/* snap imports */
import { Snap } from '@athoscommerce/snap-preact';
import { getContext } from '@athoscommerce/snap-toolbox';

/* local scripts */
import { sharedPlugin } from './_config/scripts/shared';
import { contentPlugin } from './search/content/scripts/content';

/* local styles */
import './_config/styles/shared/_{{ snapfu.variables.theme }}.scss';

/* context from script tag */
const context = getContext(['shopper', 'siteId']);

/* set up site details config */
let site = {
	id: context?.siteId ? context.siteId : '{{snapfu.siteId}}',
	loggedIn: context?.shopper?.id ? true : false,
	currency: 'usd',
	lang: 'en',
	parameters: {
		query: 'q',
		page: 'page',
	},
	features: {
		integratedSpellCorrection: {
			enabled: true,
		},
	},
};

/* check for search pages */
const windowLower = window.location.href.toLowerCase();
const searchPages = ['/shop', '/mockup', '/lighthouse'];
const searchFound = searchPages.filter((page) => {
	return windowLower.includes(page);
});

/* set up page details config */
const isSearch = searchFound && searchFound.length > 0 ? true : false;
let page = {
	id: isSearch ? 'shop' : 'other',
	title: isSearch ? 'Search Results' : 'Other Page',
	type: isSearch ? 'search' : 'other',
};

/* configuration and instantiation */
const config = {
	context,
	url: {
		parameters: {
			core: {
				query: { name: site.parameters.query },
				page: { name: site.parameters.page },
			},
		},
	},
	client: {
		globals: {
			siteId: site.id,
		},
	},
	features: site.features,
	instantiators: {
		recommendation: {
			components: {
				Carousel: async () => (await import('./recommendations/carousel/Carousel')).Carousel,
			},
			config: {
				branch: BRANCHNAME,
				plugins: [[sharedPlugin, site, page]],
			},
		},
	},
	controllers: {
		search: [
			{
				config: {
					id: 'search',
					plugins: [[sharedPlugin, site, page], [contentPlugin]],
					settings: {
						redirects: {
							singleResult: true,
						},
						facets: {
							pinFiltered: true,
						},
					},
				},
				targeters: [
					{
						selector: '.ss-shop .breadcrumbs-selector',
						component: async () => {
							return (await import('./search/breadcrumbs/Breadcrumbs')).Breadcrumbs;
						},
						hideTarget: true,
					},
					{
						selector: '.ss-shop .title-selector',
						component: async () => {
							return (await import('./search/header/Header')).Header;
						},
						hideTarget: true,
					},
					{
						selector: '#athos-content',
						component: async () => {
							return (await import('./search/content/Content')).Content;
						},
						hideTarget: true,
					},
					{
						selector: '#athos-sidebar',
						component: async () => {
							return (await import('./search/sidebar/Sidebar')).Sidebar;
						},
						hideTarget: true,
					},
				],
			},
		],
		autocomplete: [
			{
				config: {
					id: 'autocomplete',
					plugins: [[sharedPlugin, site, page]],
					selector: '.ss__autocomplete__input',
					globals: {
						facets: {
							limit: 4,
							valueLimit: 10,
						},
						pagination: {
							pageSize: 6,
						},
					},
					settings: {
						history: {
							limit: 6,
							showResults: true,
						},
						trending: {
							limit: 6,
							showResults: true,
						},
					},
				},
				targeters: [
					{
						name: 'main',
						selector: '.ss__autocomplete__input',
						component: async () => {
							return (await import('./autocomplete/default/Default')).Default;
						},
						hideTarget: true,
					},
				],
			},
		],
		recommendation: [
			{
				config: {
					id: 'no-results',
					tag: 'no-results',
					branch: BRANCHNAME,
					plugins: [[sharedPlugin, site, page]],
				},
			},
		],
	},
};

const snap = new Snap(config);

/* recommendations for no results */
snap.getControllers('search', 'no-results').then(([search, noResults]) => {
	search.noResultsController = noResults;
});
