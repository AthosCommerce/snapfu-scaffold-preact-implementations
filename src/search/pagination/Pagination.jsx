/* external imports */
import { h, Fragment, Component } from 'preact';
import classnames from 'classnames';

/* snap imports */
import { Icon, withController } from '@athoscommerce/snap-preact/components';

/* local scripts */
import { lang as paginationLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Pagination = withController((props) => {
	const { controller, showPrevNextIcon, showPrevNextLabel } = props;
	const store = controller.store;
	const { custom, pagination } = store;
	const { config, site } = custom;
	const lang = paginationLang[site?.lang ? site.lang : 'en'];

	// variables for pagination construction
	const pagesLimit = 5;
	const pagesCheck = Math.floor(pagesLimit / 2);
	const pages = pagination.getPages(pagesLimit);

	// checks for visbility of first and last page spans
	const pagesFirstLast = pagination.totalPages > pagesLimit;
	const pagesFirst = (modifier) => {
		return pagination.page - modifier > pagesCheck;
	};
	const pagesLast = (modifier) => {
		return pagination.page < pagination.totalPages - (pagesCheck + modifier);
	};

	// note: fragments around the pagination elements will help the pagination arrows to not shift on re-render

	return pagination.totalPages > 1 ? (
		<div className="ss__pagination">
			<div className="ss__pagination__row">
				<>
					{pagination.previous && (
						<div className="ss__pagination__column ss__pagination__previous">
							<a
								className="ss__pagination__link"
								href={pagination.previous.url.link.href}
								onClick={(e) => pagination.previous.url.link.onClick(e)}
								aria-label={lang.ariaLabel(lang.previous, false)}
							>
								{showPrevNextIcon ? (
									<span className="ss__icon__wrapper">
										<Icon icon={config.theme.icons.arrowLeft} />
									</span>
								) : null}
								{showPrevNextLabel ? lang.previous : null}
							</a>
						</div>
					)}

					{pagesFirstLast && pagesFirst(1) && (
						<>
							<div className="ss__pagination__column ss__pagination__first">
								<a
									className="ss__pagination__link"
									href={pagination.first.url.link.href}
									onClick={(e) => pagination.first.url.link.onClick(e)}
									aria-label={lang.ariaLabel(pagination.first.number, false)}
								>
									{pagination.first.number}
								</a>
							</div>
							{pagesFirst(2) && <PaginationHellip />}
						</>
					)}
				</>

				{pages.map((page) => (
					<div className={classnames('ss__pagination__column', { ss__pagination__current: page.active })} key={page.number}>
						{page.active ? (
							<span className="ss__pagination__label" aria-label={lang.ariaLabel(page.number, true)} aria-current="true" aria-live="polite">
								{page.number}
							</span>
						) : (
							<a
								className="ss__pagination__link"
								href={page.url.link.href}
								onClick={(e) => page.url.link.onClick(e)}
								aria-label={lang.ariaLabel(page.number, false)}
							>
								{page.number}
							</a>
						)}
					</div>
				))}

				<>
					{pagesFirstLast && pagesLast(0) && (
						<>
							{pagesLast(1) && <PaginationHellip />}
							<div className="ss__pagination__column ss__pagination__last">
								<a
									className="ss__pagination__link"
									href={pagination.last.url.link.href}
									onClick={(e) => pagination.last.url.link.onClick(e)}
									aria-label={lang.ariaLabel(pagination.last.number, false)}
								>
									{pagination.last.number}
								</a>
							</div>
						</>
					)}

					{pagination.next && (
						<div className="ss__pagination__column ss__pagination__next">
							<a
								className="ss__pagination__link"
								href={pagination.next.url.link.href}
								onClick={(e) => pagination.next.url.link.onClick(e)}
								aria-label={lang.ariaLabel(lang.next, false)}
							>
								{showPrevNextLabel ? lang.next : null}
								{showPrevNextIcon ? (
									<span className="ss__icon__wrapper">
										<Icon icon={config.theme.icons.arrowRight} />
									</span>
								) : null}
							</a>
						</div>
					)}
				</>
			</div>
		</div>
	) : null;
});

export const PaginationHellip = () => {
	return (
		<div className="ss__pagination__column ss__pagination__hellip">
			<span className="ss__pagination__label">&hellip;</span>
		</div>
	);
};
