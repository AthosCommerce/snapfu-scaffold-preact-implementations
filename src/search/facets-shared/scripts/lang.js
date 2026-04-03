/* language for facets */
export const lang = {
	en: {
		viewAll: `View All`,
		ariaLabel: (active, ariaLabel, valueLabel) => {
			const optionLabel = ariaLabel ? `'${valueLabel}' in '${ariaLabel}'` : `'${valueLabel}'`;
			return active ? `Remove selected filter: ${optionLabel}` : `Filter by: ${optionLabel}`;
		},
		overflow: (remaining) => {
			return `${remaining ? 'Show More' : 'Show Less'}`;
		},
	},
};
