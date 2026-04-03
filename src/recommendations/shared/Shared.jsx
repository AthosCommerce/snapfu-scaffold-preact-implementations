/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

/* snap imports */
import { withController, Icon } from '@athoscommerce/snap-preact/components';
import { filters as tools } from '@athoscommerce/snap-toolbox';

/* local components */
import { Pricing } from '../../components/pricing/Pricing';

/* local scripts */
import { lang as sharedLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const RecommendationHeader = withController((props) => {
	const { controller, children } = props;
	const store = controller.store;
	const parameters = store?.profile?.display?.templateParameters;

	// determine if header should be shown or not
	const showHeader = parameters?.title || parameters?.description || children;

	return showHeader ? (
		<header className="ss__recommendation__header">
			{parameters?.title && (
				<h3 className="ss__title ss__title--recommendation" alt={parameters.title} title={parameters.title}>
					{parameters?.titleLink ? (
						<a href={parameters.titleLink} target="_blank">
							{parameters.title}
						</a>
					) : (
						<>{parameters.title}</>
					)}
				</h3>
			)}

			{children ? children : null}

			{parameters?.description && <div className="ss__recommendation__description">{tools.truncate(parameters.description, 250, '...')}</div>}
		</header>
	) : null;
});

export const RecommendationPrevious = withController((props) => {
	const { controller } = props;
	const config = controller.store.custom.config;

	return (
		<span className="ss__icon__wrapper">
			<Icon icon={config.theme.icons.arrowLeft} />
		</span>
	);
});

export const RecommendationNext = withController((props) => {
	const { controller } = props;
	const config = controller.store.custom.config;

	return (
		<span className="ss__icon__wrapper">
			<Icon icon={config.theme.icons.arrowRight} />
		</span>
	);
});

export const RecommendationCta = withController(
	observer((props) => {
		const { controller, cartStore, hideIcon, addedToCart, onAddToCart, ctaButtonText, ctaButtonSuccessText, subtotalText } = props;
		const site = controller.store.custom.site;
		const lang = sharedLang[site?.lang ? site.lang : 'en'];
		const title = subtotalText ? subtotalText : lang.subtotal(cartStore.count);

		// make sure prices are set
		const price = cartStore?.price ? cartStore.price : 0;
		const msrp = cartStore?.msrp ? cartStore.msrp : 0;

		// set custom pricing variables
		const hasPrice = price !== 0;
		const hasSale = msrp > price;

		// build pricing object so it resembles result data used in Pricing.jsx
		const mappings = {
			core: {
				price: price,
				msrp: msrp,
			},
		};
		const result = {
			display: {
				mappings: mappings,
			},
			mappings: mappings,
			custom: {
				hasPrice: hasPrice,
				hasSale: hasSale,
			},
		};

		return (
			<div className="ss__recommendation-bundle__wrapper__cta__subtotal">
				{hideIcon ? null : (
					<div className="ss__cta__bag">
						<span className="ss__icon__wrapper">
							<Icon icon={'bag'} />
						</span>
					</div>
				)}

				<div className="ss__cta__content">
					<h5 className="ss__title ss__title--subtotal" alt={title} title={title}>
						{title}
					</h5>

					<Pricing result={result} />

					<button
						className={classnames('ss__button', { 'ss__button--added': addedToCart })}
						type="button"
						disabled={addedToCart}
						onClick={(e) => onAddToCart(e)}
					>
						<span className="ss__button__label">{addedToCart ? ctaButtonSuccessText : ctaButtonText}</span>
					</button>
				</div>
			</div>
		);
	})
);
