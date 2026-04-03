/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { useMediaQuery, ControllerProvider } from '@athoscommerce/snap-preact/components';

/* local components */
import { Banner } from '../../components/banners/Banners';
import { Results, NoResults } from '../results/Results';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Content = observer((props) => {
	const { controller } = props;
	const store = controller.store;
	const { custom, pagination } = store;
	const config = custom.config;
	const isDesktop = useMediaQuery(`(min-width: ${config.theme.bps.bp02}px)`);
	const hasResults = pagination.totalResults !== 0 ? true : false;

	return store.loaded ? (
		<ControllerProvider controller={controller}>
			<div id={`ss__content--${custom.id}`} className="ss__content ss__theme">
				<Banner type={'header'} />

				{hasResults ? <Results isDesktop={isDesktop} /> : <NoResults isDesktop={isDesktop} />}
			</div>
		</ControllerProvider>
	) : null;
});
