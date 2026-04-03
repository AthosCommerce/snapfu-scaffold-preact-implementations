let initialLoad = true;

async function restorePosition({ controller, element }, next) {
	if (initialLoad) {
		// skip restore position on initial page load
		initialLoad = false;
	} else if (controller.store.custom.config.scroll.disable) {
		// can be used to disable scroll on certain click events
		// example: if there is a load more pagination button, set controller.store.custom.config.scroll.disable = true
		controller.store.custom.config.scroll.disable = false;
	} else if (!element) {
		// scroll to top only if we are not going to be scrolling to stored element
		// setTimeout needed for certain iPhone browsers
		setTimeout(() => {
			const anchor = {
				selector: '#athos-content',
				offset: 0,
				position: () => {
					const anchorElement = document.querySelector(anchor.selector) ? document.querySelector(anchor.selector) : false;
					return anchorElement ? anchorElement.getBoundingClientRect().top + window.scrollY - anchor.offset : 0 - anchor.offset;
				},
			};
			window.scroll({ top: anchor.position(), left: 0, behavior: 'smooth' });
		});
	}
	await next();
}

export const contentPlugin = (controller) => {
	// log the store
	controller.on('afterStore', async ({ controller }, next) => {
		controller.log.debug('store', controller.store.toJSON());
		await next();
	});

	// set additional functionality for site
	controller.store.custom = {
		...controller.store.custom,
		config: {
			...controller.store.custom.config,
			scroll: { disable: false },
		},
	};

	// restore position when interacting with site
	controller.on('restorePosition', restorePosition);

	controller.on('afterStore', async ({ controller }, next) => {
		const store = controller.store;
		const { pagination } = store;
		const hasResults = pagination.totalResults !== 0 ? true : false;

		// add or remove body class for no results
		const loadedMain = 'ss__loaded';
		const loadedResults = `${loadedMain}--has-results`;
		const loadedNoResults = `${loadedMain}--no-results`;

		if (store.loaded && document.body) {
			if (!document.body.classList.contains(loadedMain)) {
				document.body.classList.add(loadedMain);
			}
			if (hasResults && !document.body.classList.contains(loadedResults)) {
				document.body.classList.add(loadedResults);
				document.body.classList.remove(loadedNoResults);
			} else if (!hasResults && !document.body.classList.contains(loadedNoResults)) {
				document.body.classList.add(loadedNoResults);
				document.body.classList.remove(loadedResults);
			}
		}

		await next();
	});
};
