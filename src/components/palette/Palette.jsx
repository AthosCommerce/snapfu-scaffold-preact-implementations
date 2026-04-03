/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

/* snap imports */
import { withController } from '@athoscommerce/snap-preact/components';

/* local scripts */
import { lang as paletteLang } from './scripts/lang';
import { utils } from './scripts/utils';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Palette = withController(
	observer((props) => {
		const { controller, type } = props;
		const store = controller.store;
		const site = store.custom.site;
		const lang = paletteLang[site?.lang ? site.lang : 'en'];

		// ensure all props are set for palette
		const paletteProps = utils.build.palette(controller, props, type);

		// set values limit
		const valuesLimit = paletteProps.moreOptions?.limit ? paletteProps.moreOptions.limit : 9999999; // default limit should be a high number

		return (
			paletteProps.values.length !== 0 && (
				<div className={classnames(`ss__palette ss__palette--${paletteProps.layout}`, { ss__scrollbar: paletteProps.scroll })}>
					<div className="ss__palette__options">
						{paletteProps.values.slice(0, valuesLimit).map((value, index) => {
							// build value props
							const valueProps = utils.build.value(value, index, paletteProps, lang);

							// check if we have an href to determine display
							const hasLink = valueProps.url?.link?.href ? true : false;

							return (
								<div
									className={classnames('ss__palette__option', { ss__active: valueProps.active, ss__oos: !valueProps.available })}
									key={valueProps.key}
								>
									{hasLink ? (
										<a {...valueProps.attributes} href={valueProps.url.link.href} onClick={(e) => valueProps.url.link.onClick(e)}>
											<PaletteValue {...valueProps} />
										</a>
									) : (
										<button {...valueProps.attributes} onClick={(e) => valueProps.url.link.onClick(e)} type="button">
											<PaletteValue {...valueProps} />
										</button>
									)}
								</div>
							);
						})}

						{paletteProps.moreOptions?.remaining > 0 ? (
							<div className="ss__palette__option ss__palette__option--more">
								<a
									className="ss__palette__action ss__palette__link"
									href={paletteProps.moreOptions.url.link.href}
									onClick={() => paletteProps.moreOptions.url.link.onClick()}
								>
									{paletteProps.moreOptions.label}
								</a>
							</div>
						) : null}
					</div>
				</div>
			)
		);
	})
);

export const PaletteValue = withController(
	observer((props) => {
		const { controller, count, handle, label, layout, showLabel } = props;

		return (
			<>
				<div className="ss__palette__block">
					<div
						className={classnames(`ss__palette__color ss__palette__color--${handle}`, {
							'ss__palette__color--has-borders': utils.sets.borders.includes(handle),
						})}
						style={utils.styles.backgrounds(handle)}
					></div>
				</div>

				<div className={classnames('ss__palette__label', { 'ss__sr-only': !showLabel && layout == 'grid' })}>{label}</div>

				{controller.id != 'autocomplete' && layout == 'list' && count && (
					<>
						&nbsp;<span className="ss__facet__count">({count})</span>
					</>
				)}
			</>
		);
	})
);
