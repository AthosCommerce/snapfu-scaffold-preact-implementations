/* language for pagination */
export const lang = {
	en: {
		previous: `Previous`,
		next: `Next`,
		ariaLabel: (value, current) => {
			if (typeof value == 'number') {
				if (current) {
					return `You are on page ${value}`;
				} else {
					return `Go to page ${value}`;
				}
			} else {
				const valueLower = value.toLowerCase();
				if (current) {
					return `You are on the ${valueLower} page`;
				} else {
					return `Go to ${valueLower} page`;
				}
			}
		},
	},
};
