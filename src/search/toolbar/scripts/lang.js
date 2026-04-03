/* language for toolbar */
export const lang = {
	en: {
		sortBy: `Sort by:`,
		perPage: `Per page:`,
		show: (num) => {
			return `Show ${num}`;
		},
		count: (pagination) => {
			let range = pagination.multiplePages ? `<span class="ss__count__range">${pagination.begin} - ${pagination.end}</span> of ` : ``;
			return `${range}<span class="ss__count__total">${pagination.totalResults}</span> result${pagination.totalResults == 1 ? '' : 's'}`;
		},
	},
};
