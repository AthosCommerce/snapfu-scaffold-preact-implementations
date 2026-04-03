/* external imports */
import { h, Fragment, Component } from 'preact';
import classnames from 'classnames';

/* snap imports */
import { createHoverProps, useMediaQuery, Icon, FacetListOptions, withController, withTracking } from '@athoscommerce/snap-preact/components';
import { filters as tools } from '@athoscommerce/snap-toolbox';

/* local components */
import { Banner, InlineBanner } from '../../components/banners/Banners';
import { Grid } from '../../components/grid/Grid';
import { Palette } from '../../components/palette/Palette';
import { Pricing } from '../../components/pricing/Pricing';

/* local scripts */
import { lang as acLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

/* function to check what autocomplete breakpoint we're on */
const getBreakpoint = (bps) => {
	let themeBp = 0;
	if (useMediaQuery(`(min-width: ${bps.bp04}px)`)) {
		themeBp = bps.bp04;
	} else if (useMediaQuery(`(min-width: ${bps.bp03}px)`)) {
		themeBp = bps.bp03;
	} else if (useMediaQuery(`(min-width: ${bps.bp02}px)`)) {
		themeBp = bps.bp02;
	} else if (useMediaQuery(`(min-width: ${bps.bp01}px)`)) {
		themeBp = bps.bp01;
	}
	return themeBp;
};

export const AutocompleteLayout = withController((props) => {
	let { controller, input, className, hideTerms, hideTrending, hideHistory, breakpoints } = props;
	const store = controller.store;
	const { custom, state, loaded } = store;
	const config = custom.config;
	const acInput = typeof input == 'string' ? document.querySelector(input) : input;

	// variables to check if what terms should show
	const hasOtherTerms = !hideHistory || !hideTrending ? true : false;

	// check if there are only terms in Autocomplete
	const onlyTerms = hasOtherTerms && !loaded;

	// check if autocomplete is visible
	const visible = Boolean(acInput === state.focusedInput) && (!hideTerms || !hideTrending || !hideHistory || (state.input && loaded));

	// get current breakpoint
	const currentBP = getBreakpoint(config.theme.bps);

	return (
		visible && (
			<div
				className={classnames('ss__autocomplete', {
					'ss__autocomplete--only-terms': onlyTerms,
					[`${className}`]: className,
				})}
				onClick={(e) => e.stopPropagation()}
				role="presentation"
			>
				{!hideTerms ? (
					<div className={classnames('ss__autocomplete__terms', { 'ss__autocomplete__terms-trending': hasOtherTerms })}>
						<AutocompleteTerms termsProps={props} />
					</div>
				) : null}

				{!breakpoints[currentBP].hideFacets ? (
					<div className="ss__autocomplete__facets">
						<AutocompleteFacets facetsProps={props} />
					</div>
				) : null}

				{!breakpoints[currentBP].hideContent ? (
					<div className="ss__autocomplete__content">
						<AutocompleteContent contentProps={props} />
					</div>
				) : null}
			</div>
		)
	);
});

export const AutocompleteTerms = withController((props) => {
	let { termsProps } = props;

	// spread out termsProps
	const { hideTerms, retainTrending, retainHistory } = termsProps;

	return !hideTerms ? (
		<>
			<AutocompleteTermOptions type={'suggestions'} termOptionsProps={termsProps} />

			{retainTrending && <AutocompleteTermOptions type={'trending'} termOptionsProps={termsProps} />}

			{retainHistory && <AutocompleteTermOptions type={'history'} termOptionsProps={termsProps} />}
		</>
	) : null;
});

export const AutocompleteTermOptions = withController((props) => {
	const { controller, type, termOptionsProps } = props;
	const store = controller.store;
	const { custom, terms, trending, history, state } = store;
	const { site } = custom;
	const lang = acLang[site?.lang ? site.lang : 'en'];

	// setup terms config
	let termsConfig = {
		suffix: 'suggestions',
		hide: terms && terms.length === 0,
		title: termOptionsProps.termsTitle,
		terms: terms,
	};
	if (type == 'trending') {
		termsConfig = {
			suffix: type,
			hide: termOptionsProps.hideTrending,
			title: termOptionsProps.trendingTitle,
			terms: trending,
		};
	} else if (type == 'history') {
		termsConfig = {
			suffix: type,
			hide: termOptionsProps.hideHistory,
			title: termOptionsProps.historyTitle,
			terms: history,
		};
	}

	return !termsConfig.hide && termsConfig.terms && termsConfig.terms.length !== 0 ? (
		<div className={`ss__autocomplete__terms__${termsConfig.suffix}`}>
			{termsConfig.title ? (
				<div className={`ss__autocomplete__title ss__autocomplete__title--${termsConfig.suffix}`}>
					<h5>{termsConfig.title}</h5>
				</div>
			) : null}

			<div className="ss__autocomplete__terms__options" role="list" aria-label={termsConfig.title ? termsConfig.title : lang.termsAriaLabel}>
				{termsConfig.terms.map((term, i) => (
					<div
						className={classnames('ss__autocomplete__terms__option', { 'ss__autocomplete__terms__option--active': term.active })}
						role="listitem"
						key={term.value}
					>
						<a
							href={term.url.link.href}
							onClick={(e) => term.url.link.onClick(e)}
							{...createHoverProps(term.preview)}
							aria-label={lang.termAriaLabel(i + 1, termsConfig.terms.length, term.value)}
						>
							{emIfy(term.value, state.input || '')}
						</a>
					</div>
				))}
			</div>
		</div>
	) : null;
});

export const AutocompleteFacets = withController((props) => {
	const { controller, facetsProps } = props;
	const store = controller.store;
	const { custom, facets } = store;
	const config = custom.config;

	// spread out facetsProps
	const { breakpoints, hideBanners } = facetsProps;

	// get current breakpoint
	const currentBP = getBreakpoint(config.theme.bps);

	// get facets and facet breakpoint
	const facetsBP = breakpoints[currentBP].theme.components.facets;
	const facetBP = breakpoints[currentBP].theme.components.facet;

	// filter out slider facets and limit amount of facets shown
	let facetsArray = facets;
	const facetsLimit = facetsBP?.limit ? facetsBP.limit : 3;
	if (facetsLimit) {
		facetsArray = facets
			.filter((facet) => {
				facet.display = facet.display == 'hierarchy' ? 'list' : facet.display;
				return facet.display != 'slider';
			})
			.slice(0, facetsLimit);
	}

	return !breakpoints[currentBP].hideFacets && facetsArray && facetsArray.length !== 0 ? (
		<>
			{facetsBP.title ? (
				<div className="ss__autocomplete__title ss__autocomplete__title--facets">
					<h5>{facetsBP.title}</h5>
				</div>
			) : null}

			<div className="ss__facets">
				{facetsArray.map((facet) => (
					<div className={`ss__facet ss__facet--${facet.display} ss__facet--${facet.field}`} key={facet.field}>
						<div className="ss__facet__header">{facet.label}</div>

						<div className="ss__facet__options">
							<AutocompleteFacetOptions facet={facet} limit={facetBP.limit} />
						</div>
					</div>
				))}
			</div>

			{!hideBanners ? <Banner type={'left'} /> : null}
		</>
	) : null;
});

export const AutocompleteFacetOptions = (props) => {
	const { facet, limit } = props;
	const gridOrPalette = facet.display == 'grid' || facet.display == 'palette' ? true : false;

	// reset facet overflow limit
	if (facet.overflow) {
		if (gridOrPalette) {
			let modifiedLimit = limit == 3 ? 4 : limit;
			if (limit == 4 || limit == 5) {
				modifiedLimit = 6;
			}
			facet.overflow.setLimit(modifiedLimit);
		} else {
			facet.overflow.setLimit(limit);
		}
	}

	// props for facet options
	let defaultOptionsProps = {
		facet: facet,
		values: facet.refinedValues, // should be set after overflow limits
		previewOnFocus: true,
		valueProps: createHoverProps(),
	};
	let optionsProps = {
		...defaultOptionsProps,
		hideCheckbox: true,
		hideCount: true,
		disableStyles: true,
	};
	if (facet.display == 'grid') {
		optionsProps = {
			...defaultOptionsProps,
			ariaLabel: facet.label,
		};
	} else if (facet.display == 'palette') {
		optionsProps = {
			...defaultOptionsProps,
			ariaLabel: facet.label,
			showLabel: true,
		};
	}

	return (
		<>
			{{
				grid: <Grid {...optionsProps} />,
				palette: <Palette {...optionsProps} />,
			}[facet.display] || <FacetListOptions {...optionsProps} />}
		</>
	);
};

export const AutocompleteContent = withController((props) => {
	const { controller, contentProps } = props;
	const store = controller.store;
	const { custom, results } = store;
	const config = custom.config;

	// spread out contentProps
	const { breakpoints, hideBanners } = contentProps;

	// get current breakpoint
	const currentBP = getBreakpoint(config.theme.bps);

	// get content breakpoint
	const contentBp = breakpoints[currentBP];

	return !contentBp.hideContent ? (
		<>
			{!hideBanners ? <Banner type={'header'} /> : null}

			{!hideBanners ? <Banner type={'banner'} /> : null}

			{results && results.length !== 0 ? (
				<div className="ss__autocomplete__content__results">
					<AutocompleteResults contentProps={contentProps} />
				</div>
			) : (
				<AutocompleteNoResults />
			)}

			{!hideBanners ? <Banner type={'footer'} /> : null}

			<AutocompleteSeeMore />
		</>
	) : null;
});

export const AutocompleteResults = withController((props) => {
	const { controller, contentProps } = props;
	const store = controller.store;
	const { custom, results } = store;
	const config = custom.config;

	// spread out contentProps
	const { breakpoints } = contentProps;

	// get current breakpoint
	const currentBP = getBreakpoint(config.theme.bps);

	// get content breakpoint
	const contentBp = breakpoints[currentBP];

	// get details of results breakpoints
	const resultsBp = contentBp.theme.components.results;
	const layout = resultsBp?.layout && resultsBp.layout == 'list' ? 'list' : 'grid';

	// limit amount of results shown
	let resultsArray = results;
	const resultsLimit = resultsBp.rows && resultsBp.columns ? resultsBp.rows * resultsBp.columns : 2;
	if (resultsLimit) {
		resultsArray = results.slice(0, resultsLimit);
	}

	return (
		<>
			{contentBp.contentTitle ? (
				<div className="ss__autocomplete__title ss__autocomplete__title--content">
					<h5>{contentBp.contentTitle}</h5>
				</div>
			) : null}

			<div
				className={classnames(`ss__results ss__results-${layout}`, {
					[`ss__results-${resultsBp.columns}`]: layout == 'grid',
				})}
			>
				{resultsArray.map((result) => (
					<Fragment key={result.id}>
						{{
							banner: <InlineBanner result={result} wrapper={false} key={result.id} />,
						}[result.type] || <AutocompleteResult result={result} resultProps={contentProps} layout={layout} key={result.id} />}
					</Fragment>
				))}
			</div>
		</>
	);
});

export const AutocompleteResult = withController(
	withTracking((props) => {
		const { controller, result, resultProps, layout, trackingRef } = props;
		const store = controller.store;
		const config = store.custom.config;
		const images = config.images;
		const core = result.display.mappings.core;

		// get current breakpoint
		const currentBP = getBreakpoint(config.theme.bps);

		// get result breakpoint
		const resultBp = resultProps.breakpoints[currentBP].theme.components.result;

		// create image attributes
		let imageAttributes = {
			src: images.isDefined(core.imageUrl) ? core.imageUrl : images.default,
			onError: (e) => images.onError(e),
		};
		if (resultBp?.theme?.components?.image?.lazy) {
			imageAttributes.loading = 'lazy';
		}

		// set image alt text
		const imageAlt = core.name ? core.name : '';

		return (
			<article className={`ss__result ss__result--${layout} ss__results__result`} ref={trackingRef}>
				<div className="ss__result__image-wrapper">
					<a href={core.url}>
						<div className="ss__image ss__result__image">
							<img {...imageAttributes} alt={imageAlt} title={imageAlt} />
						</div>
					</a>
				</div>

				<div className="ss__result__details">
					<div className="ss__result__details__title">
						<a href={core.url}>
							{resultBp?.truncateTitle?.limit && resultBp?.truncateTitle?.append
								? tools.truncate(core.name, resultBp.truncateTitle.limit, resultBp.truncateTitle.append)
								: core.name}
						</a>
					</div>

					<AutocompleteResultDetails result={result} />
				</div>
			</article>
		);
	})
);

export const AutocompleteResultDetails = (props) => {
	const { result } = props;

	return <Pricing result={result} />;
};

export const AutocompleteNoResults = withController((props) => {
	const { controller } = props;
	const store = controller.store;
	const { custom, search, results } = store;
	const { site } = custom;
	const lang = acLang[site?.lang ? site.lang : 'en'];
	const { query, originalQuery } = search;

	return results && results.length !== 0 ? null : (
		<div className="ss__autocomplete__content__no-results">
			<p>{lang.noResults(originalQuery?.string || query?.string)}</p>

			<p>{lang.tryAgain}</p>
		</div>
	);
});

export const AutocompleteSeeMore = withController((props) => {
	const { controller } = props;
	const store = controller.store;
	const { custom, state, filters, pagination, search } = store;
	const { config, site } = custom;
	const lang = acLang[site?.lang ? site.lang : 'en'];

	return (
		pagination.totalResults !== 0 &&
		search?.query?.string && (
			<div className="ss__autocomplete__content__info">
				<a href={state.url.href}>
					{lang.seeMore(filters?.length, pagination.totalResults, search?.query?.string)}
					<span className="ss__icon__wrapper">
						<Icon icon={config.theme.icons.arrowRight} />
					</span>
				</a>
			</div>
		)
	);
});

function emIfy(term, search) {
	if (term && search) {
		const match = term.match(escapeRegExp(search));
		if (search && term && match && typeof match.index == 'number') {
			const beforeMatch = term.slice(0, match.index);
			const afterMatch = term.slice(match.index + search.length, term.length);
			return (
				<>
					{beforeMatch ? <em>{beforeMatch}</em> : ''}
					{search}
					{afterMatch ? <em>{afterMatch}</em> : ''}
				</>
			);
		}
	}

	return (
		<>
			<em>{term}</em>
		</>
	);
}

function escapeRegExp(string) {
	return string?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
