/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

/* snap imports */
import { withController } from '@athoscommerce/snap-preact/components';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Image = withController(
	observer((props) => {
		const { controller, type, image, title, lazy, enableHover } = props;
		const images = controller.store.custom.config.images;

		// create image attributes (lazyloading should not be used on email recommendations)
		let imageAttributes = {
			src: images.isDefined(image) ? image : images.default,
			onError: (e) => images.onError(e),
		};
		if (lazy) {
			imageAttributes.loading = 'lazy';
		}

		// set image alt text
		const imageAlt = title ? title : '';

		return (
			<div
				className={classnames('ss__image', {
					'ss__image--base': type !== 'hover' && enableHover,
					'ss__image--hover': type == 'hover' && enableHover,
				})}
			>
				<img {...imageAttributes} alt={imageAlt} title={imageAlt} />
			</div>
		);
	})
);
