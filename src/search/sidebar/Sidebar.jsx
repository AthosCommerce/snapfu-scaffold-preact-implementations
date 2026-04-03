/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { useMediaQuery, ControllerProvider } from '@athoscommerce/snap-preact/components';

/* local components */
import { FacetsColumn } from '../facets-column/FacetsColumn';
import { Contact } from '../../components/contact/Contact';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Sidebar = observer((props) => {
	const { controller } = props;
	const store = controller.store;
	const { pagination, custom } = store;
	const { config } = custom;
	const theme = config.theme;
	const isDesktop = useMediaQuery(`(min-width: ${theme.bps.bp02}px)`);

	return store.loaded && isDesktop ? (
		<ControllerProvider controller={controller}>
			<div id={`ss__sidebar--${custom.id}`} className="ss__sidebar ss__theme">
				{pagination.totalResults !== 0 ? <FacetsColumn /> : <Contact show={isDesktop} />}
			</div>
		</ControllerProvider>
	) : null;
});
