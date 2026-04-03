/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

/* snap imports */
import { withController } from '@athoscommerce/snap-preact/components';
import { filters as tools } from '@athoscommerce/snap-toolbox';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Pricing = withController(
	observer((props) => {
		const { controller, result } = props;
		const store = controller.store;
		const { config, site } = store.custom;
		const currency = config.currency[site.currency] ? config.currency[site.currency] : config.currency.usd;
		const core = result.display.mappings.core;
		const { custom } = result;

		return custom.hasPrice ? (
			<p className="ss__result__pricing">
				{custom.hasSale ? (
					<span className="ss__result__msrp">
						{tools.currency(core.msrp, currency)}
						{currency.suffix}
					</span>
				) : null}

				<span className={classnames('ss__result__price', { 'ss__result__price--on-sale': custom.hasSale })}>
					{tools.currency(core.price, currency)}
					{currency.suffix}
				</span>
			</p>
		) : null;
	})
);
