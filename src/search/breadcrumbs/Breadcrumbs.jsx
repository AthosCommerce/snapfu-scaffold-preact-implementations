/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { ControllerProvider } from '@athoscommerce/snap-preact/components';

/* local scripts */
import { lang as breadcrumbsLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Breadcrumbs = observer((props) => {
	const { controller } = props;
	const store = controller.store;
	const { custom, search } = store;
	const { site, page } = custom;
	const lang = breadcrumbsLang[site?.lang ? site.lang : 'en'];
	const { query } = search;

	return store.loaded ? (
		<ControllerProvider controller={controller}>
			<div className="ss__breadcrumbs ss__theme">
				<ul>
					<li>{lang.home}</li>
					<li> / </li>
					<li>{page.type != 'search' ? <>{page.title}</> : <>{lang.results(query)}</>}</li>
				</ul>
			</div>
		</ControllerProvider>
	) : null;
});
