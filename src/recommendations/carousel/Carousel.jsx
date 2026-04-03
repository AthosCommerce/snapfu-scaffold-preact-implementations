/* external imports */
import { h, Fragment, Component } from 'preact';
import { useEffect } from 'preact/hooks';
import { observer } from 'mobx-react-lite';
import { Grid } from 'swiper/modules';

/* snap imports */
import { Recommendation, ControllerProvider } from '@athoscommerce/snap-preact/components';

/* local components */
import { RecommendationHeader, RecommendationPrevious, RecommendationNext } from '../shared/Shared';
import { Result } from '../../components/result/Result';

/* local scripts */
import { lang as recommendationsLang } from './scripts/lang';
import { utils } from '../shared/scripts/utils';

/* local styles */
import './styles/_{{ snapfu.variables.theme }}.scss';

export const Carousel = observer((props) => {
	const { controller } = props;
	const store = controller.store;
	const { custom, profile } = store;
	const { config, site } = custom;
	const lang = recommendationsLang[site?.lang ? site.lang : 'en'];
	const recommendationId = `ss__recommendation--${custom.id}`;
	const parameters = profile?.display?.templateParameters;

	useEffect(() => {
		// useEffect here is used to load recommendations on no results
		if (!controller.store.loaded) {
			controller.search();
		}
	}, []);

	// set default per view and per group
	const perView = parameters?.perView || 5;
	const perGroup = parameters?.perGroup || 5;

	// get default layout
	const layout = utils.create.layout(controller);

	// get result details
	const results = utils.create.results(controller);

	// get row details
	const rows = utils.get.rows(controller);

	// set up carousel props
	const carouselProps = {
		...utils.carousel.props('ss__carousel__recommendation'),
		prevButton: <RecommendationPrevious />,
		nextButton: <RecommendationNext />,
		onAfterInit: (swiper) => {
			const previous = swiper?.navigation?.prevEl;
			const next = swiper?.navigation?.nextEl;

			// add ss__button class
			utils.carousel.onAfterInit(swiper);

			// update custom header naviation arrows after init
			if ((parameters?.title || parameters?.description) && navigation?.update) {
				navigation.update('prev', previous);
				navigation.update('next', next);
			}
		},
		breakpoints: {
			0: utils.configure.bp(2, 2, 10, controller),
		},
	};

	// add extra breakpoints if not mini layout
	if (layout != 'mini') {
		carouselProps.breakpoints[config.theme.bps.bp01] = utils.configure.bp(2, 2, 10, controller);
		carouselProps.breakpoints[config.theme.bps.bp02] = utils.configure.bp(3, 3, 20, controller);
		carouselProps.breakpoints[config.theme.bps.bp03] = utils.configure.bp(4, 4, 20, controller);
		carouselProps.breakpoints[config.theme.bps.bp04] = utils.configure.bp(perView, perGroup, 20, controller);
	}

	// set up recommendation props
	const recommendationProps = {
		controller: controller,
		disableStyles: true,
		results: results.data,
		className: 'ss__results',
		theme: {
			components: {
				carousel: carouselProps,
			},
		},
	};

	// add grid module if there are rows
	if (rows.enable) {
		recommendationProps['modules'] = [Grid];
	}

	// navigation functions for recommendations
	const navigation = {
		update: (direction, element) => {
			// add and remove active class on custom naviation when clicked
			const navigationHeader = document.querySelector(`#${recommendationId} .ss__carousel__navigation .ss__carousel__${direction}`);
			if (navigationHeader && element) {
				if (element.classList.contains(recommendationProps.disableClass)) {
					navigationHeader.classList.add(recommendationProps.disableClass);
				} else {
					navigationHeader.classList.remove(recommendationProps.disableClass);
				}
			}
		},
		toggle: (direction) => {
			const navigationWrapper = `#${recommendationId} .ss__carousel__recommendation`;
			const navigationPrev = document.querySelector(`${navigationWrapper} > div > .ss__carousel__prev`);
			const navigationNext = document.querySelector(`${navigationWrapper} > div > .ss__carousel__next`);

			// initiate click event for default navigation
			if (navigationPrev && direction == 'prev') {
				navigationPrev.click();
			}
			if (navigationNext && direction == 'next') {
				navigationNext.click();
			}

			// then update navigation classes
			if (navigationPrev) {
				navigation.update('prev', navigationPrev);
			}
			if (navigationNext) {
				navigation.update('next', navigationNext);
			}
		},
	};

	return results.enable ? (
		<ControllerProvider controller={controller}>
			<div
				id={recommendationId}
				className={`ss__recommendation--target ss__recommendation--carousel ss__recommendation--${layout} ss__recommendation--${profile.tag}${
					parameters?.title ? '' : ' ss__recommendation--no-title'
				} ss__theme`}
			>
				<RecommendationHeader>
					<div className="ss__carousel__navigation">
						<div className="ss__carousel__prev-wrapper">
							<div
								className="ss__carousel__prev ss__button"
								tabindex="0"
								role="button"
								aria-label={lang.previous}
								onClick={() => navigation.toggle('prev')}
								onKeyDown={(e) => {
									if (e.key == 'Enter') {
										navigation.toggle('prev');
									}
								}}
							>
								<RecommendationPrevious />
							</div>
						</div>

						<div className="ss__carousel__next-wrapper">
							<div
								className="ss__carousel__next ss__button"
								tabindex="0"
								role="button"
								aria-label={lang.next}
								onClick={() => navigation.toggle('next')}
								onKeyDown={(e) => {
									if (e.key == 'Enter') {
										navigation.toggle('next');
									}
								}}
							>
								<RecommendationNext />
							</div>
						</div>
					</div>
				</RecommendationHeader>

				<Recommendation {...recommendationProps}>
					{results.data.map((result) => (
						<Result result={result} isCompact={layout == 'mini'} key={result.id} />
					))}
				</Recommendation>
			</div>
		</ControllerProvider>
	) : null;
});
