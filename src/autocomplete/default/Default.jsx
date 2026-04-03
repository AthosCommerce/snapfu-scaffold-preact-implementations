/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { Autocomplete as LibraryAutocomplete, ControllerProvider } from '@athoscommerce/snap-preact/components';

/* local components */
import { AutocompleteFacetOptions, AutocompleteResultDetails, AutocompleteSeeMore } from '../shared/Shared';

/* local scripts */
import { lang as acLang } from '../shared/scripts/lang';
import { utils } from '../shared/scripts/utils';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Default = observer((props) => {
	const { controller, input } = props;
	const store = controller.store;
	const { custom, terms, trending, history, facets, results, state } = store;
	const { config, site } = custom;
	const { classes, settings } = utils;
	const lang = acLang[site?.lang ? site.lang : 'en'];

	// variables to check if elements should show
	const acChecks = {
		terms: terms && terms.length !== 0,
		trending: trending && trending.length !== 0,
		history: history && history.length !== 0,
		facets: facets && facets.length !== 0,
		results: results && results.length !== 0,
	};

	// add class to ss__autocomplete--target
	classes.addAutocomplete('ss__autocomplete--default');

	// add class to body when autocomplete is active
	const focusedInput = state.focusedInput;
	classes.toggleVisible(acChecks, focusedInput, 'ss__autocomplete--active');

	// setup slots to use in components
	const optionsSlot = <AutocompleteFacetOptions />;
	const linkSlot = <AutocompleteSeeMore />;
	const detailSlot = <AutocompleteResultDetails />;

	// default acBreakpoints config
	let acBreakpoints = {
		0: {
			hideFacets: true,
			...settings.content(false, lang.results, linkSlot),
			theme: {
				components: {
					results: settings.results(2, 1),
					result: settings.result(true, detailSlot),
				},
			},
		},
	};

	// add extra breakpoint configs using theme breakpoints
	if (config.theme.bps.bp01) {
		acBreakpoints[config.theme.bps.bp01] = {
			hideFacets: true,
			...settings.content(false, lang.results, linkSlot),
			theme: {
				components: {
					results: settings.results(3, 1),
					result: settings.result(true, detailSlot),
				},
			},
		};
	}
	if (config.theme.bps.bp02) {
		acBreakpoints[config.theme.bps.bp02] = {
			hideFacets: false,
			...settings.content(false, lang.results, linkSlot),
			theme: {
				components: {
					facets: settings.facets(3),
					facet: settings.facet(3, optionsSlot),
					results: settings.results(4, 1),
					result: settings.result(true, detailSlot),
				},
			},
		};
	}
	if (config.theme.bps.bp03) {
		acBreakpoints[config.theme.bps.bp03] = {
			hideFacets: false,
			...settings.content(false, lang.results, linkSlot),
			theme: {
				components: {
					facets: settings.facets(3),
					facet: settings.facet(4, optionsSlot),
					results: settings.results(3, 2),
					result: settings.result(false, detailSlot),
				},
			},
		};
	}
	if (config.theme.bps.bp04) {
		acBreakpoints[config.theme.bps.bp04] = {
			hideFacets: false,
			...settings.content(false, lang.results, linkSlot),
			theme: {
				components: {
					facets: settings.facets(3),
					facet: settings.facet(5, optionsSlot),
					results: settings.results(3, 2),
					result: settings.result(false, detailSlot),
				},
			},
		};
	}

	// props to pass into ac component
	const acProps = {
		disableStyles: true,
		controller: controller,
		input: input,
		className: `ss__theme ss__autocomplete--overflow${!acChecks.facets ? ' ss__autocomplete--no-facets' : ''}`,
		hideBanners: false,
		...settings.terms(acChecks, lang.terms, lang.trending, lang.history),
		breakpoints: acBreakpoints,
	};

	return (
		<ControllerProvider controller={controller}>
			<LibraryAutocomplete {...acProps} />
		</ControllerProvider>
	);
});
