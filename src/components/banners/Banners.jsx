/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { Banner as LibraryBanner, InlineBanner as LibraryInlineBanner, withController } from '@athoscommerce/snap-preact/components';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Banner = withController((props) => {
	const { controller, type } = props;
	const merchandising = controller.store.merchandising;

	// create banner props
	let bannerProps = {
		content: merchandising.content,
		type: type,
	};
	if (controller.type == 'autocomplete') {
		bannerProps.className = 'ss__autocomplete__banner';
	}

	return <LibraryBanner {...bannerProps} />;
});

export const InlineBanner = withController(
	observer((props) => {
		const { controller, result, wrapper } = props;
		const views = controller.store.custom.views;
		const custom = result.custom;

		// create banner props
		let bannerProps = {
			banner: result,
			disableStyles: true,
		};

		return wrapper ? (
			<article id={custom.id} className={`ss__result ss__result--${views.active} ss__result--inline-banner`}>
				<LibraryInlineBanner {...bannerProps} />
			</article>
		) : (
			<LibraryInlineBanner {...bannerProps} />
		);
	})
);
