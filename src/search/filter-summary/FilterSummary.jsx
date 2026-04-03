/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

/* snap imports */
import { Icon, withController } from '@athoscommerce/snap-preact/components';

/* local scripts */
import { lang as filterSummaryLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const FilterSummary = withController(
	observer((props) => {
		const { controller, layout, inline } = props;
		const store = controller.store;
		const { custom, filters } = store;
		const { site } = custom;
		const clearAll = controller.urlManager.remove('filter').remove('sort').remove('pageSize').remove('page').remove('rq');
		const lang = filterSummaryLang[site?.lang ? site.lang : 'en'];

		// determine if summary is list layout
		const isSummaryList = layout && layout == 'list';

		return (
			filters &&
			filters.length !== 0 && (
				<div
					className={classnames(`ss__filter-summary ss__filter-summary--${isSummaryList ? 'list' : 'grid'}`, {
						'ss__filter-summary--inline': inline,
					})}
				>
					<article className="ss__block ss__summary">
						{!inline && (
							<header className="ss__block__header">
								<h4 className="ss__title">{lang.current}</h4>
							</header>
						)}

						<section className="ss__block__section">
							<div className="ss__list">
								{inline && (
									<div className="ss__list__option">
										<h6 className="ss__title">{lang.current}:</h6>
									</div>
								)}

								{filters.map((filter) => (
									<FilterSummaryOption
										layout={layout}
										link={filter.url.link}
										label={filter.facet.label}
										value={filter.value.label}
										key={filter.label}
									/>
								))}

								<FilterSummaryOption layout={layout} link={clearAll.link} value={lang.clear} isClear={true} />
							</div>
						</section>
					</article>
				</div>
			)
		);
	})
);

export const FilterSummaryOption = withController(
	observer((props) => {
		const { controller, layout, link, label, value, isClear } = props;
		const config = controller.store.custom.config;

		return (
			<div className={classnames('ss__list__option', { 'ss__list__option--clear': isClear, ss__active: layout == 'list' })}>
				<a className={classnames('ss__list__link', { ss__checkbox: layout == 'list' })} href={link.href} onClick={(e) => link.onClick(e)}>
					<span className="ss__checkbox__icon ss__icon__wrapper">
						<Icon icon={config.theme.icons.close} />
					</span>

					{label && (
						<>
							<span className="ss__filter-summary__label">{label}:</span>{' '}
						</>
					)}

					{value && <span className="ss__filter-summary__value">{value}</span>}
				</a>
			</div>
		);
	})
);
