/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { ControllerProvider } from '@athoscommerce/snap-preact/components';

/* local scripts */
import { lang as headerLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Header = observer((props) => {
	const { controller } = props;
	const store = controller.store;
	const { custom, pagination, search } = store;
	const { site, page } = custom;
	const lang = headerLang[site?.lang ? site.lang : 'en'];
	const isIntegratedSpellCorrection = site.features.integratedSpellCorrection.enabled;
	const { query, originalQuery, didYouMean, matchType } = search;

	// check if there are results or not
	const hasResults = pagination.totalResults !== 0;

	// set up shared classes for ss__title header
	let headerClasses = ['ss__title', hasResults ? 'ss__title--has-results' : 'ss__title--no-results'];

	// join shared classes array
	const headerClassName = headerClasses.join(' ');

	// determine if originalQuery or didYouMean should be shown
	const showOq = originalQuery && ((!isIntegratedSpellCorrection && hasResults) || isIntegratedSpellCorrection);
	const showDym = !hasResults && didYouMean;

	return store.loaded ? (
		<ControllerProvider controller={controller}>
			<div className="ss__header ss__theme">
				{page.type != 'search' ? (
					<h3 className={headerClassName}>{page.title}</h3>
				) : (
					<>
						<h3
							className={headerClassName}
							dangerouslySetInnerHTML={{ __html: hasResults ? lang.results(query, matchType) : lang.noResults(query) }}
						></h3>

						{showOq && (
							<div
								className="ss__oq"
								dangerouslySetInnerHTML={{
									__html: lang.oq(pagination.totalResults, isIntegratedSpellCorrection, originalQuery, query),
								}}
							></div>
						)}

						{showDym && <div className="ss__did-you-mean" dangerouslySetInnerHTML={{ __html: lang.dym(didYouMean) }}></div>}
					</>
				)}
			</div>
		</ControllerProvider>
	) : null;
});
