/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

/* snap imports */
import { withController } from '@athoscommerce/snap-preact/components';

/* local scripts */
import { lang as gridLang } from './scripts/lang';
import { utils } from './scripts/utils';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Grid = withController(
	observer((props) => {
		const { controller, type } = props;
		const store = controller.store;
		const site = store.custom.site;
		const lang = gridLang[site?.lang ? site.lang : 'en'];

		// ensure all props are set for grid
		const gridProps = utils.build.grid(controller, props, type);

		// set values limit
		const valuesLimit = gridProps.moreOptions?.limit ? gridProps.moreOptions.limit : 9999999; // default limit should be a high number

		return (
			gridProps.values.length !== 0 && (
				<div className={classnames('ss__grid', { ss__scrollbar: gridProps.scroll })}>
					<div className="ss__grid__options">
						{gridProps.values.slice(0, valuesLimit).map((value, index) => {
							// build value props
							const valueProps = utils.build.value(value, index, gridProps, lang);

							// check if we have an href to determine display
							const hasLink = valueProps.url?.link?.href ? true : false;

							return (
								<div
									className={classnames('ss__grid__option', { ss__active: valueProps.active, ss__oos: !valueProps.available })}
									key={valueProps.key}
								>
									{hasLink ? (
										<a {...valueProps.attributes} href={valueProps.url.link.href} onClick={(e) => valueProps.url.link.onClick(e)}>
											<GridValue {...valueProps} />
										</a>
									) : (
										<button {...valueProps.attributes} onClick={(e) => valueProps.url.link.onClick(e)} type="button">
											<GridValue {...valueProps} />
										</button>
									)}
								</div>
							);
						})}

						{gridProps.moreOptions?.remaining > 0 ? (
							<div className="ss__grid__option ss__grid__option--more">
								<a
									className="ss__grid__action ss__grid__link"
									href={gridProps.moreOptions.url.link.href}
									onClick={() => gridProps.moreOptions.url.link.onClick()}
								>
									{gridProps.moreOptions.label}
								</a>
							</div>
						) : null}
					</div>
				</div>
			)
		);
	})
);

export const GridValue = observer((props) => {
	const { label } = props;

	return (
		<>
			<div className="ss__grid__block"></div>

			<div className="ss__grid__label">{label}</div>
		</>
	);
});
