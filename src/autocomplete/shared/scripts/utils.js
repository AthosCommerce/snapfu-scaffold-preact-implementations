/* shared autocomplete functionality for all of the layouts */
export const utils = {
	classes: {
		addAutocomplete: (autocompleteClass) => {
			// add class to ss__autocomplete--target
			const autocompleteSelector = document.querySelectorAll('.ss__autocomplete--target');
			if (autocompleteSelector && autocompleteSelector.length !== 0) {
				for (var i = 0; i < autocompleteSelector.length; i++) {
					const currentAutocomplete = autocompleteSelector[i];
					if (currentAutocomplete && !currentAutocomplete.classList.contains(autocompleteClass)) {
						currentAutocomplete.classList.add(autocompleteClass);
					}
				}
			}
		},
		toggleVisible: (checks, focusedInput, visibleClass) => {
			// add class to body when autocomplete is active
			if (document.body) {
				if (focusedInput && (checks.terms || checks.trending || checks.history)) {
					setTimeout(() => {
						document.body.classList.add(visibleClass);
					}, 500);
				} else {
					document.body.classList.remove(visibleClass);
				}
			}
		},
	},
	settings: {
		terms: (checks, termsTitle, trendingTitle, historyTitle) => {
			let config = {
				hideTerms: !checks.terms && !checks.trending && !checks.history,
				termsTitle: termsTitle,
				hideTrending: !checks.trending,
				retainTrending: !checks.terms ? true : false,
				trendingTitle: trendingTitle,
				hideHistory: !checks.history,
				retainHistory: !checks.terms ? true : false,
				historyTitle: historyTitle,
			};
			return config;
		},
		facets: (facetsLimit) => {
			let config = {
				limit: facetsLimit,
			};
			return config;
		},
		facet: (optionsLimit, optionsSlot) => {
			let config = {
				limit: optionsLimit,
			};
			if (optionsSlot) {
				config.optionsSlot = optionsSlot;
			}
			return config;
		},
		content: (hide, title, linkSlot) => {
			let config = {
				hideContent: hide,
				contentTitle: title,
			};
			if (linkSlot) {
				config.linkSlot = linkSlot;
			}
			return config;
		},
		results: (numberOfColumns, numberOfRows, layout) => {
			// if layout == 'list', initialize list view
			let config = {};
			if (typeof layout != 'undefined' && layout && layout == 'list') {
				config.columns = 1;
				config.rows = numberOfColumns * numberOfRows;
				config.layout = `list`;
			} else {
				config.columns = numberOfColumns;
				config.rows = numberOfRows;
				config.className = `ss__results-${numberOfColumns}`;
			}
			return config;
		},
		result: (lazy, detailSlot) => {
			let config = {
				truncateTitle: { limit: 75, append: '...' },
				hideBadge: true,
				hidePricing: true,
				theme: {
					components: {
						image: {
							lazy: lazy,
						},
					},
				},
			};
			if (detailSlot) {
				config.detailSlot = detailSlot;
			}
			return config;
		},
	},
};
