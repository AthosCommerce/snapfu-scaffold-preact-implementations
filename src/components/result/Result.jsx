/* external imports */
import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react-lite';

/* snap imports */
import { withController, withTracking } from '@athoscommerce/snap-preact/components';

/* local components */
import { ManagedOverlay, ManagedCallout } from '../../badges/managed/Managed';
import { Image } from '../image/Image';
import { Pricing } from '../pricing/Pricing';

/* local scripts */
import { lang as resultLang } from './scripts/lang';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Result = withController(
	withTracking(
		observer((props) => {
			const { controller, result, isCompact, trackingRef } = props;
			const store = controller.store;
			const { site } = store.custom;
			const lang = resultLang[site?.lang ? site.lang : 'en'];
			const core = result.display.mappings.core;
			const custom = result.custom;

			return (
				result && (
					<article
						id={custom.id}
						className={`ss__result ss__result--grid${isCompact ? ' ss__result--grid-compact' : ''} ss__result--item`}
						ref={trackingRef}
					>
						<div className="ss__result__inner">
							<figure className="ss__result__image">
								<a className="ss__image__link" href={core.url}>
									<ManagedOverlay controller={controller} result={result} limit={3}>
										<Image type={'result'} image={core.thumbnailImageUrl} title={lang.title(core.name)} lazy={true} enableHover={false} />
									</ManagedOverlay>
								</a>
							</figure>

							<div className="ss__result__details">
								<p className="ss__result__name">
									<a href={core.url}>{core.name}</a>
								</p>

								<Pricing result={result} />

								<ManagedCallout controller={controller} result={result} limit={3} />
							</div>
						</div>
					</article>
				)
			);
		})
	)
);
