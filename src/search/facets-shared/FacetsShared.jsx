/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

/* snap imports */
import { Icon, FacetSlider, withController } from '@athoscommerce/snap-preact/components';

/* local components */
import { Grid } from '../../components/grid/Grid';
import { Palette } from '../../components/palette/Palette';

/* local scripts */
import { lang as facetsLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const FacetOptions = withController(
	observer((props) => {
		const { controller, facet, valueLimits } = props;
		const store = controller.store;
		const { config, site } = store.custom;
		const theme = config.theme;
		const lang = facetsLang[site?.lang ? site.lang : 'en'];

		// set limits for facet values
		let limits = {
			grid: 12,
			palette: 12,
			default: 10,
		};
		if (valueLimits) {
			limits = valueLimits;
		}

		// set facet overflow limit
		if (facet.overflow) {
			if (limits.grid && facet.display == 'grid') {
				facet.overflow.setLimit(limits.grid);
			} else if (limits.palette && facet.display == 'palette') {
				facet.overflow.setLimit(limits.palette);
			} else if (limits.default) {
				facet.overflow.setLimit(limits.default);
			} else {
				facet.overflow.setLimit(10);
			}
		}

		// check if facet should show scroll
		const scroll = facet.overflow && facet.overflow.enabled && !facet.overflow.remaining ? true : false;

		// props for facet options
		let defaultOptionsProps = {
			ariaLabel: facet.label,
			facet: facet,
			scroll: scroll,
			values: facet.refinedValues, // should be set after overflow limits
		};
		let optionsProps = {
			...defaultOptionsProps,
		};
		if (facet.display == 'grid') {
			optionsProps = {
				...defaultOptionsProps,
			};
		} else if (facet.display == 'palette') {
			optionsProps = {
				...defaultOptionsProps,
				showLabel: true,
			};
		} else if (facet.display == 'slider') {
			optionsProps = {
				facet: facet,
				scroll: false,
				showTicks: theme.slider.ticks,
				stickyHandleLabel: theme.slider.stickyHandles,
			};
		}

		return (
			<>
				{{
					grid: <Grid {...optionsProps} />,
					palette: <Palette {...optionsProps} />,
					hierarchy: <FacetHierarchy {...optionsProps} />,
					slider: <FacetSlider {...optionsProps} />,
				}[facet.display] || <FacetList {...optionsProps} />}

				{facet.overflow && facet.overflow.enabled && (
					<div
						className={classnames('ss__show-more', {
							ss__collapsed: facet.overflow.remaining,
							ss__expanded: !facet.overflow.remaining,
						})}
					>
						<button className="ss__show-more__button ss__pointer" onClick={() => facet.overflow.toggle()}>
							<span className="ss__icon__wrapper">
								<Icon icon={`${facet.overflow.remaining ? theme.icons.plus : theme.icons.minus}`} />
							</span>
							{lang.overflow(facet.overflow.remaining)}
						</button>
					</div>
				)}
			</>
		);
	})
);

export const FacetHierarchy = withController(
	observer((props) => {
		const { controller, ariaLabel, values } = props;
		const store = controller.store;
		const { config, site } = store.custom;
		const lang = facetsLang[site?.lang ? site.lang : 'en'];

		return (
			<div className="ss__hierarchy">
				{values?.map((value) => (
					<div
						className={classnames('ss__hierarchy__option', {
							'ss__hierarchy__option--current': value.filtered,
							'ss__hierarchy__option--return': value.history && !value.filtered,
						})}
						key={value.value}
					>
						{value.filtered ? (
							<div className="ss__hierarchy__label" aria-label={lang.ariaLabel(value.filtered, ariaLabel, value.label)}>
								{value.label}
							</div>
						) : (
							<a
								className="ss__hierarchy__link"
								href={value.url.link.href}
								onClick={(e) => value.url.link.onClick(e)}
								aria-label={lang.ariaLabel(value.filtered, ariaLabel, value.label)}
							>
								{value.history && (
									<>
										<span className="ss__icon__wrapper">
											<Icon icon={config.theme.icons.arrowLeft} />
										</span>
										<span className="ss__icon__wrapper">
											<Icon icon={config.theme.icons.arrowLeft} />
										</span>
									</>
								)}
								{value.label.toLowerCase() == 'view all' ? (
									<>{lang.viewAll}</>
								) : (
									<>
										{value.label}
										{!value.history && (
											<>
												&nbsp;<span className="ss__facet__count">({value.count})</span>
											</>
										)}
									</>
								)}
							</a>
						)}
					</div>
				))}
			</div>
		);
	})
);

export const FacetList = withController(
	observer((props) => {
		const { controller, facet, ariaLabel, values, scroll } = props;
		const store = controller.store;
		const { config, site } = store.custom;
		const lang = facetsLang[site?.lang ? site.lang : 'en'];

		return (
			<div className={classnames('ss__list', { ss__scrollbar: scroll })}>
				{values?.map((value) => {
					return (
						<div className={classnames('ss__list__option', { ss__active: value.filtered })} key={value.value}>
							<a
								className={classnames('ss__list__link ss__checkbox', { 'ss__checkbox--round': facet?.multiple == 'single' })}
								href={value.url.link.href}
								onClick={(e) => value.url.link.onClick(e)}
								aria-label={lang.ariaLabel(value.filtered, ariaLabel, value.label)}
							>
								<span className="ss__checkbox__icon ss__icon__wrapper">{value.filtered && <Icon icon={config.theme.icons.check} />}</span>
								{value.label}
								{
									<>
										&nbsp;<span className="ss__facet__count">({value.count})</span>
									</>
								}
							</a>
						</div>
					);
				})}
			</div>
		);
	})
);
