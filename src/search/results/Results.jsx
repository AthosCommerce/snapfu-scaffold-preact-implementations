/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { withController } from '@athoscommerce/snap-preact/components';

/* local components */
import { Banner, InlineBanner } from '../../components/banners/Banners';
import { Toolbar } from '../toolbar/Toolbar';
import { Carousel } from '../../recommendations/carousel/Carousel';
import { Result } from '../../components/result/Result';
import { Contact } from '../../components/contact/Contact';

/* local scripts */
import { lang as resultsLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Results = withController(
	observer((props) => {
		const { controller, isDesktop } = props;
		const store = controller.store;
		const { custom, results } = store;
		const views = custom.views;

		return (
			<div className="ss__has-results">
				<Toolbar isDesktop={isDesktop} location={'top'} />

				<Banner type={'banner'} />

				<div className={`ss__results ss__results--${views.active}`}>
					{results.map((result) => (
						<Fragment key={result.id}>
							{{
								banner: <InlineBanner result={result} wrapper={true} />,
							}[result.type] || <Result result={result} />}
						</Fragment>
					))}
				</div>

				<Banner type={'footer'} />

				<Toolbar isDesktop={isDesktop} location={'bottom'} />
			</div>
		);
	})
);

export const NoResults = withController((props) => {
	const { controller, isDesktop } = props;
	const store = controller.store;
	const { custom } = store;
	const { config, site } = custom;
	const lang = resultsLang[site?.lang ? site.lang : 'en'];

	// determine when to show contact information
	const showContact = !isDesktop || config.theme.columns.hidden;

	return (
		<div className="ss__no-results">
			<Banner type={'banner'} />

			<div className="ss__no-results__content">
				{lang.suggestions && (
					<>
						{lang.suggestions.title && <h4 className="ss__title">{lang.suggestions.title}</h4>}

						{lang.suggestions.list && lang.suggestions.list.length !== 0 ? (
							<ul className="ss__list">
								{lang.suggestions.list.map((suggestion, index) => (
									<li className="ss__list__option" key={`${suggestion}-${index}`}>
										{suggestion}
									</li>
								))}
							</ul>
						) : null}
					</>
				)}
			</div>

			{showContact && (
				<div className="ss__no-results__content">
					<Contact show={showContact} />
				</div>
			)}

			<Banner type={'footer'} />

			<Carousel controller={controller.noResultsController} />
		</div>
	);
});
