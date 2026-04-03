/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

/* snap imports */
import { Icon, withController } from '@athoscommerce/snap-preact/components';

/* local components */
import { Banner } from '../../components/banners/Banners';
import { FilterSummary } from '../filter-summary/FilterSummary';
import { FacetOptions } from '../facets-shared/FacetsShared';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const FacetsColumn = withController(
	observer((props) => {
		const { controller } = props;
		const store = controller.store;
		const { facets } = store;

		return (
			facets &&
			facets.length !== 0 && (
				<div className="ss__facets__column">
					<FilterSummary inline={false} />

					<div className="ss__facets">
						{facets.map((facet) => (
							<Facet facet={facet} key={facet.field} />
						))}

						<Banner type={'left'} />
					</div>
				</div>
			)
		);
	})
);

export const Facet = withController(
	observer((props) => {
		const { controller, facet } = props;
		const config = controller.store.custom.config;
		const isExpanded = !facet.collapsed;

		return (
			facet && (
				<article
					id={`ss__facet--${facet.field}`}
					className={classnames(`ss__block ss__facet ss__facet--${facet.display}`, {
						ss__collapsed: !isExpanded,
						ss__expanded: isExpanded,
					})}
				>
					<header
						className="ss__block__header ss__pointer"
						tabindex="0"
						role="button"
						onClick={() => facet.toggleCollapse()}
						onKeyDown={(e) => {
							if (e.key == 'Enter') {
								facet.toggleCollapse();
							}
						}}
					>
						<h4 className="ss__title">{facet.label}</h4>
						<span className="ss__icon__wrapper">
							<Icon icon={config.theme.icons.arrowDown} />
						</span>
					</header>

					<section className="ss__block__section">
						<FacetOptions facet={facet} />
					</section>
				</article>
			)
		);
	})
);
