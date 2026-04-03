/* language for grid */
export const lang = {
	en: {
		ariaLabelFacet: (active, ariaLabel, valueLabel) => {
			const optionLabel = ariaLabel ? `'${valueLabel}' in '${ariaLabel}'` : `'${valueLabel}'`;
			return active ? `Remove selected filter: ${optionLabel}` : `Filter by: ${optionLabel}`;
		},
		ariaLabelResult: (ariaLabel, valueLabel) => {
			const optionLabel = ariaLabel ? `'${valueLabel}' in '${ariaLabel}'` : `'${valueLabel}'`;
			return optionLabel;
		},
	},
};
