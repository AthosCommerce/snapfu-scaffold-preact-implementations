/* external imports */
import { h, Fragment, Component } from 'preact';

/* snap imports */
import { withController } from '@athoscommerce/snap-preact/components';

/* local components */
import { Pagination } from '../pagination/Pagination';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Slideout } from '../../components/slideout/Slideout';

/* local scripts */
import { lang as toolbarLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Toolbar = withController((props) => {
	const { controller, isDesktop, location } = props;
	const store = controller.store;
	const { custom, pagination, sorting } = store;
	const { site } = custom;
	const lang = toolbarLang[site?.lang ? site.lang : 'en'];

	return (
		<div className={`ss__toolbar ss__toolbar--${location}`}>
			{location == 'top' ? (
				<div className="ss__toolbar__row">
					<div className="ss__toolbar__column ss__toolbar__column--count">
						<h4 className="ss__count ss__title ss__title--count" dangerouslySetInnerHTML={{ __html: lang.count(pagination) }}></h4>
					</div>

					<div className="ss__toolbar__column ss__toolbar__column--sort">
						<Dropdown type={'sort'} buttonLabel={lang.sortBy} activeLabel={sorting?.current?.label} values={sorting.options} />
					</div>

					{isDesktop ? (
						<div className="ss__toolbar__column ss__toolbar__column--per-page">
							<Dropdown
								type={'perPage'}
								buttonLabel={lang.perPage}
								activeLabel={lang.show(pagination.pageSize)}
								values={pagination.pageSizeOptions}
							/>
						</div>
					) : (
						<div className="ss__toolbar__column ss__toolbar__column--slideout">
							<Slideout />
						</div>
					)}
				</div>
			) : (
				<Pagination showPrevNextIcon={true} />
			)}
		</div>
	);
});
