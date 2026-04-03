/* shared recommendation functionality for all of the layouts */
export const utils = {
	carousel: {
		props: (carouselClass) => {
			// common carousel props
			return {
				disableClass: 'swiper-button-disabled',
				disableStyles: true,
				className: carouselClass,
				pagination: false,
				vertical: false,
				watchOverflow: true,
				autoAdjustSlides: false,
				centerInsufficientSlides: false,
				resizeObserver: true,
				speed: 600,
				threshold: 7,
			};
		},
		onAfterInit: (swiper) => {
			// add ss__button class to carousel arrows
			const ssButton = 'ss__button';
			const previous = swiper?.navigation?.prevEl;
			const next = swiper?.navigation?.nextEl;

			if (previous && !previous.classList.contains(ssButton)) {
				previous.classList.add(ssButton);
			}
			if (next && !next.classList.contains(ssButton)) {
				next.classList.add(ssButton);
			}
		},
	},
	configure: {
		bp: (view, group, spacing, controller) => {
			// create configs
			const layout = utils.create.layout(controller);
			const results = utils.create.results(controller);

			// get details from shared functions
			const defaults = utils.get.defaults(controller);
			const rows = utils.get.rows(controller);

			// function for configuring breakpoint settings in carousel props
			const viewIsNumber = !isNaN(view);
			const groupIsNumber = !isNaN(group);

			// check values for view and group
			let viewBp = viewIsNumber ? view * 1 : view;
			if (layout != 'mini' && viewIsNumber && !isNaN(defaults.view) && viewBp > defaults.view) {
				viewBp = defaults.view;
			}
			let groupBp = groupIsNumber ? group * 1 : group;
			if (layout != 'mini' && groupIsNumber && !isNaN(defaults.group) && groupBp > defaults.group) {
				groupBp = defaults.group;
			}

			// set breakpoint configs
			const enableLoop =
				viewIsNumber && groupIsNumber && results.count % (groupBp * rows.count) === 0 && results.count >= viewBp + groupBp ? true : false;
			const enableButtons = viewIsNumber && results.count > viewBp ? true : false;
			let bpConfig = {
				slidesPerView: viewBp,
				slidesPerGroup: groupBp,
				spaceBetween: spacing,
				hideButtons: !enableButtons,
				loop: enableLoop,
			};

			// add different group parameter depending on slide value
			if (viewBp == 'auto') {
				bpConfig.slidesPerGroup = 1;
				bpConfig['slidesPerGroupAuto'] = true;
			} else {
				// if slidesPerView is decimal, slidesPerGroup should be 1
				if (!Number.isInteger(bpConfig.slidesPerView)) {
					bpConfig.slidesPerGroup = 1;
				} else {
					bpConfig.slidesPerGroup = groupBp;
				}
			}

			// add grid rows if there are rows
			if (rows.enable) {
				bpConfig['grid'] = {
					rows: rows.count,
				};
			}

			return bpConfig;
		},
	},
	create: {
		layout: (controller) => {
			// create layout
			const store = controller.store;
			const parameters = store?.profile?.display?.templateParameters;

			return (parameters?.layout ? parameters.layout : 'default').toLowerCase();
		},
		results: (controller, maxLimit) => {
			// create result count and determine if we have results
			const store = controller.store;
			const { profile, results } = store;
			const parameters = profile?.display?.templateParameters;

			// check if there are results and set resultsArray
			let hasResults = results && results.length !== 0 ? true : false;
			let resultsArray = hasResults ? results : [];

			// get initial limit from parameters
			let resultsLimit = parameters?.limit ? parameters.limit * 1 : false;

			// if there is a max limit, this should override the limit parameter
			resultsLimit = maxLimit && (!resultsLimit || (resultsLimit && resultsLimit > maxLimit)) ? maxLimit : resultsLimit;

			// limit results if parameter is set
			if (hasResults && resultsLimit) {
				resultsArray = results.slice(0, resultsLimit);
				hasResults = resultsArray && resultsArray.length !== 0 ? true : false;
			}

			// determine if we should show recommendation
			const threshold = profile?.display?.threshold * 1 || 4;
			const enable = hasResults && resultsArray.length >= threshold && store.loaded;

			return { enable: enable, count: resultsArray.length, data: resultsArray };
		},
	},
	get: {
		defaults: (controller) => {
			// get default view and group
			const store = controller.store;
			const parameters = store?.profile?.display?.templateParameters;

			return { view: parameters?.perView || 5, group: parameters?.perGroup || 5 };
		},
		rows: (controller) => {
			// get rows and determine if we have rows
			const store = controller.store;
			const parameters = store?.profile?.display?.templateParameters;

			// check if we have grid rows for carousel recommendations
			const count = parameters?.rows && !isNaN(parameters.rows * 1) ? parameters.rows * 1 : 1;
			const enable = count > 1 ? true : false;

			return { enable: enable, count: count };
		},
	},
};
