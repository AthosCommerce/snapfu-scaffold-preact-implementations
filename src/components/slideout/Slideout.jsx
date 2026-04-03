/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { Slideout as LibrarySlideout, Icon, withController } from '@athoscommerce/snap-preact/components';

/* local components */
import { FacetsColumn } from '../../search/facets-column/FacetsColumn';

/* local scripts */
import { lang as slideoutLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

/* slideout body class function */
const toggleSideoutClass = (active) => {
	const slideoutOpen = 'ss__slideout--open';
	if (document.body) {
		if (active) {
			document.body.classList.add(slideoutOpen);
		} else {
			document.body.classList.remove(slideoutOpen);
		}
	}
};

export const Slideout = withController((props) => {
	const { controller } = props;
	const store = controller.store;
	const { config, site } = store.custom;
	const theme = config.theme.slideout;
	const lang = slideoutLang[site?.lang ? site.lang : 'en'];

	// build props for slideouts
	const slideoutProps = {
		noButtonWrapper: true,
		buttonContent: <SlideoutButton icon={config.theme.icons.filter} label={lang.filter} />,
		displayAt: `(max-width: ${config.theme.bps.bp02}px)`,
		width: theme.width && theme.width != '300px' ? theme.width : '300px',
		slideDirection: theme.direction && theme.direction != 'left' ? theme.direction : 'left',
	};

	return (
		<div className="ss__slideout__default">
			<LibrarySlideout {...slideoutProps}>
				<SlideoutContent showFooter={true} showClearAll={true} />
			</LibrarySlideout>
		</div>
	);
});

export const SlideoutButton = (props) => {
	const { toggleActive, icon, label } = props;

	return (
		<button className="ss__slideout__button ss__button ss__button--full" type="button" onClick={toggleActive}>
			<span className="ss__icon__wrapper">
				<Icon icon={icon} />
			</span>
			<span className="ss__button__label">{label}</span>
		</button>
	);
};

export const SlideoutContent = withController((props) => {
	const { controller, toggleActive, active, showFooter, showClearAll } = props;
	const store = controller.store;
	const { config, site } = store.custom;
	const lang = slideoutLang[site?.lang ? site.lang : 'en'];

	// add body class when slideout is toggled open
	toggleSideoutClass(active);

	return (
		<>
			<SlideoutHeader toggleActive={toggleActive} title={lang.filterHeader} icon={config.theme.icons.close} />

			<div className="ss__slideout__content ss__slideout__content--facets ss__scrollbar">
				<FacetsColumn />
			</div>

			<SlideoutFooter toggleActive={toggleActive} showFooter={showFooter} showClearAll={showClearAll} />
		</>
	);
});

export const SlideoutHeader = (props) => {
	const { toggleActive, title, icon } = props;

	return (
		<div className="ss__slideout__header">
			<h4 className="ss__title">{title}</h4>

			<button className="ss__close ss__pointer ss__icon__wrapper" onClick={() => toggleActive()}>
				<Icon icon={icon} />
			</button>
		</div>
	);
};

export const SlideoutFooter = withController(
	observer((props) => {
		const { controller, toggleActive, showFooter, showClearAll } = props;
		const store = controller.store;
		const { custom, filters } = store;
		const { site } = custom;
		const lang = slideoutLang[site?.lang ? site.lang : 'en'];
		const clearAll = controller.urlManager.remove('filter').remove('sort').remove('pageSize').remove('page').remove('rq');

		return (
			showFooter && (
				<div className="ss__slideout__footer">
					<div className="ss__slideout__footer__row">
						<div className="ss__slideout__footer__column">
							<button className="ss__button ss__button--full" type="button" onClick={toggleActive}>
								<span className="ss__button__label">{lang.close}</span>
							</button>
						</div>

						{showClearAll && filters && filters.length !== 0 && (
							<div className="ss__slideout__footer__column">
								<button className="ss__button ss__button--full" type="button" onClick={(e) => clearAll.link.onClick(e)}>
									<span className="ss__button__label">{lang.clear}</span>
								</button>
							</div>
						)}
					</div>
				</div>
			)
		);
	})
);
