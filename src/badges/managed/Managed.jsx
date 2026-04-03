/* external imports */
import { h, Fragment, Component } from 'preact';

/* snap imports */
import { withController, OverlayBadge, CalloutBadge } from '@athoscommerce/snap-preact/components';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const ManagedOverlay = withController((props) => {
	const { controller, result, limit, children } = props;

	return (
		<OverlayBadge controller={controller} result={result} limit={limit}>
			{children}
		</OverlayBadge>
	);
});

export const ManagedCallout = withController((props) => {
	const { controller, result, limit } = props;

	return <CalloutBadge controller={controller} result={result} limit={limit} />;
});
